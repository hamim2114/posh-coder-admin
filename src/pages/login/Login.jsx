import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [token, setToken] = useState({})
  const navigate = useNavigate()
  const handleSubmit = (event) => {
    // event.preventDefault();
    const data = new FormData(event.currentTarget);
    setToken({
      email: data.get('email'),
      password: data.get('password'),
    });
    sessionStorage.setItem('poshcoder_admin', JSON.stringify({
      email: data.get('email'),
      password: data.get('password'),
    }))
  };
  useEffect(() => {
    if (token) {
      navigate('/admin/dashboard')
    }
  }, [token])

  return (
    <Stack sx={{
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      px: 6
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '400px'
      }}
      >
        <Typography component="h1" variant="h5" color='gray'>
          Posh-Coder-Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            size='small'
            margin="normal"
            required
            fullWidth
            id="email"
            value='demo@mail.com'
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            size='small'
            // margin="normal"
            required
            fullWidth
            value='12345'
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            size='small'
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Stack>
  );
}