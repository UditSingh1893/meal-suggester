import { Router } from 'express'; import { asyncHandler } from '../../utils/asyncHandler.js'; import { Favorite } from './favorite.model.js'; import { Recipe } from '../recipes/recipe.model.js'; import { AppError } from '../../utils/errors.js'; import { DEMO_USER_ID } from '../../config/demo.js';
const r=Router();
r.get('/',asyncHandler(async(req,res)=>{const data=await Favorite.find({userId:DEMO_USER_ID}).populate('recipeId').sort({createdAt:-1});res.json({data})}));
r.get('/:recipeId/status',asyncHandler(async(req,res)=>{const exists=!!await Favorite.exists({userId:DEMO_USER_ID,recipeId:req.params.recipeId});res.json({data:{favorite:exists}})}));
r.post('/:recipeId',asyncHandler(async(req,res)=>{if(!await Recipe.exists({_id:req.params.recipeId}))throw new AppError(404,'Recipe not found');const fav=await Favorite.findOneAndUpdate({userId:DEMO_USER_ID,recipeId:req.params.recipeId},{$setOnInsert:{userId:DEMO_USER_ID,recipeId:req.params.recipeId}},{new:true,upsert:true});res.status(201).json({data:fav})}));
r.delete('/:recipeId',asyncHandler(async(req,res)=>{await Favorite.deleteOne({userId:DEMO_USER_ID,recipeId:req.params.recipeId});res.status(204).send()}));
export default r;
