import { Box, Button, IconButton, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { NavLink, useLocation, useParams } from 'react-router-dom'
import theme from '../Theme/theme'
import styles from './navbar.module.css'; 
import { UserIcon } from '@heroicons/react/24/outline';
import { TagIcon } from '@heroicons/react/24/outline';
import { BookOpenIcon } from '@heroicons/react/24/outline';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { Bars3Icon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const location = useLocation()
  const [open , isOpen] = useState(true)
  const handleOpen = () =>{
    isOpen(prevOpen => !prevOpen)
  }
  
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
          '@media(max-width:1040px)':{
            position:'fixed',
            top:'0',
            left: `${open ? '0' : '-300px'}`,
            width:'300px',
            height:'100vh',
            transition:'all 0.5s'

          },
          zIndex:'100'
          
        }}>
          <Stack display={'flex'} flexDirection={'row'} alignItems={'center'} gap={'10px'} mb={'40px'}>
            <Box component={'img'} src='/assets/Logo.svg' alt='logo' width={'40px'}/>
            <Typography variant='h2' fontSize={'25px'} color={theme.palette.textColor.header} fontWeight={'500'}>Dashboard.com</Typography>
            <IconButton onClick={()=>handleOpen()} sx={{
              display:'none',
              '@media(max-width:1040px)':{
                display:'block'
              }
            }}>
                <XCircleIcon width={'25px'} height={'25px'} color={theme.palette.textColor.text}/>
            </IconButton>
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
        <Stack sx={{
          position:'fixed',
          top:'0',
          left:'0',
          width:'75px',
          height:'100vh',
          display:'none',
          bgcolor:theme.palette.bgMain.main,
          '@media(max-width:1040px)':{
            display:'flex',
            alignItems:'center',
            zIndex:'90'
          },
          '@media(max-width:445px)':{
            width:'45px'
          },
        }}>
          <IconButton onClick={()=>handleOpen()} sx={{zIndex:'5'}}>
            <Bars3Icon width={'40px'} height={'40px'} color={theme.palette.textColor.text}/>
          </IconButton>
          

        </Stack>
        
      </>
      }
    </>
  )
}
