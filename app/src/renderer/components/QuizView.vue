<template>
    <div class="ui fluid-container">
        <div class="ui menu">
            <div class="ui container">
                <router-link class="item header item" to="/UserQuiz">
                    <img class="logo" src="./assets/banner.jpg">EasyQuizTest
                </router-link>
            </div>
        </div>
        <div class="ui container">
            <div class="row">
                <div class="ui three column grid">
                    <div class="four wide column">
                        <div class="row" style="padding-bottom:10px">
                            <button v-on:click="endQuizTest" v-show="userStatus != 'COMPLETED'" class="positive ui button fluid">Kết thúc thi</button>
                            <button @click="showKetQua" v-show="userStatus == 'COMPLETED'" class="ui blue button fluid">Xem Kết Quả</button>
                        </div>
                        <div class="row">
                            <div class="ui card">

                                <div class="content">
                                    <div class="ui info message center aligned green">
                                        <div class="header">Thời gian Còn Lại</div>
                                        <h1>
                                            <div>
                                          <countdown
                                                ref="countdown"
                                                @onProgress="countDownProgress"
                                                @onFinish="countDownFinished"
                                            >
                                               {{countdownText}}
                                            </countdown>
                                          
                                            </div>
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
                                                <b>Họ tên:</b> {{userInfo.tenNhanVien}}</li>
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
                                    <div class="header">Câu {{ currentQuestion.id }} | id: {{currentQuestion.id}}</div>
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
                                            
                                            <div v-if="currentQuestion.questionType == 'ONE'" class="ui radio">
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
                                        <button class="ui button left attached blue " v-bind:disabled="! enablePrevious()" @click="goPrevious()">
                                            <i class="left chevron icon"></i>Trước</button>
                                        <button class="ui button right attached blue " v-bind:disabled="! enableNext()" @click="goNext()"> Sau
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
                <div class="label">{{calculateProgress()}}</div>
            </div>
            <div class="ui divider"></div>
            <div class="row">
                <footer>
                    <div class="ui card fluid">
                        <div class="content">
                            <!-- <button v-for="(q, index) in userQuestions" @click="goToQuestion(q.id)" class="mini ui button" v-bind:class="{inverted: q.id!==current.id, orange: !q.isAnswered, green:q.isAnswered}">Câu {{index+ 1}}</button> -->
                            <button v-for="(q, index) in listQuestions" @click="goToQuestion(index)" class="mini ui button" v-bind:class="getQuestionStyleCss(index)">Câu {{index+ 1}}</button>
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
                    Kết quả Bài thi: {{summary.result}}
                </div>
                <h3> {{Math.ceil( (summary.correct * 10) / summary.total)}} Điểm</h3>
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
import Vue from "vue";
import { AuthServices } from "../services/auth.js";
import { UsersQuizsService } from "../services/users-quizes";
import { ApplicationUserService } from "../services/application-user";
import { QuizService } from "../services/quiz";
import CountDown from "vuejs-count-down";

const _authServices = new AuthServices();
const usersQuizsService = new UsersQuizsService();
const applicationUserService = new ApplicationUserService();
const quizService = new QuizService();

Vue.component("countdown", CountDown);

const co = Promise.coroutine;

