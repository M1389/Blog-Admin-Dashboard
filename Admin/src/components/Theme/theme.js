import { createTheme } from '@mui/material/styles';  


const theme = createTheme({  
  palette: {  
    primary: {  
      main: '#6750A4',  
    },  
    secondary: {  
      main: '#dc004e',  
    },
    bgMain: {
        main: '#0F1026',
        secondary: '#fff',
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