var express = require('express');
var router= express.Router();

const models = require('../models')

router.get('/', (req, res)=>{
  model.User.findAll()
  .then((users)=>{
    res.render('user', {data_users: users})
  })
})


module.exports = router;
