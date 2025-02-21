import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import notify from "../../../Utils/notify";
import theme from "../../../components/Theme/theme";
import { useNavigate, useParams } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function PostUpdate() {
    const [file , setFile] = useState()
    const [categories , setCategories] = useState();
    const [uploadImage , setUploadImage] = useState()
    const [title , setTitle] = useState()
    const [description , setDescription] = useState()
    const token = localStorage.getItem('token')
    const navigate = useNavigate();
    const {id} = useParams()

    //handle category id
    const [cat, setCat] = React.useState('');

    const handleChange = (event) => {
        setCat(event.target.value);
    };

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
            
            notify('success', 'Get All Categories Successfully')
            } catch (error) {
            console.log(error)
            notify('error', data.message)
          }
        })()
      },[])

      const categoryIds = categories?.map((e,index)=> <MenuItem key={index} value={e._id}>{e.title}</MenuItem>)
  
    //upload post image
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(import.meta.env.VITE_BASE_API + "upload", {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      setUploadImage(result?.file.filename);
      notify("Success:", result.message);
    } catch (error) {
      if (error instanceof TypeError) {
        notify("success", "Upload successfull.");
      } else {
        notify("error", error.message);
      }
    }
  };

  //Update the Post
  const updatePost = async()=>{
      
    try {  
      const response = await fetch( import.meta.env.VITE_BASE_API + `posts/${id}`, {  
        method: 'PATCH',
        headers:{
          'Content-Type':'application/Json',
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          description,
          image: uploadImage,
          categoryId:cat
          
        })  
      });  
 
      
      const result = await response.json();
      console.log(result)
      notify('success' , `Post with title of ${title} updated successfully`)  
      navigate('/posts')
    
    } catch (error) {  
      console.log(error) 
    } 
  }



  return (
    <>
      <Box component={"section"} width={"80%"} p={"30px 30px"} sx={{
            overflowY:'scroll',
            '@media(max-width:1100px)':{
                margin:'30px auto'
            },
            '@media(max-width:600px)':{
                width:'95%',
                marginLeft:'auto'
            },
        }}>
        <Typography variant="h2" fontSize={"40px"} fontWeight={"600"}>
          Update the post
        </Typography>
        <Stack>
            <Stack m={'20px 0'}>
                <Typography variant="h5" fontSize={'20px'} bgcolor={theme.palette.primary.main} color="white"  borderRadius={'3px'} p={'5px'} m={'10px 0'} >Choose the image for Post:</Typography>
                <form onSubmit={handleSubmit}>  
                    <input type="file" accept="image/*" onChange={handleFileChange} />  
                    <Button variant='outlined' type="submit">Upload</Button>  
                </form>
                <Typography variant="h5" fontWeight={'600'} fontSize={'20px'} m={'20px 0'} bgcolor={theme.palette.primary.main} color="white"  borderRadius={'3px'} p={'5px'} >Uploaded image</Typography>
                {uploadImage && 
                <Box component={'img'} src={import.meta.env.VITE_DATA_API + uploadImage} sx={{width:'20%', margin:'10px 0'}} alt={uploadImage}/>
                }
                <FormControl>
                    <InputLabel id="demo-simple-select-autowidth-label">Category</InputLabel>
                    <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={cat}
                    onChange={handleChange}
                    autoWidth
                    label="Category"
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {categoryIds}
                    </Select>
                </FormControl>
            </Stack>
          <TextField id="outlined-basic" label="Title" variant="outlined" placeholder="Write the title of post"  onChange={(e)=>setTitle(e.target.value)} sx={{margin:'15px 0', width:'100%'}} />
          <TextField id="outlined-basic" label="Description" variant="outlined" multiline rows={4} placeholder="Write what is the post about" onChange={(e)=>setDescription(e.target.value)} sx={{margin:'15px 0', width:'100%'}} />
            <Stack display={'flex'} flexDirection={'row'} alignItems={'center'} gap={'10px'}>
                <Button variant="contained" onClick={()=>updatePost()}>Update</Button>
                <Button variant="contained" color="error" onClick={()=>navigate(-1)}>Cancel</Button>
            </Stack>
        </Stack>
      </Box>
    </>
  );
}
