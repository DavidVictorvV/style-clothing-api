// Optional: Server-side profile storage
// For MVP, profiles are stored locally on device using AsyncStorage
// This function can be used if you want to sync profiles to the cloud

// You would need to add a database like:
// - Netlify's Fauna DB
// - Supabase
// - MongoDB Atlas
// - PostgreSQL

const { handleOptions, withCors } = require('./utils/cors');

exports.handler = async function (event, context) {
  const method = event.httpMethod;

  // Handle OPTIONS preflight request
  if (method === 'OPTIONS') {
    return handleOptions();
  }

  try {
    switch (method) {
      case 'GET':
        // List all profiles for a user
        return withCors({
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify([]),
        });

      case 'POST':
        // Create or update a profile
        const body = JSON.parse(event.body);
        return withCors({
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

      case 'DELETE':
        // Delete a profile
        return withCors({
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ success: true }),
        });

      default:
        return withCors({
          statusCode: 405,
          body: JSON.stringify({ error: 'Method not allowed' }),
        });
    }
  } catch (err) {
    console.error('Error in profiles function:', err);
    return withCors({
      statusCode: 500,
      body: JSON.stringify({ error: String(err) }),
    });
  }
};
