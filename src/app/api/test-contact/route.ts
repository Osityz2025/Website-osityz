import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

export async function POST(request: NextRequest) {
  try {
    console.log('API Route: Testing Supabase connection...');
    
    // Check if environment variables are available
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json({ 
        success: false, 
        error: 'Supabase environment variables not configured' 
      }, { status: 500 });
    }
    
    // Test basic connection
    const { data: testData, error: testError } = await supabase
      .from('contact_submissions')
      .select('count(*)', { count: 'exact', head: true });
      
    if (testError) {
      console.error('Connection test failed:', testError);
      return NextResponse.json({ 
        success: false, 
        error: 'Connection failed',
        details: testError 
      }, { status: 500 });
    }

    console.log('Connection successful, trying insert...');
    
    // Get the request body
    const body = await request.json();
    
    // Prepare data for insertion
    const submissionData = {
      first_name: body.firstName || 'Test',
      last_name: body.lastName || 'User',
      company_name: body.companyName || 'Test Company',
      phone: body.phone || '123-456-7890',
      email: body.email || 'test@example.com',
      location: body.location || 'Test Location',
      message: body.message || 'Test message'
    };

    console.log('Inserting data:', submissionData);

    // Insert the data
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([submissionData])
      .select();

    if (error) {
      console.error('Insert failed:', error);
      return NextResponse.json({ 
        success: false, 
        error: 'Insert failed',
        details: error 
      }, { status: 500 });
    }

    console.log('Insert successful:', data);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Contact submission successful',
      data: data 
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}