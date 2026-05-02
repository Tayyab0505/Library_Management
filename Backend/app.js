require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routers/routes');
const port = 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.get('/', (req, res) => {
    res.send('Home page');
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});