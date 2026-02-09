// CORS headers configuration from environment variables
function getCorsHeaders() {
  return {
    'Access-Control-Allow-Origin': process.env.CORS_ALLOWED_ORIGINS || '*',
    'Access-Control-Allow-Headers': process.env.CORS_ALLOWED_HEADERS || 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': process.env.CORS_ALLOWED_METHODS || 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Max-Age': '86400', // 24 hours
  };
}

// Handle OPTIONS preflight request
function handleOptions() {
  return {
    statusCode: 200,
    headers: getCorsHeaders(),
    body: '',
  };
}

// Add CORS headers to response
function withCors(response) {
  return {
    ...response,
    headers: {
      ...getCorsHeaders(),
      ...(response.headers || {}),
    },
  };
}

module.exports = {
  getCorsHeaders,
  handleOptions,
  withCors,
};
