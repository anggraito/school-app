var express = require('express');
var router= express.Router();

const models = require('../models')
const genSalt = require('../helpers/generatesalt');


router.get('/signup', (req, res)=>{
	res.render('signup')
})

router.get('/login', (req, res)=>{
	res.render('login', {errmsg: false || ''})
})

router.post('/login', (req, res, next)=>{
	models.User.findOne({
    where: {
			username: req.body.username
		}
  })
	.then((user) =>{
		var saltUserLogin = user.salt
		var passwordUserLogin = req.body.password
		var newPass = genSalt.createHash(passwordUserLogin, saltUserLogin)
		if (user.password == newPass) {
			req.session.login = true
			req.session.role = user.role
			req.session.salt = user.salt

			if(req.session.role == "teacher"){
        req.session.authority = "teacher"
      } else if(req.session.role == "academic"){
        req.session.authority = "academic"
      } else if(req.session.role == "headmaster"){
        req.session.authority = "headmaster"
      }

			res.redirect('/dashboard')
		}
	})
})

router.get('/logout', (req,res,next)=>{
	req.session.destroy()
	res.redirect('/')
})


router.post('/signup', (req, res)=> {
  models.User.create({
    username: req.body.username,
    password: req.body.password,
    role: req.body.role
  })
  .then(()=> {
    res.redirect('/')
  })
  .catch(err => {
    console.log(err);
  })
})


module.exports = router;
