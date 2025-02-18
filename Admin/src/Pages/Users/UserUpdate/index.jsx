import React, { useEffect } from 'react';  
import { Box, Button, InputAdornment, Stack, TextField, Typography } from '@mui/material';  
import { UserCircleIcon } from '@heroicons/react/24/outline';  
import { DevicePhoneMobileIcon } from '@heroicons/react/24/outline';  
import { KeyIcon } from '@heroicons/react/24/outline';  
import theme from '../../../components/Theme/theme';  
import { useNavigate, useParams } from 'react-router-dom';  
import { Formik, Form, Field, ErrorMessage } from 'formik';  
import * as Yup from 'yup';  
import notify from '../../../Utils/notify';
import { EnvelopeIcon } from '@heroicons/react/24/outline';


const validationSchema = Yup.object({  
  username: Yup.string().required('Username is required'),  
  password: Yup.string()  
    .required('Password is required')  
    .matches(  
      /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/,  
      'Password must be at least 8 characters, include at least one uppercase letter, and one number.'  
    ),  
  email: Yup.string().email('Invalid email address').required('Email is required'),  
  phone: Yup.string()  
    .matches(/^\d{11}$/, 'Phone number must be exactly 11 digits')  
    .required('Phone number is required'),  
});  


 

export default function UserUpdate() {  
  const navigate = useNavigate();  
  const {id} = useParams()
  const onSubmit = async (values, { setSubmitting }) => {  
    try {  
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {  
        method: 'PATCH',  
        headers: {  
          'Content-Type': 'application/json',  
          Authorization: `Bearer ${localStorage.getItem('token')}`,  
        },  
        body: JSON.stringify(values),  
      });  
      const data = await response.json();  
        notify('success', data.message);  
        navigate('/users')
    } catch (error) {  
      console.error('Error updating user:', error);  
      notify('error', 'Failed to update user.');  
    } finally {  
      setSubmitting(false);  
    }  
  }; 
   

  return (  
    <Box component="section" width="100%">  
      <Typography variant="h3" fontSize="40px" m="30px 10px" fontWeight="500" sx={{
          '@media(max-width:1050px)':{
              textAlign:'center'
          },
          '@media(max-width:314px)':{
              fontSize:'25px',
          },
      }}>  
        Update User  
      </Typography>  
      <Formik  
        initialValues={{  
          username: '',  
          password: '',  
          email: '',  
          phone: '',  
        }}  
        validationSchema={validationSchema}  
        onSubmit={onSubmit}  
      >  
        {({ isSubmitting, errors, touched }) => (  
          <Form>  
            <Stack display="flex" flexDirection="column" gap="15px" m="35px 20px" width="40%" sx={{
              '@media(max-width:1050px)':{
                width:'70%',
                margin:'0 auto'
              },
              '@media(max-width:430px)':{
                width:'calc(90% - 75px)',
                marginLeft:'auto'
                
              },
            }}>  
              <Field  
                as={TextField}  
                id="username"  
                name="username"  
                label="Username"  
                variant="outlined"  
                error={touched.username && !!errors.username} // Show error border  
                helperText={touched.username && errors.username} // Show error message  
                InputProps={{  
                  startAdornment: (  
                    <InputAdornment position="start">  
                      <UserCircleIcon width="26px" height="26px" />  
                    </InputAdornment>  
                  ),  
                }}  
              />  

              <Field  
                as={TextField}  
                id="password"  
                name="password"  
                label="Password"  
                type="text"  
                variant="outlined"  
                error={touched.password && !!errors.password} // Show error border  
                helperText={touched.password && errors.password} // Show error message  
                InputProps={{  
                  startAdornment: (  
                    <InputAdornment position="start">  
                      <KeyIcon width="26px" height="26px" />  
                    </InputAdornment>  
                  ),  
                }}  
              />  

              <Field  
                as={TextField}  
                id="email"  
                name="email"  
                label="Email"  
                variant="outlined"  
                error={touched.email && !!errors.email} 
                helperText={touched.email && errors.email}  
                InputProps={{  
                  startAdornment: (  
                    <InputAdornment position="start">  
                      <EnvelopeIcon width="26px" height="26px" />  
                    </InputAdornment>  
                  ),  
                }}  
              />  

              <Field  
                as={TextField}  
                id="phone"  
                name="phone"  
                label="Phone Number"  
                variant="outlined"  
                error={touched.phone && !!errors.phone} 
                helperText={touched.phone && errors.phone} 
                InputProps={{  
                  startAdornment: (  
                    <InputAdornment position="start">  
                      <DevicePhoneMobileIcon width="26px" height="26px" />  
                    </InputAdornment>  
                  ),  
                }}  
              />  

              <Stack display="flex" flexDirection="row" gap="15px" m="20px 0" flexWrap={'wrap'}>  
                <Button type="submit" variant="contained" disabled={isSubmitting}>  
                  Update User  
                </Button>  
                <Button  
                  variant="contained"  
                  onClick={() => navigate(-1)}  
                  sx={{ bgcolor: theme.palette.error.main }}  
                >  
                  Cancel Update  
                </Button>  
              </Stack>  
            </Stack>  
          </Form>  
        )}  
      </Formik>  
    </Box>  
  );  
}