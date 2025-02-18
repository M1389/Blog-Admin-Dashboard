import { Box, Button, FormControlLabel, Stack, Switch, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import theme from '../../../components/Theme/theme';
import notify from '../../../Utils/notify';
import { useNavigate, useParams } from 'react-router-dom';

export default function CategoryUpdate() {
  const navigate = useNavigate()
  const [file, setFile] = useState(null); 
  const [uploadImage , setUploadImage] = useState()
  const [title , setTitle] = useState()
  const token = localStorage.getItem('token')
  const {id} = useParams()

  //file upload
  const handleFileChange = (event) => {  
    setFile(event.target.files[0]); 
  };


  const handleSubmit = async (event) => {  
    event.preventDefault(); 

    if (!file) {  
      alert('Please select a file to upload.');  
      return;  
    }  

    const formData = new FormData();  
    formData.append('file', file); 

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
      notify('Success:', result.message);
    } catch (error) {  
      if (error instanceof TypeError) {  
          
        notify('error', 'Network error occurred. Please try again later.');  
      } else {  
        
        notify('error', error.message);  
      }  
    } 
  }

  //handle toggle
  const [isActive, setIsActive] = useState(false)
  const handleToggle = ()=>{
    setIsActive(!isActive)
  }

  // Update the category here

  const updateCategory = async()=>{
      
    try {  
      const response = await fetch( import.meta.env.VITE_BASE_API + `categories/${id}`, {  
        method: 'PATCH',
        headers:{
          'Content-Type':'application/Json',
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: title,
          image: uploadImage,
          isActive: isActive
        })  
      });  
 
      
      const result = await response.json();
      notify('success' , `Category with title of ${title} Updated successfully`)  
      
    } catch (error) {  
      console.log(error) 
    } 
  }
  return (
    <>
      <Box component={'section'} width={'80%'} p={'40px 30px'} sx={{
        '@media(max-width:1100px)':{
          width:'90%',
          margin:'40px auto'
        }
      }}>
        <Typography variant="h4" fontWeight={'500'} m={'15px 0'}>Update Category</Typography>
        <Stack width={'50%'} border={`2px solid ${theme.palette.primary.main}`} p={'20px'} borderRadius={'20px'} sx={{
          '@media(max-width:1100px)':{
            width:'100%',
            margin:'20px 0',
            marginLeft:'auto'
          }
        }}>
          <form onSubmit={handleSubmit}>  
            <input type="file" accept="image/*" onChange={handleFileChange} />  
            <Button variant='outlined' type="submit">Upload</Button>  
          </form>
          <TextField id="outlined-basic" label="Title" variant="outlined"  onChange={(e)=>setTitle(e.target.value)} sx={{margin:'15px 0', width:'100%'}} />
          <FormControlLabel
            control={
              <Switch  onChange={handleToggle} name="gilad" />
            }
            label="Active/NotActive "
          />
          <Stack display={'flex'} flexDirection={'row'} gap={'10px'}>
            <Button variant='outlined' onClick={()=>updateCategory()}>Update</Button>
            <Button variant='contained' color='error' onClick={()=>navigate(-1)}>Cancel</Button>
          </Stack>
        </Stack>
        <Typography variant='h5' m={'15px 0 '} fontSize={'30px'} fontWeight={'500'}>Uploded Image</Typography>
        {uploadImage && <Box component={'img'} src={import.meta.env.VITE_DATA_API + uploadImage} sx={{width:'20%', margin:'10px 0'}} alt={uploadImage}/>}
      </Box>
    </>
  )
}
