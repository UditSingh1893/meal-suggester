import { Schema, model } from 'mongoose';
const FavoriteSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  recipeId: { type: Schema.Types.ObjectId, ref: 'Recipe', required: true, index: true }
}, { timestamps: true });
FavoriteSchema.index({ userId: 1, recipeId: 1 }, { unique: true });
export const Favorite = model('Favorite', FavoriteSchema);
