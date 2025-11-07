import axios from "axios";

const API_BASE_URL = "https://api.sky-enterprise.id.vn";


export async function login(email: string, password: string) {
  const res = await axios.post(`${API_BASE_URL}/login`, { email, password });
  return res.data;
}

export async function register(name: string, email: string, password: string) {
  const res = await axios.post(`${API_BASE_URL}/register`, { name, email, password });
  return res.data;
}

export function loginWithGoogle() {
  window.location.href = `${API_BASE_URL}/auth/google/redirect`; 
}