import { Box, Button, ButtonGroup, FormControlLabel, IconButton, Stack, styled, Typography, useTheme } from '@mui/material'
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
import { SunIcon } from '@heroicons/react/24/outline';
import { MoonIcon } from '@heroicons/react/24/outline';
import Switch from '@mui/material/Switch';
import authSlice from '../../Store/authSlice';
import { HomeIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const clearToken = authSlice((state)=> state.clearToken)
  const theme = useTheme()
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

  //theme switch
  const [dark , setDark] = useState(false)
  const setTheme = authSlice((state)=> state.setTheme)
  
  const handleTheme = ()=>{
    setDark(prevDark => !prevDark)
    setTheme(dark)
    localStorage.setItem('theme', dark)
    
  
  }

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff',
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: '#aab4be',
          ...theme.applyStyles('dark', {
            backgroundColor: '#8796A5',
          }),
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: '#001e3c',
      width: 32,
      height: 32,
      '&::before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
      ...theme.applyStyles('dark', {
        backgroundColor: '#003892',
      }),
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: '#aab4be',
      borderRadius: 20 / 2,
      ...theme.applyStyles('dark', {
        backgroundColor: '#8796A5',
      }),
    },
  }));


  return (
    <>
      {location.pathname.includes('register') || location.pathname.includes('login') ? '' : 
      <>
        <Box component={'section'} sx={{
          display:'flex',
          flexDirection:'column',
          width:'275px',
          height:'100vh',
          backgroundColor: theme.palette.bgMain.main,
          padding:'0',
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
          <Stack display={'flex'} flexDirection={'row'} alignItems={'center'} gap={'10px'} mb={'40px'} mx={'5px'} mt={'10px'}>
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
        
            <Stack mx={'5px'}>
              <Typography variant='h6' fontSize={'18px'} color={theme.palette.textColor.header} fontWeight={'400'}>CUSTOM</Typography>
              <NavLink exact to={'/'} style={navLinksStyles} >
                <HomeIcon width={'22px'} height={'22px'}/>
                <Typography>Home</Typography>
              </NavLink>
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
            <Stack bgcolor={theme.palette.primary.main} m={'20px 10px'} p={'10px'} borderRadius={'10px'} display={'none'} sx={{'@media(max-width:1040px)':{display:'block'},}}>
              <Typography color={theme.palette.textColor.header} fontSize={'23px'} marginTop={'10px'}>{localStorage.getItem('username')}</Typography>
              <Button onClick={()=>clearToken()} variant='contained' color='error' sx={{margin:'10px 0'}}>Log-out</Button>
            </Stack>

            <Stack sx={{ bgcolor:theme.palette.primary.main , borderTopRightRadius:'30px'}} marginTop={'auto'}>
              <Stack display={'flex'} flexDirection={'row'} alignItems={'center'} gap={'10px'} m={'10px'}>
                <FormControlLabel
                control={<MaterialUISwitch checked={dark} onChange={handleTheme} sx={{ m: 1 }}  />}
                label="Theme"
                sx={{color:theme.palette.textColor.header, fontWeight:'600'}}
                />
              </Stack>
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
          '@media(max-width:600px)':{
            width:'35px',
            marginRight:'20px'
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
