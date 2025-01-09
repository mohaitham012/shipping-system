import React, { useEffect, useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  InputAdornment,
  Typography,
  Box,
  Tooltip
} from '@mui/material';
import {
  Search as SearchIcon,
  Delete as DeleteIcon,
  Block as BlockIcon,
  Mail as MailIcon
} from '@mui/icons-material';
import axios from 'axios';

const UsersEmails = ({ url }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allEmails, setAllEmails] = useState([]); // لتخزين جميع البيانات الأصلية
  const [filteredEmails, setFilteredEmails] = useState([]); // لتخزين البيانات المصفاة
  const token = localStorage.getItem('token');

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value) {
      const filtered = allEmails.filter((email) =>
        email.name.toLowerCase().includes(value.toLowerCase()) ||
        email.email.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredEmails(filtered);
    } else {
      // إذا تم حذف نص البحث، يتم عرض جميع البيانات
      setFilteredEmails(allEmails);
    }
  };

  const getAllUsersData = async () => {
    try {
      const response = await axios.get(`${url}/api/user/all`, { headers: { token } });
      if (response.data.success) {
        setAllEmails(response.data.data); // تعيين جميع البيانات الأصلية
        setFilteredEmails(response.data.data); // تعيين البيانات المصفاة لتكون نفس البيانات الأصلية في البداية
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };

  useEffect(() => {
    getAllUsersData();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Users Emails
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage and monitor user email accounts
        </Typography>
      </Box>

      {/* Search and Filters */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ maxWidth: 500 }}
        />
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Avatar</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmails.map((row) => (
              <TableRow key={row._id} hover>
                <TableCell>
                  <img
                    src={row.imageUrl || 'https://via.placeholder.com/40'}
                    alt={row.name}
                    style={{ width: 40, height: 40, borderRadius: '50%' }}
                  />
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <MailIcon fontSize="small" color="action" />
                    {row.email}
                  </Box>
                </TableCell>
                <TableCell>
                  <Tooltip title="Block User">
                    <IconButton size="small" color="warning">
                      <BlockIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete User">
                    <IconButton size="small" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UsersEmails;