const fetch = require('node-fetch');
const { handleOptions, withCors } = require('./utils/cors');

exports.handler = async function (event, context) {
  // Handle OPTIONS preflight request
  if (event.httpMethod === 'OPTIONS') {
    return handleOptions();
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return withCors({
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    });
  }

  try {
    const body = JSON.parse(event.body);
    const { image_url, mask_url, prompt } = body;

    // Validate inputs
    if (!image_url || !prompt) {
      return withCors({
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields: image_url, prompt' }),
      });
    }

    // Check for API token
    if (!process.env.REPLICATE_API_TOKEN) {
      return withCors({
        statusCode: 500,
        body: JSON.stringify({ error: 'REPLICATE_API_TOKEN not configured' }),
      });
    }

    // Prepare payload for Replicate
    const payload = {
      version: 'prunaai/p-image:latest', // Update with exact version if needed
      input: {
        image: image_url,
        prompt: prompt,
      },
    };

    // Add mask if provided
    if (mask_url) {
      payload.input.mask = mask_url;
    }

    // Call Replicate API
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
        'Prefer': 'wait', // Wait for result synchronously
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Replicate API error:', errorData);
      return withCors({
        statusCode: response.status,
        body: JSON.stringify({ error: 'Replicate API error', details: errorData }),
      });
    }

    const data = await response.json();

    // Transform response to match our GenerationResult interface
    const result = {
      id: data.id || `gen_${Date.now()}`,
      original_url: image_url,
      generated_url: data.output?.[0] || data.output || '',
      prompt: prompt,
      timestamp: Date.now(),
      profile_id: body.profile?.id || '',
    };

    return withCors({
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result),
    });

  } catch (err) {
    console.error('Error in generate function:', err);
    return withCors({
      statusCode: 500,
      body: JSON.stringify({ error: String(err) }),
    });
  }
};
