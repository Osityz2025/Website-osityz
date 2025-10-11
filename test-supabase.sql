-- Test your Supabase connection and tables
-- Run this in your Supabase SQL Editor to verify everything is set up correctly

-- 1. Check if tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('contact_submissions', 'newsletter_subscriptions');

-- 2. Check table structures
\d contact_submissions;
\d newsletter_subscriptions;

-- 3. Test inserting sample data (optional)
-- INSERT INTO newsletter_subscriptions (email) VALUES ('test@example.com');
-- INSERT INTO contact_submissions (first_name, last_name, email, message) 
-- VALUES ('Test', 'User', 'test@example.com', 'Test message');

-- 4. Check if data was inserted
SELECT COUNT(*) as newsletter_count FROM newsletter_subscriptions;
SELECT COUNT(*) as contact_count FROM contact_submissions;

-- 5. View recent entries (if any)
SELECT * FROM newsletter_subscriptions ORDER BY subscribed_at DESC LIMIT 3;
SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT 3;