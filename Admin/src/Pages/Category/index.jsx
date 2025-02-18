import { Box, Button, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import theme from '../../components/Theme/theme';
import notify from '../../Utils/notify';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';

export default function Category() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const [categories , setCategories] = useState();
  const [title , setTitle] = useState()
  const [open, setOpen] = React.useState(false);
  //fetching data
  useEffect(()=>{
    (async()=>{
      try {
        const res = await fetch(import.meta.env.VITE_BASE_API + 'categories',{
          method:'GET',
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        })
        const data = await res?.json()
        setCategories(data?.data)
        
        notify('success', data.message)
        } catch (error) {
        console.log(error)
        notify('error', data.message)
      }
    })()
  },[])

  //handle dialogs
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // handle file uploads
  
    const [file, setFile] = useState(null); 
    const [uploadImage , setUploadImage] = useState()

    const handleFileChange = (event) => {  
      setFile(event.target.files[0]); // Get the first file  
    }; 

    const handleSubmit = async (event) => {  
      event.preventDefault(); 
  
      if (!file) {  
        alert('Please select a file to upload.');  
        return;  
      }  
  
      const formData = new FormData();  
      formData.append('file', file); // Add the file to the FormData  
  
      try {  
        const response = await fetch( import.meta.env.VITE_BASE_API + 'upload', {  
          method: 'POST',
          headers:{
            authorization: `Bearer ${token}`
          },
          body: formData,  
        });  
   
  
        const result = await response.json();
        
        setUploadImage(result?.file.filename)
        notify('Success:', result.message); // Handle response accordingly  
      } catch (error) {  
        if (error instanceof TypeError) {  
          // Network Error  
          notify('error', 'Network error occurred. Please try again later.');  
        } else {  
          // Application Error  
          notify('error', error.message);  
        }  
      } 
    }

    //Create category

    const createCategory = async()=>{
      
      try {  
        const response = await fetch( import.meta.env.VITE_BASE_API + 'categories', {  
          method: 'PUT',
          headers:{
            'Content-Type':'application/Json',
            authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            title: title,
            image: uploadImage
          })  
        });  
   
        
        const result = await response.json();
        notify('success' , `Category with title of ${title} created successfully`)  
        handleClose()
        location.reload()
      } catch (error) {  
        console.log(error) 
      } 
    }

    const items = categories?.map((e, index)=>(
      <Stack key={index} width={'30%'} bgcolor={theme.palette.bgMain.main} borderRadius={'5px'} paddingBottom={'10px'} overflow={'hidden'}>
        <Box component={'img'} width={'100%'} height={'60%'} sx={{objectFit:'cover'}} src={import.meta.env.VITE_DATA_API + e.image}/>
        <Stack display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography variant="body2" fontWeight={'600'} m={'10px 10px'} fontSize={'25px'} color={theme.palette.textColor.text}>{e.title}</Typography>
          <Typography variant="body2" fontWeight={'600'} m={'10px 10px'} fontSize={'12px'} color={theme.palette.textColor.text}>{e.createdAt}</Typography>
        </Stack>
        {e.isActive ? <Button variant='outlined' sx={{color:'#28b463', width:'80px', margin:'10px', border:'1px solid #28b463'}}>Active</Button> : <Button variant='outlined' sx={{color:'#e74c3c', width:'150px', margin:'10px', border:'1px solid #e74c3c'}}>Not Active</Button>}
        <Button variant='outlined' sx={{margin:'0 10px'}} onClick={()=>navigate(`/category/update/${e._id}`)}>Update</Button>
      </Stack>
    ))
  
  return (
    <>
      <Box component={'section'} width={'80%'} p={'30px 30px'}>
        <Typography variant='h2' fontSize={'40px'} fontWeight={'600'} >
          Categories
        </Typography>
        <Button variant={'contained'} onClick={handleClickOpen} sx={{bgcolor:theme.palette.bgMain , margin:'20px 0'}} >
          Create New Category
        </Button>
        <Stack display={'flex'} flexDirection={'row'} gap={'12px'}>
            {items}
        </Stack>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        
      >
        <DialogTitle sx={{fontSize:'25px', fontWeight:'600',}}>Create Category</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{margin:'15px 0'}}>
            You can Easily create category here.
          </DialogContentText>
          <form onSubmit={handleSubmit}>  
            <input type="file" accept="image/*" onChange={handleFileChange} />  
            <Button variant='outlined' type="submit">Upload</Button>  
          </form>
          <TextField id="outlined-basic" label="Title" variant="outlined" onChange={(e)=>setTitle(e.target.value)} sx={{margin:'15px 0', width:'100%'}} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={()=>createCategory()}>Subscribe</Button>
        </DialogActions>
        {uploadImage && <Box component={'img'} src={import.meta.env.VITE_DATA_API + uploadImage} alt={uploadImage}/>}
      </Dialog>
    </>
  )
}
