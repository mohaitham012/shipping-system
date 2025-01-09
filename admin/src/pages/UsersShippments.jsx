import React, { useEffect, useState } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Collapse,
} from "@mui/material";
import {
  Search as SearchIcon,
  Edit as EditIcon,
  LocalShipping as ShippingIcon,
  LocationOn as LocationIcon,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";

// Dummy data matching the schema
const dummyShipments = [
  {
    id: 1,
    number: 123456789,
    status: "Not moved yet",
    origin: "New York, USA",
    destination: "London, UK",
    date: new Date(),
    package_details: "Fragile items, handle with care",
    transition: "Not moved yet",
    transition_date: null,
    arrived: "Not moved yet",
    arrived_date: null,
    picked_up: "Not moved yet",
    picked_up_date: null,
    courier: "FedEx",
    estimated_delivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
  },
  // Add more dummy data as needed
];

// eslint-disable-next-line react/prop-types
const UsersShipments = ({ token, url }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allShipments, setAllShipments] = useState(dummyShipments); // تخزين جميع البيانات الأصلية
  const [shipments, setShipments] = useState(dummyShipments); // البيانات المعروضة
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value) {
      // تصفية البيانات بناءً على نص البحث
      const filtered = allShipments.filter(
        (shipment) =>
          shipment.number.toString().includes(value.toLowerCase()) ||
          shipment.origin.toLowerCase().includes(value.toLowerCase()) ||
          shipment.destination.toLowerCase().includes(value.toLowerCase())
      );
      setShipments(filtered);
    } else {
      // إذا تم حذف نص البحث، عرض جميع البيانات
      setShipments(allShipments);
    }
  };

  const handleEdit = (shipment) => {
    setSelectedShipment(shipment);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedShipment(null);
  };

  const handleUpdate = () => {
    axios
      .put(
        `${url}/api/shippment/update`,
        {
          shipId: selectedShipment?._id,
          status: selectedShipment?.status,
          origin: selectedShipment?.origin,
          destination: selectedShipment?.destination,
          package_details: selectedShipment?.package_details,
          transition: selectedShipment?.transition,
          transition_date: selectedShipment?.transition_date,
          arrived: selectedShipment?.arrived,
          arrived_date: selectedShipment?.arrived_date,
          picked_up: selectedShipment?.picked_up,
          picked_up_date: selectedShipment?.picked_up_date,
          courier: selectedShipment?.courier,
          estimated_delivery: selectedShipment?.estimated_delivery,
        },
        { headers: { token } }
      )
      .then((response) => {
        if (response.data.success) {
          // تحديث البيانات المحلية
          const updatedShipments = shipments.map((shipment) =>
            shipment._id === selectedShipment._id
              ? { ...shipment, ...selectedShipment }
              : shipment
          );
          setShipments(updatedShipments); // تحديث حالة shipments
          setAllShipments(updatedShipments); // تحديث حالة allShipments أيضًا إذا لزم الأمر
          handleClose();
          toast.success("Updated successfully"); // إغلاق مربع الحوار
        }
      })
      .catch((error) => {
        console.error("Error updating shipment:", error.message);
      });
  };

  const getStatusChipColor = (status) => {
    switch (status) {
      case "Not moved yet":
        return "warning";
      case "In Transit":
        return "primary";
      case "Arrived":
        return "success";
      default:
        return "default";
    }
  };

  const handleRowClick = (_id) => {
    setExpandedRow(expandedRow === _id ? null : _id);
  };

  const getUsersShipments = () => {
    axios
      .get(`${url}/api/shippment/all`, { headers: { token } })
      .then((response) => {
        if (response.data.success) {
          setAllShipments(response.data.shipData); // تعيين جميع البيانات الأصلية
          setShipments(response.data.shipData);
          // تعيين البيانات المعروضة
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    getUsersShipments();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Shipments
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage and monitor shipment details
        </Typography>
      </Box>

      {/* Search */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by number, origin, or destination..."
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

      {/* Updated Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "40px" }} /> {/* Expansion column */}
              <TableCell sx={{ fontWeight: "bold" }}>Number</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Route</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Courier</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Dates</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shipments.map((row) => (
              <React.Fragment key={row.number}>
                <TableRow
                  hover
                  onClick={() => handleRowClick(row.id)}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell>
                    <IconButton size="small">
                      {expandedRow === row.id ? (
                        <KeyboardArrowUp />
                      ) : (
                        <KeyboardArrowDown />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <ShippingIcon fontSize="small" color="action" />
                      {row.number}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={row.status}
                      color={getStatusChipColor(row.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <LocationIcon fontSize="small" color="action" />
                        From: {row.origin}
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <LocationIcon fontSize="small" color="action" />
                        To: {row.destination}
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{row.courier}</TableCell>
                  <TableCell>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      <Typography variant="caption">
                        Created: {new Date(row.date).toLocaleDateString()}
                      </Typography>
                      {row.estimated_delivery && (
                        <Typography variant="caption">
                          Est. Delivery:{" "}
                          {new Date(
                            row.estimated_delivery
                          ).toLocaleDateString()}
                        </Typography>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Edit Shipment">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(row);
                        }}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
                {expandedRow === row.id && (
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={7}
                    >
                      <Collapse
                        in={expandedRow === row.id}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Box sx={{ margin: 2 }}>
                          <Typography variant="h6" gutterBottom component="div">
                            Package Details
                          </Typography>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <Typography
                                variant="body1"
                                color="text.secondary"
                              >
                                {row.package_details ||
                                  "No package details available"}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Box sx={{ mt: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                  Shipping Status Timeline
                                </Typography>
                                <Grid container spacing={3}>
                                  <Grid item xs={12} md={4}>
                                    <Box
                                      sx={{
                                        p: 2,
                                        border: "1px solid",
                                        borderColor: "divider",
                                        borderRadius: 1,
                                        height: "100%",
                                      }}
                                    >
                                      <Typography
                                        variant="subtitle1"
                                        color="primary"
                                        gutterBottom
                                      >
                                        Transition
                                      </Typography>
                                      <Typography variant="body2" gutterBottom>
                                        Status: {row.transition}
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        color="text.secondary"
                                      >
                                        Date:{" "}
                                        {row.transition_date
                                          ? new Date(
                                              row.transition_date
                                            ).toLocaleString()
                                          : "Not yet"}
                                      </Typography>
                                    </Box>
                                  </Grid>
                                  <Grid item xs={12} md={4}>
                                    <Box
                                      sx={{
                                        p: 2,
                                        border: "1px solid",
                                        borderColor: "divider",
                                        borderRadius: 1,
                                        height: "100%",
                                      }}
                                    >
                                      <Typography
                                        variant="subtitle1"
                                        color="primary"
                                        gutterBottom
                                      >
                                        Arrived
                                      </Typography>
                                      <Typography variant="body2" gutterBottom>
                                        Status: {row.arrived}
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        color="text.secondary"
                                      >
                                        Date:{" "}
                                        {row.arrived_date
                                          ? new Date(
                                              row.arrived_date
                                            ).toLocaleString()
                                          : "Not yet"}
                                      </Typography>
                                    </Box>
                                  </Grid>
                                  <Grid item xs={12} md={4}>
                                    <Box
                                      sx={{
                                        p: 2,
                                        border: "1px solid",
                                        borderColor: "divider",
                                        borderRadius: 1,
                                        height: "100%",
                                      }}
                                    >
                                      <Typography
                                        variant="subtitle1"
                                        color="primary"
                                        gutterBottom
                                      >
                                        Picked Up
                                      </Typography>
                                      <Typography variant="body2" gutterBottom>
                                        Status: {row.picked_up}
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        color="text.secondary"
                                      >
                                        Date:{" "}
                                        {row.picked_up_date
                                          ? new Date(
                                              row.picked_up_date
                                            ).toLocaleString()
                                          : "Not yet"}
                                      </Typography>
                                    </Box>
                                  </Grid>
                                </Grid>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={openDialog} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Edit Shipment Details</DialogTitle>
        <DialogContent>
          {selectedShipment && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Number"
                  value={selectedShipment.number}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Status"
                  value={selectedShipment.status}
                  onChange={(e) =>
                    setSelectedShipment({
                      ...selectedShipment,
                      status: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Origin"
                  value={selectedShipment.origin}
                  onChange={(e) =>
                    setSelectedShipment({
                      ...selectedShipment,
                      origin: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Destination"
                  value={selectedShipment.destination}
                  onChange={(e) =>
                    setSelectedShipment({
                      ...selectedShipment,
                      destination: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Package Details"
                  multiline
                  rows={2}
                  value={selectedShipment.package_details}
                  onChange={(e) =>
                    setSelectedShipment({
                      ...selectedShipment,
                      package_details: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Transition Status"
                  value={selectedShipment.transition}
                  onChange={(e) =>
                    setSelectedShipment({
                      ...selectedShipment,
                      transition: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Transition Date"
                  type="date"
                  value={
                    selectedShipment.transition_date
                      ? new Date(selectedShipment.transition_date)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    setSelectedShipment({
                      ...selectedShipment,
                      transition_date: e.target.value,
                    })
                  }
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Arrived Status"
                  value={selectedShipment.arrived}
                  onChange={(e) =>
                    setSelectedShipment({
                      ...selectedShipment,
                      arrived: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Arrived Date"
                  type="date"
                  value={
                    selectedShipment.arrived_date
                      ? new Date(selectedShipment.arrived_date)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    setSelectedShipment({
                      ...selectedShipment,
                      arrived_date: e.target.value,
                    })
                  }
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Picked Up Status"
                  value={selectedShipment.picked_up}
                  onChange={(e) =>
                    setSelectedShipment({
                      ...selectedShipment,
                      picked_up: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Picked Up Date"
                  type="date"
                  value={
                    selectedShipment.picked_up_date
                      ? new Date(selectedShipment.picked_up_date)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    setSelectedShipment({
                      ...selectedShipment,
                      picked_up_date: e.target.value,
                    })
                  }
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Courier"
                  value={selectedShipment.courier}
                  onChange={(e) =>
                    setSelectedShipment({
                      ...selectedShipment,
                      courier: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Estimated Delivery"
                  type="date"
                  value={
                    selectedShipment.estimated_delivery
                      ? new Date(selectedShipment.estimated_delivery)
                          .toLocaleString()
                          .split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    setSelectedShipment({
                      ...selectedShipment,
                      estimated_delivery: e.target.value,
                    })
                  }
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UsersShipments;
