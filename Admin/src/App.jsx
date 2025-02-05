import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {Category, Users, Posts, Comments, NotFound, Home} from './Pages';
import { Login , Register } from './Pages/Auth';
export default function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/users' element={<Users/>}/>
        <Route path='/comments' element={<Comments/>}/>
        <Route path='/posts' element={<Posts/>}/>
        <Route path='/categories' element={<Category/>}/>
        <Route path='/auth/register' element={<Register/>}/>
        <Route path='/auth/login' element={<Login/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <Footer/>
    </>
  )
}
