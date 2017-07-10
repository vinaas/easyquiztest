<template>
  <div class="ui main text container">

    <div id="openModelQuestion" class="ui modal">
      <i class="close icon"></i>
      <div class="header">
        <h1>Tạo mới câu hỏi</h1>
      </div>
      <div class="ui content">
        <form class="ui form">
          <div class="field">
            <label>Mô tả</label>
            <input type="text" v-model="question.description" placeholder="Mô tả" name="description">
          </div>
          <div class="field">
            <label>Kiểu</label>
            <select v-model="question.type" name="type">
              <option value="">--Chọn kiểu--</option>
              <option value="radio">Radio</option>
              <option value="checkbox">CheckBox</option>
            </select>


          </div>
          <button class="ui button" type="submit">Submit</button>
        </form>

      </div>
    </div>

    <div id="updateQuestion" class="ui modal">
      <i class="close icon"></i>
      <div class="header">
        <h1>Danh sách câu trả lời cho câu hỏi</h1>
      </div>
      <div class="ui content">
        <div class="btn-position-right">
          <button class="ui button primary" v-on:click="updateAnswers()">Lưu</button>
        </div>

        <br>
        <table id="listAnswers" class="ui celled table" cellspacing="0" width="100%">
          <thead>
            <tr>
              <th>Tên</th>
              <th>Nội dung</th>
              <th>Đúng</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ans in answers">
              <td>{{ans.name}}</td>
              <td><textarea v-model="ans.content"></textarea></td>
              <td><input type="checkbox" v-model="ans.isCorrect"></td>
              <td v-on:click="deleteAnswer(ans)" class="deleteColor">X</td>
            </tr>
          </tbody>
        </table>

        <div class='btn-position-right'>
          <button class="ui button primary" v-on:click="addAnswer()">Tạo mới</button>
        </div>

      </div>
    </div>
    <div class='btn-position-right'>
      <button class="ui button primary" v-on:click="openModelQuestion()">Tạo mới</button>

    </div>
    <br>
    <table id="questions" class="display dataTable" cellspacing="0" width="100%">
      <thead>
        <tr>
         
          <th>Nội dung</th>
          <th>Mô tả</th>
          <th>Hoạt động</th>
        </tr>
      </thead>
    </table>
  </div>

</template>

<script>
  import 'datatables.net-dt/css/jquery.datatables.css';
  import {
    mapState,
    mapGetters
  } from 'vuex'
  import _ from 'lodash'
  import Promise from 'Bluebird'
  const AnswersName = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
  const configColumns = [
    {
      "data": "content"
    },
    {
      "data": "description"
    },
    {
      "data": "Action"
    }
  ]
  const configColumnDefs = [{
    "targets": -1,
    "data": null,
    "defaultContent": "<button class='ui primary button' style='width:100px'>câu trả lời</button>"
  }]
  const co = Promise.coroutine
  var $ = require('jquery');
  require('datatables.net')(window, $);

  export default {
    data() {
      return {

        answers: [],
        question: {
          id: "",
          type: false
        },
        questionAnswers: {}
      }
    },

    computed: {
      ...mapState('adminQuestions', {
        questions: state => state.questionsOfQuiz
      })
    },

    created: function () {
       this.question.quizId=this.$route.params.id;
        this.getDataTable();
        console.log('aaa',this.question);

    },
    mounted: function () {
      let me = this;
      $('.ui.form')
        .form({
          fields: {
            type: {
              identifier: 'type',
              rules: [{
                type: 'empty',
                prompt: 'Xin vui lòng chọn kiểu'
              }]
            }

          },
          onSuccess: function (event, fields) {
            event.preventDefault()
            return true
          },
          onFailure: function () {
            toastr.error('Lưu không thành công')
            return false
          }

        })
      $('.ui.form').api({
        mockResponseAsync: Promise.coroutine(function* (st, cb) {
          yield me.newQuestion()
          me.getDataTable();
          cb()
          $('.ui.modal').modal('hide')

        }),
        on: 'submit'
      })
    },

    methods: {
      getDataTable(){
         let me = this;
        
      this.$store.dispatch('adminQuestions/getQuestionsOfQuiz',this.$route.params.id).then(() => {

        $(document).ready(() => {


          let table = $('#questions').DataTable({
            data: _.clone(me.questions),

            "columns":configColumns,
            "columnDefs": configColumnDefs
          })
          $('#questions tbody').on('click', 'tr', function () {
            console.log('data', JSON.stringify(table.row(this).data().answersForAQuestions))
            me.itemQuestion = table.row(this).data();
            me.answers = table.row(this).data().answersForAQuestions.map(x => {
              return _.clone(x)
            })
            let postQuestion = {};
            postQuestion.content = me.itemQuestion.content;
            postQuestion.description = me.itemQuestion.description;
            postQuestion.id = me.itemQuestion.id;
            postQuestion.quizId = me.itemQuestion.quizId;
            postQuestion.type = me.itemQuestion.type;
            postQuestion.answersForAQuestions = Object.assign({}, me.answers);
         
            $('#updateQuestion').modal('show');

          });
        })
      })
      },
      openModelQuestion: function () {
        $('#openModelQuestion').modal('show');
      },
      newQuestion: Promise.coroutine(function* () {

        try {

          yield this.$store.dispatch('adminQuestions/saveQuestion',this.question)
          swal('Thông báo!', 'Tạo mới câu hỏi thành công', 'success')
        } catch (error) {
          swal('Thông báo!', 'Tạo mới câu hỏi thất bại', 'error')
        }


      }),
      deleteAnswer: function (ans) {
        this.answers = _.reject(this.answers, ans);
      },
      updateAnswers: co(function* () {
        try {
          yield this.$store.dispatch('adminQuestions/updateAnswers', this.answers)

          swal('Thông báo!', 'Cập nhật thành công', 'success')
        } catch (error) {
          swal('Thông báo!', 'Cập nhật không thất bại', 'error')
        }
      }),
      addAnswer: function () {
        this.answers.push(this.configAnswer());
      },
      configAnswer: function () {
        let answer = {};
        let lengthAns = this.answers[0] == undefined ? 0 : this.answers.length - 1;
        let convertNumber = AnswersName[lengthAns].charCodeAt(0);
        let name = String.fromCharCode(convertNumber + 1);
        answer.questionId = this.questionAnswers.id;
        answer.id = 0;
        answer.name = this.answers[0] == undefined ? 'A' : name;
        answer.content = "";
        answer.isCorrect = false;
        return answer;
      }

    }


  }
</script>
<style scoped>
  .btn-position-right {
    text-align: right;
  }

  .deleteColor {
    color: red
  }

  .ui.text.container {
    max-width: 2000px !important;
  }
</style>