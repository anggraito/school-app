var express = require('express');
var router= express.Router();

var model = require('../models');
//const userauth = require('../helpers/userauth.js');

router.use((req,res, next)=>{
  if(req.session.authority == 'headmaster' || req.session.authority == 'teacher' || req.session.authority == 'academic'){
     next();
  } else {
    res.send('Maaf anda tidak diizinkan mengakses halaman ini');
  }
})

router.get('/', (req, res)=>{
  model.Student.findAll()
  .then((students)=> {
    res.render('student', {data_students: students, title : "Data Student"});
  });
})

router.get('/add', (req, res)=>{
  res.render('addStudent', {errmsg: false, title : "Add New Student"})
})

router.post('/add', (req, res)=>{
  model.Student.create(req.body)
  .then(()=>{
    res.redirect('/students')
  })
  .catch((err)=>{
    res.render('addStudent', {errmsg: err.errors[0].message});
  })
})

router.get('/edit/:id', (req, res)=>{
  model.Student.findById(req.params.id)
  .then((student)=>{
    res.render('editStudent', {edit_student: student, errmsg: false, title : "Edit Student Data"})
  })
})

// router.post('/edit/:id', (req, res)=>{
//   model.Student.update({first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email},
//     { where:
//       {id : req.params.id}
//     })
//   .then(()=>{
//     res.redirect('/students')
//   })
// })
router.post('/edit/:id', (req, res)=>{
  model.Student.findOne({
    where:{
      email: req.body.email
    }
  })
  .then((result)=>{
    if(!result){
      model.Student.update({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
      },
      {
        where:{
          id:req.params.id
        }
      })
      .then(()=>{
        res.redirect('/students');
      })
      .catch((err)=>{
        model.Student.findById(req.params.id)
        .then((rows)=>{
          res.render('editStudent',{edit_student:rows, errmsg: err.message})
        })
      })
    } else {
      res.render('editStudent', {errmsg: 'Ganti lainnya lahhh'});
    }
  })
})

router.get('/delete/:id', (req, res)=>{
  model.Student.destroy({ where:{ id : req.params.id}})
  .then(()=>{
    res.redirect('/students');
  })
})

router.get('/:id/addsubject', (req, res)=>{
  //model.StudentSubject.findAll()
  //.then((ss)=>{
    model.Student.findById(req.params.id)
    .then((student)=>{
      model.Subject.findAll()
      .then((subjects)=>{
        // for (var i = 0; i < subjects.length; i++) {
        //   for (var j = 0; j < ss.length; j++) {
        //     if (ss[j].SubjectId === subjects[i].id) {
        //       ss[j].SubjectName = subjects[i].subject_name
        //       let studentName = student.first_name + ' '+ student.last_name
        //       ss[j].StudentId = studentName
        //     }
        //   }
        // }
        res.render('addSubjectStudent', {data_student : student, data_subject: subjects})
      })
    })
  //})
  .catch((err)=>{
    res.send(err)
  })

  //res.render('addSubjectStudent')
})

router.post('/:id/addsubject', (req, res)=>{
  model.StudentSubject.create(req.body)
  res.redirect(`/students/${req.params.id}/addsubject`)
})




module.exports = router;
