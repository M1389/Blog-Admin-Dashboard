import { Box, Button, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import theme from '../../../components/Theme/theme'
import { useNavigate, useParams } from 'react-router-dom'
import notify from '../../../Utils/notify'

export default function PostDetails() {
    const {id} = useParams()
    const [post , setPost] = useState()
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    useEffect(()=>{
        (async()=>{
          try {
            const res = await fetch(import.meta.env.VITE_BASE_API + `posts/${id}`,{
              method:'GET',
              headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
            })
            const data = await res?.json()
            setPost(data?.data)
            console.log(post)
            
            
            notify('success', 'Get Post successfully')
            } catch (error) {
            console.log(error)
            
          }
        })()
      },[])
  return (
    <>
        <Box component={'section'} width={'80%'} p={'30px 30px'} sx={{
            '@media(max-width:1100px)':{
                margin:'30px auto'
            },
            '@media(max-width:600px)':{
                width:'95%',
                marginLeft:'auto'
            },
        }}>
            <Typography variant='h2' fontSize={'40px'} fontWeight={'600'} >
                Post Details
            </Typography>
            <Stack m={'20px 0'} bgcolor={theme.palette.bgMain.lightDarkGray} p={'20px'} borderRadius={'10px'}>
                <Stack display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} gap={'20px'} flexWrap={'wrap'}>
                    <Typography variant='h2' fontSize={'25px'} fontWeight={'600'} color={theme.palette.textColor.header}>
                        {post?.title}
                    </Typography>
                    <Button variant='outlined' onClick={()=>navigate(`/post/update/${post?._id}`)}>
                        Update this Post
                    </Button>
                </Stack>
                <Typography variant='h6' color={theme.palette.textColor.header} fontSize={'17px'} m={'25px 0'}>
                    {post?.description}
                </Typography>
            </Stack>
            <Button variant='contained' color='error' onClick={()=>navigate('/posts')}>
                Back to Posts
            </Button>
        </Box>
    </>
  )
}
