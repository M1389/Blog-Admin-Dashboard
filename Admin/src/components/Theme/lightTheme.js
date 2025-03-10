import { createTheme } from '@mui/material/styles';  

const lightTheme = createTheme({  
  
  palette: {
    mode:'light',  
    mode: 'light', // Set to light mode  
    primary: {  
      main: '#2980b9', // Light blue for primary actions  
    },  
    secondary: {  
      main: '#FFAB91', // Soft coral for secondary actions  
    },  
    error: {  
      main: '#FF5252', // Bright red for error alerts  
    },  
    bgMain: {  
      main: '#FFFFFF', // Pure white for the main background  
      secondary: '#F0F4F8', // Light gray for card backgrounds  
      lightPurple: '#E1B7E6', // Soft lilac for accents  
      lightDarkGray: '#EDEDED', // Very light gray for subtle backgrounds  
    },  
    textColor: {  
      text: '#4A4A4A', // Dark gray for general text  
      header: '#2C3E50', // A darker shade for headers  
    }  
  },  
  typography: {  
    fontFamily: "Inter, sans-serif", // Use Inter font  
    h1: {  
      fontWeight: 600,  
      fontSize: '2.4rem',  
      color: '#2C3E50', // Darker color for h1  
    },  
    h2: {  
      fontWeight: 600,  
      fontSize: '2rem',  
      color: '#2C3E50', // Darker color for h2  
    },  
    body1: {  
      fontSize: '1rem',  
      color: '#4A4A4A', // Dark gray for body text  
    },  
  },   
});  

export default lightTheme;