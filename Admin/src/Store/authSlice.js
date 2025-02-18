import {create} from 'zustand';  

const authSlice = create((set) => ({  
  token: localStorage.getItem('token') || null,
  username: localStorage.getItem('username') || null,
  setUserName: (newUser) => set({username: newUser}),
  setToken: (newToken) => set({ token: newToken }),
  clearToken: () => set({ token: localStorage.clear() }),  
}));  

export default authSlice; 