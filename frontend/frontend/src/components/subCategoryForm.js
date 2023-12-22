import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Paper,
  Divider,
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const SubCategoryForm = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [categoryID, setCategoryID] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [name, setSubCategoryName] = useState('');
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [editCategoryId, setEditCategoryId] = useState([]);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCategoryName, setSelectedSubCategoryName] = useState('');
  const [selectedCategoryDisplayName, setSelectedSubCategoryDisplayName] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const handleCategoryFilterChange = (event) => {
    setSelectedCategoryFilter(event.target.value);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleEdit = (subcategory) => {
    setSelectedSubCategoryId(subcategory._id);
    setSelectedSubCategoryDisplayName(subcategory.displayName);
    setSelectedSubCategoryName(subcategory.name);
    const selectedCategory = categoryData.find(category => category.name === subcategory.categoryName);
    const selecetdCategoryId = selectedCategory._id;
    setEditCategoryId(selecetdCategoryId);

    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setSelectedSubCategoryId('');
    setSelectedSubCategoryDisplayName('');
    setSelectedSubCategoryName('');
    setEditCategoryId('');
    setEditModalOpen(false);
  };

  const handleSubmitEdit = async () => {
    // Make a fetch request to update the subcategory using the updateSubcategory function
    try {
      const response = await fetch(`/subcategories/${selectedSubCategoryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: selectedCategoryName,
          categoryID: editCategoryId,
          displayName: selectedCategoryDisplayName,
        }),
      });

      if (response.ok) {
        console.log('Subcategory updated successfully');

        await getAllSubcategories();
        // Handle successful update
      } else {
        console.error('Failed to update subcategory');
      }
    } catch (error) {
      console.error('Error updating subcategory:', error);
    }

    // Close the edit modal after submission
    handleCloseEditModal();
  };

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
        await getAllSubcategories();
        setCategoryID('');
        setSubCategoryName('');
        setDisplayName('');
        // Handle successful insertion
      } else {
        console.error('Failed to add subcategory');
      }
    } catch (error) {
      console.error('Error adding subcategory:', error);
    }
  };

  const handleDelete = async (categoryId, index) => {
    try {
      const response = await fetch(`/subcategories/${categoryId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await getAllSubcategories();
      } else {
        console.error('Failed to delete category');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
    getAllSubcategories();
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

  const getAllSubcategories = async () => {
    try {
      const response = await fetch('/subcategories');
      if (response.ok) {
        const subcategories = await response.json();
        setSubCategoryData(subcategories);
      } else {
        console.error('Failed to fetch subcategories');
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={3}>
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

      <Divider variant="middle" sx={{ marginTop: '20px', color : '222831'}} />

      <Grid container spacing={2} alignItems="center" sx={{marginTop: '10px'}}>
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
              <InputLabel id="category-filter-label">Filter by Category</InputLabel>
        <Select
          labelId="category-filter-label"
          id="category-filter"
          value={selectedCategoryFilter}
          label="Filter by Category"
          onChange={handleCategoryFilterChange}
        >
          <MenuItem value="">All Categories</MenuItem>
          {categoryData.map((category) => (
            <MenuItem key={category._id} value={category.name}>
              {category.displayName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </Grid>

      <Grid item xs={6}>
      {/* Add Search Input for Subcategory Name and Display Name */}
      <TextField
        label="Search Subcategory"
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
        value={searchInput}
        onChange={handleSearchInputChange}
        fullWidth
      />
      </Grid>
      </Grid>

<Divider variant="middle" sx={{ marginTop: '20px', color : '222831'}} />

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
              <TableCell>Subcategory Name</TableCell>
              <TableCell>Display Name</TableCell>
              <TableCell>Category Name</TableCell>
              <TableCell colSpan={2}>Actions</TableCell>
              {/* Add more table headers if needed */}
            </TableRow>
          </TableHead>
          <TableBody>
        {subCategoryData
          .filter((subcategory) =>
            selectedCategoryFilter
              ? subcategory.categoryName === selectedCategoryFilter
              : true
          )
          .filter((subcategory) =>
            searchInput
              ? subcategory.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                subcategory.displayName.toLowerCase().includes(searchInput.toLowerCase())
              : true
          )
          .map((subcategory) => (
            <TableRow key={subcategory._id}
            sx={{
              '&:hover': {
                backgroundColor: '#B2C8DF',
              },
            }}>
                <TableCell>{subcategory.name}</TableCell>
                <TableCell>{subcategory.displayName}</TableCell>
                <TableCell>{subcategory.categoryName}</TableCell>
                {/* Add more table cells with corresponding data */}
                <TableCell>
        <IconButton onClick={() => handleEdit(subcategory)}>
          <EditIcon sx={{ color: 'green' }} align="center" />
        </IconButton>
        Edit
      </TableCell>
      <TableCell>
        <IconButton onClick={() => handleDelete(subcategory._id)}>
          <DeleteIcon sx={{ color: 'red' }} align="center" />
        </IconButton>
        Delete
      </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Divider variant="middle" sx={{ marginTop: '20px', color : '222831'}} />


      {/* Edit Modal */}
      {/* Edit Modal */}
      <Dialog open={editModalOpen} onClose={handleCloseEditModal}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
        <FormControl fullWidth 
        margin="normal"
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
      <InputLabel id="edit-category-select-label">Category</InputLabel>
      <Select
        labelId="edit-category-select-label"
        id="edit-category-select"
        value={editCategoryId}
        label="Category"
        onChange={(e) =>
          setEditCategoryId(e.target.value)
        }
      >
        {categoryData.map((category) => (
          <MenuItem key={category._id} value={category._id}>
            {category.displayName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
          <TextField
            label="Category Name"
            variant="outlined"
            value={selectedCategoryName}
            onChange={(e) => setSelectedSubCategoryName(e.target.value)}
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
            onChange={(e) => setSelectedSubCategoryDisplayName(e.target.value)}
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
          <Button onClick={handleCloseEditModal} variant="contained" sx={{ backgroundColor: '#222831', width: '100%','&:hover': {
        backgroundColor: '#2D4059', // Changing color on hover
      }, }}>
            Cancel
          </Button>
          <Button onClick={handleSubmitEdit}  variant="contained"  sx={{ backgroundColor: '#222831', width: '100%', '&:hover': {
        backgroundColor: '#2D4059', // Changing color on hover
      }, }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SubCategoryForm;
