import { Box } from '@mui/material'
import React, { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

export default function Footer() {
  const location = useLocation()
  
  
  return (
    <>
      {location.pathname.includes('register') || location.pathname.includes('login') ? '' : 
      <>
        Footer
      </>
      }
    </>
  )
}