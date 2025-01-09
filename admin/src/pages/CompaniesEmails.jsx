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
  Chip,
  Tooltip
} from '@mui/material';
import {
  Search as SearchIcon,
  Delete as DeleteIcon,
  Block as BlockIcon,
  Business as BusinessIcon
} from '@mui/icons-material';
import axios from 'axios';

const CompaniesEmails = ({ token, url }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allEmails, setAllEmails] = useState([]); // لتخزين جميع البيانات الأصلية
  const [filteredEmails, setFilteredEmails] = useState([]); // لتخزين البيانات المصفاة

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value) {
      // تصفية البيانات بناءً على نص البحث
      const filtered = allEmails.filter(company =>
        company.name.toLowerCase().includes(value.toLowerCase()) ||
        company.email.toLowerCase().includes(value.toLowerCase()) ||
        company.field.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredEmails(filtered);
    } else {
      // إذا تم حذف نص البحث، يتم عرض جميع البيانات
      setFilteredEmails(allEmails);
    }
  };

  const getAllCompaniesData = () => {
    axios.get(`${url}/api/company/all`, { headers: { token } })
      .then((response) => {
        if (response.data.success) {
          setAllEmails(response.data.data); // تعيين جميع البيانات الأصلية
          setFilteredEmails(response.data.data); // تعيين البيانات المصفاة لتكون نفس البيانات الأصلية في البداية
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    getAllCompaniesData();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Companies Emails
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage and monitor company email accounts
        </Typography>
      </Box>

      {/* Search and Filters */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by company name, email, or type..."
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
              <TableCell sx={{ fontWeight: 'bold' }}>Logo</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Company Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmails.map((row) => (
              <TableRow key={row._id} hover>
                <TableCell>
                  <img 
                    src={row.imageUrl} 
                    alt={`${row.name} logo`} 
                    style={{ width: 40, height: 40, borderRadius: '50%' }} 
                  />
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <BusinessIcon fontSize="small" color="action" />
                    {row.email}
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={row.field} 
                    size="small" 
                    color="primary" 
                    variant="outlined" 
                  />
                </TableCell>
                <TableCell>
                  <Tooltip title="Block Company">
                    <IconButton
                      size="small"
                      color="warning"
                    >
                      <BlockIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Company">
                    <IconButton
                      size="small"
                      color="error"
                    >
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

export default CompaniesEmails;