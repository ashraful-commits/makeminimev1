// app/routes/api.upload.ts
import type { ActionFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { cloudinary } from '~/utils/cloudinary';
// app/routes/api.upload.ts
export const action: ActionFunction = async ({ request }) => {
    const { image,uuid } = await request.json();
  
    try {
      const result = await cloudinary.uploader.upload(image, {
        folder: `${uuid}`,
        format: 'png', 
        quality: 'auto:good', 
        transformation: [
          { fetch_format: 'png' }, 
          { flags: 'strip_profile' }
        ]
      });
  
      return json({ 
        result: result.secure_url,
        format: result.format
      });
    } catch (error) {
      console.error('Cloudinary error details:', error);
    
    }
  };