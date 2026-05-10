import axios from 'axios';
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api', headers: { 'Content-Type': 'application/json', }, });


export function useApi() { return { get: async (url: string, config?: any) => { const { data } = await api.get(url, config); return data; }, post: async (url: string, body: any) => { const { data } = await api.post(url, body); return data; }, put: async (url: string, body: any) => { const { data } = await api.put(url, body); return data; }, delete: async (url: string) => { const { data } = await api.delete(url); return data; }, }; }

