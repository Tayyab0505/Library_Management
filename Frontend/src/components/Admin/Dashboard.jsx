import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDashboardStats } from '../../api/AdminApi';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AssignmentIcon from '@mui/icons-material/Assignment';

const statConfig = [
    {
        key: 'totalStudents',
        label: 'Total Students',
        icon: <SchoolIcon sx={{ fontSize: 28 }} />,
        color: '#2563EB',
        bg: '#EFF6FF',
        border: '#BFDBFE',
    },
    {
        key: 'totalBooks',
        label: 'Total Books',
        icon: <MenuBookIcon sx={{ fontSize: 28 }} />,
        color: '#059669',
        bg: '#ECFDF5',
        border: '#A7F3D0',
    },
    {
        key: 'assignedBooks',
        label: 'Assigned Books',
        icon: <AssignmentIcon sx={{ fontSize: 28 }} />,
        color: '#D97706',
        bg: '#FFFBEB',
        border: '#FDE68A',
    },
];

const Dashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({ totalStudents: 0, totalBooks: 0, assignedBooks: 0 });
    const [loading, setLoading] = useState(true);
    const adminEmail = localStorage.getItem('adminEmail') || 'Admin';

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await getDashboardStats();
                setStats(res.data);
            } catch (err) {
                console.error('Failed to load stats:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="bg-[rgb(245,246,250)] min-h-screen p-6 font-serif">

            <div className="bg-[#152a4c] bg-opacity-90 p-10 rounded-md shadow-md max-w-7xl mx-auto mb-10">
                <h2 className="text-4xl font-bold text-center text-white font-serif">Admin Dashboard</h2>
                <p className="text-center text-white mt-4 font-serif">
                    Welcome to the admin panel. Use the sidebar to manage students and books.
                </p>
            </div>

            <div className="max-w-7xl mx-auto">
                <Grid container spacing={2}>
                    {stats.map((stat, index) => (
                        <Grid item xs={12} sm={4} key={index}>
                            <Paper sx={{ p: 2, textAlign: 'center', }}>
                                <Typography variant="h6">{stat.label}</Typography>
                                <Typography variant="h4">{stat.value}</Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
}

export default Dashboard