const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');
const notesController = require('../controllers/notes')
const usermodel = require('../models/Notes.js');
const {  authentication, authorise } = require('../middleware/middauth')


0
router.post('/User', authController.createUser);
router.post('/login', authController.loginUser);

router.get('/User/:userId', authentication, authController.getUser);

//            craeteNote
router.post('/notes', authentication, notesController.createNotes);
router.get('/notes', authentication, notesController.getBlog);
router.put("/notes/:notesId", authentication,  notesController.updateNote);
router.delete("/notes/:notesId", authentication,  notesController.deleteBook)



router.all('/*', function (req, res) {
    res.status(400).send({ status: false, message: "Invalid HTTP request" });
  })
  
  module.exports = router