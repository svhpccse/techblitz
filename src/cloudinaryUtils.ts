// Cloudinary Utilities for uploading payment screenshots

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export const uploadPaymentScreenshot = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', 'tech_blitz_2k26/payments');
    formData.append('resource_type', 'auto');

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData
      }
    );

    if (!response.ok) {
      throw new Error(`Cloudinary upload failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Failed to upload payment screenshot');
  }
};

export const deleteCloudinaryImage = async (publicId: string): Promise<void> => {
  try {
    // Note: Deletion requires authentication and should be done server-side
    // This is a placeholder for client-side deletion
    console.log(`Image ${publicId} marked for deletion`);
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
  }
};
