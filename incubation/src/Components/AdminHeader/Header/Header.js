import React from 'react'
import {AppBar , Box , Toolbar , Typography , Button, IconButton ,} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';


function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar className='heading' style={{backgroundColor: '#06002b'}} position="static">
      <Toolbar >
        <IconButton className='icon'
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Admin
        </Typography>
      </Toolbar>
    </AppBar>
  </Box>
  )
}

export default Header