import {create} from 'zustand';  

const authSlice = create((set) => ({  
  token: localStorage.getItem('token') || null,  
  setToken: (newToken) => set({ token: newToken }),  
  clearToken: () => set({ token: localStorage.removeItem('token') }),  
}));  

export default authSlice; 