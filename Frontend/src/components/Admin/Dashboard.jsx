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
        icon: <SchoolIcon />,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        border: 'border-l-blue-600',
    },
    {
        key: 'totalBooks',
        label: 'Total Books',
        icon: <MenuBookIcon />,
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
        border: 'border-l-emerald-600',
    },
    {
        key: 'assignedBooks',
        label: 'Assigned Books',
        icon: <AssignmentIcon />,
        color: 'text-amber-600',
        bg: 'bg-amber-50',
        border: 'border-l-amber-600',
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
        <div className="bg-[#F5F6FA] min-h-screen p-6 font-serif">
            <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2563EB] rounded-2xl p-10 mb-8 flex justify-between items-center">
                <div>
                    <h2 className="text-white text-3xl font-bold m-0">Welcome back, Admin</h2>
                    <p className="text-white/75 mt-2 text-sm">
                        {adminEmail} — here's what's happening in your library today.
                    </p>
                </div>
                <div className="bg-white/15 rounded-xl px-5 py-3 text-white text-sm text-center">
                    <div className="text-xs opacity-75 mb-1">Today</div>
                    <div className="font-semibold">
                        {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </div>
                </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                {statConfig.map(({ key, label, icon, color, bg, border }) => (
                    <div key={key} className={`bg-white rounded-2xl p-6 border border-gray-100 border-l-4 ${border} flex items-center gap-4 shadow-sm`} >
                        <div className={`${bg} ${color} rounded-xl p-3 flex items-center justify-center`}>
                            {icon}
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 m-0">{label}</p>
                            <p className="text-4xl font-bold text-gray-900 m-0 leading-tight">
                                {loading ? '—' : stats[key]}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* actions */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="text-base font-semibold text-gray-800 mb-4">
                    Quick actions
                </h3>
                <div className="flex flex-wrap gap-3">
                    {[
                        { label: 'Add book', path: '/addBook', style: 'border-emerald-600 text-emerald-600 hover:bg-emerald-600' },
                        { label: 'Assign book', path: '/assignBook', style: 'border-amber-600 text-amber-600 hover:bg-amber-600' },
                    ].map(({ label, path, style }) => (
                        <button key={path} onClick={() => navigate(path)}
                            className={`px-5 cursor-pointer py-2.5 rounded-xl border-2 font-medium text-sm bg-white hover:text-white transition-colors duration-200 ${style}`}>
                            {label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;