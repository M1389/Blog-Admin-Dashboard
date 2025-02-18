import { Box, Button, Checkbox, IconButton, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import notify from '../../Utils/notify'
import theme from '../../components/Theme/theme'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/24/outline';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useNavigate } from 'react-router-dom';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Users() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const [users , setUsers] = useState()
  const [open, setOpen] = React.useState(false);
  const [userId , setUserId] = useState()
  useEffect(()=>{
    (async()=>{
      try {
        const res = await fetch('http://localhost:5000/api/users',{
          method:'GET',
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        })
        const data = await res?.json()
        
        setUsers(data?.data)
        
        notify('success', data.message)
        } catch (error) {
        console.log(error)
        notify('error', data.message)
      }
    })()
  },[])

  


  const handleClickOpen = (id) => {
    setUserId(id)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async(id) =>{
    try {
      const res = await fetch(`http://localhost:5000/api/users/${id}`,{
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
 

  const items = users?.map((e,index)=> (
  <Stack key={index} display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
    <Stack width={'30%'} bgcolor={'#212f3d'} sx={{borderTopLeftRadius:'10px', borderBottomLeftRadius:'10px'}} display={'flex'} flexDirection={'row'} alignItems={'center'} m={'5px 0'} p={'10px 10px'}> <Typography variant='h6' color='white' fontSize={'18px'}>{e.username}</Typography> </Stack>
    <Stack width={'30%'} bgcolor={'#212f3d'}  display={'flex'} flexDirection={'row'} alignItems={'center'} m={'5px 0'} p={'10px 10px'}> <Typography variant='h6' color='white' fontSize={'18px'}>{e.role}</Typography> </Stack>
    <Stack width={'30%'} bgcolor={'#212f3d'}  display={'flex'} flexDirection={'row'} alignItems={'center'} m={'5px 0'} p={'10px 10px'}> <Typography variant='h6' color='white' fontSize={'18px'}>{e.phoneNumber}</Typography> </Stack>
    <Stack width={'30%'} bgcolor={'#212f3d'} sx={{borderTopRightRadius:'10px', borderBottomRightRadius:'10px'}} display={'flex'} flexDirection={'row'} alignItems={'center'} m={'5px 0'} p={'10px 10px'}> <Typography variant='h6' color='white' fontSize={'18px'}>{e._id.slice(0,4)}...</Typography> </Stack>
    <IconButton onClick={()=> navigate(`/user/update/${e._id}`)} sx={{margin:'0 10px'}}>
      <PencilSquareIcon width={'22px'} height={'22px'} color='white'/>
    </IconButton>
    <IconButton onClick={()=>handleClickOpen(e._id)} sx={{margin:'0 10px'}}>
      <TrashIcon width={'22px'} height={'22px'} color={'red'}/>
    </IconButton>
  </Stack>))


  
  
  return (
    <>
      <Box component={'section'}  width={'80%'} p={'30px 20px'} ml={'auto'} zIndex={'50'} sx={{
        '@media(max-width:1050px)':{
          width:'calc(100% - 75px)',
          margin: '0 auto',
          overflow:'scroll'
        }
      }}>
        <Stack width={'100%'} m={'auto'} bgcolor={theme.palette.bgMain.main} borderRadius={'5px'} p={'15px'} display={'flex'} justifyContent={'center'} sx={{
          '@media(max-width:1050px)':{
            width:'700px'
          }
        }}>
          <Stack display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
            <Stack width={'30%'} display={'flex'} flexDirection={'row'} alignItems={'center'} m={'5px 0'} p={'10px 10px'}> <Typography variant='h6' color='white' fontSize={'18px'}>Name</Typography> </Stack>
            <Stack width={'30%'} display={'flex'} flexDirection={'row'} alignItems={'center'} m={'5px 0'} p={'10px 10px'}> <Typography variant='h6' color='white' fontSize={'18px'}>Role</Typography> </Stack>
            <Stack width={'30%'} display={'flex'} flexDirection={'row'} alignItems={'center'} m={'5px 0'} p={'10px 10px'}> <Typography variant='h6' color='white' fontSize={'18px'}>Phone Number</Typography> </Stack>
            <Stack width={'30%'} display={'flex'} flexDirection={'row'} alignItems={'center'} m={'5px 0'} p={'10px 10px'}> <Typography variant='h6' color='white' fontSize={'18px'}>Id</Typography> </Stack>
            <Stack width={'11%'} display={'flex'} flexDirection={'row'} alignItems={'center'}> <Typography variant='h6' color='white' fontSize={'18px'}>Edit</Typography> </Stack>
            
            
          </Stack>
          {items}
        </Stack>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
          
        >
          <DialogTitle>{"Are you sure you want to delete this user?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              If you delete this user. this user will be removed from whole data and the data and the role won't work.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancle</Button>
            <Button onClick={()=>handleDelete(userId)}>Im sure!</Button>
          </DialogActions>
        </Dialog>
        
      </Box>
       
    </>
  )
}


      