import { Box, Button, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import theme from '../Theme/theme'
import authSlice from '../../Store/authSlice'

export default function Footer() {
  const theme = useTheme()
  const location = useLocation()
  const username = authSlice((state)=> state.username)
  const clearToken = authSlice((state)=> state.clearToken)
  
  
  return (
    <>
      {location.pathname.includes('register') || location.pathname.includes('login') ? '' : 
      <>
        <Box component={'section'} sx={{
          
          backgroundColor:theme.palette.bgMain.main,
          width:'65px',
          height:'100vh',
          display:'flex',
          flexDirection:'column',
          justifyContent:'space-between',
          alignItems:'center',
          padding:'30px 0',
          '@media(max-width:900px)':{
            position:'fixed',
            top:'0',
            right:'0',
            width:'65px',
            height:'100vh'
          },
          '@media(max-width:600px)':{
            display:'none'
          },
          zIndex:'100'
        }}>

            <Typography variant='h6' sx={{
              color:'white',
              margin:'40px 0',
              rotate:'90deg',
              color:theme.palette.textColor.header
            }}>
              {username}
            </Typography>
            <Button variant='text' onClick={()=>clearToken()} sx={{
              rotate:'90deg',
              width:'100px',
              hieght:'100%',
              color: 'red'
            }}>Log Out</Button>
            
        </Box>
      </>
      }
    </>
  )
}