module.exports = function (app) {
  // var User = app.models.ApplicationUser;
  // var Role = app.models.Role;
  // var RoleMapping = app.models.RoleMapping;

  // User.create([{
  //     username: 'admin1',
  //     email: 'john@doe.com',
  //     password: 'showmethepassword'
  //   },
  //   {
  //     username: 'admin2',
  //     email: 'jane@doe.com',
  //     password: 'showmethepassword'
  //   },
  //   {
  //     username: 'test',
  //     email: 'bob@projects.com',
  //     password: 'showmethepassword'
  //   }
  // ], function (err, users) {
  //   if (err) throw err;

  //   console.log('Created users:', users);

  //   // create project 1 and make john the owner


  //   //create the admin role
  //   Role.create({
  //     name: 'admin'
  //   }, function (err, role) {
  //     if (err) throw err;

  //     console.log('Created role:', role);

  //     //make bob an admin
  //     role.principals.create({
  //       principalType: RoleMapping.USER,
  //       principalId: users[2].id
  //     }, function (err, principal) {
  //       if (err) throw err;

  //       console.log('Created principal:', principal);
  //     });
  //   });
  // });
  // RoleMapping.belongsTo(User);
  // User.hasMany(RoleMapping, {
  //   foreignKey: 'principalId'
  // });
  // Role.hasMany(User, {
  //   through: RoleMapping,
  //   foreignKey: 'roleId'
  // });
};
