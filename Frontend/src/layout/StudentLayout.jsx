import { Box, Toolbar } from '@mui/material';
import StudentSidebar from '../components/ui/StudentSideBar';


export default function StudentLayout({ children }) {
    return (
        <Box sx={{ display: 'flex' }}>
            <StudentSidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {children}
            </Box>
        </Box>
    )
}