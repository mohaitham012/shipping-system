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
  Tooltip,
  Avatar,
  Collapse
} from '@mui/material';
import {
  Search as SearchIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon
} from '@mui/icons-material';
import axios from 'axios';

const Contacts = ({ token, url }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allContacts, setAllContacts] = useState([]); // لتخزين جميع البيانات الأصلية
  const [filteredContacts, setFilteredContacts] = useState([]); // لتخزين البيانات المصفاة
  const [openRow, setOpenRow] = useState(null);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value) {
      // تصفية البيانات بناءً على نص البحث
      const filtered = allContacts.filter(contact =>
        contact.name.toLowerCase().includes(value.toLowerCase()) ||
        contact.email.toLowerCase().includes(value.toLowerCase()) ||
        contact.subject.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredContacts(filtered);
    } else {
      // إذا تم حذف نص البحث، يتم عرض جميع البيانات
      setFilteredContacts(allContacts);
    }
  };

  const handleDelete = (id) => {
    // Implement delete functionality
    console.log('Delete:', id);
  };

  const handleRowClick = (id) => {
    setOpenRow(openRow === id ? null : id);
  };

  const stringToColor = (string) => {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xFF;
      color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
  };

  const getContacts = () => {
    axios.get(`${url}/api/contact/all`, { headers: { token } })
      .then((response) => {
        if (response.data.success) {
          setAllContacts(response.data.contacts); // تعيين جميع البيانات الأصلية
          setFilteredContacts(response.data.contacts); // تعيين البيانات المصفاة لتكون نفس البيانات الأصلية في البداية
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          User Contacts
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage and monitor user contact messages
        </Typography>
      </Box>

      {/* Search */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by name, email, or subject..."
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
              <TableCell sx={{ width: '40px' }} /> {/* Expansion column */}
              <TableCell sx={{ fontWeight: 'bold' }}>User</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Contact Info</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Subject</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredContacts.map((row) => (
              <React.Fragment key={row._id}>
                <TableRow 
                  hover 
                  onClick={() => handleRowClick(row._id)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell>
                    <IconButton size="small">
                      {openRow === row._id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: stringToColor(row.name),
                          width: 40,
                          height: 40
                        }}
                      >
                        {row.name.split(' ').map(n => n[0]).join('')}
                      </Avatar>
                      <Typography variant="subtitle2">{row.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <EmailIcon fontSize="small" color="action" />
                        {row.email}
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PhoneIcon fontSize="small" color="action" />
                        {row.phone}
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{row.subject}</TableCell>
                  <TableCell>
                    <Tooltip title="Delete Contact">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(row._id);
                        }}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                    <Collapse in={openRow === row._id} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 2 }}>
                        <Typography variant="h6" gutterBottom component="div">
                          Message Description
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
                          {row.message || 'No description available.'}
                        </Typography>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Contacts;