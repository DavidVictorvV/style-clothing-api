exports.handler = async function (event, context) {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const body = JSON.parse(event.body);
    const { image_url, region } = body;

    if (!image_url || !region) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields: image_url, region' }),
      };
    }

    // TODO: Implement automatic mask generation
    // Options:
    // 1. Use MediaPipe Segmentation
    // 2. Use BodyPix from TensorFlow.js
    // 3. Use a dedicated segmentation API
    // 4. Use Replicate's segmentation models

    // For now, return a placeholder response
    // In production, you would:
    // 1. Download the image from image_url
    // 2. Run segmentation model to identify the region (hair, top, bottom, full)
    // 3. Generate a mask image (white = edit region, black = preserve)
    // 4. Upload mask to storage
    // 5. Return mask URL

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        mask_url: null,
        message: 'Automatic mask generation not yet implemented. Use manual mask editor in the app.',
      }),
    };

  } catch (err) {
    console.error('Error in segmentation function:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: String(err) }),
    };
  }
};
