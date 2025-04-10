import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new WooCommerceRestApi({
  url: process.env.SITE_URL || "",
  consumerKey: process.env.CONSUMER_KEY_TEST || "",
  consumerSecret: process.env.CONSUMER_SECRET_TEST || "",
  version: "wc/v3"
});

export async function addToCart(productId: string, quantity: number, imageData: string) {
    try {
      const response = await api.post("cart/add-item", {
        id: productId,
        quantity: quantity,
        custom_image: imageData,
      });
  
      return response.data;
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  }
