import { Box, Button, IconButton, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import theme from '../../components/Theme/theme'
import notify from '../../Utils/notify'
import { useNavigate } from 'react-router-dom'
import Divider from '@mui/material/Divider';  
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { TrashIcon } from '@heroicons/react/24/outline'


export default function Posts() {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const [posts , setPosts] = useState()

  useEffect(()=>{
    (async()=>{
      try {
        const res = await fetch(import.meta.env.VITE_BASE_API + 'posts',{
          method:'GET',
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        })
        const data = await res?.json()
        setPosts(data?.data)
        console.log(posts)
        
        notify('success', 'Get All Posts Successfully')
        } catch (error) {
        console.log(error)
        
      }
    })()
  },[])

  const handleDelete = async(id) =>{
    try {
      const res = await fetch(import.meta.env.VITE_BASE_API +  `posts/${id}`,{
        method:'DELETE',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
      const data = await res?.json()
      notify('success', data.message)
      location.reload()
      } catch (error) {
      console.log(error)
      notify('error', data.message)
    }
  }

  const items = posts?.map((e,index)=>(
  <Stack key={index} bgcolor={theme.palette.bgMain.main} width={'30%'} borderRadius={'10px'} overflow={'hidden'} sx={{
    '@media(max-width:1100px)':{
      width:'70%'
    },
    '@media(max-width:630px)':{
      width:'90%'
    },
    '@media(max-width:480px)':{
      width:'100%'
    },
  }}>
    <Box component={'img'} src={import.meta.env.VITE_DATA_API +  e.image[0]} alt={e.title}/>
    <Typography fontSize={'23px'} fontWeight={'600'} color={theme.palette.textColor.header} m={'10px'}>{e.title}</Typography>
    <Typography fontSize={'18px'} fontWeight={'400'} color={theme.palette.textColor.text} m={'10px'}>{e.description.slice(0,200)}</Typography>
    <Divider sx={{width:'90%' , height:'1px' , bgcolor:theme.palette.textColor.header, margin:'10px auto'} }/>
    <Stack display={'flex'} flexDirection={'row'} sx={{marginTop:'auto', marginBottom:'10px', marginLeft:"10px"}}>
      <IconButton onClick={()=>navigate(`/post/update/${e._id}`)}>
        <PencilSquareIcon width={'22px'} height={'22px'} color={theme.palette.textColor.header}/>
      </IconButton>
      <IconButton onClick={()=>handleDelete(e._id)}>
        <TrashIcon width={'22px'} height={'22px'} color='red'/>
      </IconButton>
      <Button variant='outlined' onClick={()=>navigate(`/post/details/${e._id}`)}>
        See details
      </Button>
    </Stack>
  </Stack>))
  return (
    <>
      <Box component={'section'} width={'80%'} p={'30px 30px'}  sx={{
        overflowY:'scroll',
        '@media(max-width:1100px)':{
          margin:'30px auto'
        },
        '@media(max-width:500px)':{
          width:'95%',
          marginLeft:'auto'
        },
      }}>
        <Typography variant='h2' fontSize={'40px'} fontWeight={'600'} >
          Posts
        </Typography>
        <Button variant={'contained'} onClick={()=>navigate('/post/create')} sx={{bgcolor:theme.palette.bgMain , margin:'20px 0'}} >
          Create New Post
        </Button>
        <Stack display={'flex'} flexDirection={'row'} gap={'12px'} flexWrap={'wrap'}>
            {items}
        </Stack>
      </Box>
    </>
  )
}
