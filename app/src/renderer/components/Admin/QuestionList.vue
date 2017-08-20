<template>
  <div class="ui main text container">
    <h1>Danh sách câu hỏi</h1>
    <div>
      <span data-tooltip="Tạo mới">
      <i class="add to circle icon green" v-on:click="add()"></i></span>
    </div>
    <div class="question ui modal">
      <i class="close icon"></i>
      <div class="header">
        {{checked==true?'Cập nhật':'Tạo mới'}}
      </div>
      <div class="ui content">

        <form class="ui form">
          <div class="field" style="display:none">
            <label>Mã câu đố</label>
            <input type="text" name="quizId" placeholder="Mã câu đố" v-model="current.quizId" Disabled>
          </div> 
          <div class="field">
            <label>Mô tả</label>
            <input type="text" name="description" placeholder="Mô tả" v-model="current.description">
          </div>
          <div class="field">
            <label>Kiểu</label>
            <select v-model="current.type" name="type">
              <option value="">--Chọn kiểu--</option>
              <option value="radio">Một kết quả đúng</option> 
              <option value="checkbox">Nhiều kết quả đúng</option>
            </select>
          </div>
         
          <div class="ui primary submit button">Submit</div>
        </form>
      </div>

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

    <modal name="answers" :width="900" :height="600" :clickToClose="false">
      <div class="container-modal">
        <div class="header">
          <span>Danh sách câu trả lời cho câu hỏi</span>
          <span v-on:click="closeAnswer()" style="font-size:20px;color:red;position: absolute;margin-left: 605px;margin-top: -43px;text-align: right;">
        x
         </span>
        </div>
        <div class="ui content">
          <div class="btn-position-right" v-show="this.answers.length>=1">
            <span data-tooltip='Lưu' data-position="top left" :disabled="disabledSaveAnswer == 1 ? true : false"><i class="save icon editor_edit blue" v-on:click="saveAnswers()"></i></span>
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
 
  import {
    mapState,
    mapGetters
  } from 'vuex'
  import _ from 'lodash'
  import Promise from 'Bluebird'
  import toastr from 'toastr'
  import vmodal from 'vue-js-modal'
  import Logger from '../../../common/logger.js'
   import Vue from 'vue'
  import 'datatables.net-dt/css/jquery.datatables.css';
  const logger = Logger('Admin Questions')
  Vue.use(vmodal)
  const co = Promise.coroutine
  var $ = require('jquery');
  require('datatables.net')(window, $);
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
    "defaultContent": '<div style="text-align:center"><span data-tooltip="cậpp nhật câu hỏi" data-position="top left"><i class="edit icon edit_question blue" ></i></span>|<span data-tooltip="Link Câu trả lời" data-position="top left"><i class="linkify icon go_to_answers orange"></i></span>|<span data-tooltip="Xóa câu h?i" data-position="top left"><i class="delete icon editor_remove red"></i></span></div>'
  }]
  

 export default {

    data() {
      return {
        current: {},
        checked: false,
        question: {},
        answers: [],
        disabledSaveAnswer:0
      }
    },

    computed: {
      ...mapState('adminQuestions', {
        questions: state => state.questionsOfQuiz,
        currentAnswers: state => state.currentAnswers
      })
    },
    created: co(function* () {
      yield this.viewDataTable();
      }),
    mounted: function () {

      let me = this
       
        $('.ui.form')
        .form({
          fields: {
            description: {
              identifier: 'description',
              rules: [{
                type: 'empty',
                prompt: 'Please enter your description'
              }]
            },
             type: {
              identifier: 'type',
              rules: [{
                type: 'empty',
                prompt: 'Please enter your type'
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
          yield me.save()
          cb()
          $('.ui.modal').modal('hide')
          toastr.success('Lưu thành công')
          this.current={};
        }),
        on: 'submit'
      })
      $('.question').modal({
        closable: false,
        onHidden: function () {
          $('.ui.form').form('reset')
          this.current={}  
        }
      })
      me.$forceUpdate()
    
    },
    methods: {
      
         
      closeAnswer:co (function*(){
          this.$modal.hide('answers')
          yield this.viewDataTable();
      }),
      save: co(function* () {
        console.log('@',JSON.stringify(this.current));
        yield this.$store.dispatch('adminQuestions/saveQuestion',this.current)
        yield this.viewDataTable()

      }),
      add: function () {
        logger.debug('add', this.checked);
        this.checked = false;
        this.current={};
        this.current.quizId=this.$route.params.id;
        $('.question').last().modal('show')
      },
      show: function () {
        this.$modal.show('answers');
      },
      viewDataTable: co(function* () {
        let me = this;
        yield this.$store.dispatch('adminQuestions/getQuestionsOfQuiz',this.$route.params.id);
        $(document).ready(() => {

          $('#questions').DataTable().destroy();

          let table = $('#questions').DataTable({
            data: _.clone(me.questions),

            "columns": configColumns,
            "columnDefs": configColumnDefs
          })
          $('#questions').off('click');
          $('#questions').on('click', 'tr .edit_question', co(function* () {
            let selected = table.row($(this).parents('tr')).data();
            console.log('selected', JSON.stringify(selected));
            me.current = _.clone(selected);
            me.checked = true;
            $('.question').last().modal('show')
          }));
          $('#questions').on('click', 'tr .editor_remove', function () {
            let selectedRow = table.row($(this).parents('tr')).data();
            swal({
                title: 'Bạn có chắc chắn',
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
                  me.viewDataTable();
                  swal('Ðã xóa!', 'Dữ liệu đã bị  xóa', 'success')
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
     deleteAnswer:function (ans) {
        this.answers = _.reject(this.answers, ans);
      },
      saveAnswers: co(function* () {
        try {
          this.question.answersForAQuestions = this.answers;
          this.disabledSaveAnswer=1;
           yield this.$store.dispatch('adminQuestions/updateAnswers', this.question)
           
           yield this.viewDataTable();
           this.disabledSaveAnswer=0;
           swal('Thông báo!', 'Lưu thành công', 'success')
        } catch (error) {
          swal('Thông báo!', 'Lưu thất bại', 'error')
        }

      }),
      addAnswer: function () {
        this.answers.push(this.configAnswer());
    
      },
      configAnswer: function () {
        let answer = {};
        answer.questionId = this.question.id;
        answer.name = AnswersName[this.answers.length];
        return answer;
      }
    }
  }
</script>
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