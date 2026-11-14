import { Schema, model } from 'mongoose';
const RecipeIngredientSchema = new Schema({
  ingredientId: { type: Schema.Types.ObjectId, ref: 'Ingredient', required: true },
  displayName: { type: String, required: true },
  quantity: Number,
  unit: String
}, { _id: false });
const RecipeSchema = new Schema({
  title: { type: String, required: true, trim: true, index: true },
  slug: { type: String, required: true, unique: true, index: true },
  category: { type: String, trim: true, index: true },
  cookingTimeMinutes: { type: Number, min: 1, index: true },
  ingredients: { type: [RecipeIngredientSchema], required: true },
  instructions: { type: [String], required: true },
  imageUrl: String
}, { timestamps: true });
RecipeSchema.index({ title: 'text', category: 'text' });
export const Recipe = model('Recipe', RecipeSchema);
