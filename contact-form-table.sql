-- Contact Form Table Setup
-- Run this SQL in your Supabase SQL Editor

-- Create contact_submissions table for contact form data
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  company_name VARCHAR(200),
  phone VARCHAR(50),
  email VARCHAR(255) NOT NULL,
  location VARCHAR(200),
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security for contact_submissions
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts for contact form
CREATE POLICY "Allow public contact submissions" ON contact_submissions
  FOR INSERT WITH CHECK (true);

-- Create index for better performance when viewing submissions
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);

-- Optional: Create a policy to view your own submissions (for admin dashboard)
-- CREATE POLICY "Allow admin to view contact submissions" ON contact_submissions
--   FOR SELECT USING (auth.role() = 'authenticated');