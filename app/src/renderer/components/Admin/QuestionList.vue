<template>
  <div class="ui main text container">

    <div id="save_question" class="ui modal save_question">
      <i class="close icon"></i>
      <div class="header">
        <h1>{{question.id==undefined?'Tạo mới':'Cập nhật'}}</h1>
      </div>
      <div class="ui content">
        <form class="ui form">
          <div class="field">
            <label>Mô tả</label>
            <input type="text" v-model="question.description" placeholder="Mô tả">
          </div>
          <div class="field">
            <label>Kiểu</label>
            <select v-model="question.type" name="type">
              <option value="">--Chọn kiểu--</option>
              <option value="radio">Một kết quả đúng</option> 
              <option value="checkbox">Nhiều kết quả đúng</option>
            </select>
          </div>
          <button class="ui button green" type="submit" data-tooltip="Lưu"><i class="save icon"></i></button>
        </form>
      </div>
    </div>

    <div class="show_answers ui modal">
      <i class="close icon"></i>
      <div class="header">
        <h1>Danh sách câu trả lời cho câu hỏi</h1>
      </div>
      <div class="ui content">
        <div class="btn-position-right">
          <span data-tooltip='Lưu' data-position="top left"><i class="save icon editor_edit blue" v-on:click="saveAnswers()"></i></span>

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
             <i class="add to circle icon green" v-on:click="addAnswer()"></i></span>
        </div>

      </div>
    </div>
    <div class='btn-position-right'>
      <span data-tooltip="Tạo mới">
      <i class="add to circle icon green" v-on:click="addQuestion()"></i></span>
    </div>
    <br>
    <table id="questions" class="cell-border" cellspacing="0" width="100%">
      <thead>
        <tr>
          <th>Kiểu</th>
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
  const AnswersName = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ']
  const configColumns = [{
      "data": "type"
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
        answers: [],
        question: {},
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
      $('.save_question .ui.form')
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

      $('.save_question .ui.form').api({
        mockResponseAsync: co(function* (st, cb) {
          try {
            yield me.save();
            cb()
            $('.save_question').modal('hide')
          } catch (error) {
            $('.ui.modal').modal('show')
          }

        }),
        on: 'submit'
      });
      $('.save_question').modal({
        closable: false,
        onHidden: function () {
          $('.save_question .ui.form').form('reset')
        }
      })

    },

    methods: {
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
          $('#questions').off('click');
          $('#questions').on('click', 'tr .edit_question', co(function* () {

            let dataQuestion = table.row($(this).parents('tr')).data();

            let question = {};
            question.content = dataQuestion.content;
            question.id = dataQuestion.id;
            question.description = dataQuestion.description;
            question.quizId = dataQuestion.quizId;
            question.type = dataQuestion.type;
            question.answersForAQuestions = dataQuestion.answersForAQuestions.map(x => {
              return _.clone(x)
            })

            me.question = Object.assign({}, me.question, question);
            $('.save_question').last().modal('show')

          }));
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
            me.questionAnswers = Object.assign({}, selectedRow);
            let getanswers = selectedRow.answersForAQuestions.map(x => {

              return _.clone(x)
            })
            me.answers = getanswers;
            $('.show_answers').last()
              .modal({
                allowMultiple: false,
                closable: false,
                onDeny: function () {
                  me.answers = [];
                  return false;
                },
                onApprove: function () {
                  me.answers = [];
                }
              })
              .modal('show')

          });

        })

      }),
      addQuestion: function () {
        $('.save_question').modal('show');
      },
      save: co(function* () {
        try {
          yield this.$store.dispatch('adminQuestions/saveQuestion', this.question)
          yield this.showDataTable();

          if (this.question.id == undefined) {
            swal('Thông báo!', 'Tạo mới câu hỏi thành công', 'success')

          } else {

            swal('Thông báo!', 'Cập nhật câu hỏi thành công', 'success')
          }
        } catch (error) {
          if (this.question.id == undefined) {
            swal('Thông báo!', 'Tạo mới câu hỏi thất bại', 'error')


          } else {
            swal('Thông báo!', 'Cập nhật câu hỏi thất bại', 'error')
          }
        }
      }),
      deleteAnswer: function (ans) {
        this.answers = _.reject(this.answers, ans);
      },
      saveAnswers: co(function* () {
        try {
          //this.answers=this.answers[0]==undefined?this.answers.push({'id':this.questionAnswers.id}):this.answers
          yield this.$store.dispatch('adminQuestions/updateAnswers', this.answers)
          yield this.showDataTable();
          swal('Thông báo!', 'Cập nhật thành công', 'success')
        } catch (error) {
          swal('Thông báo!', 'Cập nhật không thất bại', 'error')
        }
      }),
      addAnswer: function () {
        this.answers = this.answers[0] == undefined ? [] : this.answers;
        this.answers.push(this.configAnswer());
      },
      configAnswer: function () {
        let answer = {};
        let lengthAns = this.answers[0] == undefined ? 0 : this.answers.length - 1;
        let convertNumber = AnswersName[lengthAns].charCodeAt(0);
        let name = String.fromCharCode(convertNumber + 1);
        answer.questionId = this.questionAnswers.id;
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