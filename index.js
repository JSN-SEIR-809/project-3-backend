const express = require('express');

const cors = require('cors');
const app = express();
app.set('port', process.env.PORT || 8000);

//=============================================================================
// Middleware
//=============================================================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//=============================================================================
// ROUTES
//=============================================================================
// Redirect
app.get('/', (req, res) => {
	res.redirect('/api/todos');
});
/* START CONTROLLERS HERE */
const todoController = require('./controllers/todo');
app.use('/api/todos', todoController); // This makes it to where every url in this app will have a base of /api/bookmarks

const usersController = require('./controllers/user');
app.use('/api/users', usersController);

/* END CONTROLLERS HERE */
app.use((err, req, res, next) => {
	const statusCode = res.statusCode || 500;
	const message = err.message || 'Internal Server Error';
	res.status(statusCode).send(message);
});
//=============================================================================
// START SERVER
//=============================================================================
app.listen(app.get('port'), () => {
	console.log(`✅ PORT: ${app.get('port')} 🌟`);
});