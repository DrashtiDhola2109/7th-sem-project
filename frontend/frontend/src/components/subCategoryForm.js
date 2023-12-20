import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';

const SubCategoryForm = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [categoryID, setCategoryID] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [name, setSubCategoryName] = useState('');

  const handleCategoryChange = (event) => {
    setCategoryID(event.target.value);
  };

  const handleDisplayNameChange = (event) => {
    setDisplayName(event.target.value);
  };

  const handleSubCategoryNameChange = (event) => {
    setSubCategoryName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/addSubCategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          categoryID: categoryID,
          displayName: displayName,
        }),
      });

      if (response.ok) {
        console.log('Subcategory added successfully');
        // Handle successful insertion
      } else {
        console.error('Failed to add subcategory');
      }
    } catch (error) {
      console.error('Error adding subcategory:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/categories');
      if (response.ok) {
        const categories = await response.json();
        setCategoryData(categories);
      } else {
        console.error('Failed to fetch categories');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={3}>
            <FormControl fullWidth 
            sx={{
                '& .MuiInputLabel-root': {
                  color: '#222831', // Changing input label color
                },
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#222831', // Changing border color when focused
                  },
                },
                width: '100%',
                color: '#222831',
              }}>
              <InputLabel id="category-select-label">Category</InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                value={categoryID}
                label="Category"
                onChange={handleCategoryChange}
              >
                {categoryData.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.displayName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Display Name"
              variant="outlined"
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
              value={displayName}
              onChange={handleDisplayNameChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Subcategory Name"
              variant="outlined"
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
              value={name}
              onChange={handleSubCategoryNameChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" type="submit"
            sx={{ 
                backgroundColor: '#222831', 
                width: '100%', 
                '&:hover': {
                  backgroundColor: '#2D4059', // Changing color on hover
                },
                }}
            >
              Add Subcategory
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default SubCategoryForm;
