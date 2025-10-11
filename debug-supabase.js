// Debug script to test Supabase connection and contact form submission
import { supabase } from './lib/supabase.js';

async function testSupabaseConnection() {
  console.log('Testing Supabase connection...');
  
  // Test 1: Check if Supabase client is initialized
  try {
    console.log('Supabase client:', supabase);
    console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('Has anon key:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  } catch (error) {
    console.error('Error initializing Supabase client:', error);
    return;
  }

  // Test 2: Test basic connection
  try {
    const { data, error } = await supabase.from('contact_submissions').select('count(*)', { count: 'exact' });
    if (error) {
      console.error('Connection test failed:', error);
      return;
    }
    console.log('Connection successful! Current submissions count:', data);
  } catch (error) {
    console.error('Connection test error:', error);
    return;
  }

  // Test 3: Try inserting test data
  try {
    const testData = {
      first_name: 'Test',
      last_name: 'User', 
      company_name: 'Test Company',
      phone: '123-456-7890',
      email: 'test@example.com',
      location: 'Test City',
      message: 'This is a test message'
    };

    console.log('Attempting to insert test data:', testData);

    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([testData])
      .select();

    if (error) {
      console.error('Insert failed:', error);
      console.error('Error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
    } else {
      console.log('Insert successful:', data);
    }
  } catch (error) {
    console.error('Insert test error:', error);
  }
}

// Run the test
testSupabaseConnection();