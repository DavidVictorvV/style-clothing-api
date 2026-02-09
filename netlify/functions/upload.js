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
    // Parse the multipart form data
    // NOTE: For production, you'll need a proper multipart parser like 'busboy' or 'formidable'
    // Or use a service like Cloudinary, AWS S3, or Replicate's direct upload

    // For now, this is a placeholder that expects base64 image data
    const body = JSON.parse(event.body);
    const { imageData, filename } = body;

    if (!imageData) {
      return withCors({
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing image data' }),
      });
    }

    // Option 1: Upload to Cloudinary, S3, or similar service
    // Option 2: Use Replicate's file upload endpoint
    // Option 3: For development, use a data URI directly

    // For now, we'll return the data URI for development purposes
    // In production, you should upload to a proper storage service
    const dataUri = `data:image/jpeg;base64,${imageData}`;

    return withCors({
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: dataUri }),
    });

  } catch (err) {
    console.error('Error in upload function:', err);
    return withCors({
      statusCode: 500,
      body: JSON.stringify({ error: String(err) }),
    });
  }
};
