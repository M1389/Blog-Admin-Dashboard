import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {Category, Users, Posts, Comments, NotFound, Home} from './Pages';
export default function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/Users' element={<Users/>}/>
        <Route path='/Comments' element={<Comments/>}/>
        <Route path='/Posts' element={<Posts/>}/>
        <Route path='/Categories' element={<Category/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <Footer/>
    </>
  )
}
