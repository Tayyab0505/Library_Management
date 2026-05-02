import { Grid, Paper, Typography } from '@mui/material';

const Dashboard = () => {
    const stats = [
        { label: 'Total Students', value: 150 },
        { label: 'Total Books', value: 200 },
        { label: 'Assigned Books', value: 45 },
    ];

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