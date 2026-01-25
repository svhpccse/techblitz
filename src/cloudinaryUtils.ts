// Cloudinary Utilities for uploading payment screenshots and paper files

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export const uploadPaymentScreenshot = async (file: File): Promise<string> => {
  if (!CLOUDINARY_CLOUD_NAME) {
    throw new Error('Cloudinary cloud name not configured in .env');
  }

  if (!CLOUDINARY_UPLOAD_PRESET) {
    throw new Error('Cloudinary upload preset not configured in .env');
  }

  try {
    console.log('Uploading to Cloudinary...', {
      cloudName: CLOUDINARY_CLOUD_NAME,
      preset: CLOUDINARY_UPLOAD_PRESET,
      fileSize: file.size,
      fileType: file.type
    });

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', 'tech_blitz_2k26/payments');

    const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
    console.log('Upload URL:', uploadUrl);

    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData
    });

    console.log('Response status:', response.status);

    const responseData = await response.json();
    console.log('Response data:', responseData);

    if (!response.ok) {
      throw new Error(
        responseData.error?.message || `Upload failed: ${response.statusText}`
      );
    }

    const uploadedUrl = responseData.secure_url;
    console.log('Upload successful:', uploadedUrl);
    return uploadedUrl;
  } catch (error: any) {
    console.error('Cloudinary upload error:', error);
    throw new Error(error.message || 'Failed to upload payment screenshot');
  }
};

export const uploadPaperFile = async (file: File): Promise<string> => {
  if (!CLOUDINARY_CLOUD_NAME) {
    throw new Error('Cloudinary cloud name not configured in .env');
  }

  if (!CLOUDINARY_UPLOAD_PRESET) {
    throw new Error('Cloudinary upload preset not configured in .env');
  }

  // Validate file type
  const validTypes = ['application/pdf', 'application/msword', 
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  
  if (!validTypes.includes(file.type)) {
    throw new Error('Only PDF and Word documents are allowed');
  }

  // Validate file size (max 10MB)
  if (file.size > 10 * 1024 * 1024) {
    throw new Error('File size must be less than 10MB');
  }

  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', 'tech_blitz_2k26/papers');

    const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`;

    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.error?.message || 'Upload failed');
    }

    const secureUrl = responseData.secure_url;
    // Add fl_attachment flag to make file downloadable and publicly accessible
    const viewableUrl = secureUrl.replace('/upload/', '/upload/fl_attachment/');
    console.log('✅ File uploaded:', viewableUrl);
    return viewableUrl;
  } catch (error: any) {
    console.error('❌ Upload error:', error.message);
    throw new Error(error.message || 'Failed to upload paper file');
  }
};

export const deleteCloudinaryImage = async (publicId: string): Promise<void> => {
  try {
    console.log(`Image ${publicId} marked for deletion`);
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
  }
};
