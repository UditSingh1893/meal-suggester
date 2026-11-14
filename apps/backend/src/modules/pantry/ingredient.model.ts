import { Schema, model } from 'mongoose';
const IngredientSchema = new Schema({
  name: { type: String, required: true, trim: true },
  normalizedName: { type: String, required: true, unique: true, index: true },
  aliases: [{ type: String, trim: true }]
}, { timestamps: true });
export const Ingredient = model('Ingredient', IngredientSchema);
