// Require the User model
const User = require('../models/User');
const Todo = require('../models/Todo');
// Require the data
const seedData = require('./seeds.json');
const seedTodoData = require('./seedsToDo.json')

// Delete any existing documents in the Users collection
User.deleteMany()
	// Use insertMany and pass it the seed data
	.then(() => User.insertMany(seedData))
	// Log the successful results
	.then(console.log)

    .then(()=> Todo.deleteMany())

    .then(()=> Todo.insertMany(seedTodoData))
	// Log any errors if things didn't work
	.catch(console.error)
	// Use finally, so that this code will run whether or not
	// things worked and close our connection to the database.
	.finally(process.exit);


// uncomment this after we run the node seed.js and then comment out the above after completetion.

// const Todo = require('../models/Todo');

// const seedData = require('./seeds.json');


// Todo.deleteMany()

// 	.then(() => Todo.insertMany(seedData))

// 	.then(console.log)

// 	.catch(console.error)

// 	.finally(process.exit);
