# Resume & Job Matching Platform

An AI-powered platform that matches resumes with job opportunities using advanced keyword analysis and automated job recommendations.

## 🚀 Features

- **Resume Upload & Parsing**: Upload PDF resumes and extract key information
- **Multi-Source Job Matching**: Fetch jobs from Adzuna, Reed, ZipRecruiter, and more
- **Real-time Job Updates**: Automated job fetching every 6 hours
- **Daily Job Recommendations**: Automated email notifications with personalized job matches
- **Modern UI**: Beautiful React frontend with responsive design
- **User Dashboard**: Track applications and manage preferences
- **Interactive Dashboard**: Glassmorphism, animated stats, job matches carousel, notifications, and upload card with progress and preview

## ✨ Latest UI/UX Improvements

- **Modern Dashboard**: Glassmorphism effect, gradient borders, and soft shadows for a premium look
- **Animated Stats Cards**: Animated numbers, icons, and hover effects for applications, matches, and more
- **Job Matches Carousel**: Horizontally scrollable, interactive job cards with company logos and Apply buttons
- **Recent Activity Timeline**: Vertical timeline with icons, color highlights, and clear timestamps
- **Notification Bell**: Dropdown with latest notifications and badge for unread items
- **Upload Resume Card**: Progress meter, animated icon, PDF preview, tooltips, and smart color cues
- **Navigation Buttons**: Prominent "View Job Matches" and "Upload Resume" buttons for easy access
- **Responsive & Accessible**: All features work beautifully on desktop and mobile

## 💰 Cost Breakdown

### Free Tier (MVP)
- **PDF Parsing**: pdf-parse library (free)
- **Job APIs**: Adzuna free tier (1,000 requests/month)
- **Email**: SendGrid free tier (100 emails/day)
- **Hosting**: Vercel/Netlify (free)

### Paid Enhancements (Optional)
- **Enhanced PDF Parsing**: OpenAI API ($0.002/1K tokens)
- **Premium Job APIs**: $10-50/month for higher limits
- **Advanced Email**: $15/month for 50K emails
- **Database**: MongoDB Atlas ($9/month)

## ⏱️ Timeline for development

- **Week 1**: Backend setup, resume parsing, basic job matching
- **Week 2**: Frontend development, user interface
- **Week 3**: Email notifications, testing, deployment

## 🛠️ Tech Stack

### Backend
- Node.js with Express
- PDF parsing with pdf-parse
- Multi-source job APIs (Adzuna, Reed, ZipRecruiter)
- Email notifications with Nodemailer
- MongoDB for data storage
- Automated job scheduling with cron

### Frontend
- React with modern hooks
- Material-UI or Tailwind CSS
- File upload with drag & drop
- Responsive design

## 📦 Installation

1. Clone the repository
```bash
git clone <repository-url>
cd resume-job-matcher
```

2. Install dependencies
```bash
npm run install-all
```

3. Set up environment variables
```bash
cp .env.example .env
# Fill in your API keys
```

4. Start development servers
```bash
npm run dev
```

## 🔧 Environment Variables

Create a `.env` file with:
```
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=your_mongodb_uri

# Authentication
JWT_SECRET=your_jwt_secret

# Job APIs
ADZUNA_APP_ID=your_adzuna_app_id
ADZUNA_API_KEY=your_adzuna_api_key
REED_API_KEY=your_reed_api_key
ZIPRECRUITER_API_KEY=your_ziprecruiter_api_key

# Email Configuration
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
FRONTEND_URL=http://localhost:3000
```

## 📁 Project Structure

```
resume-job-matcher/
├── server/           # Backend API
│   ├── models/       # Database models
│   ├── routes/       # API routes
│   ├── services/     # Business logic
│   └── config/       # Configuration
├── client/           # React frontend
├── uploads/          # Resume uploads
├── docs/            # Documentation
└── README.md
```

## 🗄️ Database Collections

Your MongoDB will contain these collections:
- **users**: User accounts and preferences
- **resumes**: Uploaded resumes with extracted data
- **jobs**: Job listings from multiple sources
- **savedjobs**: User's saved job listings
- **applications**: Job application tracking
- **notifications**: Email subscription preferences

## 🔍 Job Sources

### Available APIs:
1. **Adzuna** (Free tier available)
   - UK job market
   - 1,000 requests/month free
   - Sources: Indeed, Reed, TotalJobs

2. **Reed.co.uk** (API key required)
   - UK job listings
   - Paid service
   - Direct access to Reed jobs

3. **ZipRecruiter** (API key required)
   - US job market
   - Paid service
   - Wide range of US jobs


## 🚀 Deployment

1. **Frontend**: Deploy to Vercel/Netlify
2. **Backend**: Deploy to Heroku/Railway
3. **Database**: MongoDB Atlas
4. **File Storage**: AWS S3 (optional)

## 📈 Future Enhancements

- AI-powered resume optimization
- Interview preparation tools
- Salary insights
- Company reviews integration
- Mobile app development
- Advanced job filtering
- Application analytics

## 🔄 Job Scheduler

The platform automatically:
- Fetches new jobs every 6 hours
- Cleans up old jobs (30+ days)
- Updates job database in real-time
- Provides manual fetch capabilities

## 📊 API Endpoints

### Job Management
- `GET /api/jobs/search` - Search jobs
- `POST /api/jobs/match` - Match jobs with resume
- `GET /api/jobs/sources/list` - List available job sources
- `GET /api/jobs/scheduler/status` - Check scheduler status

### Resume Management
- `POST /api/resume/upload` - Upload and parse resume
- `GET /api/resume/user/:userId` - Get user's resumes

### Applications
- `GET /api/applications/user/:userId` - Get user's applications
- `POST /api/applications/:id/apply` - Apply to job
- `GET /api/applications/stats/:userId` - Application statistics

### Notifications
- `POST /api/notifications/subscribe` - Subscribe to job alerts
- `GET /api/notifications/user/:userId` - Get user's subscriptions 
