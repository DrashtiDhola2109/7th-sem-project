import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, IconButton, Paper, Divider, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ZoneForm = () => {
  const [zoneName, setZoneName] = useState('');
  const [zones, setZones] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [editZone, setEditZone] = useState({
    id: '', // To store zone ID
    name: '', // To store zone name
  });

  const handleEdit = (zoneId, zoneName) => {
    // Set the zone to edit when the Edit button is clicked
    setEditZone({ id: zoneId, name: zoneName });
  };

  const handleEditZoneNameChange = (event) => {
    // Update the edited zone name in the state
    setEditZone({ ...editZone, name: event.target.value });
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`/zone/${editZone.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          zoneName: editZone.name,
        }),
      });

      if (response.ok) {
        console.log('Zone updated successfully');
        // Close the edit modal or update the zone data
        await fetchZones();
        setEditZone({ id: '', name: '' }); // Clear the edit zone state
      } else {
        console.error('Failed to update zone');
      }
    } catch (error) {
      console.error('Error updating zone:', error);
    }
  };

  useEffect(() => {
    fetchZones();
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleDelete = async (zoneId, index) => {
    try {
      const response = await fetch(`/zone/${zoneId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchZones();
      } else {
        console.error('Failed to delete zone');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const fetchZones = async () => {
    try {
      const response = await fetch('/zone');

      if (response.ok) {
        const zoneData = await response.json();
        setZones(zoneData);
      } else {
        console.error('Failed to fetch zones');
      }
    } catch (error) {
      console.error('Error fetching zones:', error);
    }
  };

  const handleZoneNameChange = (event) => {
    setZoneName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/addzone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          zoneName: zoneName,
        }),
      });

      if (response.ok) {
        console.log('Zone added successfully');
        fetchZones();
        // Handle successful insertion, clear form fields, etc.
        setZoneName('');
      } else {
        console.error('Failed to add zone');
      }
    } catch (error) {
      console.error('Error adding zone:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <TextField
              label="Zone Name"
              variant="outlined"
              InputLabelProps={{
                style: { color: '#2D4059' }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#222831',
                  },
                },
                width: '100%',
                color: '#222831',
              }}
              value={zoneName}
              onChange={handleZoneNameChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: '#222831',
                width: '100%',
                '&:hover': {
                  backgroundColor: '#2D4059',
                },
              }}
            >
              Add Zone
            </Button>
          </Grid>
        </Grid>
      </form>

      <Divider variant="middle" sx={{ marginTop: '20px', color : '222831'}} />


      <Grid container spacing={2} alignItems="center" sx={{ marginTop: '10px' }}>
        <Grid item xs={12}>
          {/* Search Input for Zones */}
          <TextField
            label="Search Zone"
            variant="outlined"
            InputLabelProps={{
              style: { color: '#2D4059' }
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#222831',
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
                }}>
            <TableRow>
              <TableCell>Zone Name</TableCell>
              <TableCell colSpan={2}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {zones
              .filter((zone) =>
                zone.zoneName.toLowerCase().includes(searchInput.toLowerCase())
              )
              .map((filteredZone) => (
                <TableRow key={filteredZone._id}>
                  <TableCell>{filteredZone.zoneName}</TableCell>
                <TableCell>
        <IconButton onClick={() => handleEdit(filteredZone._id, filteredZone.zoneName)}>
          <EditIcon sx={{ color: 'green' }} align="center" />
        </IconButton>
        Edit
      </TableCell>
      <TableCell>
        <IconButton onClick={() => handleDelete(filteredZone._id)}>
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
      <Dialog open={editZone.id !== ''}>
        <DialogTitle>Edit Zone</DialogTitle>
        <DialogContent>
          <TextField
            label="Zone Name"
            variant="outlined"
            value={editZone.name}
            onChange={handleEditZoneNameChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              style: { color: '#2D4059' }
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#222831',
                },
              },
              width: '100%',
              color: '#222831',
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditZone({ id: '', name: '' })} variant="contained" sx={{ backgroundColor: '#222831', width: '100%', '&:hover': { backgroundColor: '#2D4059' } }}>
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} variant="contained" sx={{ backgroundColor: '#222831', width: '100%', '&:hover': { backgroundColor: '#2D4059' } }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ZoneForm;
