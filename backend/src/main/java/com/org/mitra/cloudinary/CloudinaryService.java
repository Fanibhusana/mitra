package com.org.mitra.cloudinary;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {
    private final Cloudinary cloudinary;

    public CloudinaryService() {
        Dotenv dotenv = Dotenv.load(); // Load .env file

        this.cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", dotenv.get("CLOUDINARY_CLOUD_NAME"),
                "api_key", dotenv.get("CLOUDINARY_API_KEY"),
                "api_secret", dotenv.get("CLOUDINARY_API_SECRET")
        ));
    }

    public String uploadImage(MultipartFile file) throws IOException {
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                "resource_type", "image", // It's an image upload
                "width", 800,  // Resize width to 800px
                "height", 800, // Resize height to 800px
                "crop", "limit", // Crop the image to fit the width and height
                "quality", "auto", // Automatically adjust image quality
                "fetch_format", "auto" // Automatic format based on image type
        ));
        return uploadResult.get("secure_url").toString(); // Return Cloudinary image URL
    }

    // Method to delete image from Cloudinary
    public String deleteImage(String publicId) throws IOException {
        // Deletes the image from Cloudinary by public ID
        Map<String, String> result = cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
        return result.get("result");  // If successful, returns "ok"
    }
}
