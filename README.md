# Hair & Outfit AI - Backend

Netlify Functions backend for the Hair & Outfit AI mobile app.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy `.env.example` to `.env` and add your credentials:
```bash
cp .env.example .env
```

3. Add your Replicate API token to `.env`:
```
REPLICATE_API_TOKEN=your_token_here
```

Get your Replicate API token from: https://replicate.com/account/api-tokens

## Local Development

Install Netlify CLI globally:
```bash
npm install -g netlify-cli
```

Run the development server:
```bash
netlify dev
```

The functions will be available at `http://localhost:8888/.netlify/functions/`

## CORS Configuration

All API endpoints include comprehensive CORS support:

- **Access-Control-Allow-Origin**: `*` (allows requests from any origin)
- **Access-Control-Allow-Headers**: `Content-Type, Authorization`
- **Access-Control-Allow-Methods**: `GET, POST, PUT, DELETE, OPTIONS`
- **Access-Control-Max-Age**: `86400` (24 hours)

All functions handle OPTIONS preflight requests automatically using the shared CORS utility in `netlify/functions/utils/cors.js`.

## API Endpoints

### POST /api/generate
Generate hairstyle or clothing edits using Replicate's prunaai/p-image model.

**Request body:**
```json
{
  "profile": { ... },
  "image_url": "https://...",
  "mask_url": "https://...",  // optional
  "prompt": "Apply a realistic bob haircut...",
  "mode": "hair",
  "options": { ... }
}
```

**Response:**
```json
{
  "id": "gen_123",
  "original_url": "https://...",
  "generated_url": "https://...",
  "prompt": "...",
  "timestamp": 1234567890,
  "profile_id": "profile_123"
}
```

### POST /api/upload
Upload an image and get a URL.

**Note:** Currently returns data URI for development. In production, implement proper file upload to S3, Cloudinary, or similar.

### POST /api/segmentation
Generate automatic masks for hair/clothing regions.

**Note:** Not yet implemented. Requires integration with MediaPipe, BodyPix, or similar segmentation model.

### GET/POST/DELETE /api/profiles
Optional cloud profile storage. Currently returns mock data.

**Note:** Implement with Fauna DB, Supabase, or your preferred database.

## Deployment

### Deploy to Netlify

1. Push your code to GitHub

2. Connect your repository to Netlify:
   - Go to https://app.netlify.com/
   - Click "Add new site" → "Import an existing project"
   - Select your repository
   - Configure build settings (auto-detected from netlify.toml)

3. Add environment variables in Netlify:
   - Go to Site settings → Environment variables
   - Add `REPLICATE_API_TOKEN` with your token

4. Deploy!

## Environment Variables

Required:
- `REPLICATE_API_TOKEN` - Your Replicate API token

Optional (for future features):
- `AWS_ACCESS_KEY_ID` - For S3 image uploads
- `AWS_SECRET_ACCESS_KEY` - For S3 image uploads
- `AWS_REGION` - For S3 image uploads
- `AWS_S3_BUCKET` - For S3 image uploads
- `DATABASE_URL` - For cloud profile storage

## Tech Stack

- **Netlify Functions** - Serverless functions
- **Replicate API** - AI image generation (prunaai/p-image model)
- **Node.js** - Runtime environment

## Future Enhancements

1. **Image Upload**: Implement proper file upload to cloud storage (S3, Cloudinary)
2. **Segmentation**: Add automatic mask generation using MediaPipe or BodyPix
3. **Profile Sync**: Implement cloud profile storage with Fauna DB or Supabase
4. **Webhooks**: Use Replicate webhooks for async processing
5. **Caching**: Add caching layer for repeated generations
6. **Rate Limiting**: Implement rate limiting to prevent abuse
7. **Authentication**: Add user authentication with JWT

## License

MIT
