'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Students', [{
      first_name : "Kirana",
      last_name: "Sirena",
      email: "kirana.sirena@murid.com",
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      first_name : "Janson",
      last_name: "Herino",
      email: "janson.herino@murid.com",
      createdAt : new Date(),
      updatedAt : new Date()
    }], {});
  },


  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Students', null);
  }
};
