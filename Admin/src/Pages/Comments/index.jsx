import { Box, Button, Checkbox, FormControlLabel, IconButton, Stack, Switch, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import notify from '../../Utils/notify'
import { TrashIcon } from '@heroicons/react/24/outline';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Comments() {
  const theme = useTheme()
  const token = localStorage.getItem('token')
  const [comments , setComments] = useState();
  const [commentId , setCommentId] = useState();
  const [open , setOpen] = useState(false)
  //Get All comments
  
  useEffect(()=>{
    (async()=>{
      try {
        const res = await fetch(import.meta.env.VITE_BASE_API + 'comments',{
          method:'GET',
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        })
        const data = await res?.json()
        setComments(data?.data)
        
        
        } catch (error) {
        console.log(error)
        notify('error', data.message)
      }
    })()
  },[])

  
    


  //Active or not active the comments
  const updateComment = async(id)=>{
      
    try {  
      const response = await fetch( import.meta.env.VITE_BASE_API + `comments/${id}`, {  
        method: 'PATCH',
        headers:{
          'Content-Type':'application/Json',
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          isActive:true
        })  
      });  
 
      
      const result = await response.json();
      notify('success' , `comments updated`)  
      location.reload()
      
    
    } catch (error) {  
      console.log(error) 
    } 
  }

  //Delete Comment
  const handleClickOpen = (id) => {
    setCommentId(id)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async(id) =>{
    try {
      const res = await fetch(import.meta.env.VITE_BASE_API + `comments/${id}`,{
        method:'DELETE',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
      const data = await res?.json()
      notify('success', 'comment deleted successfully')
      location.reload()
      } catch (error) {
      console.log(error)
      notify('error', data.message)
    }
  }

  const items = comments?.map((e,index)=>
  <Stack key={index}  bgcolor={theme.palette.bgMain.lightDarkGray} p={'10px'} borderRadius={'10px'} sx={{
    width:'50%',
    
    '@media(max-width:1200px)':{
      width:'80%',
      margin:'auto'
    },
    '@media(max-width:561px)':{
      width:'100%',
      margin:'auto'
    },
  }}>
    <Typography variant='h6' color={theme.palette.primary.main} m={'5px 0'} sx={{'@media(max-width:380px)':{fontSize:'14px'}}}>UserId: {e.userId}</Typography>
    <Typography variant='h6' color={theme.palette.textColor.header} fontSize={'18px'} m={'20px 0'}>{e.content}</Typography>
    <Stack display={'fles'} flexDirection={'row'} alignItems={'center'} gap={'30px'}>
      <IconButton onClick={()=>handleClickOpen(e._id)}>
        <TrashIcon width={'22px'} height={'22px'} color='red'/>
      </IconButton>
      <Stack display={'flex'} flexDirection={'row'} alignItems={'center'}>
        <FormControlLabel control={<Checkbox defaultChecked={e.isActive ? true : false} onClick={()=>updateComment(e._id)} />}  />
        {e.isActive ? <Button variant='outlined' sx={{color:'#28b463', border:'1px solid #28b463'}}>Active</Button> : <Button sx={{color:'#e74c3c', border:'1px solid #e74c3c'}}>Not Active</Button>}
      </Stack>
    </Stack>
  </Stack>
  )
  return (
    <>
      <Box component={'section'} width={'80%'} p={'30px 30px'} sx={{
        overflowY:'scroll',
       '@media(max-width:1100px)':{
        width:'80%',
        marginLeft:'auto'
       },
       '@media(max-width:1100px)':{
        width:'95%',
        margin:'auto'
       },
       '@media(max-width:350px)':{
        width:'100%',
        margin:'auto',
        marginLeft:'20px'
       },
      }}>
          <Typography variant='h2' fontSize={'40px'} fontWeight={'600'} sx={{
            '@media(max-width:1100px)':{
              textAlign:'center'
            }
          }}>
            Comments
          </Typography>
          <Stack display={'flex'} flexDirection={'row'} gap={'12px'} flexWrap={'wrap'} m={'35px 0'}>
            {items}
          </Stack>
      </Box>
      <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
          
        >
          <DialogTitle>{"Are you sure you want to delete this Comment?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              If you delete this comment. this comment will be removed from whole server and the comment wont get back.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancle</Button>
            <Button onClick={()=>handleDelete(commentId)}>Im sure!</Button>
          </DialogActions>
        </Dialog>
    </>
  )
}
