const Product = require("../models/productModel");
const { ctrlWrapper } = require("../helpers/index");

const Category = require("../models/categoriesModel");

// Создание новой категории
const createCategory = async (req, res) => {
   const { eng, ua, subcategories } = req.body;

   console.log(req.body);

   const newCategory = new Category({ eng, ua, subcategories });
   const savedCategory = await newCategory.save();

   res.status(201).json(savedCategory);
};

// Получение всех категорий
const getAllCategories = async (req, res) => {
   const categories = await Category.find();
   res.status(200).json(categories);
};

// Получение категории по ID
const getCategoryByEng = async (req, res) => {
   const eng = req.params.category;

   const category = await Category.findOne({ eng: eng });
   if (!category) {
      return res.status(404).json({ message: "Category not found" });
   }

   res.status(200).json(category);
};

// Удаление категории по ID
const deleteCategoryById = async (req, res) => {
   const deletedCategory = await Category.findByIdAndDelete(req.params.id);
   if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
   }
   res.status(200).json({ message: "Category deleted successfully" });
};

const getProductBySubcategories = async (req, res) => {
   const { subcategory } = req.params;
   const { page = 1, perPage = 10 } = req.query;

   console.log(subcategory);

   const result = await Product.find({ subcategories: { $elemMatch: { value: subcategory } } })
      .skip((page - 1) * perPage)
      .limit(perPage);

   console.log(result);

   res.status(200).json(result);
};

const getProductByCategory = async (req, res) => {
   const { category } = req.params;
   const { page = 1, perPage = 10 } = req.query;

   try {
      const result = await Product.find({ category: { $in: [category] } })
         .sort({ createdAt: -1 }) // Сортировка по полю createdAt в убывающем порядке
         .skip((page - 1) * perPage)
         .limit(perPage);

      if (!result || result.length === 0) {
         return res.status(404).json({
            message: "Products not found for the specified category",
         });
      }

      res.status(200).json(result);
   } catch (error) {
      console.error("Error fetching products by category:", error);
      res.status(500).json({ error: "Internal Server Error" });
   }
};

module.exports = { getProductByCategory };

module.exports = {
   createCategory: ctrlWrapper(createCategory),
   getAllCategories: ctrlWrapper(getAllCategories),
   getCategoryByEng: ctrlWrapper(getCategoryByEng),
   deleteCategoryById: ctrlWrapper(deleteCategoryById),
   getProductByCategory: ctrlWrapper(getProductByCategory),
   getProductBySubcategories: ctrlWrapper(getProductBySubcategories),
};
