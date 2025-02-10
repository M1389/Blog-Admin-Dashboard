import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography } from '@mui/material';  
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';  
import React from 'react';  
import { Formik } from 'formik';  
import * as Yup from 'yup';  
import theme from '../../../components/Theme/theme';  
import fetchData from '../../../Utils/FetchData';
import notify from '../../../Utils/notify';
import { data, useNavigate } from 'react-router-dom';
import authSlice from '../../../Store/authSlice.js';






const Login = () => {
  const navigate = useNavigate()
  const handleFormSubmit = async(values) => {  
  const setToken = authSlice((state)=> state.setToken)
    try {
      const res = await fetch('http://localhost:5000/api/auth',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(values)
        
        
      })
      const data = await res?.json()
      notify('success', data.message)
      setToken(data?.token)
      localStorage.setItem('token', data.token)
      navigate('/')
    } catch (error) {
      console.log(error)
      notify('error', data.message)
    }
  };  
  
  const [showPassword, setShowPassword] = React.useState(false);  

  const handleClickShowPassword = () => setShowPassword((show) => !show);  

  const handleMouseDownPassword = (event) => {  
    event.preventDefault();  
  };  

  const validationSchema = Yup.object().shape({  
    username: Yup.string().required('Username is required'),
    password: Yup.string()  
      .required('Password is required')  
      .min(8, 'Password must be at least 8 characters')  
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')  
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')  
      .matches(/[0-9]/, 'Password must contain at least one number')  
      .matches(/[@$!%*?&#]/, 'Password must contain at least one special character'),  
  });  

  return (  
    <Formik  
      initialValues={{ username: '', password: '' }}  
      validationSchema={validationSchema}  
      onSubmit={handleFormSubmit} // Pass the logging function here  
    >  
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (  
        <Box component={'section'} sx={{  
          position: 'relative',  
          width: '100%',  
          height: '100%',  
        }}>  
          <Stack sx={{  
            position: 'fixed',  
            top: '50%',  
            left: '50%',  
            transform: 'translate(-50%, -50%)',  
            width: '80%',  
            height: '100%',  
            backgroundImage: 'url(/assets/OfferCard.svg)',  
            backgroundPosition: 'center',  
            backgroundRepeat: 'no-repeat',  
            backgroundSize: 'cover',  
            display: 'flex',  
            flexDirection: 'row-reverse',  
            alignItems: 'center',  
            justifyContent: 'space-between',  
            borderRadius: '20px',  
            overflow: 'hidden',  
            gap: '40px',  
            padding: '20px 30px',
            '@media(max-width:1100px)':{
              flexDirection:'column',
              justifyContent:'center',
              padding:'100px 20px'
            },
            '@media(max-width:354px)':{
              width:'100%'
            }
          }}>  
            <Stack sx={{ 
              width: '50%',
              '@media(max-width:1100px)':{
                width:'100%',
                textAlign:'center'
                
              }
            }}>  
              <Typography variant='h2' fontWeight={'550'} color={theme.palette.bgMain.secondary} sx={{
                '@media(max-width:480px)':{
                  fontSize:'30px'
                }
              }}>  
                Welcome Back !!! please login
              </Typography>  
            </Stack>  
            <Stack width={'30%'} display={'flex'} gap={'10px'} bgcolor={theme.palette.bgMain.secondary} padding={'20px 20px'} boxShadow={'0 0 10px 5px rgba(0,0,0,0.2)'} borderRadius={'5px'} sx={{
              '@media(max-width:1100px)':{
                width:'60%'
              },
              '@media(max-width:560px)':{
                width:'90%'
              },
              '@media(max-width:360px)':{
                width:'100%'
              }
            }}>  
              <FormControl variant="standard">  
                <TextField  
                  id="username"  
                  label="Username"  
                  name="username"  
                  onChange={handleChange}  
                  onBlur={handleBlur}  
                  value={values.username}  
                  error={touched.username && Boolean(errors.username)}  
                  helperText={touched.username && errors.username}  
                />  
              </FormControl>  
              
              <FormControl sx={{ width: '100%' }} variant="outlined">  
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>  
                <OutlinedInput  
                  id="password"  
                  name="password"  
                  type={showPassword ? 'text' : 'password'}  
                  onChange={handleChange}  
                  onBlur={handleBlur}  
                  value={values.password}  
                  error={touched.password && Boolean(errors.password)}  
                  endAdornment={  
                    <InputAdornment position="end">  
                      <IconButton  
                        aria-label={showPassword ? 'hide the password' : 'display the password'}  
                        onClick={handleClickShowPassword}  
                        onMouseDown={handleMouseDownPassword}  
                        edge="end"  
                      >  
                        {showPassword ? <EyeSlashIcon width={'22px'} height={'22px'} /> : <EyeIcon width={'22px'} height={'22px'} />}  
                      </IconButton>  
                    </InputAdornment>  
                  }  
                  label="Password"  
                />  
                {touched.password && errors.password && <Typography color="error">{errors.password}</Typography>}  
              </FormControl>  
              <Button variant='contained' onClick={handleSubmit}>Submit</Button>  
              <Button variant='text' onClick={()=>navigate('/auth/register')} sx={{fontSize:'12px', textTransform:'none'}}>Have no account?</Button>
            </Stack>  
          </Stack>  
        </Box>  
      )}  
    </Formik>  
  );  
};  

export default Login;