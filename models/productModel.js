const { Schema, model } = require("mongoose");

const recipeSchema = new Schema({
   title: {
      type: String,
      required: [true, "Set product title"],
   },

   category: {
      type: Array,
      required: [true, "Set product category"],
   },
   subcategories: {
      type: Array,
      default: [],
   },

   description: {
      type: String,
      required: [true, "Set the description"],
   },

   price: {
      type: Number,
      required: [true, "Set product price"],
   },

   images: {
      type: Array,
      default: [],
   },

   imgPublicId: {
      type: String,
   },

   contentsDelivery: {
      type: Array,
      default: [],
   },

   favorites: {
      type: [Schema.Types.ObjectId],
      ref: "user",
      default: [],
   },

   owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
   },
   popular: {
      type: Number,
      default: 0,
   },
   article: {
      type: Number,
   },

   createdAt: {
      type: Date,
      default: Date.now,
   },
});

module.exports = model("product", recipeSchema);
