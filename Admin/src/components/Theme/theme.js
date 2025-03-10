import { createTheme } from '@mui/material/styles';  


const theme = createTheme({  
  palette: {  
    
    primary: {
      mode:'dark',  
      main: '#6750A4',  
    },  
    secondary: {  
      main: '#dc004e',  
    },
    error:{
      main: '#e74c3c'
    },
    bgMain: {
        main: '#0F1026',
        secondary: '#fff',
        lightPurple:'#d2b4de',
        lightDarkGray:'#283747',
    },
    textColor: {
        text: '#8F92A1',
        header:'#fff',
    }
  },  
  typography: {  
    fontFamily: "Inter", 
     
  }, 
});

export default theme