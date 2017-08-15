const express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session')


app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname, '/public')));


var index = require('./routers/index')
var teacher = require('./routers/teacher')
var subject = require('./routers/subject')
var student = require('./routers/student')
var dash = require ('./routers/dashboard')
var login = require ('./routers/login')
var user = require ('./routers/user')

app.use(session({
		secret: '%@$fsdg%@%@@#$dfgsf%@#$%@@#^&*()',
		resave: false,
		saveUninitialized: true,
		cookie:{}
}))

app.use('/', login)
app.use('/', index)
app.use('/', user)
app.use('/dashboard', dash)
app.use('/teachers', teacher)
app.use('/subjects', subject)
app.use('/students', student)


app.listen(5000, function(){
	console.log('Iam listen you on port 5000')
})
