import React, { useState, useEffect } from 'react';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from '@mui/material';

const UserTable = () => {
  const [users, setUsers] = useState([]);

  // Fetch users data from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/user');
        if (response.ok) {
          const userData = await response.json();
          setUsers(userData);
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <TableContainer component={Paper}>
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
            
            <TableCell>User Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Admin</TableCell>
            <TableCell>shopOwner</TableCell>
            <TableCell>userPhone</TableCell>
            {/* Add more table header cells for other user details */}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id} sx={{
              '&:hover': {
                backgroundColor: '#B2C8DF',
              },
            }}>
              
              <TableCell>{user.userName}</TableCell>
              <TableCell>{user.userMail}</TableCell>
              <TableCell>{user.admin ? 'Admin' : ''}</TableCell>
              {/* <TableCell>{user.applicableRoutes}</TableCell> */}
              <TableCell>{user.shopOwner ? 'Shop Owner' : ''}</TableCell>
              <TableCell>{user.userPhone}</TableCell>
              {/* Add more table cells for other user details */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
