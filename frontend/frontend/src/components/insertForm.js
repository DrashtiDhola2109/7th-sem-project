import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Divider, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const InsertForm = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedCategoryName, setSelectedCategoryName] = useState('');
  const [selectedCategoryDisplayName, setSelectedCategoryDisplayName] = useState('');

  const handleCategoryNameChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleDisplayNameChange = (event) => {
    setDisplayName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/addCategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: categoryName, displayName: displayName }),
      });

      if (response.ok) {
        const newData = await response.json();
        setData([...data, newData.Data.newCategory]); // Update data with the newly added category
        setCategoryName('');
        setDisplayName('');
      } else {
        console.error('Failed to add category');
      }
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleEdit = (category) => {
    const selectedCategory = category;
    setSelectedCategoryId(selectedCategory._id);
    setSelectedCategoryName(selectedCategory.name);
    setSelectedCategoryDisplayName(selectedCategory.displayName);
    setEditModalOpen(true); // Open the modal when Edit button is clicked
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setSelectedCategoryId('');
    setSelectedCategoryName('');
    setSelectedCategoryDisplayName('');
  };

  const handleEditModalSave = async () => {
    try {
      const response = await fetch(`/categories/${selectedCategoryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: selectedCategoryName, displayName: selectedCategoryDisplayName }),
      });

      if (response.ok) {
        const updatedData = [...data];
        const updatedCategory = { _id: selectedCategoryId, name: selectedCategoryName, displayName: selectedCategoryDisplayName };
        const updatedIndex = updatedData.findIndex(category => category._id === selectedCategoryId);
        updatedData[updatedIndex] = updatedCategory;
        setData(updatedData);
        handleEditModalClose();
      } else {
        console.error('Failed to update category');
      }
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };


  const handleDelete = async (categoryId, index) => {
    try {
      const response = await fetch(`/categories/${categoryId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedData = [...data];
        updatedData.splice(index, 1);
        setData(updatedData);
      } else {
        console.error('Failed to delete category');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/categories');
      if (response.ok) {
        const categories = await response.json();
        setData(categories);
      } else {
        console.error('Failed to fetch categories');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const filteredData = data.filter((category) => {
    return (
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.displayName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container direction="row" alignItems="center" spacing={2}>
          <Grid item xs={4}>
            <TextField
              label="Category Name"
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
              value={categoryName}
              onChange={handleCategoryNameChange}
            />
          </Grid>
          <Grid item xs={4}>
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
            />
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" type="submit" 
            sx={{ 
              backgroundColor: '#222831', 
              width: '100%', 
              '&:hover': {
                backgroundColor: '#2D4059', // Changing color on hover
              },
              }}>
              Add
            </Button>
          </Grid>
        </Grid>
      </form>

      <Divider variant="middle" sx={{ marginTop: '20px', color : '222831'}} />

      <TextField
        label="Enter Category name or Display name to search"
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
    marginTop: '20px'
  }}
        value={searchTerm}
        onChange={handleSearch}
      />

      <Divider variant="middle" sx={{ marginTop: '20px', color : '222831' }} />

      <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
        <Table>
          <TableHead sx={{ 
                backgroundColor: '#222831', 
                color: '#EEEEEE', // Text color of the table header
  '& th': {
    color: '#EEEEEE', // Text color of the table cells within the header
  },
                width: '100%', 
                '&:hover': {
                  backgroundColor: '#2D4059', // Changing color on hover
                },
                }}
            >
            <TableRow>
              <TableCell>Category Name</TableCell>
              <TableCell>Display Name</TableCell>
              <TableCell colSpan={2} align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  {filteredData.map((category, index) => (
    <TableRow key={category._id}>
      <TableCell>{category.name}</TableCell>
      <TableCell>{category.displayName}</TableCell>
      <TableCell>
        <IconButton onClick={() => handleEdit(category)}>
          <EditIcon sx={{ color: 'green' }} align="center" />
        </IconButton>
        Edit
      </TableCell>
      <TableCell>
        <IconButton onClick={() => handleDelete(category._id, index)}>
          <DeleteIcon sx={{ color: 'red' }} align="center" />
        </IconButton>
        Delete
      </TableCell>
    </TableRow>
  ))}
</TableBody>
        </Table>
      </TableContainer>

      {/* Edit Modal */}
      <Dialog open={editModalOpen} onClose={handleEditModalClose}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <TextField
            label="Category Name"
            variant="outlined"
            value={selectedCategoryName}
            onChange={(e) => setSelectedCategoryName(e.target.value)}
            fullWidth
            margin="normal"
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
          />
          <TextField
            label="Display Name"
            variant="outlined"
            value={selectedCategoryDisplayName}
            onChange={(e) => setSelectedCategoryDisplayName(e.target.value)}
            fullWidth
            margin="normal"
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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditModalClose} variant="contained" sx={{ backgroundColor: '#222831', width: '100%','&:hover': {
        backgroundColor: '#2D4059', // Changing color on hover
      }, }}>
            Cancel
          </Button>
          <Button onClick={handleEditModalSave} variant="contained"  sx={{ backgroundColor: '#222831', width: '100%', '&:hover': {
        backgroundColor: '#2D4059', // Changing color on hover
      }, }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default InsertForm;
