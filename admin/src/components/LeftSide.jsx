import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  Collapse,
  Typography,
  Box,
  useTheme
} from "@mui/material";
import {
  Mail as MailIcon,
  LocalShipping as LocalShippingIcon,
  ContactMail as ContactMailIcon,
  ExpandLess,
  ExpandMore,
  People as PeopleIcon,
  Business as BusinessIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

const LeftSide = ({
  container,
  mobileOpen,
  handleDrawerTransitionEnd,
  handleDrawerClose,
  drawerWidth,
}) => {
  const theme = useTheme();
  const location = useLocation();
  const [openMenus, setOpenMenus] = React.useState({
    emails: false,
    shipments: false
  });

  const handleMenuClick = (menuName) => {
    setOpenMenus(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }));
  };

  const isActive = (path) => location.pathname === path;

  const MenuGroup = ({ title, icon: Icon, open, onToggle, items }) => (
    <>
      <ListItem 
        disablePadding 
        sx={{
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          }
        }}
      >
        <ListItemButton 
          onClick={onToggle}
          sx={{
            borderRadius: '8px',
            mx: 1,
            transition: 'all 0.3s ease',
          }}
        >
          <ListItemIcon>
            <Icon 
              color="primary" 
              sx={{ 
                transition: 'transform 0.3s ease',
                transform: open ? 'scale(1.1)' : 'scale(1)'
              }}
            />
          </ListItemIcon>
          <ListItemText 
            primary={
              <Typography 
                variant="subtitle2" 
                fontWeight="medium"
                sx={{ 
                  color: open ? 'primary.main' : 'text.primary',
                  transition: 'color 0.3s ease'
                }}
              >
                {title}
              </Typography>
            } 
          />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {items.map((item) => (
            <ListItem 
              key={item.text} 
              disablePadding 
              sx={{ pl: 4 }}
            >
              <Link
                to={item.path}
                style={{ 
                  textDecoration: "none", 
                  color: "inherit", 
                  width: "100%" 
                }}
              >
                <ListItemButton
                  sx={{
                    borderRadius: '8px',
                    mx: 1,
                    backgroundColor: isActive(item.path) ? 'rgba(33, 150, 243, 0.08)' : 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(33, 150, 243, 0.12)',
                    }
                  }}
                >
                  <ListItemIcon>
                    {React.cloneElement(item.icon, {
                      sx: { 
                        color: isActive(item.path) ? 'primary.main' : 'action.active',
                        transition: 'color 0.3s ease'
                      }
                    })}
                  </ListItemIcon>
                  <ListItemText 
                    primary={
                      <Typography 
                        variant="body2"
                        sx={{ 
                          color: isActive(item.path) ? 'primary.main' : 'text.primary',
                          fontWeight: isActive(item.path) ? 600 : 400
                        }}
                      >
                        {item.text}
                      </Typography>
                    } 
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );

  const drawer = (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      bgcolor: 'background.default'
    }}>
      {/* Logo Section */}
      <Toolbar sx={{ 
        p: 2, 
        display: 'flex', 
        justifyContent: 'center'
      }}>
        <Box 
          component="img" 
          src="/logo.png" 
          alt="logo" 
          sx={{ 
            width: 140, 
            height: 'auto',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)'
            }
          }} 
        />
      </Toolbar>
      <Divider />

      {/* Main Navigation */}
      <List sx={{ flex: 1, px: 1 }}>
        <MenuGroup
          title="Email Management"
          icon={MailIcon}
          open={openMenus.emails}
          onToggle={() => handleMenuClick('emails')}
          items={[
            { text: "Users Emails", path: "/usersEmails", icon: <PeopleIcon fontSize="small" /> },
            { text: "Companies Emails", path: "/compEmails", icon: <BusinessIcon fontSize="small" /> }
          ]}
        />
        <MenuGroup
          title="Shipment Management"
          icon={LocalShippingIcon}
          open={openMenus.shipments}
          onToggle={() => handleMenuClick('shipments')}
          items={[
            { text: "Users Shipments", path: "/usersShips", icon: <LocalShippingIcon fontSize="small" /> },
            { text: "Companies Shipments", path: "/compShips", icon: <LocalShippingIcon fontSize="small" /> }
          ]}
        />
        <ListItem disablePadding>
          <Link 
            to="/contacts" 
            style={{ 
              textDecoration: "none", 
              color: "inherit", 
              width: "100%" 
            }}
          >
            <ListItemButton
              sx={{
                borderRadius: '8px',
                mx: 1,
                backgroundColor: isActive('/contacts') ? 'rgba(33, 150, 243, 0.08)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(33, 150, 243, 0.12)',
                }
              }}
            >
              <ListItemIcon>
                <ContactMailIcon 
                  sx={{ 
                    color: isActive('/contacts') ? 'primary.main' : 'action.active',
                    transition: 'color 0.3s ease'
                  }} 
                />
              </ListItemIcon>
              <ListItemText 
                primary={
                  <Typography 
                    variant="subtitle2" 
                    fontWeight={isActive('/contacts') ? 600 : 400}
                    sx={{ 
                      color: isActive('/contacts') ? 'primary.main' : 'text.primary'
                    }}
                  >
                    Contacts
                  </Typography>
                } 
              />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>

      {/* Settings Section */}
      <Divider />
      <List sx={{ px: 1, py: 2 }}>
        <ListItem disablePadding>
          <Link 
            to="/settings" 
            style={{ 
              textDecoration: "none", 
              color: "inherit", 
              width: "100%" 
            }}
          >
            <ListItemButton
              sx={{
                borderRadius: '8px',
                mx: 1,
                backgroundColor: isActive('/settings') ? 'rgba(33, 150, 243, 0.08)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(33, 150, 243, 0.12)',
                }
              }}
            >
              <ListItemIcon>
                <SettingsIcon 
                  sx={{ 
                    color: isActive('/settings') ? 'primary.main' : 'action.active',
                    transition: 'color 0.3s ease'
                  }} 
                />
              </ListItemIcon>
              <ListItemText 
                primary={
                  <Typography 
                    variant="subtitle2" 
                    fontWeight={isActive('/settings') ? 600 : 400}
                    sx={{ 
                      color: isActive('/settings') ? 'primary.main' : 'text.primary'
                    }}
                  >
                    Settings
                  </Typography>
                } 
              />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { 
            boxSizing: "border-box", 
            width: drawerWidth,
            borderRight: '1px solid',
            borderColor: 'divider',
            boxShadow: '2px 0 8px rgba(0,0,0,0.08)'
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { 
            boxSizing: "border-box", 
            width: drawerWidth,
            borderRight: '1px solid',
            borderColor: 'divider',
            boxShadow: '2px 0 8px rgba(0,0,0,0.08)'
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default LeftSide;