<template>
    <div class="ui fluid-container">
        <div class="ui menu">
            <div class="ui container">
                <router-link class="item header item" to="/">
                    <img class="logo" src="./assets/vinaas-logo.png">EasyQuizTest
                </router-link>
            </div>
        </div>
        <div class="ui container">
            <div class="row">
                <div class="ui three column grid">
                    <div class="four wide column">
                        <div class="row" style="padding-bottom:10px">
                            <button v-on:click="endQuizTest" class="positive ui button fluid">Kết thúc thi</button>
                        </div>
                        <div class="row">
                            <div class="ui card">

                                <div class="content">
                                    <div class="ui info message center aligned green">
                                        <div class="header">Thời gian</div>
                                        <h1>
                                            <div id="basicUsage">--:--</div>
                                            <i class="alarm outline icon"></i>
                                        </h1>
                                    </div>

                                </div>
                                <!--<div class="extra content">
                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                </div>-->
                            </div>
                            <div class="ui card">

                                <div class="content">

                                    <div class="ui info message">
                                        <div class="header">Thông tin thí sinh</div>
                                        <ul class="list">
                                            <li>
                                                <b>SBD :</b> {{userInfo.sbd}}</li>
                                            <li>
                                                <b>Họ tên:</b> {{userInfo.userName}}</li>
                                            <li>
                                                <b>Ngày sinh:</b> {{userInfo.birthday}} </li>
                                        </ul>
                                    </div>
                                    <div class="ui info message">
                                        <div class="header">Thông tin kỳ thi</div>
                                        <ul class="list">
                                            <li>
                                                <b>Kì thi :</b> {{quizName}}</li>
                                            <li>
                                                <b>Khóa ngày:</b> {{quizTime}} </li>
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                    <div class="eight wide column">
                        <div class="row">
                            <div class="ui card fluid">
                                <div class="content">
                                    <div class="header">Câu {{ getCurrentOrder() + 1 }} | id: {{currentQuestion.id}}</div>
                                </div>
                                <div class="content">
                                    <h4 class="ui sub header ">{{currentQuestion.description}}</h4>
                                    <table class="ui table celled">
                                        <tbody>
                                            <tr v-for="(a, key) in currentQuestion.listAnswers">
                                                <td style="width:30px">{{getAnswerTitle(key)}}</td>
                                                <td>{{a.content}}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                                <div class="extra content">
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="four wide column">

                        <div class="row">
                            <div class="ui card">
                                <div class="content">
                                    <div class="header">Đáp án</div>
                                </div>
                                <div class="content">
                                    <div class="ui form">
                                        <div class="grouped fields">
                                            <!--<label>How often do you use checkboxes?</label>-->
                                            
                                            <div v-if="currentQuestion.questionType ==='radio'" class="ui radio">
                                                <div v-for="(a,i) in currentQuestion.listAnswers">
                                                    <input type="radio" id="one" :value="a.id" v-model="radioSeletected" ><label for="one">{{getAnswerTitle(i)}} | {{a.isCorrect}}</label>
                                                </div>
                                            </div>
                                            <div v-else class="ui checkbox">
                                                <div v-for="(a,i) in currentQuestion.listAnswers">
                                                    <input type="checkbox" :id="getAnswerTitle(i)" :value="a.id" v-model="checkboxSelected"><label :for="getAnswerTitle(i)">{{a.id}} {{i}} | {{getAnswerTitle(i)}} | {{a.isCorrect}}</label>
                                                    <br/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="extra content">
                                    <button class="ui button green fluid" @click="answer()">Trả lời</button>
                                    <div class="ui divider"></div>
                                        <div>Answerd: {{ currentQuestion.correctAnswers }}</div>
                                        <div>radio: {{ radioSeletected }}</div>
                                        <div>checkbox: {{ checkboxSelected }}</div>
                                    <div id="nav-buttons" class="ui  buttons fluid  center alinged">
                                        <button class="ui button left attached blue " v-bind:disabled="!previous" @click="goPrevious()">
                                            <i class="left chevron icon"></i>Trước</button>
                                        <button class="ui button right attached blue " v-bind:disabled="!next" @click="goNext()"> Sau
                                            <i class="right chevron icon"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="quiz-progress" class="ui teal progress">
                <div class="bar">
                    <div class="progress"></div>
                </div>
                <!--<div class="label"> 6/50 </div>-->
            </div>
            <!--<div class="ui divider"></div>-->
            <div class="row">
                <footer>
                    <div class="ui card fluid">
                        <div class="content">
                            <!-- <button v-for="(q, index) in userQuestions" @click="goToQuestion(q.id)" class="mini ui button" v-bind:class="{inverted: q.id!==current.id, orange: !q.isAnswered, green:q.isAnswered}">Câu {{index+ 1}}</button> -->
                            <button v-for="(q, index) in listQuestions" @click="goToQuestion(index)" class="mini ui button" v-bind:class="{inverted: index !=questionOrder, orange: !q.isAnswered, green:q.isAnswered}">Câu {{index+ 1}}</button>
                        </div>

                    </div>
                    <div class="extra content ui center aligned container">
                        EasyQuizTest, một sản phẩm của VinaAS Co., Ltd
                    </div>
                </footer>
            </div>
            <div id="result" class="ui modal">
                <i class="close icon"></i>
                <div class="header">
                    Kết quả: {{summary.correct}}/{{summary.total}} - Điểm : {{summary.result}}
                </div>
                <div class="image content">
                    <table class="ui celled table">
                        <thead>
                            <tr>
                                <th>Câu</th>
                                <th>Trả lời</th>
                                <th>Đáp án</th>
                                <th>Kết quả </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in listQuestions">
                                <td>{{ index + 1 }}</td>
                                <td>
                                  <!-- <p v-for="item in listQuestions">
                                    <span v-if="item === item.radioSeletected">radio: {{ item.radioSeletected }}</span>
                                    <span v-if="item === item.checkboxSelected">checkbox:  {{ item.checkboxSelected }} </span>
                                  </p> -->
                                  <p v-for="bb in item.listAnswers.filter(x=>x.id == item.radioSeletected)">  
                                    <!-- radio: {{ item.radioSeletected }}
                                    checkbox: {{ item.checkboxSelected }} -->
                                    {{ bb.content }}
                                 </p>
                                 <!-- <p v-for="bb in item.listAnswers.filter(x=>x.id == item.checkboxSelected)">  
                                    {{ bb.content }}
                                 </p> -->
                                </td>

                                <td>
                                  <p v-for="aa in item.listAnswers.filter(x => x.isCorrect==true)">
                                    {{ aa.content }}
                                  </p>
                                </td>
                                <td>{{item.correctAnswers ? "Đúng" : "Sai"}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="actions">
                    <!--<div class="ui button">Cancel</div>
                    <div class="ui button">OK</div>-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import toastr from "toastr";
import startTimer from "../../common/coundown.js";
import _ from "lodash";
import Promise from "bluebird";
import swal from "sweetalert";
import { UsersQuizsService } from '../services/users-quizes'
import { AuthServices } from "../services/auth.js";
const _authServices = new AuthServices();
const usersQuizsService = new UsersQuizsService()
const co = Promise.coroutine;

export default {
  name: "quiz",

  data() {
    return {
      questionOrder : 0,  
      quizId: 3, //mã kì thi
      startTime: "2017-11-30", //thời gian bắt đầu kì thi
      endTime: "2017-12-05", //thời gian kết thúc thi

      quizStatus: "ACTIVE", //trạng thái kì thi: available :đang diễn ra | notstart: sắp diễn ra | completed đã kết thúc. Trạng thái có thể dựa vào startTime, endTime để tính, hoặc thiết lập bằng tay, ví dụ ngưng kì thi khi vẫn chưa tới thời gian kết thúc

      quizName: "kiểm tra 60 phút", //"tên kì thi",
      quizTime: "6/5/2017", // "khóa thi"
   
      checkboxSelected: [1,2],
      radioSeletected: "",

      totalTime: 1800, //thời gian thi, countdown về 0, tính theo giây, 1800s = 30 phút
      numberOfQuestions: 20, //tổng số câu hỏi
      currentQuestion: {},
     
      listQuestions: [
        //danh sách câu hỏi == numberOfQuestions,
        //thiết lập khi Gán Thí Sinh Tham gia kì thi
        // => lựa chọn từ ngẫu nhiên từ danh sách câu hỏi thiết lập cho kì thi
        {
          id: "001", // mã câu hỏi: duy nhất trong ngân hàng câu hỏi
          questionType: "radio", // | checkbox", //để hiển thị loại đáp án
          description: "nội dung câu hỏi 1", //nội dung câu hỏi,
          difficultLevel: 6, // 1 => 10
          categories: [], //chuyên mục của câu hỏi
          isRandom: true, // | false, //Có xáo trộn câu trả lời hay không
          checkboxSelected: [1,2],
          radioSeletected: "",
          listAnswers: [
            //danh sách câu trả lời để users lựa chọn,
            //cho phép hoán đổi vị trí hiển thị, nhưng vẫn giữ id như cũ
            {
              id: 1,
              content: "Nội dung đáp án A",
              isCorrect: true,
              answerByUser: false //khi users chọn câu trả lời, lưu lựa chọn ở đây | Mặc định false
            },
            {
              id: 2,
              content: "Nội dung đáp án B",
              isCorrect: false,
              answerByUser: false //cập nhật khi user trả lời
            },
            {
              id: 3,
              content: "Nội dung đáp án C",
              isCorrect: true,
              answerByUser: true //cập nhật khi user trả lời
            },
            {
              id: 4,
              content: "Nội dung đáp án D",
              isCorrect: false,
              answerByUser: false //cập nhật khi user trả lời
            }
          ],
          correctAnswers: true // | false // answers.forEach(x => { if (x.isCorrect !== x.answerByUser) return false});
        },
        {
          id: "002", // mã câu hỏi: duy nhất trong ngân hàng câu hỏi
          questionType: "radio", // | checkbox", //để hiển thị loại đáp án
          description: "nội dung câu hỏi 2", //nội dung câu hỏi,
          difficultLevel: 6, // 1 => 10
          categories: [], //chuyên mục của câu hỏi
          isRandom: true, // | false, //Có xáo trộn câu trả lời hay không
          checkboxSelected: [1,2],
          radioSeletected: "",
          listAnswers: [
            //danh sách câu trả lời để users lựa chọn,
            //cho phép hoán đổi vị trí hiển thị, nhưng vẫn giữ id như cũ
            {
              id: 1,
              content: "Nội dung đáp án A",
              isCorrect: true,
              answerByUser: false //khi users chọn câu trả lời, lưu lựa chọn ở đây | Mặc định false
            },
            {
              id: 2,
              content: "Nội dung đáp án B",
              isCorrect: false,
              answerByUser: false //cập nhật khi user trả lời
            },
            {
              id: 3,
              content: "Nội dung đáp án C",
              isCorrect: true,
              answerByUser: true //cập nhật khi user trả lời
            },
            {
              id: 4,
              content: "Nội dung đáp án D",
              isCorrect: false,
              answerByUser: false //cập nhật khi user trả lời
            }
          ],
          correctAnswers: true // | false // answers.forEach(x => { if (x.isCorrect !== x.answerByUser) return false});
        },
        {
          id: "003", // mã câu hỏi: duy nhất trong ngân hàng câu hỏi
          questionType: "checkbox", // | checkbox", //để hiển thị loại đáp án
          description: "CHECKBOX: nội dung câu hỏi 3", //nội dung câu hỏi,
          difficultLevel: 6, // 1 => 10
          categories: [], //chuyên mục của câu hỏi
          isRandom: true, // | false, //Có xáo trộn câu trả lời hay không
          checkboxSelected: [1,2],
          radioSeletected: "",
          listAnswers: [
            //danh sách câu trả lời để users lựa chọn,
            //cho phép hoán đổi vị trí hiển thị, nhưng vẫn giữ id như cũ
            {
              id: 1,
              content: "Nội dung đáp án A",
              isCorrect: true,
              answerByUser: false //khi users chọn câu trả lời, lưu lựa chọn ở đây | Mặc định false
            },
            {
              id: 2,
              content: "Nội dung đáp án B",
              isCorrect: false,
              answerByUser: false //cập nhật khi user trả lời
            },
            {
              id: 3,
              content: "Nội dung đáp án C",
              isCorrect: true,
              answerByUser: true //cập nhật khi user trả lời
            },
            {
              id: 4,
              content: "Nội dung đáp án D",
              isCorrect: false,
              answerByUser: false //cập nhật khi user trả lời
            }
          ],
          correctAnswers: true // | false // answers.forEach(x => { if (x.isCorrect !== x.answerByUser) return false});
        }
      ],

      //Query thông tin dựa trên userId
      userInfo: {
        //Block: Thông tin thí sinh
        userId: "xxx", //duy nhất theo thí sinh
        sbd: "001", //số báo danh của thí sinh
        userName: "Nguyễn Văn A",
        birthday: "20/04/2000" //ngày sinh
      },

      //Cập nhật lúc thi
      beginTime: "2017-12-05", //thời gian bắt đầu thi, sau khi users bấm nút "Bắt Đầu"
      userStatus: "prepare", //trạng thái của users đăng nhập,  prepare: chưa thi | started : đang thi | completed : đã thi xong

      minPoint: 7, //1 - 10, //1 số thí sinh được ưu tiên ĐẬU, sẽ được gán điểm tối thiểu từ 1->10
      // minPoint: 8 điểm, với bài thi 20 câu, thì số câu trả lời đúng là 16 câu
      //nếu kết quả nhỏ hơn 16 câu đúng, thì sửa kết quả các câu SAI cho tổng số câu đúng được là 16

      //Cập nhật sau khi user kết thúc bài thi
      summary: {
        // sử dụng để hiển thị kết quả
        result: "", //"Pass | Failt" //kết quả
        answeredPeriod: "", // "xxxx", //thời gian làm bài, tính đến lúc bấm "kết thúc thi" hoặc khi hết giờ
        correct: 10, //số câu trả lời đúng tính dựa vào answeredHistory
        total: 20 // == numberOfQuestions
      }
    };
  },

  computed: mapGetters({
    quiz: "quiz",
    current: "currentQuestion",
    userQuestions: "mapUserQuestions",
    next: "next",
    previous: "previous",
    answereds: "answereds",
    user: "user",
    usersQuizsRow: "usersQuizsRow",
    updateAnswer: function() {
      console.log("computed updateAnswer", this.radioSeletected);
    },
  }),
  components: {},
  mounted: function() {
    var totalSecond = this.totalTime * 60,
      display = document.querySelector("#basicUsage");
    startTimer(totalSecond, display);
    console.log("display", display);

    $("#quiz-progress").progress({
      lable: "ratio",
      value: this.answereds,
      total: this.userQuestions.length,
      text: {
        ratio: "{value}/{total}"
      },
      showActivity: false
    });
  },
  methods: {
    
    chonDapAn(id) {
      console.log("da chon dap an", id);
      //   console.log("Truoc", JSON.stringtify(this.currentQuestion.listAnswers));
      //   this.currentQuestion.listAnswers[0].answerByUser = true;
      //   console.log("Sau", this.currentQuestion.listAnswers);
    },
    getAnswerTitle(id) {
      var title = "";
      if (id == 0) {
        title = "A";
      } else if (id == 1) {
        title = "B";
      } else if (id == 2) {
        title = "C";
      } else if (id == 3) {
        title = "D";
      }
      return title;
    },
    goToQuestion(order) {
      this.questionOrder = order;   
      console.log("question order", order);
      this.currentQuestion = this.listQuestions[order];
      this.checkboxSelected = this.listQuestions[order].checkboxSelected;
      if (this.listQuestions[order].radioSeletected === undefined) {
        this.radioSeletected = "";
      } else {
        this.radioSeletected = this.listQuestions[order].radioSeletected;
      }
      if (this.listQuestions[order].checkboxSelected === undefined) {
        this.checkboxSelected = [];
      } else {
        this.checkboxSelected = this.listQuestions[order].checkboxSelected;
      }
      console.log("this.currentQuestion", this.currentQuestion);
      console.log("radioSelected", this.radioSeletected);
      console.log("checkboxSelected", this.checkboxSelected);
    },

    updateQuestion() {
      var questionId = this.currentQuestion.id;
      for (var i in this.listQuestions) {
        if (this.listQuestions[i].id == questionId) {
          console.log("question update");
          this.listQuestions[i] = this.currentQuestion;
          this.listQuestions[i]["radioSeletected"] = this.radioSeletected;
          this.listQuestions[i]["checkboxSelected"] = this.checkboxSelected;
          console.log("radio", this.listQuestions[i]);
        }
      }
    },
    saveCurrentQuestion() {
      console.log("save Question AA");
    },
    getCurrentOrder() {
      return 0;
    },

    goNext() {
      this.$store.dispatch("goNext").then(() => {
        this._cloneCurrentCheck();
      });
    },
    goPrevious() {
      this.$store.dispatch("goPre").then(() => {
        this._cloneCurrentCheck();
      });
    },

    resultPassFailt() {
      var result = this.summary.correct / this.summary.total * 10;
      if (result >= 5) {
        this.summary.result = "Pass";
      } else this.summary.result = "Failt";
    },

    calculate() {
      //1. tinh toan ket qua
      let correctList = this.listQuestions.filter(
        x => x.correctAnswers == true
      );
      console.log("correctList", correctList);
      correctList.length;

      //2. cap nhat ket qua vào bien data.summary
      this.summary.correct = correctList.length;
      this.summary.total = this.listQuestions.length;
      this.resultPassFailt();

      //3. call API cap nhat lên server
    },
    answer: co(function*() {
      var rs = false;
      if (this.currentQuestion.questionType === "radio") {
        this.currentQuestion.listAnswers.forEach(element => {
          if (element.id === this.radioSeletected) {
            if (element.isCorrect) {
              rs = true;
            }
          }
        });
      } else {
        rs = this.answerCheckboxQuestion();
        console.log("answerCheckboxQuestion()", rs);
      }
      this.currentQuestion.correctAnswers = rs;
      this.updateQuestion();
      $("#quiz-progress").progress({
        lable: "ratio",
        value: this.answereds,
        total: this.userQuestions.length,
        text: {
          ratio: "{value}/{total}"
        },
        showActivity: false
      });
    }),
    answerCheckboxQuestion() {
      var rs = true;
      this.currentQuestion.listAnswers.forEach(element => {
        if (element.isCorrect) {
          if (this.checkboxSelected.indexOf(element.id) == -1) {
            console.log("Correct id", element.id);
            rs = false;
          }
        } else {
          if (this.checkboxSelected.indexOf(element.id) > -1) {
            console.log("unCorrect id", element.id);
            rs = false;
          }
        }
        $("#quiz-progress").progress({
          value: this.answereds,
          total: this.userQuestions.length
        });
      });
      return rs;
    },
    //   if (this.cloneUserCheck.length == 0) {
    //     toastr.warning("Bạn chưa chọn đáp án");
    //     return;
    //   }
    //   toastr.info("Bạn đã trả lời thành công");
    //   yield this.$store.dispatch(
    //     "answer",
    //     Object.assign({}, this.current, { userCheck: this.cloneUserCheck })
    //   );
    //   $("#quiz-progress").progress({
    //     value: this.answereds,
    //     total: this.userQuestions.length
    //   });
    endQuizTest: co(function*() {
      swal(
        {
          title: "Kết thúc bài kiểm tra",
          text: "Bạn có chắc chắn muốn kết thúc bài kiểm tra không?",
          type: "info",
          showCancelButton: true,
          closeOnConfirm: false,
          showLoaderOnConfirm: true,
          confirmButtonText: "Kết thúc",
          cancelButtonText: "Tiếp tục làm bài"
        },
        co(function*() {
          // yield this.$store.dispatch("end");

          this.calculate();
          $("#result").modal("show");
          swal.close();
        }).bind(this)
      );
    }),

    _cloneCurrentCheck() {
      this.cloneUserCheck = _.clone(this.current.userCheck);
    },
    getUserQuizById : Promise.coroutine(function*(userQuizId) {
      let userQuizs = yield usersQuizsService.getBy(userQuizId);
      this.listQuestions = userQuizs.listQuestions;
      this.quizId = userQuizs.quizId;       
      //1.get quizInfo from API
      
      //2. gan vao cac bien tren, vi du quizName
            
      let userId = userQuizs.applicationId; 
      //1.get userInfo from API
      
      //2. gan vao cac bien tren, vi du 
            

      console.log('userQuiz: ', userQuizs);
    }),
  },
  created: co(function*() {
    // yield this.$store.dispatch("getQuiz", 1);
    // yield this.$store.dispatch("getQuestions", this.quiz.id);

    // yield this.$store.dispatch("getUsersQuizsRow", {
    //   userId: _authServices.getUserInfo().userId,
    //   quizId: this.quiz.id
    // });
    // yield this.$store.dispatch("goToQuestion", this.userQuestions[0].id);
    console.log('userQuizId', this.$route.params);
    let id = this.$route.params.id; 
    console.log('userQuizId', id);
    yield this.getUserQuizById(id);
    this.goToQuestion(0);  
  })
};
</script>
<style scoped>
#nav-buttons {
  padding-top: 100px;
  padding-bottom: 10px;
}
</style>
