require("dotenv").config();
const fs = require("fs").promises;
const cloudinary = require("cloudinary").v2;
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
cloudinary.config({
   cloud_name: CLOUDINARY_CLOUD_NAME,
   api_key: CLOUDINARY_API_KEY,
   api_secret: CLOUDINARY_API_SECRET,
   secure: true,
});

const uploadImage = async (imagePath, title) => {
   const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
   };

   try {
      const result = await cloudinary.uploader.upload(imagePath, {
         folder: `dsn/products/${title}`,
      });

      console.log(result.secure_url);

      return result.secure_url;
   } catch (error) {
      console.error(error);
      try {
         await fs.unlink(imagePath);
      } catch (unlinkError) {
         console.error("Error while deleting temporary file:", unlinkError);
      }
   } finally {
      try {
         await fs.unlink(imagePath);
      } catch (unlinkError) {
         console.error("Error while deleting temporary file:", unlinkError);
      }
   }
};

const deleteImg = async (title) => {
   try {
      const { resources } = await cloudinary.api.resources({
         type: "upload",
         prefix: `dsn/products/${title}/`,
         max_results: 100, // Максимальное количество результатов, которое можно получить за один раз
      });

      // Удаляем каждый ресурс в указанной папке
      const deletionPromises = resources.map((resource) => {
         return cloudinary.uploader.destroy(resource.public_id);
      });

      await Promise.all(deletionPromises);

      console.log(cloudinary);

      cloudinary.api.delete_folder(`dsn/products/${title}`).then(console.log);

      console.log(`All resources in folder ${title} deleted successfully.`);
   } catch (error) {
      console.error(`Error deleting resources in folder ${title}: ${error.message}`);
   }
};

module.exports = {
   uploadImage,
   deleteImg,
};
