const express = require('express');
const router = express.Router();
const { user, addUser, updateUser, deleteUser } = require('../controllers/controller');


// GET
router
.route('/')
.get(user);


// POST
router
.route('/new')
.post(addUser);


// UPDATE
router
.route('/update')
.patch(updateUser);


// DELETE
router
.route('/delete/:id')
.delete(deleteUser);



module.exports = router;