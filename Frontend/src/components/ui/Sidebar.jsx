// src/components/ui/Sidebar.jsx
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

export default function Sidebar() {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    fontFamily: 'serif',
                    background: 'linear-gradient(to bottom, #000000, #0a192f, #0f172a)',
                    color: '#fff',
                },
            }}>

            <Toolbar />

            <List>
                <ListItemButton
                    component={Link}
                    to="/dashboard"
                    sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)', } }}>
                    <ListItemIcon sx={{ color: 'white', font: 'serif' }}><DashboardIcon /></ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>

                <ListItemButton
                    component={Link}
                    to="/students"
                    sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)', } }}>
                    <ListItemIcon sx={{ color: 'white', fontFamily: 'serif' }}><SchoolIcon /></ListItemIcon>
                    <ListItemText primary="Students" />
                </ListItemButton>

                <ListItemButton
                    component={Link}
                    to="/books"
                    sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)', } }}>
                    <ListItemIcon sx={{ color: 'white', fontFamily: 'serif' }}><MenuBookIcon /></ListItemIcon>
                    <ListItemText primary="Books" />
                </ListItemButton>

            </List>
        </Drawer>
    );
}
