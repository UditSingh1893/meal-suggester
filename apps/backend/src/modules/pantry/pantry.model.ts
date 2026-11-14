import { Schema, model } from 'mongoose';
const PantryItemSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  ingredientId: { type: Schema.Types.ObjectId, ref: 'Ingredient', required: true },
  displayName: { type: String, required: true },
  quantity: { type: Number, min: 0 },
  unit: { type: String, trim: true },
  expiryDate: Date
}, { timestamps: true });
PantryItemSchema.index({ userId: 1, ingredientId: 1 }, { unique: true });
PantryItemSchema.index({ userId: 1, updatedAt: -1 });
export const PantryItem = model('PantryItem', PantryItemSchema);
