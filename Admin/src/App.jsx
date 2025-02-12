import React from 'react'
import { Navigate, Route, Router, Routes, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {Category, Users, Posts, Comments, NotFound, Home} from './Pages';
import { Login , Register } from './Pages/Auth';
import { Toaster } from 'react-hot-toast';
import authSlice from './Store/authSlice';
import { Box } from '@mui/material';
export default function App() {
  const token = authSlice((state)=> state.token)

  const navigate = useNavigate()
  return (
    <>
      <Box display={'flex'} flexDirection={'row'}>
      <Navbar/>
      
        <Routes>  
          {/* Home Route */}  
          <Route path='/' element={token ? <Home /> : <Navigate to='/auth/login' />} />  

          {/* Protected Routes */}  
          <Route path='/users' element={token ? <Users /> : <Navigate to='/auth/login' />} />  
          <Route path='/comments' element={token ? <Comments /> : <Navigate to='/auth/login' />} />  
          <Route path='/posts' element={token ? <Posts /> : <Navigate to='/auth/login' />} />  
          <Route path='/categories' element={token ? <Category /> : <Navigate to='/auth/login' />} />  

          {/* Auth Routes */}  
          <Route path='/auth/register' element={token ? <Navigate to='/' /> : <Register />} />  
          <Route path='/auth/login' element={!token ? <Login /> : <Navigate to='/' />} />  

          {/* Not Found Route */}  
          <Route path='*' element={<NotFound />} />  
        </Routes>  
      
      <Footer/>
      <Toaster/>
      </Box>
    </>
  )
}
