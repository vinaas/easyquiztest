// module.exports = function(app) {
//     var User = app.models.ApplicationUser;
//     var Role = app.models.Role;
//     var RoleMapping = app.models.RoleMapping;
//     var Question = app.models.Question;
//     var Team = app.models.Team;
//     var Quiz = app.models.Quiz;
//     var UserQuiz = app.models.UsersQuizs;

//     Role.create([
//         { name: 'admin', description: "Quản trị Viên" },
//         { name: 'user', description: "Thí Sinh" },
//     ], function(err, roles) {
//         User.create([
//             { username: 'admin', email: 'admin@vinaas.com', password: '123', roleId: '1' },
//             { username: 'user01', email: 'user@vinaas.com', password: '123', roleId: '2' },
//             { username: 'user02', email: 'user02@vinaas.com', password: '123', roleId: '2' },
//         ]);
//     });
//     // User.create([
//     //     { username: 'admin', email: 'admin@vinaas.com', password: '123' },
//     //     { username: 'user01', email: 'user@vinaas.com', password: '123' },
//     //     { username: 'user02', email: 'user02@vinaas.com', password: '123' },
//     //  ], function (err, users) {
//     //     //create the admin role
//     //     Role.create({
//     //         name: 'admin'
//     //     }, function (err, role) {
//     //         role.principals.create({
//     //             principalType: RoleMapping.USER,
//     //             principalId: users[0].id
//     //         }, function (err, principal) {
//     //         });
//     //     });

//     //     Role.create({
//     //         name: 'user'
//     //     }, function (err, role) {
//     //         role.principals.create({
//     //             principalType: RoleMapping.USER,
//     //             principalId: users[1].id
//     //         }, function (err, principal) {
//     //         });
//     //     });
//     // });
//     Quiz.create([{
//             startDate: "2017/10/10",
//             quizStatus: "ACTIVE",
//             totalTime: 30,
//             numberOfQuestions: 20,
//             quizInfo: {
//                 quizTime: "2017/10/10",
//                 quizName: "kì thi thứ 1"
//             }
//         },
//         {
//             startDate: "2017/09/10",
//             quizStatus: "ACTIVE",
//             totalTime: 30,
//             numberOfQuestions: 20,
//             quizInfo: {
//                 quizTime: "2017/10/10",
//                 quizName: "kì thi thứ 2"
//             }
//         }
//     ], function(err, quiz) {
//         Question.create([{
//                 id: 1,
//                 description: 'Nội dung câu hỏi 1, kì thi 1',
//                 quizId: quiz[0].id,
//                 difficultLevel: 5,
//                 category: [],
//                 isRandom: true,
//                 questionType: "ONE",
//                 listAnswers: [
//                     { id: 1, content: "đáp án A", isCorrect: "true" },
//                     { id: 2, content: "đáp án B" }
//                 ]
//             },
//             {
//                 id: 2,
//                 description: 'Nội dung câu hỏi 2, kì thi 1',
//                 quizId: quiz[0].id,
//                 difficultLevel: 5,
//                 category: [],
//                 isRandom: true,
//                 questionType: "MANY",
//                 listAnswers: [
//                     { id: 1, content: "đáp án A", isCorrect: "true" },
//                     { id: 2, content: "đáp án B" },
//                     { id: 3, content: "đáp án C", isCorrect: "true" }
//                 ]
//             }
//         ]);

//         // UserQuiz.create([
//         //     { quizId: quiz[0].id, applicationUserId: 2 },
//         //     { quizId: quiz[1].id, applicationUserId: 3 }
//         // ])
//     });

// };