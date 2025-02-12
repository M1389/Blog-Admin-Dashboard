import { Box, Button, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { NavLink, useLocation, useParams } from 'react-router-dom'
import theme from '../Theme/theme'
import styles from './navbar.module.css'; 
import { UserIcon } from '@heroicons/react/24/outline';
import { TagIcon } from '@heroicons/react/24/outline';
import { BookOpenIcon } from '@heroicons/react/24/outline';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';


export default function Navbar() {
  const location = useLocation()
  
  const navLinksStyles = ({isActive})=>{
    return{
      fontWeight: isActive ? '600' : '400',
      color: isActive ? theme.palette.textColor.header : theme.palette.textColor.text,
      margin: '10px 15px',
      fontSize: '18px',
      backgroundColor: isActive ? theme.palette.primary.main : 'transparent',
      padding: isActive ? '10px 10px' : '10px 10px',
      borderRadius: '10px',
      transition: 'all 0.3s',
      display:'flex',
      flexDirection:'row',
      gap:'15px'
      
    }
  }
  return (
    <>
      {location.pathname.includes('register') || location.pathname.includes('login') ? '' : 
      <>
        <Box component={'section'} sx={{
          
          width:'275px',
          height:'100vh',
          backgroundColor: theme.palette.bgMain.main,
          padding:'10px 5px',
          
          
        }}>
          <Stack display={'flex'} flexDirection={'row'} alignItems={'end'} gap={'10px'} mb={'40px'}>
            <Box component={'img'} src='/assets/Logo.svg' alt='logo' width={'40px'}/>
            <Typography variant='h2' fontSize={'25px'} color={theme.palette.textColor.header} fontWeight={'500'}>Dashboard.com</Typography>
          </Stack>
          <Stack>
            <Typography variant='h6' fontSize={'18px'} color={theme.palette.textColor.header} fontWeight={'400'}>CUSTOM</Typography>
            <NavLink exact to={'/users'} style={navLinksStyles} >
              <UserIcon width={'22px'} height={'22px'}/>
              <Typography>User</Typography>
            </NavLink>
            <NavLink to={'/categories'} style={navLinksStyles}>
              <TagIcon width={'22px'} height={'22px'}/>
              <Typography>Categories</Typography>
            </NavLink>
            <NavLink to={'/posts'} style={navLinksStyles}>
              <BookOpenIcon width={'22px'} height={'22px'}/>
              <Typography>Posts</Typography>
            </NavLink>
            <NavLink to={'/comments'} style={navLinksStyles}>
            <ChatBubbleLeftRightIcon width={'22px'} height={'22px'}/>
              <Typography>Comments</Typography>
            </NavLink>
          </Stack>
        </Box>
      </>
      }
    </>
  )
}
