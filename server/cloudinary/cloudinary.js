import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv'
dotenv.config()

// Define the async function
const uploadImage = async (imagePath, publicId) => {
    try {
        // Configuration
        cloudinary.config({
            cloud_name: "dly3dvcgw", 
            api_key: "881788668436115", 
            api_secret: process.env.CLOUDINARY_API_SECRET 
        });

        // Upload an image
        const uploadResult = await cloudinary.uploader.upload(imagePath, {
            public_id: publicId
        });

        console.log(uploadResult);

        // Optimize delivery by resizing and applying auto-format and auto-quality
        const optimizeUrl = cloudinary.url(publicId, {
            fetch_format: 'auto',
            quality: 'auto'
        });

        console.log(optimizeUrl);

        const autoCropUrl = cloudinary.url(publicId, {
            crop: 'fill',
            gravity: 'auto',
            width: 500,
            height: 500
        });

        console.log(autoCropUrl);

        return {
            uploadResult,
            optimizeUrl,
            autoCropUrl
        };
    } catch (error) {
        console.error("An error occurred:", error);
        throw error;
    }
};

export default uploadImage;