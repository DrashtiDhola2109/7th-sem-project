import React, { useEffect, useState } from 'react';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Paper,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Grid,
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const RouteForm = () => {
    const [routes, setRoutes] = useState([]);
    const [areas, setAreas] = useState([]);
    const [areaId, setAreaId] = useState('');
    const [routeName, setRouteName] = useState('');
    const [editModalOpen, setEditModalOpen] = useState(false);
  const [editRouteId, setEditRouteId] = useState('');
  const [editAreaId, setEditAreaId] = useState('');
  const [editRouteName, setEditRouteName] = useState('');
  const [filteredArea, setFilteredArea] = useState('');
  const [routeSearch, setRouteSearch] = useState('');
  
    useEffect(() => {
  
      fetchAreas();
      fetchRoutes()
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
      }

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
      }

      const handleEdit = (routeId, areaName, routeName) => () => {
        setEditModalOpen(true);
        setEditRouteId(routeId);
        setEditRouteName(routeName);
        const selectedArea = areas.find((area) => area.AreaName === areaName);
        const selectedAreaId = selectedArea ? selectedArea._id : '';
        setEditAreaId(selectedAreaId);
      };
    
      const handleCloseEditModal = () => {
        setEditModalOpen(false);
        // Reset edit values to clear after modal close
        setEditRouteId('');
        setEditAreaId('');
        setEditRouteName('');
      };

      const handleSaveEdit = async () => {
        try {
          const response = await fetch(`/route/${editRouteId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              RouteName: editRouteName,
              AreaId: editAreaId
            })
          });
    
          if (response.ok) {
            console.log('Route updated successfully:');
            fetchRoutes();
            handleCloseEditModal(); // Close the edit modal after successful update
          } else {
            console.error('Failed to update route');
          }
        } catch (error) {
          console.error('Error updating route:', error);
        }
      };

      const handleDelete = async (routeId) => {
        try {
          const response = await fetch(`/route/${routeId}`, {
            method: 'DELETE',
          });
    
          if (response.ok) {
            await fetchRoutes();
          } else {
            console.error('Failed to delete zone');
          }
        } catch (error) {
          console.error('Error deleting category:', error);
        }
      };
    
  
    const handleAreaChange = (event) => {
      setAreaId(event.target.value);
    };
  
    const handleRouteNameChange = (event) => {
      setRouteName(event.target.value);
    };

  const handleAddRoute = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/addRoute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          RouteName: routeName,
          AreaId: areaId
        })
      });

      if (response.ok) {
        await fetchRoutes();
        // Handle success - clear form fields, update routes, etc.
        setRouteName('');
        setAreaId('');
      } else {
        console.error('Failed to add route');
      }
    } catch (error) {
      console.error('Error adding route:', error);
    }
  };

  const handleAreaFilterChange = (event) => {
    setFilteredArea(event.target.value);
  };

  const handleRouteSearchChange = (event) => {
    setRouteSearch(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleAddRoute}>
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
          <InputLabel id="area-select-label">Area</InputLabel>
          <Select
            labelId="area-select-label"
            id="area-select"
            value={areaId}
            label="Area"
            onChange={handleAreaChange}
          >
            {/* Options for Areas */}
            {areas.map((area) => (
              <MenuItem key={area._id} value={area._id}>
                {area.AreaName} - {area.zoneName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        </Grid>

        <Grid item xs={4}>
        <TextField
          label="Route Name"
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
          value={routeName}
          onChange={handleRouteNameChange}
          fullWidth
        />
        </Grid>

        <Grid item xs={4}>
        <Button type="submit" variant="contained" sx={{
                backgroundColor: '#222831',
                width: '100%',
                '&:hover': {
                  backgroundColor: '#2D4059',
                },
              }}>
          Add Route
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
            <InputLabel id="filter-Area-select-label">Filter by Area</InputLabel>
            <Select
              labelId="filter-Area-select-label"
              id="filter-Area-select"
              label= "Filter By Area"
              value={filteredArea}
              onChange={handleAreaFilterChange}
            >
              <MenuItem value="">All Area</MenuItem>
              {areas.map((area) => (
                <MenuItem key={area._id} value={area.AreaName}>
                  {area.AreaName}
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
            value={routeSearch}
            onChange={handleRouteSearchChange}
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
              <TableCell>Route Name</TableCell>
              <TableCell>Area Name</TableCell>
              <TableCell colSpan={2}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {routes
            .filter((route) =>
      filteredArea ? route.AreaName === filteredArea : true
    )
    .filter((route) =>
      routeSearch ?
      route.RouteName.toLowerCase().includes(routeSearch.toLowerCase())
        : true
    ).map((route) => (
              <TableRow key={route._id}>
                <TableCell>{route.RouteName}</TableCell>
                <TableCell>{route.AreaName}</TableCell>
                <TableCell>
                  <IconButton onClick={handleEdit(route._id, route.AreaName, route.RouteName)}>
                    <EditIcon sx={{ color: 'green' }} align="center" />
                  </IconButton>
                  Edit
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDelete(route._id)}>
                    <DeleteIcon sx={{ color: 'red' }} align="center"/>
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
        <DialogTitle>Edit Route</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel id="edit-area-select-label">Area</InputLabel>
            <Select
              labelId="edit-area-select-label"
              id="edit-area-select"
              value={editAreaId}
              label="Area"
              onChange={(event) => setEditAreaId(event.target.value)}
            >
              {/* Options for Areas */}
              {areas.map((area) => (
                <MenuItem key={area._id} value={area._id}>
                  {area.AreaName} - {area.zoneName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Route Name"
            variant="outlined"
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
            value={editRouteName}
            onChange={(event) => setEditRouteName(event.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleCloseEditModal} sx={{ backgroundColor: '#222831', width: '100%', '&:hover': { backgroundColor: '#2D4059' } }}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveEdit} sx={{ backgroundColor: '#222831', width: '100%', '&:hover': { backgroundColor: '#2D4059' } }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RouteForm;
