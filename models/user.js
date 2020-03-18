// // C:\Program Files\PostgreSQL\12\data

// const Sequelize = require("sequelize");
// const bcrypt = require("bcrypt");

// const sequelize = new Sequelize("postgress://postgres@localhost:5432/auth-system");

// const User = sequelize.define(
//   "users",
//   {
//     username: {
//       type: Sequelize.STRING,
//       unique: true,
//       allowNull: false
//     },
//     email: {
//       type: Sequelize.STRING,
//       unique: true,
//       allowNull: false
//     },
//     password: {
//       type: Sequelize.STRING,
//       allowNull: false
//     }
//   },
//   {
//     hooks: {
//       beforeCreate: user => {
//         console.log(user);
//         const salt = bcrypt.genSaltSync();
//         user.password = bcrypt.hashSync(user.password, salt);
//       }
//     },
//     instanceMethods: {
//       validPassword: function(password) {
//         return bcrypt.compareSync(password, this.password);
//       }
//     }
//   }
// );

// //create all defined above tables
// sequelize
//   .sync()
//   .then(() => console.log("users tabel, succesfully created"))
//   .catch(err => console.log(err));

module.exports = {};
