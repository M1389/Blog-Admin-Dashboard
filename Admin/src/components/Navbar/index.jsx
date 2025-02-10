import { Box, Button, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { NavLink, useLocation, useParams } from 'react-router-dom'
import theme from '../Theme/theme'
import styles from './navbar.module.css'; // Importing the CSS module  


export default function Navbar() {
  const location = useLocation()
  
  
  return (
    <>
      {location.pathname.includes('register') || location.pathname.includes('login') ? '' : 
      <>
        <Box component={'section'} sx={{
          position:'fixed',
          top:0,
          left:0,
          width:'275px',
          height:'100vh',
          backgroundColor: theme.palette.bgMain.main,
          padding:'10px 5px'
          
        }}>
          <Stack display={'flex'} flexDirection={'row'} alignItems={'end'} gap={'10px'} mb={'40px'}>
            <Box component={'img'} src='/assets/Logo.svg' alt='logo' width={'40px'}/>
            <Typography variant='h2' fontSize={'25px'} color={theme.palette.textColor.header} fontWeight={'500'}>Dashboard.com</Typography>
          </Stack>
          <Stack>
            <Typography variant='h6' fontSize={'18px'} color={theme.palette.textColor.header} fontWeight={'400'}>CUSTOM</Typography>
            <NavLink to={'/users'} style={location.pathname.includes('user') ? styles.active : {fontSize:'18px', color:theme.palette.textColor.text, fontWeight:'400', margin:'10px 15px'}} >User</NavLink>
            <NavLink to={'/categories'} style={{fontSize:'18px', color:theme.palette.textColor.text, fontWeight:'400', margin:'10px 15px'}} >Categories</NavLink>
            <NavLink to={'/posts'} style={{fontSize:'18px', color:theme.palette.textColor.text, fontWeight:'400', margin:'10px 15px'}}>Posts</NavLink>
            <NavLink to={'/comments'} style={{fontSize:'18px', color:theme.palette.textColor.text, fontWeight:'400', margin:'10px 15px'}}>Comments</NavLink>
          </Stack>
        </Box>
      </>
      }
    </>
  )
}
