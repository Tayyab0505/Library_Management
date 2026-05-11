import { Box, Toolbar } from '@mui/material';
import StudentSidebar from '../components/ui/StudentSideBar';
import StudentTopbar from '../components/ui/StudentTopbar';

export default function StudentLayout({ children }) {
    return (
        <Box sx={{ display: 'flex' }}>
            <StudentSidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <StudentTopbar />
                <Toolbar />
                {children}
            </Box>
        </Box>
    )
}