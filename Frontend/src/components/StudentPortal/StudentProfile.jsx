import { useNavigate } from 'react-router-dom';

const StudentProfile = () => {
    const navigate = useNavigate();
    const name = localStorage.getItem('studentName') || 'Student';
    const email = localStorage.getItem('studentEmail') || '—';
    const rollNo = localStorage.getItem('studentRollNo') || '—';
    const initials = name.charAt(0).toUpperCase();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/', { replace: true });
    };

    const rows = [
        { label: 'Full Name', value: name },
        { label: 'Email', value: email },
        { label: 'Roll No', value: rollNo },
        { label: 'Role', value: 'Student' },
    ];

    return (
        <div className="min-h-screen bg-[#F5F6FA] p-6 font-serif">
            <div className="max-w-2xl mx-auto">

                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
                    <p className="text-sm text-gray-500 mt-0.5">Your account information</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2563EB] p-6 flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white text-3xl font-bold">
                            {initials}
                        </div>
                        <div>
                            <h2 className="text-white text-xl font-bold">{name}</h2>
                            <p className="text-white/70 text-sm">{email}</p>
                        </div>
                    </div>

                    {/* Detail rows */}
                    <div className="divide-y divide-gray-50">
                        {rows.map(({ label, value }) => (
                            <div key={label} className="flex justify-between items-center px-6 py-4">
                                <span className="text-sm text-gray-500">{label}</span>
                                <span className="text-sm font-medium text-gray-800">{value}</span>
                            </div>
                        ))}
                    </div>

                    {/* Logout */}
                    <div className="px-6 py-4 border-t border-gray-100">
                        <button onClick={handleLogout} className="w-full py-2.5 rounded-xl text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100 transition cursor-pointer border-none">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentProfile;