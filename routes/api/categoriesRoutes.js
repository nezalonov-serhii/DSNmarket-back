const express = require("express");
const categoriesController = require("../../controllers/categoriesController");

const router = express.Router();

router.get("/", categoriesController.getAllCategories);

router.post("/", categoriesController.createCategory);

router.get("/:category", categoriesController.getCategoryByEng);

router.get("/subcategories/:subcategory", categoriesController.getProductBySubcategories);

router.get("/products/:category", categoriesController.getProductByCategory);

module.exports = router;
