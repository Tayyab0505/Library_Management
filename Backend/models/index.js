const { Sequelize } = require('sequelize');
const initModels = require('./init-models');

const sequelize = new Sequelize('library_management', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const models = initModels(sequelize);

sequelize.authenticate()
    .then(() => {
        console.log(' DB connected');
    })
    .catch((err) => {
        console.error(' DB connection error:', err);
    });

sequelize.sync({ force: false })
    .then(() => {
        console.log('Tables synced');
    })
    .catch((err) => {
        console.error('Sync error:', err);
    });

module.exports = {
    sequelize,
    models
};
