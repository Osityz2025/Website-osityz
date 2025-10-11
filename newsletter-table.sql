-- Newsletter Subscription Table Setup  
-- Run this SQL in your Supabase SQL Editor

-- Create newsletter_subscriptions table for email subscriptions
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  unsubscribed_at TIMESTAMP WITH TIME ZONE NULL
);

-- Enable Row Level Security for newsletter_subscriptions
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts for newsletter signup
CREATE POLICY "Allow public newsletter subscriptions" ON newsletter_subscriptions
  FOR INSERT WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_newsletter_subscriptions_email ON newsletter_subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscriptions_created_at ON newsletter_subscriptions(subscribed_at DESC);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscriptions_active ON newsletter_subscriptions(is_active);

-- Optional: Create a policy to view subscriptions (for admin dashboard)
-- CREATE POLICY "Allow admin to view newsletter subscriptions" ON newsletter_subscriptions
--   FOR SELECT USING (auth.role() = 'authenticated');

-- Optional: Function to handle unsubscribes
-- CREATE OR REPLACE FUNCTION unsubscribe_email(email_address TEXT)
-- RETURNS VOID AS $$
-- BEGIN
--   UPDATE newsletter_subscriptions 
--   SET is_active = false, unsubscribed_at = NOW()
--   WHERE email = email_address AND is_active = true;
-- END;
-- $$ LANGUAGE plpgsql;