import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  Tooltip,
  Divider
} from "@mui/material";
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  AccountCircle,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
  Person as PersonIcon
} from "@mui/icons-material";

const TopSide = ({ drawerWidth, handleDrawerToggle }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationMenu = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        zIndex: 1201,
        bgcolor: 'background.paper',
        color: 'text.primary',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12)'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography 
            variant="h6" 
            noWrap 
            component="div"
            sx={{ 
              fontWeight: 600,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            SHIPPE ADMIN PANEL
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Tooltip title="Notifications">
            <IconButton 
              color="inherit"
              onClick={handleNotificationMenu}
              sx={{ 
                '&:hover': { 
                  backgroundColor: 'rgba(0,0,0,0.04)' 
                },
                padding: '8px'
              }}
            >
              <Badge 
                badgeContent={4} 
                color="error"
                sx={{ 
                  '& .MuiBadge-badge': { 
                    fontSize: '0.6rem',
                    minWidth: '16px',
                    height: '16px',
                    padding: '0 4px',
                    animation: 'pulse 2s infinite',
                    '@keyframes pulse': {
                      '0%': { transform: 'scale(1)' },
                      '50%': { transform: 'scale(1.1)' },
                      '100%': { transform: 'scale(1)' },
                    }
                  }
                }}
              >
                <NotificationsIcon sx={{ fontSize: '28px' }} />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Account settings">
            <IconButton
              onClick={handleMenu}
              sx={{ 
                p: 0.5,
                border: '2px solid transparent',
                '&:hover': { 
                  border: '2px solid #2196F3',
                  transition: 'all 0.3s ease'
                } 
              }}
            >
              <Avatar 
                sx={{ 
                  width: 32, 
                  height: 32,
                  bgcolor: 'primary.main',
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    transform: 'scale(1.1)'
                  }
                }}
              >
                A
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>

        {/* Notifications Menu */}
        <Menu
          anchorEl={notificationAnchorEl}
          open={Boolean(notificationAnchorEl)}
          onClose={handleNotificationClose}
          PaperProps={{
            sx: {
              mt: 1.5,
              width: 320,
              maxHeight: 400,
              overflow: 'auto'
            }
          }}
        >
          <Typography sx={{ p: 2, fontWeight: 600 }}>Notifications</Typography>
          <Divider />
          <MenuItem onClick={handleNotificationClose}>
            <Box sx={{ py: 1 }}>
              <Typography variant="subtitle2">New User Registration</Typography>
              <Typography variant="body2" color="text.secondary">
                John Doe has registered as a new user
              </Typography>
            </Box>
          </MenuItem>
          {/* Add more notification items as needed */}
        </Menu>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              mt: 1.5,
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
        >
          <MenuItem onClick={handleClose} sx={{ gap: 1.5 }}>
            <PersonIcon fontSize="small" /> Profile
          </MenuItem>
          <MenuItem onClick={handleClose} sx={{ gap: 1.5 }}>
            <SettingsIcon fontSize="small" /> Settings
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose} sx={{ gap: 1.5, color: 'error.main' }}>
            <LogoutIcon fontSize="small" /> Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default TopSide;