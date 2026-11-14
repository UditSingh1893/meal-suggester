import { Schema, model } from 'mongoose';
const ShoppingItemSchema = new Schema({
  ingredientId: { type: Schema.Types.ObjectId, ref: 'Ingredient' },
  displayName: { type: String, required: true },
  quantity: Number,
  unit: String,
  completed: { type: Boolean, default: false },
  sourceRecipeId: { type: Schema.Types.ObjectId, ref: 'Recipe' }
});
const ShoppingListSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  name: { type: String, required: true, default: 'My Shopping List' },
  items: { type: [ShoppingItemSchema], default: [] }
}, { timestamps: true });
ShoppingListSchema.index({ userId: 1, updatedAt: -1 });
export const ShoppingList = model('ShoppingList', ShoppingListSchema);
