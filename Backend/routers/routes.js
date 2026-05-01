const express = require('express');
const router = express.Router();

const studentController = require('../controllers/studentController');
const bookController = require('../controllers/bookController');

// Admin Routes
router.post('/loginAdmin', studentController.loginAdmin);
router.put('/assign', bookController.assignBook);
router.put('/unAssign', bookController.unassignBook);

// Student Routes

router.post('/addStudent', studentController.addStudent);
router.put('/updateStudents/:id', studentController.updateStudent);
router.get('/findAllStudents', studentController.findAllStudent);
router.get('/findByID/:id', studentController.findById);
router.delete('/deleteStudent/:id', studentController.deleteStudent);

// Book Routes

router.post('/addBook', bookController.addBook);
router.get('/findAllBooks', bookController.findAllBook);
router.get('/findByIdBook/:id', bookController.findById);
router.put('/updateBook/:id', bookController.updateBook);
router.delete('/deleteBook/:id', bookController.deleteBook);


module.exports = router;