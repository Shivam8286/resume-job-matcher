# Resume & Job Matching Platform - Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### 2. Environment Configuration

1. Copy the environment template:
```bash
cp env.example .env
```

2. Edit `.env` file with your API keys:
```env
# Required for basic functionality
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Optional: Job API (Free tier available)
ADZUNA_APP_ID=your_adzuna_app_id
ADZUNA_API_KEY=your_adzuna_api_key
```

### 3. Get API Keys

#### Adzuna API (Free)
1. Go to [Adzuna API](https://developer.adzuna.com/)
2. Sign up for a free account
3. Create a new application
4. Copy your App ID and API Key

#### Gmail Setup (for email notifications)
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use this password in `EMAIL_PASS`

### 4. Start Development Servers

```bash
# Start both backend and frontend
npm run dev

# Or start separately:
npm run server    # Backend on port 5000
npm run client    # Frontend on port 3000
```

## 📁 Project Structure

```
resume-job-matcher/
├── server/                 # Backend API
│   ├── routes/            # API routes
│   │   ├── auth.js        # Authentication
│   │   ├── resume.js      # Resume upload & parsing
│   │   ├── jobs.js        # Job matching
│   │   └── notifications.js # Email notifications
│   └── index.js           # Main server file
├── client/                # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # React contexts
│   │   └── App.js         # Main app component
│   └── package.json
├── uploads/               # Resume uploads (auto-created)
├── package.json           # Backend dependencies
└── README.md
```

## 🔧 Features Implemented

### ✅ Backend
- [x] Express server with security middleware
- [x] PDF resume parsing with keyword extraction
- [x] Job matching algorithm
- [x] User authentication (JWT)
- [x] Email notifications (daily job recommendations)
- [x] File upload handling
- [x] Rate limiting and security headers

### ✅ Frontend
- [x] Modern React app with Material-UI
- [x] Responsive design
- [x] User authentication flow
- [x] Resume upload with drag & drop
- [x] Job matching interface
- [x] User dashboard
- [x] Email subscription management

## 💰 Cost Breakdown

### Free Tier (MVP)
- **PDF Parsing**: pdf-parse library (free)
- **Job APIs**: Adzuna free tier (1,000 requests/month)
- **Email**: Gmail SMTP (free)
- **Hosting**: Vercel/Netlify (free)

### Optional Paid Enhancements
- **Enhanced PDF Parsing**: OpenAI API ($0.002/1K tokens)
- **Premium Job APIs**: $10-50/month for higher limits
- **Advanced Email**: SendGrid ($15/month for 50K emails)
- **Database**: MongoDB Atlas ($9/month)

## 🚀 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Backend (Railway/Heroku)
1. Create account on Railway or Heroku
2. Connect GitHub repository
3. Set environment variables
4. Deploy

### Database (Optional)
1. Create MongoDB Atlas account
2. Create cluster
3. Get connection string
4. Add to environment variables

## 🔍 Testing the App

1. **Register/Login**: Create an account
2. **Upload Resume**: Upload a PDF resume
3. **View Matches**: See job recommendations
4. **Subscribe**: Enable email notifications
5. **Dashboard**: View your activity

## 🛠️ Customization

### Adding More Job APIs
Edit `server/routes/jobs.js`:
```javascript
// Add new API integration
const fetchJobsFromNewAPI = async (keywords) => {
  // Implementation
};
```

### Enhancing PDF Parsing
Edit `server/routes/resume.js`:
```javascript
// Add OpenAI integration for better parsing
const enhancedExtraction = async (text) => {
  // Use OpenAI API for better keyword extraction
};
```

### Customizing Email Templates
Edit `server/routes/notifications.js`:
```javascript
// Customize email HTML template
const emailContent = `
  <div>Your custom email template</div>
`;
```

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Kill process on port 5000
   npx kill-port 5000
   ```

2. **PDF parsing fails**
   - Ensure PDF is not corrupted
   - Check file size (max 5MB)
   - Verify PDF contains text (not scanned images)

3. **Email not sending**
   - Check Gmail app password
   - Verify 2FA is enabled
   - Check email credentials in .env

4. **Job API errors**
   - Verify Adzuna API credentials
   - Check API rate limits
   - Ensure proper API endpoint

## 📈 Next Steps

1. **Add Database**: Implement MongoDB for persistent storage
2. **Enhanced Parsing**: Integrate OpenAI for better resume analysis
3. **More Job Sources**: Add LinkedIn, Indeed, or other job APIs
4. **Advanced Features**: 
   - Resume optimization suggestions
   - Interview preparation tools
   - Salary insights
   - Company reviews

## 🆘 Support

If you encounter issues:
1. Check the console for error messages
2. Verify all environment variables are set
3. Ensure all dependencies are installed
4. Check API rate limits and credentials

---

**Happy coding! 🚀** 