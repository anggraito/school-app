'use strict';
//ambil createHash and random string
const genSalt = require('../helpers/generatesalt');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: "User and Password Can't be null"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: "User and Password Can't be null"
        }
      }
    },
    role: DataTypes.STRING,
    salt: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (models)=> {
        let secret = genSalt.genRandomString(8);
        let password = models.password
        models.password = genSalt.createHash(password, secret);
        models.salt = secret;
      }
    }
  });

  return User;
};