export default {
  name: "quiz",

  data() {
    return {
      userQuizs: {},
      questionOrder: 0,
      quizId: 3, //mã kì thi
      startTime: "2017-11-30", //thời gian bắt đầu kì thi
      endTime: "2017-12-05", //thời gian kết thúc thi

      quizStatus: "ACTIVE", //trạng thái kì thi: available :đang diễn ra | notstart: sắp diễn ra | completed đã kết thúc. Trạng thái có thể dựa vào startTime, endTime để tính, hoặc thiết lập bằng tay, ví dụ ngưng kì thi khi vẫn chưa tới thời gian kết thúc

      quizName: "kiểm tra 60 phút", //"tên kì thi",
      quizTime: "6/5/2017", // "khóa thi"

      checkboxSelected: [],
      radioSeletected: "",

      totalTime: 0, //thời gian thi, countdown về 0, tính theo giây, 1800s = 30 phút
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
          checkboxSelected: [1, 2],
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
          checkboxSelected: [1, 2],
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
          checkboxSelected: [1, 2],
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
        username: "user01",
        birthday: "20/04/2000", //ngày sinh
        tenNhanVien: "Nguyễn Văn A"
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
        correct: 10, //số câu trả lời đúng tính dựa vào answeredHistory
        total: 20, // == numberOfQuestions

        answeredPeriod: "", // "xxxx", //thời gian làm bài, tính đến lúc bấm "kết thúc thi" hoặc khi hết giờ
        answeredList: [] //danh sách câu đã trả lời
      },

      countdownText: ""
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
    }
  }),
  components: {},
  mounted: function() {
    this.calculateProgress();
    console.log("end mounted");
  },
  methods: {
    countDownProgress(timer) {
      var minutes = parseInt(timer / 60, 10);
      var seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      this.countdownText = minutes + ":" + seconds;
    },
    countDownFinished() {
      // restart when countdown ends
     if (!this.isCompleted()) 
        this.endQuizTest();
    },
    isCompleted() {
       return this.userStatus == "COMPLETED"; 
    },  
    getQuestionStyleCss(order) {
      var style = "";
      ("inverted: index !=questionOrder, orange: !q.isAnswered, green:");
      if (this.questionOrder == order) {
        style = "green";
      } else if (this.summary.answeredList.includes(order)) {
        style = "orange";
      } else {
        var element = this.listQuestions[order];
        console.log(
          "bao" + JSON.stringify(element.questionType),
          " radio",
          element.radioSeletected,
          " checkbox",
          element.checkboxSelected
        );
        if (
          (element.radioSeletected !== undefined &&
            element.radioSeletected != "") ||
          (element.checkboxSelected !== undefined &&
            element.checkboxSelected.length > 0)
        ) {
          style = "blue";
        }
      }
      return style;
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
      // console.log("bao: Prev Question", JSON.stringify(this.currentQuestion));
      this.updateQuestion();

      this.questionOrder = order;
      this.currentQuestion = this.listQuestions[order];
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
      // console.log("bao: Current Question", JSON.stringify(this.currentQuestion) );
    },

    updateQuestion() {
      this.currentQuestion.radioSeletected = this.radioSeletected;
      this.currentQuestion.checkboxSelected = this.checkboxSelected;

      var questionId = this.currentQuestion.id;
      for (var i in this.listQuestions) {
        if (this.listQuestions[i].id == questionId) {
          console.log("question update");
          this.listQuestions[i] = this.currentQuestion;
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

    enableNext() {
      return this.questionOrder < this.listQuestions.length - 1;
    },
    enablePrevious() {
      return this.questionOrder > 0;
    },
    goNext() {
      if (this.questionOrder < this.listQuestions.length - 1) {
        this.goToQuestion(this.questionOrder + 1);
      }
    },
    goPrevious() {
      if (this.questionOrder > 0) {
        this.goToQuestion(this.questionOrder - 1);
      }
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
      var isCorrect = false;
      if (this.currentQuestion.questionType == "ONE") {
        this.currentQuestion.radioSeletected = this.radioSeletected;
        this.currentQuestion.listAnswers.forEach(element => {
          console.log(this.currentQuestion.radioSeletected, "  : ", element.id);
          if (
            element.isCorrect &&
            this.currentQuestion.radioSeletected == element.id
          ) {
            isCorrect = true;
          }
        });
      } else {
        isCorrect = true;
        this.currentQuestion.checkboxSelected = this.checkboxSelected;
        this.currentQuestion.listAnswers.forEach(element => {
          if (element.isCorrect) {
            //là câu đúng nhưng không được chọn
            if (!this.currentQuestion.checkboxSelected.includes(element.id)) {
              isCorrect = false;
            }
          } else {
            //là câu sai nhưng lại chọn
            if (this.currentQuestion.checkboxSelected.includes(element.id)) {
              isCorrect = false;
            }
          }
        });
      }
      this.currentQuestion.correctAnswers = isCorrect;
      this.updateQuestion();
      if (this.summary.answeredList == undefined) {
        this.summary.answeredList = [];
      }
      if (!this.summary.answeredList.includes(this.questionOrder)) {
        this.summary.answeredList.push(this.questionOrder);
      }
      //  this.updateProgress();
      console.log("Trả lời", JSON.stringify(this.summary));
      console.log("Trả lời", JSON.stringify(this.currentQuestion));

      //tự động chuyển sang câu hỏi tiếp theo
      this.goNext();
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
          total: this.userQuestions.length,
          text: {
            ratio: "{value}/{total}"
          },
          showActivity: false
        });
      });
      return rs;
    },
    calculateProgress() {
      if (
        this.summary.answeredList !== undefined &&
        this.summary.total !== undefined
      ) {
        this.updateProgressBar();
        return this.summary.answeredList.length + "/" + this.summary.total;
      } else {
        this.progress = 0;
        return "0 / " + this.summary.total;
      }
    },
    updateProgressBar() {
      var progress = Math.ceil(
        this.summary.answeredList.length / this.summary.total * 100
      );

      $("#quiz-progress").progress({
        percent: progress
      });
    },

    endQuizTest: co(function*() {
      swal(
        {
          title: "Kết thúc",
          text: "Bạn có chắc chắn muốn kết thúc bài thi không?",
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
          this.userStatus = "COMPLETED";
          
          this.showKetQua(); 

          this.updateKetQua();
          swal.close();
        }).bind(this)
      );
    }),
    showKetQua() {
       $("#result").modal("show");
    },
    _cloneCurrentCheck() {
      this.cloneUserCheck = _.clone(this.current.userCheck);
    },
    updateKetQua() {
      this.userQuizs.listQuestions = this.listQuestions;
      this.userQuizs.summary = this.summary;

      this.userQuizs.userStatus = this.userStatus;

      var kq = usersQuizsService.save(this.userQuizs);
      console.log("updateKetQua()", kq);
    },
    getUserQuizById: Promise.coroutine(function*(userQuizId) {
      this.userQuizs = yield usersQuizsService.getBy(userQuizId);
      this.listQuestions = this.userQuizs.listQuestions;
      this.quizId = this.userQuizs.quizId;
      console.log("quiz__ID:", this.quizId);
      this.listAnswers = this.userQuizs.listAnswers;
      console.log("listAnswers|||: ", this.listAnswers);
      if (this.userQuizs.summary === undefined) {
        this.userQuizs.summary = {
          // sử dụng để hiển thị kết quả
          result: "", //"Pass | Failt" //kết quả
          correct: 0, //số câu trả lời đúng tính dựa vào answeredHistory
          total: this.userQuizs.listQuestions.length,
          status: "ChuaThi", // ChuaThi | DangThi | DaThi
          answeredPeriod: "", // "xxxx", //thời gian làm bài, tính đến lúc bấm "kết thúc thi" hoặc khi hết giờ
          answeredList: [] //danh sách câu đã trả lời
        };
      }
      this.summary = this.userQuizs.summary;
      this.beginTime = new Date();
      if (
        this.userQuizs.userStatus === undefined ||
        this.userStatus == "ACTIVE"
      ) {
        this.userStatus = "PROGRESS";
      }else {
        this.userStatus = this.userQuizs.userStatus; 
      }

      //1.get quizInfo from API và gan vao cac bien tren, vi du quizName
      let quizInfo = yield quizService.getBy(userQuizId);
      console.log("quizInfo", quizInfo);
      this.totalTime = quizInfo.totalTime;
      if (this.isCompleted()) {
        this.$refs.countdown.time = 0;
      }else {
        this.$refs.countdown.time = this.totalTime;
      }
      this.$refs.countdown.$emit("restart");
      

      this.quizName = quizInfo.quizName;
      this.quizTime = quizInfo.quizTime;

      //2.get userInfo from API và gan vao cac bien tren, vi du
      let userId = this.userQuizs.applicationId;
      console.log("userId", userId);
      let userInfo = yield applicationUserService.getBy(userId);
      // console.log("userInfo", userInfo)
      let tenNhanVien = userInfo.tenNhanVien;
      let birthday = userInfo.birthday;
      console.log("tenNhanVien", tenNhanVien);
    })
  },
  created: co(function*() {
    console.log("userQuizId", this.$route.params);
    let id = this.$route.params.id;
    console.log("userQuizId", id);
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
