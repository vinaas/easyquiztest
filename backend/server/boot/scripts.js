module.exports = function (app) {
    var User = app.models.ApplicationUser;
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;
    var Question = app.models.Question;
    var Team = app.models.Team;
    var Quiz = app.models.Quiz;
    var UserQuiz = app.models.UsersQuizs;
    
    Role.create([
        { name: 'admin', description : "Quản trị Viên" },
        { name: 'user', description : "Thí Sinh" },
     ], function(err, roles){
        User.create([
            { username: 'admin', email: 'admin@vinaas.com', password: '123', roleId : '1' },
            { username: 'user01', email: 'user@vinaas.com', password: '123', roleId : '2' },
            { username: 'user02', email: 'user02@vinaas.com', password: '123', roleId : '2'},
         ]);
     });
    // User.create([
    //     { username: 'admin', email: 'admin@vinaas.com', password: '123' },
    //     { username: 'user01', email: 'user@vinaas.com', password: '123' },
    //     { username: 'user02', email: 'user02@vinaas.com', password: '123' },
    //  ], function (err, users) {
    //     //create the admin role
    //     Role.create({
    //         name: 'admin'
    //     }, function (err, role) {
    //         role.principals.create({
    //             principalType: RoleMapping.USER,
    //             principalId: users[0].id
    //         }, function (err, principal) {
    //         });
    //     });

    //     Role.create({
    //         name: 'user'
    //     }, function (err, role) {
    //         role.principals.create({
    //             principalType: RoleMapping.USER,
    //             principalId: users[1].id
    //         }, function (err, principal) {
    //         });
    //     });
    // });
    Quiz.create([
        { name : "kì thi thứ 1", startDate: "2017/10/10",  quizTime: "2017/10/10",
          quizStatus: "ACTIVE", totalTime : 30, numberOfQuestions: 20
        },
        { name : "kì thi thứ 2", startDate: "2017/09/10",  quizTime: "2017/10/10",
        quizStatus: "ACTIVE", totalTime : 30, numberOfQuestions: 20
      }
    ], function (err, quiz) {
        Question.create([
            {
                  Description: 'Nội dung câu hỏi 1, kì thi 1',
                  quizId: quiz[0].id,
                  DifficultLevel : 5,
                  category : [],
                  IsRandom : true,
                  QuestionType: "One",
                  ListAnswers : [
                      { Content : "đáp án A", IsCorrect : "true" },
                      { Content : "đáp án B"}
                  ]
            },
            {
                Description: 'Nội dung câu hỏi 2, kì thi 1',
                quizId:  quiz[0].id,
                DifficultLevel : 5,
                category : [],
                IsRandom : true,
                QuestionType: "Multiple",
                ListAnswers : [
                    { Content : "đáp án A", IsCorrect : "true" },
                    { Content : "đáp án B"},
                    { Content : "đáp án C", IsCorrect : "true"}
                ]
          }
        ]);

        UserQuiz.create([
            { quizId : quiz[0].id, applicationUserId: 2 },
            { quizId : quiz[1].id, applicationUserId: 3 }
        ])
    } );
    
};
