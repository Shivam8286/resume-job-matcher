const express = require('express');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const Notification = require('../models/Notification');
const User = require('../models/User');
const Job = require('../models/Job');
const router = express.Router();

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Subscribe to daily job notifications
router.post('/subscribe', async (req, res) => {
  try {
    const { userId, email, type = 'daily_jobs', frequency = 'daily', preferences } = req.body;

    if (!userId || !email) {
      return res.status(400).json({ 
        error: 'User ID and email are required' 
      });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if already subscribed
    const existingSubscription = await Notification.findOne({ 
      userId, 
      email, 
      type,
      isActive: true 
    });

    if (existingSubscription) {
      return res.status(400).json({ error: 'Already subscribed to this notification type' });
    }

    // Create subscription
    const notification = new Notification({
      userId,
      email,
      type,
      frequency,
      preferences: preferences || {},
      nextScheduled: new Date() // Will be set based on frequency
    });

    await notification.save();

    // Send welcome email
    const welcomeEmail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to Job Matcher! 🎉',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Welcome to Job Matcher!</h2>
          <p>You're now subscribed to ${frequency} job recommendations.</p>
          <p>You'll receive your first job recommendations soon!</p>
          <p>Best regards,<br>Job Matcher Team</p>
        </div>
      `
    };

    await transporter.sendMail(welcomeEmail);

    res.json({
      success: true,
      message: 'Successfully subscribed to notifications',
      data: notification
    });

  } catch (error) {
    console.error('Error subscribing:', error);
    res.status(500).json({ 
      error: 'Error subscribing to notifications',
      message: error.message 
    });
  }
});

// Unsubscribe from notifications
router.post('/unsubscribe', async (req, res) => {
  try {
    const { email, token } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    let query = { email };
    if (token) {
      query.unsubscribeToken = token;
    }

    const subscription = await Notification.findOne(query);
    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }

    // Mark as inactive
    subscription.isActive = false;
    await subscription.save();

    res.json({
      success: true,
      message: 'Successfully unsubscribed from notifications'
    });

  } catch (error) {
    res.status(500).json({ error: 'Error unsubscribing' });
  }
});

// Update subscription preferences
router.put('/preferences/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { preferences, frequency } = req.body;

    const subscription = await Notification.findById(id);
    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }

    // Update preferences
    if (preferences) {
      subscription.preferences = { ...subscription.preferences, ...preferences };
    }
    
    if (frequency) {
      subscription.frequency = frequency;
    }

    subscription.updatedAt = new Date();
    await subscription.save();

    res.json({
      success: true,
      message: 'Preferences updated successfully',
      data: subscription
    });

  } catch (error) {
    res.status(500).json({ error: 'Error updating preferences' });
  }
});

// Get user's subscriptions
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const subscriptions = await Notification.find({ 
      userId, 
      isActive: true 
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: subscriptions
    });

  } catch (error) {
    res.status(500).json({ error: 'Error fetching subscriptions' });
  }
});

// Get subscription status
router.get('/status/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const subscriptions = await Notification.find({ 
      email, 
      isActive: true 
    });

    res.json({
      success: true,
      data: subscriptions
    });

  } catch (error) {
    res.status(500).json({ error: 'Error fetching subscription status' });
  }
});

// Send job recommendations email
const sendJobRecommendations = async (subscription, jobs) => {
  try {
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Your ${subscription.frequency} Job Recommendations</h2>
        <p>Here are the top job matches for your skills:</p>
        
        ${jobs.map((job, index) => `
          <div style="border: 1px solid #e5e7eb; padding: 15px; margin: 10px 0; border-radius: 8px;">
            <h3 style="margin: 0 0 10px 0; color: #1f2937;">${job.title}</h3>
            <p style="margin: 5px 0; color: #6b7280;"><strong>Company:</strong> ${job.company?.displayName || 'N/A'}</p>
            <p style="margin: 5px 0; color: #6b7280;"><strong>Location:</strong> ${job.location?.displayName || 'N/A'}</p>
            <p style="margin: 5px 0; color: #6b7280;"><strong>Salary:</strong> ${job.salary?.min ? `${job.salary.min} - ${job.salary.max} ${job.salary.currency}` : 'Not specified'}</p>
            <p style="margin: 10px 0; color: #374151;">${job.description?.substring(0, 200)}...</p>
            <a href="${job.redirectUrl || '#'}" style="background: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">View Job</a>
          </div>
        `).join('')}
        
        <p style="margin-top: 20px; color: #6b7280;">
          <a href="${process.env.FRONTEND_URL}/unsubscribe?email=${subscription.email}&token=${subscription.unsubscribeToken}" style="color: #2563eb;">Unsubscribe</a> | 
          <a href="${process.env.FRONTEND_URL}/preferences?email=${subscription.email}" style="color: #2563eb;">Update Preferences</a>
        </p>
      </div>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: subscription.email,
      subject: `Your ${subscription.frequency} Job Matches 🚀`,
      html: emailContent
    };

    await transporter.sendMail(mailOptions);
    
    // Update subscription stats
    subscription.lastSent = new Date();
    subscription.sentCount += 1;
    await subscription.save();
    
    console.log(`Job recommendations sent to ${subscription.email}`);

  } catch (error) {
    console.error(`Error sending email to ${subscription.email}:`, error);
  }
};

// Schedule daily job recommendations (runs at 9 AM daily)
cron.schedule('0 9 * * *', async () => {
  console.log('Running daily job recommendations...');
  
  try {
    // Get all active daily subscriptions
    const dailySubscriptions = await Notification.find({
      isActive: true,
      frequency: 'daily',
      $or: [
        { nextScheduled: { $lte: new Date() } },
        { nextScheduled: { $exists: false } }
      ]
    });

    for (const subscription of dailySubscriptions) {
      try {
        // Get user's resume keywords
        const user = await User.findById(subscription.userId);
        if (!user) continue;

        // Get user's latest resume
        const latestResume = await require('../models/Resume').findOne({
          userId: subscription.userId,
          isActive: true
        }).sort({ uploadDate: -1 });

        if (!latestResume || !latestResume.keywords.length) continue;

        // Find matching jobs
        const query = { isActive: true };
        if (subscription.preferences.location) {
          query['location.displayName'] = { $regex: subscription.preferences.location, $options: 'i' };
        }

        const jobs = await Job.find(query)
          .sort({ postedDate: -1 })
          .limit(5);

        if (jobs.length > 0) {
          await sendJobRecommendations(subscription, jobs);
        }

        // Update next scheduled time
        subscription.nextScheduled = new Date(Date.now() + 24 * 60 * 60 * 1000); // Next day
        await subscription.save();

      } catch (error) {
        console.error(`Error processing subscription for ${subscription.email}:`, error);
      }
    }

  } catch (error) {
    console.error('Error in daily job recommendations cron:', error);
  }
});

// Schedule weekly job recommendations (runs every Monday at 9 AM)
cron.schedule('0 9 * * 1', async () => {
  console.log('Running weekly job recommendations...');
  
  try {
    const weeklySubscriptions = await Notification.find({
      isActive: true,
      frequency: 'weekly',
      $or: [
        { nextScheduled: { $lte: new Date() } },
        { nextScheduled: { $exists: false } }
      ]
    });

    for (const subscription of weeklySubscriptions) {
      try {
        // Similar logic as daily but with more jobs
        const user = await User.findById(subscription.userId);
        if (!user) continue;

        const latestResume = await require('../models/Resume').findOne({
          userId: subscription.userId,
          isActive: true
        }).sort({ uploadDate: -1 });

        if (!latestResume || !latestResume.keywords.length) continue;

        const query = { isActive: true };
        if (subscription.preferences.location) {
          query['location.displayName'] = { $regex: subscription.preferences.location, $options: 'i' };
        }

        const jobs = await Job.find(query)
          .sort({ postedDate: -1 })
          .limit(10);

        if (jobs.length > 0) {
          await sendJobRecommendations(subscription, jobs);
        }

        // Update next scheduled time (next week)
        subscription.nextScheduled = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        await subscription.save();

      } catch (error) {
        console.error(`Error processing weekly subscription for ${subscription.email}:`, error);
      }
    }

  } catch (error) {
    console.error('Error in weekly job recommendations cron:', error);
  }
});

module.exports = router; 