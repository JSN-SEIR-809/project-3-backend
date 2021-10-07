const express = require('express');
const router = express.Router();

// import the todo model
const Todo = require('../models/Todo');

// Index: GET all the todos
router.get('/', async (req, res, next) => {
	try {
		// 1. Get all the todos from the DB
		const todos = await Todo.find().populate({
			path: 'Todoer',
			select: 'username',
		});
		// 2. Once the bookmarks are back, send them to the client in JSON format
		res.status(200).json(todos);
	} catch (error) {
		// 3. If there are errors, pass it on!
		next(error);
	}
});

// Show route:
// api/todos/:id
router.get('/:id', async (req, res, next) => {
	try {
		// 1. Get ONE todo from the DB based on its id
		const id = req.params.id;
		const todo = await Todo.findById(id).populate('Todoer');
		res.status(200).json(todo);
	} catch (error) {
		// 3. If there are errors, pass it on!
		next(error);
	}
});

// Create route: POST a new bookmark
router.post('/', async (req, res, next) => {
	try {
		// 1. Create a new bookmark
		const todo = await Todo.create(req.body);
		// 2. Send back the bookmark to the user, with status 201 Created
		res.status(201).json(todo);
	} catch (error) {
		// 3. If there's an error, pass it on!
		next(error);
	}
});

// Update route: PUT
router.put('/:id', async (req, res, next) => {
	try {
		const id = req.params.id;
		// const bookmark = await Bookmark.findByIdAndUpdate(id, req.body, {
		// 	new: true,
		// });
		const todo = await Todo.findOneAndUpdate({ _id: id }, req.body, {
			// the third argument is additional options we can pass to the query
			// return the NEW updated document instead of the old one
			// new: true,
		});
		res.status(202).json(todo);
	} catch (error) {
		next(error);
	}
});

router.delete('/:id', async (req, res, next) => {
	try {
		const id = req.params.id;
		const deletedOne = await Todo.findByIdAndDelete(id);
		// res.sendStatus(204);
		res.status(204).json(deletedOne);
	} catch (error) {
		next(error);
	}
});

// Export this router object so that it is accessible when we require the file elsewhere
module.exports = router;
