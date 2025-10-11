import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    console.log('=== Supabase Connection Diagnostic ===');
    
    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    console.log('Environment variables:');
    console.log('- URL exists:', !!supabaseUrl);
    console.log('- Key exists:', !!supabaseKey);
    console.log('- URL value:', supabaseUrl?.substring(0, 30) + '...');
    console.log('- Key length:', supabaseKey?.length);
    
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing environment variables',
        details: {
          hasUrl: !!supabaseUrl,
          hasKey: !!supabaseKey
        }
      });
    }

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);
    console.log('Supabase client created successfully');

    // Test 1: Basic connection test
    console.log('Testing basic connection...');
    
    // First try to check auth status
    console.log('Checking auth status...');
    const { data: authData, error: authError } = await supabase.auth.getUser();
    console.log('Auth check result:', { authData: !!authData, authError: !!authError });
    
    // Then try basic query
    console.log('Attempting table query...');
    const { data: connectionTest, error: connectionError } = await supabase
      .from('contact_submissions')
      .select('id')
      .limit(1);
    
    if (connectionError) {
      console.error('Connection test failed:', connectionError);
      console.error('Full error object:', JSON.stringify(connectionError, null, 2));
      return NextResponse.json({ 
        success: false, 
        error: 'Connection test failed',
        details: {
          message: connectionError.message || 'No message',
          details: connectionError.details || 'No details',
          hint: connectionError.hint || 'No hint',
          code: connectionError.code || 'No code',
          fullError: connectionError
        }
      });
    }
    
    console.log('Connection test successful');

    // Test 2: Check if table exists
    console.log('Checking if table exists...');
    const { data: tableCheck, error: tableError } = await supabase
      .rpc('check_table_exists', { table_name: 'contact_submissions' })
      .single();
    
    // If RPC doesn't exist, try a simple select
    if (tableError && tableError.code === '42883') {
      console.log('RPC function not available, trying simple select...');
      const { data: simpleTest, error: simpleError } = await supabase
        .from('contact_submissions')
        .select('id')
        .limit(1);
      
      if (simpleError) {
        console.error('Table access failed:', simpleError);
        return NextResponse.json({ 
          success: false, 
          error: 'Table access failed',
          details: {
            message: simpleError.message,
            details: simpleError.details,
            hint: simpleError.hint,
            code: simpleError.code
          }
        });
      }
    }

    // Test 3: Try inserting test data
    console.log('Testing insert capability...');
    const testData = {
      first_name: 'Test',
      last_name: 'Diagnostic',
      email: 'test@diagnostic.com',
      company_name: 'Test Company',
      phone: '123-456-7890',
      location: 'Test Location',
      message: 'Diagnostic test message'
    };

    const { data: insertResult, error: insertError } = await supabase
      .from('contact_submissions')
      .insert([testData])
      .select();

    if (insertError) {
      console.error('Insert test failed:', insertError);
      return NextResponse.json({ 
        success: false, 
        error: 'Insert test failed',
        details: {
          message: insertError.message,
          details: insertError.details,
          hint: insertError.hint,
          code: insertError.code
        }
      });
    }

    console.log('Insert test successful:', insertResult);

    return NextResponse.json({ 
      success: true, 
      message: 'All tests passed!',
      results: {
        connection: 'OK',
        table_access: 'OK',
        insert: 'OK',
        inserted_data: insertResult
      }
    });

  } catch (error) {
    console.error('Diagnostic error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Diagnostic failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}