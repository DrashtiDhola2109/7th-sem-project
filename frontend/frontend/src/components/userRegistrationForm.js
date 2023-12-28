import React, { useState, useEffect } from 'react';
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  FormGroup,
  FormControl,
  FormLabel,
  Grid,
  Select,
  InputLabel,
  MenuItem
} from '@mui/material';

const UserRegistrationForm = () => {
  const [formData, setFormData] = useState({
    accessLeval: '',
    admin: false,
    applicableRoutes: [],
    local: false,
    password: '',
    shopOwner: false,
    userMail: '',
    userName: '',
    userPhone: '',
  });

  const [routes, setRoutes] = useState([]);
  // Fetch routes data from API
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await fetch('/route');
        if (response.ok) {
          const routeData = await response.json();
          setRoutes(routeData);
        } else {
          console.error('Failed to fetch routes');
        }
      } catch (error) {
        console.error('Error fetching routes:', error);
      }
    };
    fetchRoutes();
  }, []);

  const handleFormChange = (event) => {
    const { name, value, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'admin' || name === 'local' || name === 'shopOwner' ? checked : value,
    }));
  };

  const handleRoutesChange = (event) => {
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      applicableRoutes: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  try {
    const response = await fetch('/adduser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData), // Sending form data as JSON
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log('User added successfully:', responseData);
      // You can perform additional actions after successful user registration
    } else {
      console.error('Failed to register user');
      // Handle error scenarios
    }
  } catch (error) {
    console.error('Error registering user:', error);
    // Handle error scenarios
  }
};
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} alignItems="center">
        
        <Grid item xs={6}>
          <TextField
            name="userMail"
            label="Email"
            InputLabelProps={{
                style: { color: '#2D4059' }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#222831', // Changing border color when focused
                  },
                },
                width: '100%',
                color: '#222831',
              }}
            value={formData.userMail}
            onChange={handleFormChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="userName"
            label="Name"
            InputLabelProps={{
                style: { color: '#2D4059' }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#222831', // Changing border color when focused
                  },
                },
                width: '100%',
                color: '#222831',
              }}
            value={formData.userName}
            onChange={handleFormChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="userPhone"
            label="Phone"
            InputLabelProps={{
                style: { color: '#2D4059' }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#222831', // Changing border color when focused
                  },
                },
                width: '100%',
                color: '#222831',
              }}
            value={formData.userPhone}
            onChange={handleFormChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="password"
            label="Password"
            type="password"
            InputLabelProps={{
                style: { color: '#2D4059' }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#222831', // Changing border color when focused
                  },
                },
                width: '100%',
                color: '#222831',
              }}
            value={formData.password}
            onChange={handleFormChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth
          sx={{
            '& label.Mui-focused': { color: '#222831' },
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: '#222831', // Changing border color when focused
              },
            },
            width: '100%',
            textAlign: 'left'
            // color: '#222831',
          }}>
            <InputLabel id="applicable-routes-label">Applicable Routes</InputLabel>
            <Select
              labelId="applicable-routes-label"
              id="applicable-routes"
              multiple
              value={formData.applicableRoutes}
              onChange={handleRoutesChange}
              label="Applicable Routes"
              fullWidth
            >
              {routes.map((route) => (
                <MenuItem key={route._id} value={route._id}>
                  {route.RouteName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <TextField
            name="accessLeval"
            label="Access Level"
            InputLabelProps={{
                style: { color: '#2D4059' }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#222831', // Changing border color when focused
                  },
                },
                width: '100%',
                color: '#222831',
              }}
            value={formData.accessLeval}
            onChange={handleFormChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
  <FormControl component="fieldset">
    <FormLabel component="legend" sx={{ color: '#2D4059' }}>User Type</FormLabel>
    <FormGroup row>
      <Grid container spacing={1} alignItems="center">
        <Grid item>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.admin}
                onChange={handleFormChange}
                name="admin"
                sx={{ color: '#2D4059' }}
              />
            }
            label="Admin"
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.shopOwner}
                onChange={handleFormChange}
                name="shopOwner"
                sx={{ color: '#2D4059' }}
              />
            }
            label="Shop Owner"
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.local}
                onChange={handleFormChange}
                name="local"
                sx={{ color: '#2D4059' }}
              />
            }
            label="Local"
          />
        </Grid>
      </Grid>
    </FormGroup>
  </FormControl>
</Grid>
        {/* You can add fields for applicableRoutes if needed */}
        <Grid item xs={6}>
          <Button type="submit" variant="contained" sx={{
                backgroundColor: '#222831',
                width: '50%',
                '&:hover': {
                  backgroundColor: '#2D4059',
                },
              }}>
            Register
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default UserRegistrationForm;
