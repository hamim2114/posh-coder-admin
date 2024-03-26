import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Avatar, Collapse, Drawer, Menu, MenuItem, useMediaQuery } from '@mui/material';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AutoAwesomeMotion, ExpandLess, ExpandMore,LocalPolice, Logout, PeopleAlt, Person, ShoppingCart, SpaceDashboard, StickyNote2, Workspaces } from '@mui/icons-material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosReq } from '../../utils/axiosReq';
import toast from 'react-hot-toast';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'center',
}));

const drawerList = [
  { name: 'Dashboard', icon: <SpaceDashboard />, path: '/admin/dashboard' },
  { name: 'Users', icon: <PeopleAlt />, path: '/admin/users' },
  { name: 'Orders', icon: <ShoppingCart />, path: '/admin/orders' },
  {
    name: 'Services',
    icon: < AutoAwesomeMotion />,
    more: [
      { name: 'Website Development', path: '/admin/service/web' },
      { name: 'App Development', path: '/admin/service/app' },
      { name: 'Graphic Design', path: '/admin/service/graphic' },
      // { name: 'Digital Marketing', path: '/admin/service/marketing' },
      // { name: 'Content Creation', path: '/admin/service/content' }
    ]
  },
  { name: 'Teams', icon: <Workspaces />, path: '/admin/team' },
  { name: 'Blogs', icon: <StickyNote2 />, path: '/admin/blog' },
  { name: 'Trust By', icon: <LocalPolice />, path: '/admin/trustby' },
]

export default function Layout() {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = React.useState(true);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [serviceListOpen, setServiceListOpen] = React.useState(false)

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => axiosReq.post('/admin/logout'),
    onSuccess: (res) => {
      queryClient.invalidateQueries(['logout']);
      localStorage.removeItem('poshcoder')
      window.location.href = 'admin/login'
      toast.success(res.data)
    },
    onError: (err) => toast.error(err.response.data)
  })

  const handleLogout = () => {
    mutation.mutate()
  }

  const matches = useMediaQuery("(max-width:600px)");
  const { pathname } = useLocation()

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  React.useEffect(() => {
    if (matches) {
      setDrawerOpen(false)
    }
  }, [matches])

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar sx={{ bgcolor: theme.palette.primary.main, boxShadow: '0' }} position="fixed" open={drawerOpen}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setDrawerOpen(p => !p)}
              edge="start"
              sx={{
                marginRight: 5,
                // ...(drawerOpen && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Box sx={{ justifySelf: 'end' }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="" src="" />
            </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem sx={{ pr: 6, my: 1 }} onClick={handleCloseUserMenu}>
                <Person />
                <Typography textAlign="center" marginLeft={2}>Profile</Typography>
              </MenuItem>
              <MenuItem sx={{ pr: 6, my: 1 }} onClick={() => {
                handleCloseUserMenu();
                handleLogout()
              }}>
                <Logout />
                <Typography textAlign="center" marginLeft={2}>LogOut</Typography>
              </MenuItem>
            </Menu>
          </Box>

        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={drawerOpen}
      >
        <DrawerHeader>
          {/* <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton> */}
          <Typography variant='h5' fontWeight='bold' color='gray'>Posh Coder</Typography>
        </DrawerHeader>
        {/* <Divider /> */}
        <List>
          {drawerList.map((item, index) => (
            <ListItem disablePadding key={index} sx={{ display: 'block' }}>
              {item.more ?
                (
                  <>
                    <Link className='link' to={item.path}>
                      <ListItemButton sx={{
                        px: 1, mx: 2, borderRadius: '5px', mb: .5,
                        color: 'gray',
                        bgcolor: item.path === pathname ? theme.palette.primary.main : '',
                        ":hover": { bgcolor: theme.palette.primary.main, color: '#fff' }
                      }} onClick={() => setServiceListOpen(p => !p)}>
                        <ListItemIcon sx={{ minWidth: 0, mr: 1.5, color: 'inherit' }}>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.name} sx={{
                          opacity: drawerOpen ? 1 : 0,
                        }} />
                        {serviceListOpen ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                    </Link>
                    <Collapse in={serviceListOpen} timeout="auto" unmountOnExit>
                      <List component="div">
                        {
                          item?.more?.map((i, id) => (
                            <Link className='link' key={id} to={i.path}>
                              <ListItemButton sx={{
                                ml: 5, mr: 2, mb: .5, borderRadius: '5px',
                                bgcolor: i.path === pathname ? theme.palette.primary.main : '',
                                color: i.path === pathname ? '#fff' : '',
                                ":hover": { bgcolor: theme.palette.primary.main, color: '#fff' }
                              }}>
                                <Typography sx={{
                                  fontSize: '14px',
                                  textWrap: 'nowrap'
                                }}>
                                  {i.name}
                                </Typography>
                              </ListItemButton>
                            </Link>
                          ))
                        }
                      </List>
                    </Collapse>
                  </>
                ) : (
                  <Link className='link' to={item.path}>
                    <ListItemButton disableGutters sx={{
                      px: 1, mb: .5, mx: 2,
                      borderRadius: '5px',
                      bgcolor: item.path === pathname ? theme.palette.primary.main : '',
                      color: item.path === pathname ? '#fff' : 'gray',
                      ":hover": {
                        bgcolor: theme.palette.primary.main, color: '#fff',
                      }
                    }}>
                      <ListItemIcon sx={{
                        minWidth: 0, mr: 1.5, color: 'inherit'
                      }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.name} sx={{ opacity: drawerOpen ? 1 : 0 }} />
                    </ListItemButton>
                  </Link>
                )}
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={drawerOpen}>
        <DrawerHeader />
        <Box sx={{ p: 1 }}>
          <Outlet />
        </Box>
      </Main>
    </Box >
  );
}
