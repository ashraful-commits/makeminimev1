import axios from "axios";

const fetchNonce = async () => {
  try {
    const response = await axios.get(
      `https://${process.env.SITE_URL}/wp-json/wc/v3/get-nonce`
    );
    return response.data.nonce; // Return the nonce
  } catch (error) {
    console.error("Error fetching nonce:", error);
    throw error;
  }
};

export const handleAddToCart = async (productId: string, imageData: string) => {
  const basicAuth = Buffer.from(
    `${process.env.CONSUMER_KEY}:${process.env.CONSUMER_SECRET}`
  ).toString("base64");
  try {
    const nonce = await fetchNonce(); // Fetch the nonce

    const response = await axios.post(
      `https://${process.env.SITE_URL}/wp-json/wc/v3/cart/add-item`,
      {
        id: productId, // Product ID
        quantity: 1, // Quantity
        custom_image: imageData, // Customized image data
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${basicAuth}`,
          "X-WC-Store-API-Nonce": nonce, // Include the nonce in the headers
        },
      }
    );

    if (response.data.success) {
      window.location.href = `https://${process.env.SITE_URL}/cart`; // Redirect to cart page
    } else {
      alert("Failed to add product to cart.");
    }
  } catch (error) {
    console.error("Error adding item to cart:", error);
    alert("An error occurred while adding the product to the cart.");
  }
};
