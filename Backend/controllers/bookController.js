const { Sequelize, where } = require('sequelize');
const { models } = require('../models');
const Student = models.students;
const Book = models.books;

const addBook = async (req, res) => {
    try {
        const { title, author, genre, publishedAt } = req.body;

        if (title == '' || author == '' || genre == '' || publishedAt == '') {
            return res.status(200).json({ status: 200, message: "Plz fill all the required fields" });
        }

        let books = await Book.create({
            title,
            author,
            genre,
            publishedAt,
            status: 1,
            isActive: true
        });

        res.status(200).json({ status: 200, message: "Data saved successfully", data: books });
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
};

const findAllBook = async (req, res) => {
    try {
        let books = await Book.findAll({
            where: { isActive: 1, },

        });
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
};

const findById = async (req, res) => {
    try {
        const { id } = req.params;

        let books = await Book.findOne({
            where: {
                id,
                isActive: 1,
            }
        });


        if (books) {
            res.status(200).json(books);
        } else {
            res.status(404).json({ status: 404, message: 'Book Not found on this ID' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateBook = async (req, res) => {
    try {
        const { id } = req.params;

        const { title, author, genre, publishedAt } = req.body;

        if (title == '' || author == '' || genre == '' || publishedAt == '') {
            return res.status(200).json({ status: 200, message: "Plz fill all the required fields" });
        };

        let books = await Book.update(
            {
                title, author, genre, publishedAt
            },
            {
                where: {
                    id,
                    isActive: 1,
                }
            }
        );

        if (books) {
            const updateBook = await Book.findByPk(id);
            res.json({ message: 'Book updated successfuly', updateBook });
        };

    } catch (error) {
        res.status(500).json({ error: error.message });
    };
};

const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        await Book.update(
            { isActive: 0 },
            { where: { id } }
        )
        res.status(200).json({ status: 200, message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
}

const assignBook = async (req, res) => {
    const { bookId, studentId, email } = req.body;

    try {
        const book = await Book.findByPk(bookId);

        // if (roleId !== true) {
        //     return res.status(403).json({ message: "Only Admin can perform this action" });
        // }

        const admin = await Student.findOne({ where: { email, roleId: 1 } });
        if (!admin) {
            return res.status(403).json({ message: "You are not authorized" });
        }

        // if (req.body.email !== "admin@gmail.com") {
        //     return res.status(403).json({ message: "You are not authorized" });
        // }

        if (!book || book.isActive == false) {
            return res.status(404).json({ message: "Book not found or inactive" });
        }

        if (book.assignedTo) {
            return res.status(400).json({ message: "Book is already assigned to another student" });
        }

        const student = await Student.findByPk(studentId);

        if (!student || student.status === 0) {
            return res.status(404).json({ message: "Student not found or inactive" });
        }

        await Book.update(
            { assignedTo: studentId },
            { where: { id: bookId } }
        )

        res.status(200).json({ message: "Book successfully assigned" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const unassignBook = async (req, res) => {
    const { bookId, email } = req.body;

    try {
        const admin = await Student.findOne({ where: { email, roleId: 1 } });
        if (!admin) {
            return res.status(403).json({ message: "You are not authorized" });
        }

        console.log("Book ID received:", bookId);


        const book = await Book.findByPk(bookId);
        console.log("Book from DB:", book);
        // if (req.body.email !== "admin@gmail.com") {
        //     return res.status(403).json({ message: "You are not authorized" });
        // }

        if (!book) {
            return res.status(404).json({ message: "Book not found or inactive" });
        };

        await Book.update(
            { assignedTo: null },
            { where: { id: bookId } }
        )

        res.status(200).json({ message: "Book successfully unassigned" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
};

module.exports = {
    addBook,
    findAllBook,
    findById,
    updateBook,
    deleteBook,
    assignBook,
    unassignBook
}