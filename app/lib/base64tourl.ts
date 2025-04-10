function base64ToImageUrl(base64: string): string {
    const byteString = atob(base64.split(',')[1]);
    const mimeString = base64.split(',')[0].match(/:(.*?);/)?.[1] || 'image/png';
  
    const byteArray = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      byteArray[i] = byteString.charCodeAt(i);
    }
  
    const blob = new Blob([byteArray], { type: mimeString });
    return URL.createObjectURL(blob);
  }
  
  export default base64ToImageUrl;  