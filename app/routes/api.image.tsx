import { json } from "@remix-run/node";

export async function action({ request }) {
  const formData = await request.formData();
  const file = formData.get("image");

  if (!file || typeof file === "string") {
    return json({ error: "Invalid file" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const removeBgFormData = new FormData();
  removeBgFormData.append("size", "auto");
  removeBgFormData.append("image_file", new Blob([buffer], { type: file.type }));

  const response = await fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: { "X-Api-Key": process.env.BG_REMOVER_API_KEY },
    body: removeBgFormData,
  });

  if (!response.ok) {
    return json({ error: `API Error: ${response.statusText}` }, { status: response.status });
  }

  const removedBgBuffer = Buffer.from(await response.arrayBuffer());

  return new Response(removedBgBuffer, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Content-Length": removedBgBuffer.length.toString(),
      "Cache-Control": "no-cache",
    },
  });
}
