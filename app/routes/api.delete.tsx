import type { ActionFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { cloudinary } from '~/utils/cloudinary';

export const action: ActionFunction = async ({ request }) => {
  try {
    const { public_id } = await request.json();

    if (!public_id) {
      return json({ error: 'Missing public_id' }, { status: 400 });
    }

    const result = await cloudinary.uploader.destroy(public_id);

    if (result.result === 'ok') {
      return json({ success: true, result });
    } else {
      return json({ success: false, result }, { status: 500 });
    }
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    return json({ error: 'Delete failed' }, { status: 500 });
  }
};
