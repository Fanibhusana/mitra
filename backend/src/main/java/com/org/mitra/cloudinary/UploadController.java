package com.org.mitra.cloudinary;
import com.org.mitra.charity.CharityOrganization;
import com.org.mitra.charity.CharityOrganizationRepository;
import com.org.mitra.user.User;
import com.org.mitra.user.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@RestController
@RequestMapping("/api/upload")
public class UploadController {

    private final CloudinaryService cloudinaryService;
    private final UserRepository userRepository;
    private final CharityOrganizationRepository charityOrganizationRepository;

    public UploadController(CloudinaryService cloudinaryService, UserRepository userRepository, CharityOrganizationRepository charityOrganizationRepository) {
        this.cloudinaryService = cloudinaryService;
        this.userRepository = userRepository;
        this.charityOrganizationRepository = charityOrganizationRepository;
    }
    // Helper method to extract public ID from Cloudinary URL
    private String extractPublicId(String imageUrl) {
        // Example URL: "https://res.cloudinary.com/demo/image/upload/v1617996794/sample.jpg"
        // Extract "sample" from the above URL
        String[] urlParts = imageUrl.split("/");
        String publicIdWithExtension = urlParts[urlParts.length - 1];
        return publicIdWithExtension.split("\\.")[0]; // Remove file extension to get the public ID
    }
    @PostMapping("/image")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            String imageUrl = cloudinaryService.uploadImage(file);
            return ResponseEntity.ok(imageUrl);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Image upload failed: " + e.getMessage());
        }
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<String> uploadUserImage(@PathVariable Long userId, @RequestParam("file") MultipartFile file) {
        try {
            String imageUrl = cloudinaryService.uploadImage(file);

            // Update user with the new image URL
            User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
            user.setProfileImageUrl(imageUrl);
            userRepository.save(user);

            return ResponseEntity.ok(imageUrl); // Return Cloudinary image URL
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Image upload failed: " + e.getMessage());
        }
    }

    @PostMapping("/charity/{charityId}")
    public ResponseEntity<String> uploadCharityImage(@PathVariable Long charityId, @RequestParam("file") MultipartFile file) {
        try {
            String imageUrl = cloudinaryService.uploadImage(file);

            // Update charity with the new image URL
            CharityOrganization charityOrganization = charityOrganizationRepository.findById(charityId).orElseThrow(() -> new RuntimeException("charity not found"));
            charityOrganization.setCharityImageUrl(imageUrl);
            charityOrganizationRepository.save(charityOrganization);

            return ResponseEntity.ok(imageUrl); // Return Cloudinary image URL
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Image upload failed: " + e.getMessage());
        }
    }

    @PutMapping("/user/{userId}/update-image")
    public ResponseEntity<String> updateUserImage(@PathVariable Long userId, @RequestParam("file") MultipartFile file) {
        try {
            String newImageUrl = cloudinaryService.uploadImage(file);

            // Update the user with the new image URL
            User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
            user.setProfileImageUrl(newImageUrl);
            userRepository.save(user);

            return ResponseEntity.ok(newImageUrl); // Return the updated image URL
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Image update failed: " + e.getMessage());
        }
    }

    @PutMapping("/charity/{charityId}/update-image")
    public ResponseEntity<String> updateCharityImage(@PathVariable Long charityId, @RequestParam("file") MultipartFile file) {
        try {
            String newImageUrl = cloudinaryService.uploadImage(file);

            // Update the user with the new image URL
            CharityOrganization charityOrganization = charityOrganizationRepository.findById(charityId).orElseThrow(() -> new RuntimeException("charity not found"));
            charityOrganization.setCharityImageUrl(newImageUrl);
            charityOrganizationRepository.save(charityOrganization);

            return ResponseEntity.ok(newImageUrl); // Return the updated image URL
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Image update failed: " + e.getMessage());
        }
    }

    // Delete charity image from Cloudinary and remove from database
    @DeleteMapping("/charity/{charityId}")
    public String deleteCharityImage(@PathVariable Long charityId) {
        try {
            CharityOrganization charityOrganization = charityOrganizationRepository.findById(charityId).orElseThrow(() -> new RuntimeException("charity not found"));
            String publicId = extractPublicId(charityOrganization.getCharityImageUrl()); // Extract publicId from URL

            // Delete from Cloudinary
            String deleteResult = cloudinaryService.deleteImage(publicId);

            if ("ok".equals(deleteResult)) {
                // Remove the image URL from the database
                charityOrganization.setCharityImageUrl(null);
                charityOrganizationRepository.save(charityOrganization);
                return "Image deleted successfully!";
            } else {
                return "Failed to delete image from Cloudinary!";
            }
        } catch (IOException e) {
            return "Error deleting image: " + e.getMessage();
        }
    }

    // Delete user image from Cloudinary and remove from database
    @DeleteMapping("/user/{userId}")
    public String deleteUserImage(@PathVariable Long userId) {
        try {
            User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
            String publicId = extractPublicId(user.getProfileImageUrl()); // Extract publicId from URL

            // Delete from Cloudinary
            String deleteResult = cloudinaryService.deleteImage(publicId);

            if ("ok".equals(deleteResult)) {
                // Remove the image URL from the database
                user.setProfileImageUrl(null);
                userRepository.save(user);
                return "Image deleted successfully!";
            } else {
                return "Failed to delete image from Cloudinary!";
            }
        } catch (IOException e) {
            return "Error deleting image: " + e.getMessage();
        }
    }
}
