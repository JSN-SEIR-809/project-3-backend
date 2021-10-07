const { json } = require('express');
const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.get('/', async (req, res, next) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
});

// Show route
// api/users/:id
router.get('/:id', async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id);
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
});

//post route
router.post('/', async (req, res, next) => {
	try {
		const user = await User.create(req.body);
		res.status(201).json(user);
		//res.status(201).json(user);
		//status not needed but is nice to have
		// 201 means something has been created!
	} catch (error) {
		next(error);
	}
});

router.delete('/:id', async (req, res, next) => {
	try {
		const id = req.params.id;
		const deletedOne = await User.findByIdAndDelete(id);
		// res.sendStatus(204);
		res.status(204).json(deletedOne);
	} catch (error) {
		next(error);
	}
});


module.exports = router;
