<template>
  <div class="ui main text container">
    <button class="ui button primary" v-on:click="addAnswerByQuestion()">Tạo mới</button>
    <button class="ui button primary" v-on:click="updateAnswer()">Lưu</button>
    <div id="updateQuestion" class="ui modal">
      <i class="close icon"></i>
      <div class="header">
        <h1>List Answers For Questions</h1>
      </div>
      <div class="ui content">

        <table class="ui table segment">
          <thead>
            <tr>
              <th>Name</th>
              <th>Content</th>
              <th>Is Correct</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="answer in answers">
              <td>{{answer.name}}</td>
              <td><textarea v-model="answer.content"></textarea></td>
              <td><input type="checkbox" v-model="answer.isCorrect"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <table id="questions" class="display dataTable" cellspacing="0" width="100%">
      <thead>
        <tr>
          <th>Id</th>
          <th>Content</th>
          <th>Description</th>
          <th>Action</th>
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
  const co = Promise.coroutine
  var $ = require('jquery');
  require('datatables.net')(window, $);

  export default {
    data() {
      return {

        answers: [],
        itemQuestion: {}
      }
    },

    computed: {
      ...mapState('adminQuestions', {

      }),
      ...mapGetters('adminQuestions', {
        questions: 'questions'
      })
    },

    created: co(function* () {

      let me = this

      this.$store.dispatch('adminQuestions/getAll').then(() => {

        $(document).ready(() => {


          let table = $('#questions').DataTable({
            data: _.clone(me.questions),

            "columns": [{
                "data": "id"
              },
              {
                "data": "content"
              },
              {
                "data": "description"
              },
              {
                "data": "Action"
              }

            ],
            "columnDefs": [{
              "targets": -1,
              "data": null,
              "defaultContent": "<button>Cập nhật</button>"
            }]
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
            // console.log('postQuestion', postQuestion)
            $('#updateQuestion').modal('show');

          });
        })
      })

    }),
    methods: function (answers) {
      // handleName() {

      //   let listName = ['A', 'B', 'C', 'D', 'E', 'G', 'H']
      //   let getNames = listName.splice(0, answers.length - 1)
      //   let ret = _.zipWith(getNames, answers, function (a, b) {
      //     return Object.assign({}, a, {
      //       name: b
      //     })
      //   })

      // }

    }

  }
</script>