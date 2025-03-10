import {create} from 'zustand';  
import theme from '../components/Theme/theme';

const authSlice = create((set) => ({  
  token: localStorage.getItem('token') || null,
  username: localStorage.getItem('username') || null,
  theme: localStorage.getItem('theme') || 'theme',
  setTheme: (newTheme) => set({theme: newTheme}),
  setUserName: (newUser) => set({username: newUser}),
  setToken: (newToken) => set({ token: newToken }),
  clearToken: () => set({ token: localStorage.clear() }),  
}));  

export default authSlice; 