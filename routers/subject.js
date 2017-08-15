var express = require('express');
var router= express.Router();

var model = require('../models');
//const userauth = require('../helpers/userauth.js');

router.use((req,res, next)=>{
  if(req.session.authority == 'academic' || req.session.authority == 'headmaster'){
     next();
  } else {
    res.send('Maaf anda tidak diizinkan mengakses halaman ini');
  }
})

router.get('/', (req, res)=>{
  model.Subject.findAll()
  .then((subjects)=> {
    model.Teacher.findAll()
    .then((teachers)=>{
      for (var j = 0; j < subjects.length; j++) {
        var teacherName = []
        for (var i = 0; i < teachers.length; i++) {
          if(subjects[j].id == teachers[i].SubjectId){
            let fullname = teachers[i].first_name + ' ' + teachers[i].last_name
            subjects[j].teacher_name = fullname
            teacherName.push((i+1)+ '. ' +subjects[j].teacher_name)
          }
        }
        subjects[j].teacher_name = teacherName.join("\n")
      }
      res.render('subject', {data_subjects: subjects});
    })
  });
})

router.get('/add', (req, res)=>{
  res.render('addSubject', {errmsg: false, title : "Add New Subject"})
})

router.post('/add', (req, res)=>{
  model.Subject.create(req.body)
  .then(()=>{
    res.redirect('/subjects')
  })
  .catch((err)=>{
    res.render('addSubject', {errmsg: err.errors[0].message});
  })
})

module.exports = router;
