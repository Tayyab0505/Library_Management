import { Box } from '@mui/material';
import Sidebar from '../components/ui/Sidebar';
import Topbar from '../components/ui/Topbar';

export default function AppLayout({ children }) {
    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: '64px' }}>
                <Topbar />
                {children}
            </Box>
        </Box>
    );
}