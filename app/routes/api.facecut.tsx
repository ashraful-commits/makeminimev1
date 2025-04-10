// app/routes/api.facecut.tsx
import { json } from "@remix-run/node";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import axios from "axios";

// Handle GET requests (not allowed)
export const loader: LoaderFunction = async () => {
  return json({ error: "Method Not Allowed" }, { status: 405 });
};

// Handle POST requests
export const action: ActionFunction = async ({ request }) => {
  try {
    const { imageUrl } = await request.json();

    if (!imageUrl) {
      return json({ error: "Missing imageUrl" }, { status: 400 });
    }
    const response = await axios.post(
      "https://face-cut.p.rapidapi.com/webMatting/mattingByUrl2",
      new URLSearchParams(),
      {
        params: { url: imageUrl },
        headers: {
          "x-rapidapi-key": process.env.RAPIDAPI_KEY ,
          "x-rapidapi-host": "face-cut.p.rapidapi.com",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        timeout: 10000, // 10 seconds timeout
      }
    );
    return json({ imageUrl: response.data.data.bgRemoved });
  } catch (error: any) {
    return json({ error: "Failed to cut face" }, { status: 500 });
  }
};
