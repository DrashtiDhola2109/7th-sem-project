import React, { useEffect, useState } from 'react';
import { Select,
    MenuItem,
    InputLabel,
    FormControl,TextField, Button, Grid, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, IconButton, Paper, Divider, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Area = () => {
    const [zones, setZones] = useState([]);
    const [zoneId, setZoneId] = useState('');
    const [areaName, setAreaName] = useState('');
    const [areas, setAreas] = useState([]);
    const [editArea, setEditArea] = useState([]);
    const [editAreaId, setEditAreaId] = useState([]);
    const [editZoneId, setEditZoneId] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [filteredZone, setFilteredZone] = useState('');
  const [areaSearch, setAreaSearch] = useState('');
  
    const handleZoneChange = (event) => {
      setZoneId(event.target.value);
    };

    const handleEdit = (area) => {
        setEditArea(area);
        setEditAreaId(area._id);
        const selectedZone = zones.find(zone => zone.zoneName === area.zoneName);
        const selectedZoneId = selectedZone ? selectedZone._id : '';
        console.log(selectedZoneId);
        setEditZoneId(selectedZoneId);
        setEditModalOpen(true);
      };

      const handleSaveEdit = async () => {
        try {
          const response = await fetch(`/area/${editAreaId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              AreaName: editArea.AreaName,
              zoneId: editZoneId,
            }),
          });
      
          if (response.ok) {
            // Update the local areas state or fetchAreas() to update the list
            // handle success scenario
            console.log('Area updated successfully');
            fetchAreas();
            setEditModalOpen(false); // Close the modal after successful update
            // Fetch updated areas or update the local state to reflect the changes
          } else {
            console.error('Failed to update area');
          }
        } catch (error) {
          console.error('Error updating area:', error);
        }
      };
  
    useEffect(() => {
      fetchZones();
      fetchAreas();
    }, []);

    const fetchAreas = async () => {
        try {
          const response = await fetch('/area');
    
          if (response.ok) {
            const areaData = await response.json();
            setAreas(areaData);
          } else {
            console.error('Failed to fetch areas');
          }
        } catch (error) {
          console.error('Error fetching areas:', error);
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
  
    const handleAddArea = async (event) => {
        event.preventDefault();
      try {
        const response = await fetch('/addarea', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            AreaName: areaName,
            ZoneId: zoneId,
          }),
        });
  
        if (response.ok) {
          console.log('Area added successfully');
          // Handle success, clear form fields, etc.
          setAreaName('');
          setZoneId('');

          fetchAreas();
          // Optionally, fetch the updated list of areas or perform any necessary actions.
        } else {
          console.error('Failed to add area');
        }
      } catch (error) {
        console.error('Error adding area:', error);
      }
    };

    const handleDelete = async (areaId) => {
        try {
          const response = await fetch(`/area/${areaId}`, {
            method: 'DELETE',
          });
    
          if (response.ok) {
            await fetchAreas();
          } else {
            console.error('Failed to delete zone');
          }
        } catch (error) {
          console.error('Error deleting category:', error);
        }
      };
  
    const handleAreaNameChange = (event) => {
      setAreaName(event.target.value);
    };

    const handleZoneFilterChange = (event) => {
        setFilteredZone(event.target.value);
      };
    
      const handleAreaSearchChange = (event) => {
        setAreaSearch(event.target.value);
      };

    

  return (
    <div>
      <form>
        <Grid container spacing={2} alignItems="center">
        <Grid item xs={4}>
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
              <InputLabel id="zone-select-label">Zone</InputLabel>
              <Select
                labelId="zone-select-label"
                id="zone-select"
                value={zoneId}
                label="Zone"
                onChange={handleZoneChange}
              >
                {zones.map((zone) => (
                  <MenuItem key={zone._id} value={zone._id}>
                    {zone.zoneName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Area Name"
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
              value={areaName}
              onChange={handleAreaNameChange}
              fullWidth
            />
          </Grid>
          
          <Grid item xs={4}>
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
              onClick={handleAddArea}
            >
              Add Area
            </Button>
          </Grid>
        </Grid>
      </form>

      <Divider variant="middle" sx={{ marginTop: '20px', color : '222831'}} />


      <Grid container spacing={2} alignItems="center" sx={{ marginTop: '10px' }}>
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
            <InputLabel id="filter-zone-select-label">Filter by Zone</InputLabel>
            <Select
              labelId="filter-zone-select-label"
              id="filter-zone-select"
              label= "Filter By Zone"
              value={filteredZone}
              onChange={handleZoneFilterChange}
            >
              <MenuItem value="">All Zones</MenuItem>
              {zones.map((zone) => (
                <MenuItem key={zone._id} value={zone.zoneName}>
                  {zone.zoneName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Search Area Name"
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
            value={areaSearch}
            onChange={handleAreaSearchChange}
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
            <TableCell>Area Name</TableCell>
              <TableCell>Zone Name</TableCell>
              <TableCell colSpan={2}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {areas
    .filter((area) =>
      filteredZone ? area.zoneName === filteredZone : true
    )
    .filter((area) =>
      areaSearch ?
        area.AreaName.toLowerCase().includes(areaSearch.toLowerCase())
        : true
    ).map((area) => (
              <TableRow key={area._id}>
                <TableCell>{area.AreaName}</TableCell>
                <TableCell>{area.zoneName}</TableCell>
                <TableCell>
                <IconButton onClick={() => handleEdit(area)}>
  <EditIcon sx={{ color: 'green' }} align="center" />
</IconButton>
        Edit
      </TableCell>
      <TableCell>
        <IconButton onClick={() => handleDelete(area._id)}>
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
      <Dialog open={editModalOpen}>
        <DialogTitle>Edit Area</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel id="zone-edit-label">Zone</InputLabel>
            <Select
              labelId="zone-edit-label"
              id="zone-edit"
              value={editZoneId}
              label="Zone"
              onChange={(event) => setEditZoneId(event.target.value)}
            >
              {zones.map((zone) => (
                <MenuItem key={zone._id} value={zone._id}>
                  {zone.zoneName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Area Name"
            variant="outlined"
            value={editArea.AreaName}
            onChange={(event) => setEditArea({ ...editArea, AreaName: event.target.value })}
            fullWidth
            margin="normal"
            InputLabelProps={{
              style: { color: '#2D4059' },
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
          <Button
            onClick={() => {}}
            variant="contained"
            sx={{ backgroundColor: '#222831', width: '100%', '&:hover': { backgroundColor: '#2D4059' } }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleSaveEdit()}
            variant="contained"
            sx={{ backgroundColor: '#222831', width: '100%', '&:hover': { backgroundColor: '#2D4059' } }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Area;
