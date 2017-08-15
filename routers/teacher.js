var express = require('express');
var router= express.Router();

var model = require('../models');

router.use((req,res, next)=>{
  if(req.session.authority == "headmaster"){
     next();
  } else {
    res.send('Maaf anda tidak diizinkan mengakses halaman ini');
  }
})

router.get('/', (req, res)=> {
  model.Teacher.findAll({
    order: [['first_name', 'ASC']]
  })
  .then((teachers) => {
    model.Subject.findAll()
    .then((subjects)=>{
      for (var i = 0; i < teachers.length; i++) {
        if(teachers[i].SubjectId == null){
          teachers[i].sbj_name = "unassigned"
        } else{
          for (var j = 0; j < subjects.length; j++) {
            if(teachers[i].SubjectId == subjects[j].id){
              teachers[i].sbj_name = subjects[j].subject_name
            }
          }
        }
      }
      res.render('teacher', {data_teachers : teachers})
    })
  })
  .catch(err =>{
    res.send(err)
  })
})

router.get('/add', (req, res)=>{
  model.Subject.findAll()
  .then((subjects)=>{
    res.render('addTeacher', {data_subject: subjects, errmsg: false})
  })
  .catch(err =>{
    res.send(err)
  })
})

// //belum setting teacher validation email
// router.post('/add', (req, res)=>{
//   model.Teacher.create(req.body)
//   .then(()=>{
//     res.redirect('/teachers')
//   })
// })
router.post('/add', (req, res)=>{
  model.Teacher.create({
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    email : req.body.email,
    SubjectId : req.body.SubjectId || null
  })
  .then(()=>{
    res.redirect('/teachers')
  })
  .catch((err)=>{
    res.render('addTeacher', {errmsg: err.message})
  })
})

// router.get('/edit/:id', (req, res)=>{
//   model.Teacher.findById(req.params.id)
//   .then((teacher)=>{
//     res.render('editTeacher', {edit_teacher: teacher, errmsg: false})
//   })
// })
router.get('/edit/:id', (req, res)=>{
  model.Teacher.findById(req.params.id)
  .then((teacher)=>{
    model.Subject.findAll()
    .then((subjects)=>{
      res.render('editTeacher', {edit_teacher: teacher, edit_subject : subjects, errmsg: false})
    })
  })
})

// router.post('/edit/:id', (req, res)=>{
//   model.Teacher.update(req.body, {where: { id: req.params.id}})
//   .then(()=>{
//     res.redirect('/teachers')
//   })
// })
router.post('/edit/:id', (req, res)=>{
  model.Teacher.update({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    SubjectId : req.body.SubjectId || null
  },{
    where : {
      id:req.params.id
    }
  })
  .then(()=>{
    res.redirect('/teachers')
  })
  .catch((err)=>{
    console.log(err);
  })
})

router.get('/delete/:id', (req, res)=>{
  model.Teacher.destroy({where: { id: req.params.id}})
  .then(()=>{
    res.redirect('/teachers')
  })
})


module.exports = router;
