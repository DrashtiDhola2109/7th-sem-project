import React, { useState } from 'react';
import { TextField, Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const InsertForm = () => {
  const [categoryName, setCategoryName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCategoryNameChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleDisplayNameChange = (event) => {
    setDisplayName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newData = { categoryName, displayName };
    setData([...data, newData]);
    setCategoryName('');
    setDisplayName('');
  };

  const handleEdit = (index) => {
    console.log('Edit Index:', index);
    // Implement edit functionality here
  };

  const handleDelete = (index) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((row) => {
    return row.categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.displayName.toLowerCase().includes(searchTerm.toLowerCase());
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
              sx={{ borderColor: '#222831', color: '#222831', width: '100%' }}
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
              sx={{ borderColor: '#222831', color: '#222831', width: '100%' }}
              value={displayName}
              onChange={handleDisplayNameChange}
            />
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" type="submit" sx={{ backgroundColor: '#222831', width: '100%' }}>
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
        sx={{ borderColor: '#222831', color: '#222831', width: '100%', marginTop: '20px' }}
        value={searchTerm}
        onChange={handleSearch}
      />

      <Divider variant="middle" sx={{ marginTop: '20px', color : '222831' }} />

      <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category Name</TableCell>
              <TableCell>Display Name</TableCell>
              <TableCell colSpan={2} align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.categoryName}</TableCell>
                <TableCell>{row.displayName}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(index)}>
                    <EditIcon sx={{ color : 'green'}} align="center"/>
                  </IconButton>
                  Edit
                  </TableCell>
                  <TableCell>
                  <IconButton onClick={() => handleDelete(index)}>
                    <DeleteIcon sx={{ color : 'red'}} align="center"/>
                  </IconButton>
                  Delete
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default InsertForm;
