export const convertBlobUrlToFile = async (blobUrl: string, fileName: string): Promise<File> => {
    const response = await fetch(blobUrl); // Tải blob từ Blob URL
    const blob = await response.blob(); // Chuyển response thành Blob
    const file = new File([blob], fileName, { type: blob.type }); // Tạo File từ Blob
    return file;
  };