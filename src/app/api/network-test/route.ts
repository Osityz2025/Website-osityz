import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('=== Basic Network Test ===');
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    console.log('Testing URL:', supabaseUrl);

    // Test 1: Basic fetch to Supabase REST API
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      headers: {
        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      }
    });

    console.log('Fetch response:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok
    });

    const responseText = await response.text();
    console.log('Response body:', responseText);

    // Test 2: Try accessing the specific table
    const tableResponse = await fetch(`${supabaseUrl}/rest/v1/contact_submissions?select=count()`, {
      headers: {
        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        'Prefer': 'count=exact'
      }
    });

    console.log('Table response:', {
      status: tableResponse.status,
      statusText: tableResponse.statusText,
      ok: tableResponse.ok
    });

    const tableResponseText = await tableResponse.text();
    console.log('Table response body:', tableResponseText);

    return NextResponse.json({
      success: true,
      results: {
        basicFetch: {
          status: response.status,
          ok: response.ok,
          body: responseText
        },
        tableFetch: {
          status: tableResponse.status,
          ok: tableResponse.ok,
          body: tableResponseText
        }
      }
    });

  } catch (error) {
    console.error('Network test error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}