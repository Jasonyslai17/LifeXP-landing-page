import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const { email, name } = await request.json();

    if (!email || !name) {
      return NextResponse.json({ error: 'Email and name are required' }, { status: 400 });
    }

    const API_KEY = process.env.MAILCHIMP_API_KEY;
    const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
    const DATACENTER = process.env.MAILCHIMP_SERVER_PREFIX;

    // Use the correct merge field tag here. Replace FNAME with the actual tag from your Mailchimp settings
    const data = {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: name  // or use NAME if that's the tag in your Mailchimp settings
      }
    };

    const response = await fetch(
      `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,
      {
        method: 'POST',
        headers: {
          Authorization: `apikey ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );

    const responseData = await response.json();

    if (response.ok) {
      return NextResponse.json({ message: 'Successfully subscribed' }, { status: 201 });
    } else {
      console.error('Mailchimp API error:', responseData);
      return NextResponse.json({ error: 'Error subscribing to the newsletter' }, { status: 500 });
    }
  } catch (error) {
    console.error('Detailed error:', error);
    return NextResponse.json({ error: 'Error subscribing to the newsletter' }, { status: 500 });
  }
}