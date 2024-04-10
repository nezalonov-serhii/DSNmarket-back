const { Schema, model } = require("mongoose");

const userSchema = new Schema({
   name: {
      type: String,
      required: [true, "Set user name"],
   },
   password: {
      type: String,
      required: [true, "Set password for user"],
   },
   email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
   },

   favorites: {
      type: Array,
      default: [],
   },

   shoppingList: [
      {
         ingredient: {
            type: Schema.Types.ObjectId,
            ref: "ingredients",
         },

         ingredientId: {
            type: String,
            default: "",
         },

         measure: {
            type: String,
            required: [true, "Set the measure"],
         },
      },
   ],

   token: {
      type: String,
      default: "",
   },
});

module.exports = model("user", userSchema);
