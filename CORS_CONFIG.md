# CORS Configuration

## Overview

All Netlify Functions in this backend have comprehensive CORS (Cross-Origin Resource Sharing) support to allow the React Native mobile app to communicate with the API from any origin.

## Environment Variables

CORS settings are configured via environment variables in `.env`:

```bash
# Allow all origins (development)
CORS_ALLOWED_ORIGINS=*

# Or restrict to specific origins (production)
CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://app.yourdomain.com

# Allowed headers
CORS_ALLOWED_HEADERS=Content-Type,Authorization

# Allowed methods
CORS_ALLOWED_METHODS=GET,POST,PUT,DELETE,OPTIONS
```

**Default values** (if not set):
- `CORS_ALLOWED_ORIGINS`: `*` (all origins)
- `CORS_ALLOWED_HEADERS`: `Content-Type, Authorization`
- `CORS_ALLOWED_METHODS`: `GET, POST, PUT, DELETE, OPTIONS`

## Implementation

### Shared CORS Utility

Location: `netlify/functions/utils/cors.js`

The utility reads CORS configuration from environment variables:

```javascript
function getCorsHeaders() {
  return {
    'Access-Control-Allow-Origin': process.env.CORS_ALLOWED_ORIGINS || '*',
    'Access-Control-Allow-Headers': process.env.CORS_ALLOWED_HEADERS || 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': process.env.CORS_ALLOWED_METHODS || 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Max-Age': '86400', // 24 hours
  };
}
```

### Key Functions

1. **getCorsHeaders()** - Returns CORS headers from environment variables
2. **handleOptions()** - Responds to OPTIONS preflight requests
3. **withCors(response)** - Wraps any response with CORS headers

## How It Works

### 1. Preflight Requests (OPTIONS)

When a browser or app makes a cross-origin request with custom headers, it first sends an OPTIONS request (preflight) to check if the actual request is allowed.

```javascript
if (event.httpMethod === 'OPTIONS') {
  return handleOptions(); // Returns 200 with CORS headers
}
```

### 2. Regular Requests

All responses are wrapped with CORS headers:

```javascript
return withCors({
  statusCode: 200,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
});
```

## Endpoints with CORS

All endpoints support CORS:

- ✅ POST /api/generate
- ✅ POST /api/upload
- ✅ POST /api/segmentation
- ✅ GET/POST/DELETE /api/profiles

## Configuration Details

### Access-Control-Allow-Origin: *

Allows requests from **any origin**. This is suitable for:
- Mobile apps (React Native)
- Development environments
- Public APIs

**For production**, consider restricting to specific origins:
```javascript
'Access-Control-Allow-Origin': 'https://yourdomain.com'
```

### Access-Control-Allow-Headers

Specifies which headers are allowed in requests:
- `Content-Type` - For JSON payloads
- `Authorization` - For future authentication

### Access-Control-Allow-Methods

Specifies which HTTP methods are allowed:
- `GET` - Retrieve data
- `POST` - Create/send data
- `PUT` - Update data
- `DELETE` - Remove data
- `OPTIONS` - Preflight checks

### Access-Control-Max-Age: 86400

Browser caches the preflight response for 24 hours, reducing unnecessary OPTIONS requests.

## Testing CORS

### Test with curl

```bash
# Test OPTIONS preflight
curl -X OPTIONS http://localhost:8888/.netlify/functions/generate \
  -H "Origin: http://localhost:8081" \
  -H "Access-Control-Request-Method: POST" \
  -v

# Test actual POST request
curl -X POST http://localhost:8888/.netlify/functions/generate \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:8081" \
  -d '{"image_url":"test","prompt":"test"}' \
  -v
```

### Expected Response Headers

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Max-Age: 86400
```

## Common CORS Issues

### 1. Missing CORS Headers

**Symptom**: Browser shows "No 'Access-Control-Allow-Origin' header"

**Solution**: Ensure all responses use `withCors()` wrapper

### 2. OPTIONS Not Handled

**Symptom**: Preflight request fails with 405 Method Not Allowed

**Solution**: Add OPTIONS check at the beginning of each function:
```javascript
if (event.httpMethod === 'OPTIONS') {
  return handleOptions();
}
```

### 3. Wrong Status Code for OPTIONS

**Symptom**: Preflight fails even though OPTIONS is handled

**Solution**: OPTIONS must return 200, not 204 or other codes

### 4. Headers Not Allowed

**Symptom**: "Request header field X is not allowed"

**Solution**: Add the header to `Access-Control-Allow-Headers`

## Mobile App Considerations

### React Native
React Native doesn't enforce CORS (it's a native app, not a browser), but you still need CORS headers for:

1. **Web version** (if using Expo web)
2. **Development** with Metro bundler
3. **Consistency** with web standards

### Expo Development

During development, the Expo app makes requests from:
- `http://localhost:19006` (web)
- `http://localhost:8081` (Metro bundler)

CORS headers ensure these work seamlessly.

## Security Notes

### Current Configuration (Development)

```javascript
'Access-Control-Allow-Origin': '*' // Allows ANY origin
```

This is **suitable for**:
- Development
- Testing
- Mobile apps
- Public APIs

### Production Recommendations

For production, consider:

1. **Restrict Origins**:
```javascript
const allowedOrigins = [
  'https://yourdomain.com',
  'https://app.yourdomain.com',
];

const origin = event.headers.origin;
if (allowedOrigins.includes(origin)) {
  headers['Access-Control-Allow-Origin'] = origin;
}
```

2. **Add Authentication**:
```javascript
if (!event.headers.authorization) {
  return withCors({
    statusCode: 401,
    body: JSON.stringify({ error: 'Unauthorized' }),
  });
}
```

3. **Rate Limiting**: Implement rate limiting to prevent abuse

4. **Credentials**: If using cookies/auth:
```javascript
'Access-Control-Allow-Credentials': 'true'
```

## Netlify Platform CORS

In addition to function-level CORS, `netlify.toml` includes:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    Access-Control-Allow-Origin = "*"
    Access-Control-Allow-Methods = "GET, POST, PUT, DELETE, OPTIONS"
    Access-Control-Allow-Headers = "Content-Type, Authorization"
```

This provides a **fallback** layer for all routes.

## Debugging

Enable verbose logging in functions:

```javascript
console.log('Request headers:', event.headers);
console.log('Request method:', event.httpMethod);
console.log('Origin:', event.headers.origin);
```

Check Netlify function logs:
```bash
netlify functions:log
```

Or in the Netlify dashboard: Site → Functions → View logs

## Resources

- [MDN CORS Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [Netlify Functions CORS](https://docs.netlify.com/functions/common-use-cases/#cors)
- [CORS in 100 Seconds](https://www.youtube.com/watch?v=4KHiSt0oLJ0)

## Summary

✅ All functions handle OPTIONS preflight
✅ All responses include CORS headers
✅ Shared utility for consistency
✅ Mobile app compatible
✅ Development-friendly (allows all origins)
✅ Production-ready (easy to restrict)
