const express = require("express");
const productController = require("../../controllers/productController");
const multer = require("../../middlewares/multer");
const { checkReqParams } = require("../../helpers");

const router = express.Router();

router.get("/", productController.getAllProduct);

router.delete("/:id", productController.deleteProduct);

// Используйте middleware multer для обработки изображений в запросе
router.post("/", multer.array("images", 7), productController.createProduct);

router.get("/category-list", productController.getCategoriesList);

router.get("/main-page", productController.mainPageProduct);

router.get("/:id", productController.getProductById);

module.exports = router;
