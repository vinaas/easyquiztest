<template>
  <div class="ui main text container">

    <div id="edit_Question" class="ui modal">
      <i class="close icon"></i>
      <div class="header">
        <h1>Cập nhật câu hỏi</h1>
      </div>
      <div class="ui content">
        <form class="ui form">
          <div class="field">
            <label>Mô tả</label>
            <input type="text" v-model="updateQuestion.description" placeholder="Mô tả">
          </div>
          <div class="field">
            <label>Kiểu</label>
            <select v-model="updateQuestion.type" name="type">
              <option value="">--Chọn kiểu--</option>
              <option value="radio">Radio</option> 
              <option value="checkbox">CheckBox</option>
            </select>
          </div>
          <button class="ui button green" type="submit" data-tooltip="Lưu"><i class="save icon"></i></button>
        </form>
      </div>
    </div>


    <div id="openQuestion" class="ui modal">
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
          <button class="ui button green" type="submit"><i class="save icon"></i></button>
        </form>
      </div>
    </div>

    <div id="show_answers" class="ui modal">
      <i class="close icon"></i>
      <div class="header">
        <h1>Danh sách câu trả lời cho câu hỏi</h1>
      </div>
      <div class="ui content">
        <div class="btn-position-right">
          <span data-tooltip='Lưu' data-position="top left"><i class="save icon editor_edit blue" v-on:click="updateAnswers()"></i></span>

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
              <td v-on:click="deleteAnswer(ans)"><i class="delete icon editor_remove red"></i></td>
            </tr>
          </tbody>
        </table>

        <div class='btn-position-right'><span data-tooltip="Tạo mới">
             <i class="add to icon green" v-on:click="addAnswer()"></i></span>
        </div>

      </div>
    </div>
    <div class='btn-position-right'>
     <span data-tooltip="Tạo mới">
      <i class="add to icon green" v-on:click="openQuestion()"></i></span>
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
  const configColumns = [{
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
    "defaultContent": '<div style="text-align:center"><span data-tooltip="cập nhật câu hỏi" data-position="top left"><i class="edit icon edit_question blue" ></i></span>|<span data-tooltip="Link Câu trả lời" data-position="top left"><i class="linkify icon go_to_answers orange"></i></span>|<span data-tooltip="Xóa câu hỏi" data-position="top left"><i class="delete icon editor_remove red"></i></span></div>'
  }]
  const co = Promise.coroutine
  var $ = require('jquery');
  require('datatables.net')(window, $);

  export default {
    data() {
      return {
        updateQuestion: {},
        answers: [],
        question: {
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
      this.question.quizId = this.$route.params.id;
      this.showDataTable();


    },
    mounted: function () {
      let me = this;
      $('#edit_Question .ui.form')
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

        });
        
      $('#edit_Question .ui.form').api({
        mockResponseAsync: co(function* (st, cb) {
          yield me.editQuestion()
          cb()
          $('.ui.modal').modal('hide')

        }),
        on: 'submit'
      })
       $('#openQuestion .ui.form')
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

        });
      $('#openQuestion .ui.form').api({
        mockResponseAsync: co(function* (st, cb) {
          yield me.newQuestion()
          cb()
          $('.ui.modal').modal('hide')

        }),
        on: 'submit'
      })
    },

    methods: {
      editQuestion: co(function* () {
        try {
          yield this.$store.dispatch('adminQuestions/saveQuestion', this.updateQuestion);
          swal('Thông báo!', 'Cập nhật câu hỏi thành công', 'success')
          yield this.showDataTable();
        } catch (error) {
          swal('Thông báo!', 'Cập nhật câu hỏi thất bại', 'error')
        }

      }),
      showDataTable: co(function* () {
        let me = this;
        yield this.$store.dispatch('adminQuestions/getQuestionsOfQuiz', this.$route.params.id);
        $(document).ready(() => {
          $('#questions').DataTable().destroy();
          let table = $('#questions').DataTable({
            data: _.clone(me.questions),

            "columns": configColumns,
            "columnDefs": configColumnDefs
          })

          $('#questions').on('click', 'tr .edit_question', function () {
            let dataQuestion = table.row($(this).parents('tr')).data();
            console.log('dataQuestion', dataQuestion);
            let question = {};
            question.content = dataQuestion.content;
            question.id = dataQuestion.id;
            question.description = dataQuestion.description;
            question.quizId = dataQuestion.quizId;
            question.type = dataQuestion.type;
            question.answersForAQuestions = dataQuestion.answersForAQuestions.map(x => {
              return _.clone(x)
            })
            me.updateQuestion = Object.assign({}, question);

            $('#edit_Question').modal('show');

          });
          $('#questions').on('click', 'tr .editor_remove', function () {
            let selectedRow = table.row($(this).parents('tr')).data();
            swal({
                title: 'Bạn có chắc chắn?',
                text: 'Xóa dữ liệu : ' + selectedRow.description,
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'Có, Xóa',
                closeOnConfirm: false,
                showLoaderOnConfirm: true
              },
              co(function* () {
                try {
                  yield me.$store.dispatch('adminQuestions/removeQuestion', {
                    id: selectedRow.id
                  })
                  me.showDataTable();
                  swal('Đã xóa!', 'Dữ liệu đã bị xóa', 'success')
                } catch (error) {
                  swal('Thông báo!', 'Lỗi không thể xóa', 'error')
                }
              }))
          });
          $('#questions').on('click', 'tr .go_to_answers', function () {
            let selectedRow = table.row($(this).parents('tr')).data();
            me.itemQuestion = selectedRow;
            me.answers = selectedRow.answersForAQuestions.map(x => {
              return _.clone(x)
            })
            let postQuestion = {};
            postQuestion.content = me.itemQuestion.content;
            postQuestion.description = me.itemQuestion.description;
            postQuestion.id = me.itemQuestion.id;
            postQuestion.quizId = me.itemQuestion.quizId;
            postQuestion.type = me.itemQuestion.type;
            postQuestion.answersForAQuestions = Object.assign({}, me.answers);
            $('#show_answers').modal('show');
          });

        })

      }),
      openQuestion: function () {
        $('#openQuestion').modal('show');
      },
      newQuestion: Promise.coroutine(function* () {

        try {

          yield this.$store.dispatch('adminQuestions/saveQuestion', this.question)
          yield this.showDataTable();
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


  .ui.text.container {
    max-width: 2000px !important;
  }
</style>