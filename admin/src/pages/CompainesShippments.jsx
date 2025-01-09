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

const CompaniesShipments = ({ token, url }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [shipments, setShipments] = useState(dummyShipments);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filtered = dummyShipments.filter(
      (shipment) =>
        shipment.number.toString().includes(event.target.value.toLowerCase()) ||
        shipment.origin
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        shipment.destination
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
    );
    setShipments(filtered);
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
    // Send the update request to the server
    axios
      .put(
        `${url}/api/compShippments/update`,
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
          // Update the shipments state with the new data
          const updatedShipments = shipments.map((shipment) =>
            shipment._id === selectedShipment._id
              ? { ...shipment, ...selectedShipment } // Update the specific shipment
              : shipment
          );
          setShipments(updatedShipments);
           // Update the state
           toast.success('Updated shipment')
          handleClose(); // Close the dialog
        }
      })
      .catch((error) => {
        console.error("Update failed:", error);
      });
  };

  const handleRowClick = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
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

  const getCompaniesShipments = () => {
    axios
      .get(`${url}/api/compShippments/all`, { headers: { token } })
      .then((response) => {
        if (response.data.success) {
          setShipments(response.data.shipData);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    getCompaniesShipments();
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
          Company Shipments
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage and monitor company shipment details
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

      {/* Table */}
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
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={8}
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
                            <Typography variant="body1" color="text.secondary">
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
              {/* Shipment Number and Status */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Shipment Number"
                  value={selectedShipment.number}
                  disabled
                  onChange={(e) =>
                    setSelectedShipment({
                      ...selectedShipment,
                      number: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
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

              {/* Origin and Destination */}
              <Grid item xs={12} md={6}>
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
              <Grid item xs={12} md={6}>
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

              {/* Package Details (Full Row) */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Package Details"
                  value={selectedShipment.package_details}
                  onChange={(e) =>
                    setSelectedShipment({
                      ...selectedShipment,
                      package_details: e.target.value,
                    })
                  }
                  multiline
                  rows={4}
                />
              </Grid>

              {/* Transition Status and Transition Date */}
              <Grid item xs={12} md={6}>
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
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Transition Date"
                  type="datetime-local"
                  value={
                    selectedShipment.transition_date
                      ? new Date(selectedShipment.transition_date)
                          .toISOString()
                          .slice(0, 16)
                      : ""
                  }
                  onChange={(e) =>
                    setSelectedShipment({
                      ...selectedShipment,
                      transition_date: new Date(e.target.value),
                    })
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              {/* Arrived Status and Arrived Date */}
              <Grid item xs={12} md={6}>
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
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Arrived Date"
                  type="datetime-local"
                  value={
                    selectedShipment.arrived_date
                      ? new Date(selectedShipment.arrived_date)
                          .toISOString()
                          .slice(0, 16)
                      : ""
                  }
                  onChange={(e) =>
                    setSelectedShipment({
                      ...selectedShipment,
                      arrived_date: new Date(e.target.value),
                    })
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              {/* Picked Up Status and Picked Up Date */}
              <Grid item xs={12} md={6}>
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
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Picked Up Date"
                  type="datetime-local"
                  value={
                    selectedShipment.picked_up_date
                      ? new Date(selectedShipment.picked_up_date)
                          .toISOString()
                          .slice(0, 16)
                      : ""
                  }
                  onChange={(e) =>
                    setSelectedShipment({
                      ...selectedShipment,
                      picked_up_date: new Date(e.target.value),
                    })
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              {/* Courier and Estimated Delivery (Last Row) */}
              <Grid item xs={12} md={6}>
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
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Estimated Delivery"
                  type="date"
                  value={
                    selectedShipment.estimated_delivery
                      ? new Date(selectedShipment.estimated_delivery)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    setSelectedShipment({
                      ...selectedShipment,
                      estimated_delivery: new Date(e.target.value),
                    })
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
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

export default CompaniesShipments;
