import React from 'react'
import './App.css'
import peetImage from './assets/peet-the-handyman.jpeg'
import { Box, Link, Typography } from '@mui/material'
import FitText from './components/FitText'

export default function App() {

  const regularFontStyle = { fontFamily: 'Oswald', fontWeight: 400 }
  const lightFontStyle = { fontFamily: 'Oswald', fontWeight: 300, textAlign: 'left', fontSize: 24 }

  return (
    <>
    <Box width={"25rem"}>
        <Box sx={{my: "2rem"}}>
          <FitText>
            <Typography sx={regularFontStyle}>Peet The Handyman</Typography>
          </FitText>
          <img src={peetImage} alt="Peet The Handyman picture" width="100%"/>
          <FitText >
          <Typography sx={regularFontStyle}>Quick and quality service from Kleinmond to Rooi-Els</Typography>
          </FitText>
        </Box>
        <Box sx={{mb: "2rem"}}>
          <Typography sx={{...lightFontStyle, fontSize: 22}}>
            General home repairs<br />
            Assembly and installation<br />
            Carpentry and steelwork
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ ...regularFontStyle, textAlign: 'left', fontSize: 24 }}>Peet Steyn</Typography>
          <Typography sx={lightFontStyle}>082 372 9635</Typography>
          <Link
  href="mailto:peet-steyn@outlook.com"
  underline="always"
  color="inherit"
  sx={{ ...lightFontStyle, display: 'block' }}
>
  peet-steyn@outlook.com
</Link>
        </Box>
        </Box>
    </>
  )
}
