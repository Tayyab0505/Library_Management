const { models } = require('./index');

const seedRoles = async () => {
    try {
        const Role = models.role;

        const roles = [
            { roleId: 1, Name: 'Admin' },
            { roleId: 2, Name: 'Student' },
        ];
        
        for (const role of roles) {
            await Role.findOrCreate({
                where: { roleId: role.roleId },
                defaults: role
            });
        }

        console.log('Roles seeded successfully');
    } catch (err) {
        console.error('Seeding error:', err.message);
    }
};

module.exports = seedRoles;