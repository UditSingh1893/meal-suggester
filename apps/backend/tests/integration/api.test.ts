import { beforeAll,afterAll,beforeEach,describe,it,expect } from 'vitest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
let mongod:MongoMemoryServer|undefined; let app:any; let Recipe:any; let Ingredient:any;

beforeAll(async()=>{
  process.env.NODE_ENV='test';
  if(process.env.TEST_MONGODB_URI) process.env.MONGODB_URI=process.env.TEST_MONGODB_URI;
  else { mongod=await MongoMemoryServer.create(); process.env.MONGODB_URI=mongod.getUri(); }
  await mongoose.connect(process.env.MONGODB_URI!);
  const appMod=await import('../../src/app.js'); app=appMod.createApp();
  Recipe=(await import('../../src/modules/recipes/recipe.model.js')).Recipe;
  Ingredient=(await import('../../src/modules/pantry/ingredient.model.js')).Ingredient;
},120000);

beforeEach(async()=>{for(const c of Object.values(mongoose.connection.collections)) await c.deleteMany({});});
afterAll(async()=>{await mongoose.disconnect();if(mongod)await mongod.stop();});

async function seedRecipe(){const names=['rice','tomato','onion','oil','garlic'];const ids:any[]=[];for(const name of names){const x=await Ingredient.create({name,normalizedName:name});ids.push(x._id)}return Recipe.create({title:'Tomato Rice',slug:'tomato-rice',category:'Indian',cookingTimeMinutes:30,ingredients:names.map((name,i)=>({ingredientId:ids[i],displayName:name})),instructions:['Cook rice','Prepare tomato base','Combine']});}

describe('API integration - no authentication',()=>{
  it('opens pantry directly without authentication',async()=>{expect((await request(app).get('/api/v1/pantry')).status).toBe(200)});
  it('supports pantry CRUD in the local demo workspace',async()=>{const add=await request(app).post('/api/v1/pantry').send({name:'Tomatoes',quantity:2,unit:'pcs'});expect(add.status).toBe(201);const id=add.body.data._id;const patch=await request(app).patch(`/api/v1/pantry/${id}`).send({quantity:3});expect(patch.status).toBe(200);expect(patch.body.data.quantity).toBe(3);expect((await request(app).delete(`/api/v1/pantry/${id}`)).status).toBe(204)});
  it('matches pantry using the SPM formula and returns missing ingredients',async()=>{const recipe=await seedRecipe();for(const name of ['rice','tomato','onion','oil']) await request(app).post('/api/v1/pantry').send({name});const rec=await request(app).get('/api/v1/matching/recommendations');expect(rec.status).toBe(200);const x=rec.body.data.find((v:any)=>v.id===String(recipe._id));expect(x.matchPercentage).toBe(80);expect(x.missingIngredients).toEqual(['garlic']);expect(x.recommendationCategory).toBe('Almost Ready')});
  it('supports favorites and shopping-list generation from missing ingredients',async()=>{const recipe=await seedRecipe();for(const name of ['rice','tomato','onion','oil']) await request(app).post('/api/v1/pantry').send({name});expect((await request(app).post(`/api/v1/favorites/${recipe._id}`)).status).toBe(201);const favs=await request(app).get('/api/v1/favorites');expect(favs.body.data).toHaveLength(1);const list=await request(app).post(`/api/v1/shopping-lists/from-recipe/${recipe._id}`);expect(list.status).toBe(201);expect(list.body.data.items.some((i:any)=>i.displayName==='garlic')).toBe(true);const item=list.body.data.items.find((i:any)=>i.displayName==='garlic');const updated=await request(app).patch(`/api/v1/shopping-lists/${list.body.data._id}/items/${item._id}`).send({completed:true});expect(updated.body.data.items.find((i:any)=>String(i._id)===String(item._id)).completed).toBe(true)});
});
