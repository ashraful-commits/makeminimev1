// /pages/api/image-proxy.ts
export default async function handler(req, res) {
    const { url } = req.query;
    if (!url) return res.status(400).send("Image URL missing");
  
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
  
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", response.headers.get("content-type"));
    res.send(Buffer.from(buffer));
  }