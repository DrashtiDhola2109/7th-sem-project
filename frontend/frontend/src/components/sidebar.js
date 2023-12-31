import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CategoryIcon from '@mui/icons-material/Category';
import ReceiptIcon from '@mui/icons-material/Receipt';
import GroupIcon from '@mui/icons-material/Group';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import InsertForm from './insertForm';
import SubCategoryForm from './subCategoryForm';
import RouteIcon from '@mui/icons-material/Route';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import PlaceIcon from '@mui/icons-material/Place';
import ZoneForm from './Zone';
import Area from './Area';
import RouteForm from './Route';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import UserRegistrationForm from './userRegistrationForm';
import UserTable from './userData';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState('');


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOptionClick = (text) => {
    setSelectedOption(text); // Update selected option when clicked
  };

  const getContentForOption = (selected) => {
    switch (selected) {
      case 'Category':
        return (
            <InsertForm />
        );
      case 'Subcategory':
        return (
          <SubCategoryForm />
        );
        case 'Zone':
        return (
          <ZoneForm />
        );
        case 'Area':
        return (
          <Area />
        );
        case 'Route':
        return (
          <RouteForm />
        );
        case 'Add User':
        return (
          <UserRegistrationForm />
        );
      case 'Orders':
        return (
          <Typography variant="h6" noWrap component="div">
            Orders Content
          </Typography>
        );
      case 'Users':
        return (
          <UserTable />
        );
      default:
        return null;
    }
  };

  const getContentForOptionDisplay = (selected) => {
    switch (selected) {
      case 'Category':
        return (
            <Typography variant="h6" noWrap component="div">
            Category
          </Typography>
        );
      case 'Subcategory':
        return (
          <Typography variant="h6" noWrap component="div">
            Subcategory
          </Typography>
        );
        case 'Zone':
        return (
          <Typography variant="h6" noWrap component="div">
            Zone
          </Typography>
        );
        case 'Area':
        return (
          <Typography variant="h6" noWrap component="div">
            Area
          </Typography>
        );
        case 'Route':
        return (
          <Typography variant="h6" noWrap component="div">
            Route
          </Typography>
        );
        case 'Add User':
        return (
          <Typography variant="h6" noWrap component="div">
            Add User
          </Typography>
        );
      case 'Orders':
        return (
          <Typography variant="h6" noWrap component="div">
            Orders Content
          </Typography>
        );
      case 'Users':
        return (
          <Typography variant="h6" noWrap component="div">
            Users
          </Typography>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ backgroundColor: '#2D4059'}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
              
            }}
          >
            <MenuIcon />
          </IconButton>
          {/* <Typography variant="h6" noWrap component="div"> */}
          {getContentForOptionDisplay(selectedOption)}
          {/* </Typography> */}
        </Toolbar>
      </AppBar>
      <Drawer variant='permanent' open={open}>
        <DrawerHeader sx={{ backgroundColor: '#2D4059'}}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ backgroundColor: '#2D4059',color: '#EEEEEE',}}>
          {['Category', 'Subcategory', 'Zone', 'Area', 'Route', 'Orders', 'Users', 'Add User'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => handleOptionClick(text)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: '#EEEEEE',
                  }}
                >
                  {index === 0 && <CategoryIcon />} {/* Category icon */}
          {index === 1 && <LocalOfferIcon />} {/* Subcategory icon */}
          {index === 2 && <MyLocationIcon />} {/* Orders icon */}
          {index === 3 && <PlaceIcon />} {/* Employees icon */}
          {index === 4 && <RouteIcon />}
          {index === 5 && <ReceiptIcon />}
          {index === 6 && <GroupIcon />}
          {index === 7 && <PersonAddAltRoundedIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {/* <Typography > */}
        {getContentForOption(selectedOption)}
        {/* </Typography> */}
      </Box>
    </Box>
  );
}