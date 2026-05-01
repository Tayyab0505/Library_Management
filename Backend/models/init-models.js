var DataTypes = require("sequelize").DataTypes;
var _books = require("./books");
var _role = require("./role");
var _students = require("./students");

function initModels(sequelize) {
  var books = _books(sequelize, DataTypes);
  var role = _role(sequelize, DataTypes);
  var students = _students(sequelize, DataTypes);

  students.belongsTo(role, { foreignKey: "roleId" });
  role.hasMany(students, { foreignKey: "roleId" });

  students.hasMany(books, { foreignKey: 'assignedTo', as: "bookAssigned" });
  books.belongsTo(students, { foreignKey: 'assignedTo', as: "assignedStudent" });

  return {
    books,
    role,
    students,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
