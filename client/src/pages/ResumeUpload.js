import React, { useState, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  LinearProgress,
  Chip,
  Grid,
  Alert,
  Paper
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Description as DescriptionIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const ResumeUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadedResume, setUploadedResume] = useState(null);
  const [extractedData, setExtractedData] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast.error('Please upload a PDF file');
      return;
    }

    setUploading(true);
    setUploadedResume(null);
    setExtractedData(null);

    try {
      const formData = new FormData();
      formData.append('resume', file);

      const response = await axios.post('/api/resume/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadedResume(response.data.data);
      setExtractedData(response.data.data);
      toast.success('Resume uploaded and parsed successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error.response?.data?.error || 'Error uploading resume');
    } finally {
      setUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: false
  });

  const handleFindJobs = () => {
    if (extractedData?.keywords) {
      // Navigate to job matches with extracted keywords
      // You can implement this navigation logic
      toast.success('Redirecting to job matches...');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 700, textAlign: 'center' }}>
          Upload Your Resume
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 6, textAlign: 'center' }}>
          Upload your PDF resume and let our AI extract your skills and experience
        </Typography>
      </motion.div>

      <Grid container spacing={4}>
        {/* Upload Section */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Box
                  {...getRootProps()}
                  sx={{
                    border: '2px dashed',
                    borderColor: isDragActive ? 'primary.main' : 'grey.300',
                    borderRadius: 2,
                    p: 4,
                    textAlign: 'center',
                    cursor: 'pointer',
                    bgcolor: isDragActive ? 'primary.50' : 'grey.50',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'primary.main',
                      bgcolor: 'primary.50'
                    }
                  }}
                >
                  <input {...getInputProps()} />
                  <CloudUploadIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    {isDragActive ? 'Drop your resume here' : 'Drag & drop your resume'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    or click to browse files
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Only PDF files are supported (max 5MB)
                  </Typography>
                </Box>

                {uploading && (
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Processing your resume...
                    </Typography>
                    <LinearProgress />
                  </Box>
                )}

                {uploadedResume && (
                  <Alert
                    icon={<CheckCircleIcon />}
                    severity="success"
                    sx={{ mt: 3 }}
                  >
                    Resume uploaded successfully!
                  </Alert>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Results Section */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Extracted Information
                </Typography>

                {extractedData ? (
                  <Box>
                    {/* File Info */}
                    <Paper sx={{ p: 2, mb: 3, bgcolor: 'grey.50' }}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        File Information
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Name: {extractedData.originalName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Size: {(extractedData.fileSize / 1024 / 1024).toFixed(2)} MB
                      </Typography>
                    </Paper>

                    {/* Skills */}
                    {extractedData.keywords && extractedData.keywords.length > 0 && (
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" sx={{ mb: 2 }}>
                          Detected Skills
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {extractedData.keywords.map((skill, index) => (
                            <Chip
                              key={index}
                              label={skill}
                              color="primary"
                              variant="outlined"
                              size="small"
                            />
                          ))}
                        </Box>
                      </Box>
                    )}

                    {/* Experience Level */}
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        Experience Level
                      </Typography>
                      <Chip
                        label={extractedData.experienceLevel}
                        color="secondary"
                        variant="filled"
                      />
                    </Box>

                    {/* Education */}
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        Education
                      </Typography>
                      <Chip
                        label={extractedData.education ? 'Education Found' : 'No Education Detected'}
                        color={extractedData.education ? 'success' : 'default'}
                        variant="outlined"
                      />
                    </Box>

                    {/* Action Button */}
                    <Button
                      variant="contained"
                      fullWidth
                      size="large"
                      onClick={handleFindJobs}
                      disabled={!extractedData.keywords || extractedData.keywords.length === 0}
                      sx={{ mt: 2 }}
                    >
                      Find Matching Jobs
                    </Button>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      textAlign: 'center',
                      py: 4,
                      color: 'text.secondary'
                    }}
                  >
                    <DescriptionIcon sx={{ fontSize: 60, mb: 2, opacity: 0.5 }} />
                    <Typography variant="body1">
                      Upload a resume to see extracted information
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Tips Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Tips for Better Results
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" color="text.secondary">
                  • Use a clear, well-formatted PDF
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" color="text.secondary">
                  • Include specific skills and technologies
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" color="text.secondary">
                  • List your work experience clearly
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" color="text.secondary">
                  • Include education and certifications
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
};

export default ResumeUpload; 