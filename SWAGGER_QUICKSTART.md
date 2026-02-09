# Swagger UI Quick Start

Get started testing your API endpoints in 3 easy steps!

## 🚀 Step 1: Start the Server

```bash
cd backend
netlify dev
```

## 📖 Step 2: Open Swagger UI

Visit: http://localhost:8888/

You'll see the interactive API documentation with all your endpoints.

## 🧪 Step 3: Test an Endpoint

### Example: Testing the Generate Endpoint

1. **Expand** the `POST /generate` endpoint (click on it)

2. **Click** "Try it out" button (top right of the section)

3. **Paste** this example request in the body:

```json
{
  "image_url": "https://replicate.delivery/pbxt/example-image.jpg",
  "prompt": "Apply a realistic bob haircut to the person in the input photo. Keep hair texture natural and realistic hairline. Preserve the person's face, face structure, skin tone, body proportions, clothing, and background.",
  "profile": {
    "id": "test_123",
    "name": "Test Profile",
    "gender": "female",
    "age": 30
  },
  "mode": "hair",
  "options": {
    "preserve_face": true,
    "preserve_body": true,
    "allow_face_changes": false,
    "color": "ash blonde",
    "color_mode": "tips",
    "style_tag": "bob"
  }
}
```

4. **Click** "Execute" button

5. **View** the response below:
   - Response code (200 = success!)
   - Response body with the generated image URL
   - Response headers

## 📋 What You'll See

### Request Section
- **Request URL**: The full endpoint URL
- **Request Body**: Your JSON payload (editable)
- **Request Headers**: Automatically added headers

### Response Section
- **Code**: HTTP status code (200, 400, 500, etc.)
- **Details**: Full response body (JSON)
- **Headers**: Response headers
- **Duration**: How long the request took

## 🎯 Available Endpoints to Test

### 1. POST /generate
**What it does**: Generates AI-edited images

**Quick test**:
- Use the example above
- Change `style_tag` to different hairstyles: `"pixie"`, `"long-layered"`, `"fade"`
- Change `color` to: `"platinum blonde"`, `"dark brown"`, `"red"`

### 2. POST /upload
**What it does**: Uploads images

**Quick test**:
```json
{
  "imageData": "base64_image_data_here",
  "filename": "test.jpg"
}
```

### 3. POST /segmentation
**What it does**: Generates masks (placeholder)

**Quick test**:
```json
{
  "image_url": "https://example.com/photo.jpg",
  "region": "hair"
}
```

### 4. GET /profiles
**What it does**: Lists profiles (placeholder)

**Quick test**: Just click "Execute" (no body needed)

## 💡 Pro Tips

1. **Save Requests**: Use the "Download" button to save requests
2. **Server Dropdown**: Switch between local and production servers
3. **Expand All**: Click "Expand Operations" to see all endpoints at once
4. **Copy as cURL**: Copy any request as a curl command
5. **Response Examples**: Check the "Example Value" to see expected format

## 🐛 Troubleshooting

### "Failed to fetch"
- ✅ Make sure `netlify dev` is running
- ✅ Check the URL is http://localhost:8888/
- ✅ Verify your .env file has REPLICATE_API_TOKEN

### "REPLICATE_API_TOKEN not configured"
- ✅ Copy `.env.example` to `.env`
- ✅ Add your Replicate API token
- ✅ Restart `netlify dev`

### "CORS error"
- ✅ Already configured! Should work out of the box
- ✅ If issues persist, check CORS environment variables

## 🎨 Customization

### Testing with Real Images

To test with a real image:

1. Upload an image to a temporary service like:
   - https://imgur.com/ (get direct link)
   - https://imgbb.com/ (get direct link)
   - Or use the `/upload` endpoint first

2. Copy the image URL

3. Use it in the `image_url` field

### Testing Different Hairstyles

Available style tags:
- `bob`, `pixie`, `long-layered`
- `fade`, `undercut`, `buzz-cut`
- `curly-shoulder-length`, `beach-waves`
- `shag`, `crew-cut`, `pompadour`
- And more! (See hairstyles.ts in frontend)

### Testing Different Colors

Color modes:
- `full`: Entire hair
- `tips`: Just the ends
- `highlights`: Scattered highlights
- `roots`: Root area only

Colors:
- `ash blonde`, `platinum blonde`, `golden blonde`
- `dark brown`, `light brown`, `chestnut`
- `black`, `red`, `auburn`
- Or any color description!

## 📊 Understanding Responses

### 200 Success
```json
{
  "id": "gen_1234567890",
  "original_url": "https://...",
  "generated_url": "https://replicate.delivery/...",
  "prompt": "Apply a realistic bob haircut...",
  "timestamp": 1234567890,
  "profile_id": "test_123"
}
```

### 400 Bad Request
```json
{
  "error": "Missing required fields: image_url, prompt"
}
```

### 500 Server Error
```json
{
  "error": "REPLICATE_API_TOKEN not configured"
}
```

## 🚀 Next Steps

1. **Test All Endpoints**: Try each one with different payloads
2. **Check Responses**: Verify the structure matches your frontend expectations
3. **Save Examples**: Download working requests for documentation
4. **Deploy**: When ready, deploy to Netlify and access at your production URL

## 🔗 Resources

- Full Documentation: [SWAGGER.md](SWAGGER.md)
- OpenAPI Spec: `/openapi.json`
- Backend README: [README.md](README.md)
- CORS Config: [CORS_CONFIG.md](CORS_CONFIG.md)

---

**Happy Testing! 🎉**

Need help? Check the full [SWAGGER.md](SWAGGER.md) documentation.
