import { Box, Button, Divider, Stack, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import authSlice from "../../Store/authSlice";
import notify from "../../Utils/notify";
import { PieChart } from '@mui/x-charts/PieChart';
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";
import { UsersIcon } from "@heroicons/react/24/outline";
import { TagIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";





export default function Home() {
  const username = authSlice((state) => state.username);
  const theme = useTheme();
  const [time, setTime] = useState();
  const [report , setReport] = useState()
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      setTime(`${hours}:${minutes}`);
    };

    const counter = setInterval(updateTime, 1000);
  });

  useEffect(()=>{
    (async()=>{
      try {
        const res = await fetch(import.meta.env.VITE_BASE_API +  'report',{
          method:'GET',
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        })
        const data = await res?.json()
        console.log(data?.report)
        const formattedReport = Object.entries(data.report).map(([key, value]) => ({  
          name: key,  
          value: value,  
        })); 
        setReport(formattedReport)

        
        
        
        } catch (error) {
        console.log(error)
        notify('error', data.message)
      }
    })()
  },[])
  
  

  const darktopOS = [
    { name: 'Data Loading', value: 50 },
    { name: 'Data Loading', value: 50 },
    { name: 'Data Loading', value: 50 },
    { name: 'Data Loading', value: 50 }
  ]

  

  return (
    <>
      <Box
        component={"section"}
        width={"80%"}
        p={"30px 30px"}
        
        sx={{
          overflowY: "scroll",
          "@media(max-width:1100px)": {
            width: "80%",
            marginLeft: "auto",
          },
          "@media(max-width:1100px)": {
            width: "95%",
            margin: "auto",
          },
          "@media(max-width:350px)": {
            width: "100%",
            margin: "auto",
            marginLeft: "20px",
          },
        }}
      >
        <Stack bgcolor={theme.palette.bgMain.main} p={"50px 20px"} borderRadius={'20px'} sx={{
          '@media(max-width: 1100px)': {
            width:'90%',
            margin:'20px auto'
          },
          '@media(max-width: 427px)': {
            width:'100%',
            marginLeft:'auto'
          },
        }}>
          <Typography
            fontSize={"40px"}
            sx={{
              "@media(max-width: 1100px)": {
                fontSize: "30px",
              },
              "@media(max-width: 350px)": {
                fontSize: "20px",
              },
            }}
            fontWeight={"500"}
            color={theme.palette.textColor.header}
          >
            Welcome{" "}
            <Box component={"span"} fontWeight={"700"}>
              {username}
            </Box>
          </Typography>
          <Typography
            fontSize={"30px"}
            fontWeight={"900"}
            color={theme.palette.primary.main}
            fontStyle={'italic'}
          >
            {time} {time?.hours >=12 ? "PM" : "AM"}
          </Typography>
          <Divider
            sx={{
              borderColor: theme.palette.textColor.header,
              borderWidth: 1,
            }}
          />

          <Stack display={'flex'} flexDirection={'row'} gap={'20px'} p={'20px'} sx={{
            '@media(max-width: 1100px)': {
              flexDirection: 'column',
              
            },
            '@media(max-width: 355px)': {
              padding: '10px 2px',
              
            },
          }}>
          
          <Stack width={'42%'}  display={'flex'} alignItems={'center'} sx={{
            '@media(max-width: 1100px)': {
              width: '100%',
            },
          }}>
            <PieChart
                
                colors={['#000957', '#344CB7', '#577BC1','#57A6A1']} 
                series={[
                {
                  data: report ? report : darktopOS,
                  innerRadius: 55,
                  outerRadius:90,
                  cx: 100,
                  highlightScope: { fade: 'global', highlight: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                  valueFormatter:(data)=>{
                    return `${data.name} ${data.value}`
                  },
                },
              ]}
              height={200}
            />
          </Stack>
          
          <Stack display={'grid'} gridTemplateColumns={'repeat(2,1fr)'} width={'50%'} gap={'20px'}  sx={{
            width:'100%',
            '@media(max-width: 619px)': {
              gridTemplateColumns: 'repeat(1,1fr)',
            },
          }} >
            <Stack bgcolor={'#577BC1'} p={'10px'} display={'flex'} flexDirection={'column'} justifyContent={'space-between'} borderRadius={'10px'} width={'100%'}>
              <Stack display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}  >
              <Typography fontSize={'28px'} fontWeight={'700'} color={theme.palette.textColor.header} >
                Posts
              </Typography>
              <Square3Stack3DIcon width={'30px'} height={'30px'} color={theme.palette.textColor.header}/>
              </Stack>
              <Button onClick={()=>navigate('/posts')} sx={{width:'100%', textTransform:'none', paddingLeft:'0', fontSize:'15px'}}>Go to posts</Button>
            </Stack>
            
            <Stack bgcolor={'#000957'} p={'10px'} display={'flex'} flexDirection={'column'} justifyContent={'space-between'} borderRadius={'10px'}>
              <Stack display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
              <Typography fontSize={'28px'} fontWeight={'700'} color={theme.palette.textColor.header}>
                Users
              </Typography>
              <UsersIcon width={'30px'} height={'30px'} color={theme.palette.textColor.header}/>
              </Stack>
              <Button onClick={()=>navigate('/users')} sx={{width:'100%', textTransform:'none', paddingLeft:'0', fontSize:'15px'}}>Go to users</Button>
            </Stack>

            <Stack bgcolor={'#57A6A1'} p={'10px'} display={'flex'} flexDirection={'column'} justifyContent={'space-between'} borderRadius={'10px'}>
              <Stack display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
              <Typography fontSize={'28px'} fontWeight={'700'} color={theme.palette.textColor.header}>
                Comments
              </Typography>
              <ChatBubbleBottomCenterIcon width={'30px'} height={'30px'} color={theme.palette.textColor.header}/>
              </Stack>
              <Button onClick={()=>navigate('/comments')} sx={{width:'100%', textTransform:'none', paddingLeft:'0', fontSize:'15px'}}>Comments</Button>
            </Stack>

            <Stack bgcolor={'#344CB7'} p={'10px'} display={'flex'} flexDirection={'column'} justifyContent={'space-between'} borderRadius={'10px'}>
              <Stack display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
              <Typography fontSize={'28px'} fontWeight={'700'} color={theme.palette.textColor.header}>
                Categories
              </Typography>
              <TagIcon width={'30px'} height={'30px'} color={theme.palette.textColor.header}/>
              </Stack>
              <Button onClick={()=>navigate('/categories')} sx={{width:'100%', textTransform:'none', paddingLeft:'0', fontSize:'15px'}}>Categories</Button>
            </Stack>
            
            </Stack>
          </Stack>
          
        </Stack>
      </Box>
    </>
  );
}
