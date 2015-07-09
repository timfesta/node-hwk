var express = require("express");
var app = express();
var bodyParser = require('body-parser');
_= require('underscore');

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json 
app.use(bodyParser.json());

	var users = [
		{
			id: 1,
			username: "bob",
			firstname: "Bob",
			lastname: "Jones",
			age: 35

		},
		{
			id: 2,
			username: 'joe',
			firstname: 'Joe',
			lastname: 'Smith',
			age: 23

		},
];


app.get('/users', function (req, res) {
	res.json(users);
});

app.post('/users', function (req, res) {
	var newUser = req.body;
	users.push(newUser);
	res.json(newUser)
});

// update users
app.put('/users/:id', function (req, res) {
	var targetId = parseInt(req.params.id);
	var foundUser = _.findWhere(users, {id: targetId});
	foundUser.firstname = req.body.firstname;
	foundUser.lastname = req.body.lastname;
	res.json(foundUser);
});

//--------show user ------------//
app.get( '/users/:id', function (req, res){
	var targetId = parseInt(req.params.id);
	var foundUser = _.findWhere(users, {id: targetId});
	res.json(foundUser);
});

// -------- delete user -------//

app.delete( '/users/:id', function (req, res){
	var targetId = parseInt(req.params.id);
	var foundUser = _.findWhere(users, {id: targetId});
	var index = users.indexOf(foundUser);
	users.splice(index, 1)
	res.json(foundUser.username + ' has been deleted');
});

app.listen(3000);




