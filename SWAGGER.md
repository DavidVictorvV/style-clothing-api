# Swagger API Documentation

The Hair & Outfit AI API includes interactive Swagger/OpenAPI documentation for testing endpoints directly from your browser.

## 🌐 Accessing the Documentation

### Local Development
When running locally with `netlify dev`:
```
http://localhost:8888/
```
or
```
http://localhost:8888/docs
```

### Production (Netlify)
After deploying to Netlify, visit:
```
https://your-app-name.netlify.app/
```
or
```
https://your-app-name.netlify.app/docs
```

## 📖 What's Included

The Swagger UI provides:

1. **Interactive API Documentation**
   - All endpoints documented with request/response schemas
   - Example payloads for each endpoint
   - Data type definitions

2. **Try It Out**
   - Test endpoints directly from the browser
   - No need for Postman or curl
   - See real-time responses

3. **OpenAPI Specification**
   - Available at `/openapi.json`
   - Can be imported into other tools (Postman, Insomnia, etc.)

## 🔧 Available Endpoints

### 1. POST /api/generate
Generate AI-edited images with hairstyle or clothing changes.

**Example Request**:
```json
{
  "profile": {
    "id": "profile_123",
    "name": "Test Profile",
    "gender": "female"
  },
  "image_url": "https://example.com/photo.jpg",
  "prompt": "Apply a realistic bob haircut...",
  "mode": "hair",
  "options": {
    "preserve_face": true,
    "preserve_body": true,
    "color": "ash blonde",
    "style_tag": "bob"
  }
}
```

### 2. POST /api/upload
Upload images and get URLs.

**Example Request**:
```json
{
  "imageData": "base64_encoded_image_data",
  "filename": "photo.jpg"
}
```

### 3. POST /api/segmentation
Generate segmentation masks (placeholder).

**Example Request**:
```json
{
  "image_url": "https://example.com/photo.jpg",
  "region": "hair"
}
```

### 4. GET/POST/DELETE /api/profiles
Manage profiles (placeholder - returns mock data).

## 🧪 Testing with Swagger UI

### Step 1: Open Swagger UI
Navigate to `http://localhost:8888/` or your deployed URL.

### Step 2: Expand an Endpoint
Click on any endpoint (e.g., POST /api/generate) to expand it.

### Step 3: Try It Out
1. Click the "Try it out" button
2. Modify the request body as needed
3. Click "Execute"
4. View the response below

### Step 4: View Response
The UI will show:
- Response code (200, 400, 500, etc.)
- Response headers
- Response body (JSON)

## 📝 Example: Testing Generate Endpoint

1. Open Swagger UI
2. Expand **POST /generate**
3. Click **Try it out**
4. Use this example payload:
```json
{
  "image_url": "https://replicate.delivery/pbxt/example.jpg",
  "prompt": "Apply a realistic bob haircut to the person. Preserve face and body proportions.",
  "profile": {
    "id": "test_123",
    "name": "Test Profile"
  },
  "mode": "hair",
  "options": {
    "preserve_face": true,
    "preserve_body": true,
    "allow_face_changes": false,
    "style_tag": "bob"
  }
}
```
5. Click **Execute**
6. View the generated result!

## 🔐 Authentication

Currently, the API doesn't require authentication. All endpoints are public.

For production, consider adding:
- API key authentication
- JWT tokens
- Rate limiting

## 📥 Importing to Other Tools

### Postman
1. Open Postman
2. Go to Import → Link
3. Enter: `https://your-app.netlify.app/openapi.json`
4. Click Import

### Insomnia
1. Open Insomnia
2. Create → Import From → URL
3. Enter: `https://your-app.netlify.app/openapi.json`
4. Click Fetch and Import

### VS Code (REST Client)
Download the OpenAPI spec and use it with REST Client extension.

## 🎨 Customization

### Modifying the OpenAPI Spec
Edit `public/openapi.json` to:
- Add new endpoints
- Update request/response schemas
- Add authentication
- Update descriptions

### Styling Swagger UI
Edit `public/index.html` to:
- Change colors
- Add custom CSS
- Modify layout
- Add branding

## 🚀 Deployment

The Swagger UI is automatically deployed with your Netlify functions:

1. Push to GitHub (develop branch)
2. Netlify auto-deploys
3. Swagger UI available at root URL

## 📊 Schema Definitions

All schemas are defined in the OpenAPI spec:

- **Profile**: User profile with physical attributes
- **GenerationRequest**: Request for image generation
- **GenerationResult**: Generated image response
- **GenerationOptions**: Options for generation (colors, modes, etc.)
- **UploadRequest**: Image upload request
- **SegmentationRequest**: Mask generation request
- **Error**: Error response format

## 🔍 Validation

The OpenAPI spec includes:
- Required fields
- Data types (string, integer, boolean)
- Enums (allowed values)
- Format validation (URI, email, etc.)

## 🛠️ Development Workflow

1. **Update OpenAPI Spec**
   ```bash
   # Edit public/openapi.json
   nano public/openapi.json
   ```

2. **Test Locally**
   ```bash
   netlify dev
   # Visit http://localhost:8888/
   ```

3. **Deploy**
   ```bash
   git add .
   git commit -m "Update API docs"
   git push origin develop
   ```

## 📚 Resources

- [OpenAPI Specification](https://swagger.io/specification/)
- [Swagger UI Documentation](https://swagger.io/tools/swagger-ui/)
- [Netlify Functions](https://docs.netlify.com/functions/overview/)

## 🐛 Troubleshooting

### Swagger UI Not Loading
- Check that `public/` folder exists
- Verify `netlify.toml` has `publish = "public"`
- Check browser console for errors

### OpenAPI Spec Not Found
- Ensure `public/openapi.json` exists
- Check file path in `index.html`
- Verify file is committed to git

### Endpoints Not Working
- Check CORS configuration
- Verify environment variables (REPLICATE_API_TOKEN)
- Check Netlify function logs

## 💡 Tips

1. **Use Examples**: The OpenAPI spec includes example payloads - use them!
2. **Test Incrementally**: Test one endpoint at a time
3. **Check Responses**: Always check the response code and body
4. **Save Requests**: Use Swagger's "Try it out" to prototype, then save to Postman
5. **Document Changes**: Update OpenAPI spec when adding new endpoints

## 🎉 Benefits

✅ **No Postman Needed**: Test directly in browser
✅ **Always Updated**: Docs live with the code
✅ **Interactive**: See request/response in real-time
✅ **Shareable**: Send URL to team members
✅ **Standards-Based**: OpenAPI 3.0 compatible

Enjoy testing your API with Swagger! 🚀
