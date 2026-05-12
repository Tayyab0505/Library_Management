const { Sequelize } = require('sequelize');
const { models } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Book = models.books;
const Student = models.students;

const JWT_SECRET = process.env.JWT_SECRET

// Student Controller

const addStudent = async (req, res) => {
    try {
        const { name, email, password, rollNo } = req.body;
        if (!name || !rollNo || !email || !password) {
            return res.status(200).json({ message: "Please fill all the required fields" });
        }

        const rollNumber = await Student.findOne({ where: { rollNo } });

        if (rollNumber) {
            return res.status(200).json({ status: 200, message: "This roll Number already exist" });
        };

        let students = await Student.create({
            name,
            email,
            password,
            rollNo,
            roleId: 2
        });

        res.status(200).json({ status: 200, message: "Data saved successfully", data: students });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};

const updateStudent = async (req, res) => {
    const { id } = req.params;
    const { name, rollNo } = req.body;

    if (name === '' || rollNo === '') {
        return res.status(200).json({ status: 200, message: "Plz fill all the required fields" });
    }

    try {
        const existingStudent = await Student.findOne({
            where: {
                rollNo,
                id: { [Sequelize.Op.ne]: id },
            },
        });

        if (existingStudent) {
            return res.status(200).json({ status: 200, message: "This roll number already exist" });
        };

        await Student.update(
            {
                name,
                rollNo
            },
            {
                where: {
                    id,
                    status: 1
                },
            }
        );

        const updateStudent = await Student.findByPk(id);
        res.json({ message: 'Student updateStudent successfuly', updateStudent });

    } catch (error) {
        res.status(500).json({ error: error.message });
    };
};

const findAllStudent = async (req, res) => {
    try {
        let students = await Student.findAll({
            where: { status: 1 },
            include: [
                {
                    model: Book,
                    as: "bookAssigned",
                    attributes: ['title']
                }
            ]
        });
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
};

const findById = async (req, res) => {
    try {
        const { id } = req.params;

        let student = await Student.findOne({
            where: {
                id,
                status: 1
            },
            include: [
                {
                    model: Book,
                    as: "bookAssigned",
                    attributes: ['title', 'author']
                }
            ]
        });

        if (student) {
            res.json(student);
        } else {
            res.status(404).json({ status: 404, message: 'Student not found on this ID' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
};

const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        await Student.update(
            { status: 0 },
            { where: { id } }
        );

        res.status(200).json({ status: 200, message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
};

const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Student.findOne({
            where: { email, status: 1 },
        });

        if (!user) {
            return res.status(200).json({ message: "You are not authorised" });
        }

        if (user.password !== password) {
            return res.status(200).json({ message: "Incorrect password" });
        }

        const role = user.roleId === 1 ? 'admin' : 'student';

        const token = jwt.sign(
            { id: user.id, email: user.email, role },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).json({
            message: user.roleId === 1 ? 'Welcome Admin' : 'Welcome Student',
            token,
            email: user.email,
            name: user.name,
            rollNo: user.rollNo,
            role
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    };
};

const getStats = async (req, res) => {
    try {
        const totalStudents = await Student.count({ where: { status: 1, roleId: 2 } });
        const totalBooks = await Book.count({ where: { isActive: 1 } });
        const assignedBooks = await Book.count({
            where: { isActive: 1, assignedTo: { [Sequelize.Op.ne]: null } }
        });

        res.status(200).json({ totalStudents, totalBooks, assignedBooks });
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
};

module.exports = {
    addStudent,
    updateStudent,
    findAllStudent,
    findById,
    deleteStudent,
    loginAdmin,
    getStats
};