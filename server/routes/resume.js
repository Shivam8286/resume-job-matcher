const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const Resume = require('../models/Resume');
const User = require('../models/User');
const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed!'), false);
    }
  }
});

// Extract keywords from text
const extractKeywords = (text) => {
  const commonSkills = [
    'javascript', 'python', 'java', 'react', 'node.js', 'mongodb', 'sql',
    'aws', 'docker', 'kubernetes', 'git', 'html', 'css', 'typescript',
    'angular', 'vue.js', 'express', 'django', 'flask', 'spring', 'php',
    'ruby', 'go', 'rust', 'c++', 'c#', '.net', 'machine learning', 'ai',
    'data science', 'devops', 'agile', 'scrum', 'api', 'rest', 'graphql'
  ];

  const words = text.toLowerCase().split(/\s+/);
  const foundSkills = commonSkills.filter(skill => 
    words.some(word => word.includes(skill) || skill.includes(word))
  );

  // Extract education level
  const educationKeywords = ['bachelor', 'master', 'phd', 'degree', 'university', 'college'];
  const hasEducation = educationKeywords.some(keyword => 
    text.toLowerCase().includes(keyword)
  );

  // Extract experience level
  const experienceKeywords = ['senior', 'lead', 'manager', 'director', 'junior', 'entry'];
  const experienceLevel = experienceKeywords.find(keyword => 
    text.toLowerCase().includes(keyword)
  ) || 'mid-level';

  return {
    skills: [...new Set(foundSkills)],
    education: hasEducation,
    experienceLevel,
    textLength: text.length
  };
};

// Upload and parse resume
router.post('/upload', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Get user ID from JWT token (you'll need to implement authentication middleware)
    const userId = req.user?.id || req.body.userId; // Temporary fallback
    if (!userId) {
      return res.status(401).json({ error: 'User authentication required' });
    }

    const filePath = req.file.path;
    const dataBuffer = fs.readFileSync(filePath);

    // Parse PDF
    const data = await pdfParse(dataBuffer);
    const text = data.text;

    // Extract keywords and information
    const extractedData = extractKeywords(text);

    // Create resume document in database
    const resume = new Resume({
      userId: userId,
      filename: req.file.filename,
      originalName: req.file.originalname,
      fileSize: req.file.size,
      uploadDate: new Date(),
      extractedText: text,
      keywords: extractedData.skills,
      education: extractedData.education,
      experienceLevel: extractedData.experienceLevel,
      textLength: extractedData.textLength
    });

    await resume.save();

    res.json({
      success: true,
      message: 'Resume uploaded and parsed successfully',
      data: {
        id: resume._id,
        filename: resume.filename,
        originalName: resume.originalName,
        fileSize: resume.fileSize,
        uploadDate: resume.uploadDate,
        keywords: resume.keywords,
        education: resume.education,
        experienceLevel: resume.experienceLevel,
        textLength: resume.textLength
      }
    });

  } catch (error) {
    console.error('Error processing resume:', error);
    res.status(500).json({ 
      error: 'Error processing resume',
      message: error.message 
    });
  }
});

// Get user's resumes
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const resumes = await Resume.find({ userId, isActive: true })
      .sort({ uploadDate: -1 });

    res.json({
      success: true,
      data: resumes
    });

  } catch (error) {
    res.status(500).json({ error: 'Error retrieving resumes' });
  }
});

// Get specific resume
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const resume = await Resume.findById(id);

    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    res.json({
      success: true,
      data: resume
    });

  } catch (error) {
    res.status(500).json({ error: 'Error retrieving resume' });
  }
});

// Delete resume
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const resume = await Resume.findById(id);

    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    // Delete file from filesystem
    const filePath = path.join(uploadsDir, resume.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Mark as inactive in database
    resume.isActive = false;
    await resume.save();

    res.json({ 
      success: true, 
      message: 'Resume deleted successfully' 
    });

  } catch (error) {
    res.status(500).json({ error: 'Error deleting resume' });
  }
});

module.exports = router; 