
const app = require('express')();
const mysql = require('mysql');

const bodyParser = require('body-parser');

app.use(bodyParser.json({
    limit: '8mb'
})); // support json encoded bodies

// environment variables
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '0.0.0.0';

// mysql credentials
const connection = mysql.createConnection({
	host: process.env.MYSQL_HOST || '172.17.0.2',
	user: process.env.MYSQL_USER || 'root',
	password: process.env.MYSQL_PASSWORD || 'password',
	database: process.env.MYSQL_DATABASE || 'test'
});

connection.connect((err) => {
	if (err) {
		console.error('error connecting mysql: ', err);
	} else {
		console.log('mysql connection successful');
		app.listen(PORT, HOST, (err) => {
			if (err) {
				console.error('Error starting  server', err);
			} else {
				console.log('server listening at port ' + PORT);
			}
		});
	}
});

// home page
app.get('/', (req, res) => {
	res.json({
		success: true,
		message: 'Hello world'
	});
});

// insert a user into database
app.post('/user', (req, res) => {
	const user = req.body;
	const query = 'INSERT INTO user values(?, ?)';

	connection.query(query, [user.id, user.name, user.age, user.department, user.subject], (err, results, fields) => {
		if (err) {
			console.error(err);
			res.json({
				success: false,
				message: 'Error occured'
			});
		} else {
			res.json({
				success: true,
				message: 'Successfully added student'
			});
		}
	});
});

// fetch all users
app.post('/user', (req, res) => {
	const query = 'SELECT * FROM user';
    connection.query(query, (err, results, fields) => {
    	if (err) {
    		console.error(err);
    		res.json({
    			success: false,
    			message: 'Error occured'
    		});
    	} else {
    		res.json({
    			success: true,
    			result: results
    		});
    	}
    });
});

// update an user name and age
app.put('/user', (req, res) => {
	const user = req.body;
	connection.query('UPDATE `user` SET `name`=?,`age`=? where `id`=?', [user.name,user.age,user.id], function (error, results, fields) {
	   if (error) throw error;
	   res.end(JSON.stringify(results));
	 });
 });

//delete an user 
 app.delete('/user', (req, res) => {
	console.log(req.params);
	const user =  req.params;
	connection.query('DELETE FROM `user` WHERE `id`=?', [user.id], function (error, results, fields) {
	   if (error) throw error;
	   res.end('Record has been deleted!');
	 });
 });
