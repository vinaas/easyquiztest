<template class="">
<div class="ui fluid-container">
        <div class="ui menu">
            <div class="ui container">
                <router-link class="item header item" to="/">
                    <img class="logo" src="./assets/banner.jpg">EasyQuizTest
                </router-link>
            </div>
        </div>
    <div class="ui container" >
        <h1>Chào mừng Thí Sinh  </h1>
        <h3>Danh Sách (Kì thi) Bài Thi của bạn</h3>
        <table class="ui celled striped table">
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Tên Kì Thi</th>
                    <th>Ngày Thi</th>
                    <th>Trạng Thái </th>
                    <th>Kết Quả </th>
                    <th>Hành Động</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,i) in listUserQuiz">
                    <td >
                        {{i+1}}
                    </td>
                    <td >
                        {{ item.quiz !== undefined ? item.quiz.quizName : ''}}
                    </td>
                    <td >
                        {{item.quizTime | moment}}
                    </td>
                    <td >
                        {{item.userStatus}}
                    </td>
                    <td >
                        {{ displayKetQua(item)}}
                    </td>
                    <td>
                        <button class="ui primary button" v-on:click="goToUserQuiz(item)">
                            Tham Gia
                            <!-- <router-link :to="{ path: 'quiz', params: { id: item.id }}" class="ui primary button" tag="li">Thi</router-link> -->
                        </button>    
                    </td>
                    <!-- <router-link class="item header item" to="/quiz">Tham Gia Thi</router-link> -->
                </tr>
            </tbody>
        </table>
    </div>
    </div>
</template>
<script>
import { mapGetters, mapActions, mapState } from "vuex";
import moment from "moment";
import Logger from "../../common/logger.js";
import Promise from "bluebird";
import toastr from "toastr";
import swal from "sweetalert";
import _ from "lodash";
const logger = Logger("UserQuizView");
import { UsersQuizsService } from "../services/users-quizes";
import { QuizService } from "../services/quiz";
import { AuthServices } from "../services/auth.js";
const _authServices = new AuthServices();
const usersQuizsService = new UsersQuizsService();
const quizsService = new QuizService();

const co = Promise.coroutine;
export default {
  data() {
    return {
      listUserQuiz: []  // item: userQuiz ,   quiz: Quiz
    };
  },
  // Format ngày tháng năm/////////////////////////////
  filters: {
    moment: function(date) {
      return moment(date).format("DD-MM-YYYY");
    }
  },

  computed: {
    getUserId: function() {
      console.log("user", JSON.stringify(_authServices.getUserInfo()));
      var userId = _authServices.getUserInfo().userId;
      return userId;
    }
  },
  mounted: function() {},
  methods: {
    displayKetQua(item) {
        var text = 'Chưa thi'
        if (item.summary !== undefined && item.summary.result !== undefined) {
            if (item.summary.result == 'Pass') {
                text = "Đậu"
            }else {
                text = "Rớt"
            }
        }
        return text;
    },
    getAllByUser: Promise.coroutine(function*() {
      console.log("UserId", JSON.stringify(this.getUserId));
      let userQuizs = yield usersQuizsService.getByUserId(this.getUserId);
      let listQuizId = [];
      userQuizs.forEach(element => {
        if (element.quizId > 0 && !listQuizId.includes(element.quizId)) {
          listQuizId.push(element.quizId);
        }
      });

      let allQuiz = yield quizsService.getAll();
      for(var i in userQuizs) {
          allQuiz.forEach(element => {
              if (element.id == userQuizs[i].quizId) {
                  userQuizs[i]['quiz'] = element; 
                  console.log("quiz", JSON.stringify(userQuizs[i]));
                  this.listUserQuiz.push(userQuizs[i])
              }
          });
      }
    }),
    goToUserQuiz: function (item) {
      console.log('link to UserQuiz', JSON.stringify(item))
      let id = item.id
      this.$router.push({ path: `/quiz/${id}`});  //chú ý dấu
    //   router.push({ path: `/user/${userId}` }) // -> /user/123
    },
  },
  created() {
    this.getAllByUser();
  }
};
</script>
