'use strict';
module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define('Student', {
    first_name: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: "First name should containt"
        }
      }
    },
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: "Email format not valid"
        },
        isUnique: function(value, next){
          Student.find({
            where: {email:value},
            attributes: ['id']
          })
          .then((err)=>{
            if(err){
              return next('Email already taken')
            }
            next();
          })
        }
      }
    }
  });

  Student.associate = (models)=>{
    Student.belongsToMany(models.Subject,{through: 'StudentSubjects'})
  }

  return Student;
};
