'use client';
import { useState, FormEvent } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import AppShell from '../../components/AppShell';
import Link from 'next/link';
import { api } from '../../lib/api';
export default function Page() {
  const client = useQueryClient();
  const [q, setQ] = useState('');
  const [editing, setEditing] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const recipes = useQuery({ queryKey: ['recipes', q], queryFn: () => api<any>('/recipes?limit=50&q=' + encodeURIComponent(q)) });
  function clear() { setEditing(null); setTitle(''); setCategory(''); setIngredients(''); setInstructions(''); }
  async function save(event: FormEvent) {
    event.preventDefault(); setError(''); setBusy(true);
    try {
      await api(editing ? '/recipes/' + editing : '/recipes', { method: editing ? 'PATCH' : 'POST', body: JSON.stringify({ title, category, ingredients: ingredients.split(',').map(name => name.trim()).filter(Boolean).map(name => ({ name })), instructions: instructions.split('\n').map(step => step.trim()).filter(Boolean) }) });
      clear(); await client.invalidateQueries();
    } catch (failure) { setError((failure as Error).message); } finally { setBusy(false); }
  }
  async function remove(id: string) {
    if (!window.confirm('Delete this recipe?')) return;
    try { await api('/recipes/' + id, { method: 'DELETE' }); await client.invalidateQueries(); if (editing === id) clear(); }
    catch (failure) { setError((failure as Error).message); }
  }
  return <AppShell><h1>Recipes</h1>
    <form className="card" onSubmit={save} style={{ display: 'grid', gap: 10 }}>
      <h2>{editing ? 'Edit recipe' : 'Add recipe'}</h2>
      <label>Title<input className="input" required minLength={2} maxLength={150} value={title} onChange={event => setTitle(event.target.value)} /></label>
      <label>Category<input className="input" maxLength={60} value={category} onChange={event => setCategory(event.target.value)} /></label>
      <label>Ingredients (comma separated)<input className="input" required value={ingredients} onChange={event => setIngredients(event.target.value)} /></label>
      <label>Instructions (one step per line)<textarea className="input" required rows={4} value={instructions} onChange={event => setInstructions(event.target.value)} /></label>
      <button className="btn" disabled={busy}>{busy ? 'Saving…' : 'Save recipe'}</button>
      {editing && <button type="button" onClick={clear}>Cancel edit</button>}
    </form>
    {error && <p role="alert">{error}</p>}
    <label>Search recipes<input className="input" value={q} onChange={event => setQ(event.target.value)} /></label>
    {recipes.isPending && <p>Loading recipes…</p>}
    {recipes.isError && <p role="alert">{recipes.error.message}</p>}
    <div className="grid grid3" style={{ marginTop: 16 }}>{recipes.data?.data?.map((recipe: any) => <div className="card" key={recipe._id}>
      <span className="pill">{recipe.category || 'Recipe'}</span><h2><Link href={'/recipes/' + recipe._id}>{recipe.title}</Link></h2>
      <p>{recipe.ingredients.map((ingredient: any) => ingredient.displayName).join(', ')}</p>
      <button onClick={() => { setEditing(recipe._id); setTitle(recipe.title); setCategory(recipe.category || ''); setIngredients(recipe.ingredients.map((ingredient: any) => ingredient.displayName).join(', ')); setInstructions(recipe.instructions.join('\n')); }}>Edit</button>{' '}
      <button onClick={() => remove(recipe._id)}>Delete</button>
    </div>)}</div>
    {recipes.data?.data?.length === 0 && <p>No recipes found. Add one above or run the seed command.</p>}
  </AppShell>;
}
