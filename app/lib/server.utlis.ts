// import fetch from 'node-fetch';// Make sure to install 'node-fetch' first
import fetch from 'node-fetch';
const apiUrl = "http://iampillowqueen.local/wp-json/wc/v3/products/123"; // Replace 123 with your product ID
const basicAuth = Buffer.from("ck_efe1e23111251881f4b0a5a7c92ed5a59c11809f:cs_d0417a8c2aaba2c04c461fa7ccdb4ac7ca3b3887").toString("base64");

fetch(apiUrl, {
    method: 'GET',
    headers: {
        Authorization: `Basic ${basicAuth}`,
    },
})
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
        console.log("Success:");
    })
    .catch(error => {
        console.error("Error during fetch:", error);
    });



// product meta image
// imageUtils.js


// export async function convertNumberToImageLink(
//     attachmentId: number,
//     siteUrl = 'https://makeminime.com',
//     size = 'full'
//   ) {
//     try {
//         // Construct the REST API endpoint for the media (attachment)
//         const apiUrl = `${siteUrl}/wp-json/wp/v2/media/${attachmentId}`;
  
//         // Fetch the media details from the WordPress REST API
//         const response = await fetch(apiUrl);
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
  
//         // Parse the JSON response
//         const mediaData = await response.json();
//         // Ensure mediaData is typed correctly
//         const mediaDetails = mediaData as { media_details?: { sizes?: Record<string, { source_url: string }> } };
        
//         // Extract the image URL for the specified size
//         if (mediaDetails.media_details && mediaDetails.media_details.sizes && mediaDetails.media_details.sizes[size]) {
//             return mediaDetails.media_details.sizes[size].source_url;
//         }
  
//         // Fallback to the full-size image URL if the specified size is not available
//         const fallbackUrl = mediaDetails.media_details?.sizes?.full?.source_url || (mediaData as { source_url?: string }).source_url ;
//         return fallbackUrl;
//     } catch (error) {
//         console.error('Error fetching image URL:', (error as Error).message);
//         return null;
//     }
//   }

export async function convertNumberToImageLink(
    attachmentId?: number,
    siteUrl = 'https://makeminime.com',
    size = 'full'
  ) {
    // If no attachmentId is provided, return the default image URL
    if (!attachmentId) {
        return "https://res.cloudinary.com/djwyhbnsk/image/upload/v1743092104/product-customizations/kdt80vnirnjf4bi61rxa.png";
    }

    try {
        // Construct the REST API endpoint for the media (attachment)
        const apiUrl = `${siteUrl}/wp-json/wp/v2/media/${attachmentId}`;
  
        // Fetch the media details from the WordPress REST API
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        // Parse the JSON response
        const mediaData = await response.json();
        // Ensure mediaData is typed correctly
        const mediaDetails = mediaData as { media_details?: { sizes?: Record<string, { source_url: string }> } };
        
        // Extract the image URL for the specified size
        if (mediaDetails.media_details && mediaDetails.media_details.sizes && mediaDetails.media_details.sizes[size]) {
            return mediaDetails.media_details.sizes[size].source_url;
        }
  
        // Fallback to the full-size image URL if the specified size is not available
        return mediaDetails.media_details?.sizes?.full?.source_url || (mediaData as { source_url?: string }).source_url;
    } catch (error) {
        console.error('Error fetching image URL:', (error as Error).message);
        return "https://res.cloudinary.com/djwyhbnsk/image/upload/v1743092104/product-customizations/kdt80vnirnjf4bi61rxa.png";
    }
  }
