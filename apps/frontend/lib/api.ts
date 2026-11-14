'use client';
const BASE=process.env.NEXT_PUBLIC_API_BASE_URL??'http://localhost:4000/api/v1';
export async function api<T=any>(path:string,init:RequestInit={}){
  const res=await fetch(`${BASE}${path}`,{
    ...init,
    headers:{'Content-Type':'application/json',...(init.headers??{})}
  });
  if(res.status===204)return null as T;
  const body=await res.json().catch(()=>({}));
  if(!res.ok)throw new Error(body?.error?.message??'Request failed');
  return body as T;
}
