const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
   eng: {
      type: String,
      required: [true, "Set the English name"],
   },
   ua: {
      type: String,
      required: [true, "Set the Ukraine name"],
   },

   subcategories: {
      type: Array,
      default: [],
   },
});

module.exports = model("categories", categorySchema);
