const { Sequelize, where } = require('sequelize');
const { models } = require('../models');
const Book = models.books;
const Student = models.students;

// Student Controller

const addStudent = async (req, res) => {
    try {
        const { name, email, password, rollNo, marks } = req.body;
        if (name === '' || rollNo === '' || marks === '') {
            return res.status(200).json({ status: 200, message: "Plz fill all the required fields" });
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
            marks,
            roleId: 2
        });

        res.status(200).json({ status: 200, message: "Data saved successfully", data: students });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};

const updateStudent = async (req, res) => {
    const { id } = req.params;
    const { name, rollNo, marks } = req.body;

    if (name === '' || rollNo === '' || marks === '') {
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

        let student = await Student.update(
            {
                name,
                rollNo,
                marks,
            },
            {
                where: {
                    id,
                    status: 1
                },
            }
        );

        if (student) {
            const updateStudent = await Student.findByPk(id);
            res.json({ message: 'Student updated successfuly', updateStudent });
        };

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
        const admin = await Student.findOne({
            where: { email, roleId: 1 },
        });

        // if (!admin) {
        //     return res.status(404).json({ message: "Admin not found" });
        // }
        if (!admin) {
            return res.status(200).json({ message: "You are not authorised" });
        }

        if (admin.password !== password) {
            return res.status(200).json({ message: "Incorrect password" });
        }
        else {
            res.status(200).json({ message: "Welcome Admin", admin });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    };
};

module.exports = {
    addStudent,
    updateStudent,
    findAllStudent,
    findById,
    deleteStudent,
    loginAdmin
};