var express = require('express');
var router= express.Router();

const models = require('../models')
const userauth = require('../helpers/userauth.js');

router.get('/', function (req, res, next) {
  let userSession = req.session.login
  let getUserAuth = userauth.userRole(userSession.role)

  res.render('dashboard', {userSession: userSession, getUserAuth: getUserAuth})
})


module.exports = router;
