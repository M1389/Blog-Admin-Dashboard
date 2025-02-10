import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {Category, Users, Posts, Comments, NotFound, Home} from './Pages';
import { Login , Register } from './Pages/Auth';
import { Toaster } from 'react-hot-toast';
import authSlice from './Store/authSlice';
export default function App() {
  const token = authSlice((state)=> state.token)
  console.log(token)
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={token ? <Home/> : <Login/>}/>
        <Route path='/users' element={token ? <Users/> : <Login/>}/>
        <Route path='/comments' element={token ? <Comments/> : <Login/>}/>
        <Route path='/posts' element={token ? <Posts/> : <Login/>}/>
        <Route path='/categories' element={token ? <Category/> : <Login/>}/>
        <Route path='/auth/register' element={token ? <Home/> : <Register/>}/>
        <Route path='/auth/login' element={token ? <Home/> : <Login/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <Footer/>
      <Toaster/>
    </>
  )
}
