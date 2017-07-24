<template>
  <div class="ui main text container">
  
    <div class="saveQuestion ui modal">
      <i class="close icon"></i>
      <div class="header">
        <h1></h1>
      </div>
      <div class="ui content">
        <form class="ui form">
          <div class="field">
            <label>Tên</label>
            <input type="text" name="description" placeholder="Mô tả" :value="current.description" @input="updateCurrent">
          </div>
          <div class="field">
            <label>Kiểu</label>
            <select :value="current.type" name="type" @input="updateCurrent">
              <option value="">--Chọn kiểu--</option>
              <option value="radio">Một kết quả đúng</option> 
              <option value="checkbox">Nhiều kết quả đúng</option>
            </select>
          </div>
          <div class="ui primary submit button">Submit</div>
        </form>
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
   
    <modal name="answers" :width="900"
         :height="600" :clickToClose="false">
       <div class="container-modal">
        <div class="header">
          <span>Danh sách câu trả lời cho câu hỏi</span>
          <span @click="$modal.hide('answers')" style="position: absolute;
    margin-left: 605px;
    margin-top: -43px;
    text-align: right;">
        ❌
         </span>
        </div>
        
        
        <div class="ui content">
          <div class="btn-position-right">
            <span data-tooltip='Lưu' data-position="top left"><i class="save icon editor_edit blue" v-on:click="saveAnswers()"></i></span>

          </div>

          
          <table id="listAnswers" class="ui celled table" cellspacing="0" width="100%">
            <thead>
              <tr>
                <th>Tên</th>
                <th>Nội dung</th>
                <th>kiểu</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="ans in answers">
                <td>{{ans.name}}</td>
                <td><textarea name="content" v-model="ans.content"></textarea></td>
                <td><input type="checkbox" name="isCorrect" v-model="ans.isCorrect"></td>
                <td><i class="delete icon editor_remove red" v-on:click="deleteAnswer(ans)"></i></td>
              </tr>
            </tbody>
          </table>

          <div class='btn-position-right'><span data-tooltip="Tạo mới">
             <i class="add to circle icon green" v-on:click="addAnswer()"></i></span>
          </div>

        </div>
        </div>
    </modal>
   </div>

</template>

<script>
  import Vue from 'vue'
  import 'datatables.net-dt/css/jquery.datatables.css';
  import {
    mapState,
    mapGetters
  } from 'vuex'
  import _ from 'lodash'
  import Promise from 'Bluebird'
  import toastr from 'toastr'
  import vmodal from 'vue-js-modal'

  Vue.use(vmodal)
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
        question: {},
        answers: []
      }
    },

    computed: {
      ...mapState('adminQuestions', {
        questions: state => state.questionsOfQuiz,
        current: state => state.currentQuestion,
        currentAnswers: state => state.currentAnswers
      })
    },

    created: co(function* () {

      yield this.showDataTable();

    }),
    mounted: function () {
      console.log('me @@@@@', this.answers, this.question);
      let me = this
      $('.ui.form')
        .form({
          fields: {
            description: {
              identifier: 'description',
              rules: [{
                type: 'empty',
                prompt: 'Xin vui lòng nhập mô tả câu hỏi'
              }]
            },
            type: {
              identifier: 'type',
              rules: [{
                type: 'empty',
                prompt: 'Vui lòng nhập kiểu'
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
        mockResponseAsync: co(function* (st, cb) {
          yield me.save()
          cb()
          $('.ui.modal').modal('hide')
          toastr.success('Lưu thành công')
        }),
        on: 'submit'
      })
      $('.saveQuestion').modal({
        closable: false,
        onHidden: function () {
          $('.ui.form').form('reset')
          me.$store.dispatch('adminQuestions/updateAnswersCurrent', {})
        }
      })
      me.$forceUpdate()
    },

    methods: {
      show: function () {
        this.$modal.show('answers');
      },
      updateAnswerCurrent: function () {

      },
      updateCurrent: co(function* (e) {
        let cloneQuiz = Object.assign({}, this.current, {
          [e.target.name]: e.target.value
        });
        cloneQuiz.quizId = this.$route.params.id
        yield this.$store.dispatch('adminQuestions/updateCurrentQuestion', cloneQuiz)
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
          $('#questions').off('click');
          $('#questions').on('click', 'tr .edit_question', co(function* () {
            let itemQuestion = table.row($(this).parents('tr')).data();
            yield me.$store.dispatch('adminQuestions/currentQuestion', itemQuestion)
            $('.saveQuestion').last().modal('show')

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
            let selectedAnswers = table.row($(this).parents('tr')).data();
            let answers = _.isEmpty(selectedAnswers.answersForAQuestions) == true ? [] :
              selectedAnswers.answersForAQuestions.map(x => {
                  return _.clone(x)
              });
            me.answers = answers;
            delete selectedAnswers.answersForAQuestions;
            me.question = selectedAnswers;
            me.$modal.show('answers');

          });

        })

      }),
      addQuestion: co(function* () {
        yield this.$store.dispatch('adminQuestions/currentQuestion', {})
        $('.saveQuestion').last().modal('show')
      }),
      save: co(function* () {

        yield this.$store.dispatch('adminQuestions/saveQuestion', this.current)
        yield this.showDataTable();


      }),
      deleteAnswer: co(function* (ans) {
        this.answers = _.reject(this.answers, ans);
      }),
      saveAnswers: co(function* () {
        try {
         console.log('save',this.question);
         
          yield this.$store.dispatch('adminQuestions/updateAnswers', this.question)
          yield this.showDataTable();
          toastr.success('Lưu thành công')
        } catch (error) {
          toastr.error('Lưu không thành công')
        }

      }),
      addAnswer: function () {
        this.answers.push(this.configAnswer());
        
        this.question.answersForAQuestions=this.answers.map(x => {
                  return _.clone(x)
              });;
        console.log('aa',this.question);
      },
      configAnswer: function () {
        let answer = {};
        answer.questionId = this.question.id;
        answer.name = AnswersName[this.answers.length];
        answer.content = "";
        answer.isCorrect = false;
        return answer;
      }
    }
  }
</script>
<style scoped>

  .container-modal{
    height: 100%;
  overflow-x: scroll;
  margin: 0 auto;
  padding: 3em;
  font: 100%/1.4 serif;
  border: 1px solid rgba(0,0,0,0.25)

     }
  .btn-position-right {
    text-align: right;
  }
  .ui.text.container {
       max-width: 2000px !important;
  }

</style>