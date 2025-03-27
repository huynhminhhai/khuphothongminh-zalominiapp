import images from "assets/images";
import envConfig from "envConfig";

export const convertBlobUrlToFile = async (blobUrl: string, fileName: string): Promise<File> => {
  const response = await fetch(blobUrl); // Tải blob từ Blob URL
  const blob = await response.blob(); // Chuyển response thành Blob
  const file = new File([blob], fileName, { type: blob.type }); // Tạo File từ Blob
  return file;
};

export const getFullImageUrl = (anhDaiDien: string) => {
  if (!anhDaiDien) return images.thumbnailNews; // Nếu không có ảnh, trả về chuỗi rỗng
  if (anhDaiDien.startsWith("http") || anhDaiDien.startsWith("https")) return anhDaiDien; // Nếu đã có domain, giữ nguyên
  return `${envConfig.API_ENDPOINT}${anhDaiDien}`; // Thêm domain nếu thiếu
};


export const convertToFormData = (data: Record<string, any>) => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    const value = data[key];

    if (value === undefined || value === null) return;

    if (value instanceof File) {
      formData.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        formData.append(`${key}[${index}]`, item);
      });
    } else {
      formData.append(key, value.toString());
    }
  });

  return formData;
};

export const loadImage = async (url: string): Promise<File | null> => {
  try {
      const response = await fetch(`/api${url}`);
      if (!response.ok) throw new Error("Failed to fetch image");

      const blob = await response.blob();
      return new File([blob], "uploaded-image.jpg", { type: blob.type });
  } catch (error) {
      console.error("Error loading image:", error);
      return null;
  }
};