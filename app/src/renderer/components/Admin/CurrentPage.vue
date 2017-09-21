<template>
  <div class="ui main container">
    <!--<h1 class="ui header">Bảng quản lý</h1>-->
    <h1>Danh sách các đề thi</h1>
    <span v-on:click="addQuiz()">
      <button class="ui ribbon label" type="button">Tạo mới </button>
    </span>
    
    
    <div id="saveQuiz" class="ui modal saveQuiz">
      <i class="close icon"></i>
      <div class="header">
        {{title}}
      </div>
      <div class="ui content">

        <form class="ui form">
          <div class="field">
            <label>Tên</label>
            <input type="text" name="name" placeholder="Tên đề thi" :value="current.name" @input="updateCurrent">
          </div>
          <div class="field">
            <label>Thời gian làm bài</label>
            <input type="number" name="totalTime" placeholder="Thời gian làm bài" :value="current.totalTime" @input="updateCurrent">
          </div>
          <div class="ui primary submit button">Submit</div>
        </form>
      </div>

    </div>

    <table class="ui red table">
      <thead>
        <tr>
          <th>STT</th>
          <th> Tên </th>
          <th> Số câu hỏi </th>
          <th> Thời gian </th>
          <th> Kỳ thi</th>
          <th>Người tạo</th>
          <th> Hành động</th>
        </tr>
      </thead>
      <tbody>
              <tr v-for="(item,index) in all">
       
           <td>{{index+1}}</td>   
          <td class="collapsing">
            {{item.name}}
          </td>
          <td>{{item.numberOfQuestions}} </td>
          <td>{{item.totalTime}} phút</td>
          <td>{{item.quizTime | moment}}</td>
          <td></td>
          <td>
            <span data-tooltip="cập nhật" data-position="top left" v-on:click="toSave(item)"><i class="edit icon edit_question blue" ></i></span>|
            <a :href="'/#/admin/questionList/' + item.id" class="item" data-tooltip="Link Quản lý câu hỏi" data-position="top left"><i class="linkify icon go_to_answers orange"></i></a>
          
         
          </td>

        </tr>

      </tbody>
      <tfoot>
    <tr><th colspan="3">
      <div class="ui right floated pagination menu">
        <a class="icon item">
          <i class="left chevron icon"></i>
        </a>
        <a class="item">1</a>
        <a class="item">2</a>
        <a class="item">3</a>
        <a class="item">4</a>
        <a class="item">5</a>
        <a class="item">6</a>
        <a class="item">7</a>
        <a class="item">8</a>
        <a class="item">9</a>
        <a class="item">10</a>
        <a class="icon item">
          <i class="right chevron icon"></i>
        </a>
      </div>
    </th>
  </tr></tfoot>
    </table>
    
  </div>
</template>
<script>
  import {
    mapState,
    mapGetters
  } from 'vuex'
  import Logger from '../../../common/logger.js'
  import Promise from 'bluebird'
  import toastr from 'toastr'
  import swal from 'sweetalert'
  import _ from 'lodash'
  import * as moment from '../../../common/moment.js'
  
  const logger = Logger('Admin Quiz List')
  const co = Promise.coroutine
  export default {

       // format ngày tháng năm 
    filters: {
    moment: function(date) {
      return moment(date).format('DD-MM-YYYY');
    }
  },
    computed: {
      ...mapState('adminQuizs', {
        all: state => state.all,
        current: state => state.currentQuiz
      }),
      ...mapGetters('adminQuizs', {
        title: 'title'
      })
    },
   

    mounted: function () {
      let me = this
      $('.ui.form')
        .form({
          fields: {
            name: {
              identifier: 'name',
              rules: [{
                type: 'empty',
                prompt: 'Please enter your name'
              }]
            },
            totalTime: {
              identifier: 'totalTime',
              rules: [{
                type: 'empty',
                prompt: 'Please enter totalTime'
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
        }),
        on: 'submit'
      })
      $('.saveQuiz').modal({
        closable: false,
        onHidden: function () {
          $('.ui.form').form('reset')
          me.$store.dispatch('adminQuizs/updateCurrent', {})
        }
      })
      me.$forceUpdate()
    },
    methods: {
      toQuestion: function (item) {
        logger.debug('link to Question', JSON.stringify(item))
      // this.$router.push({ path: 'questionList'+item.id })
      },
      addQuiz: function () {
        logger.debug('add')
        this.$store.dispatch('adminQuizs/selectQuiz', {})

        $('.saveQuiz').last()
          .modal('show')
      },
      toSave: co(function* (item) {
        logger.debug(item)
        // $('.saveQuiz').remove()
        yield this.$store.dispatch('adminQuizs/selectQuiz', item)

        $('.saveQuiz').last()
          .modal('show')
      }),
      save: Promise.coroutine(function* () {
        yield this.$store.dispatch('adminQuizs/saveQuiz', this.current)
        yield this.$store.dispatch('adminQuizs/getAll')
      }),
      updateCurrent: function (e) {
        let cloneQuiz = Object.assign({}, this.current, {
          [e.target.name]: e.target.value
        })
        this.$store.dispatch('adminQuizs/updateCurrent', cloneQuiz)
      },
      toRemove: Promise.coroutine(function* (item) {
        let me = this
        swal({
          title: 'Bạn có chắc chắn?',
          text: 'Xóa dữ liệu : ' + item.name,
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Có, Xóa',
          closeOnConfirm: false,
          showLoaderOnConfirm: true
        },
          Promise.coroutine(function* () {
            yield me.$store.dispatch('adminQuizs/removeQuiz', item)
            yield me.$store.dispatch('adminQuizs/getAll')
            swal('Đã xóa!', 'Dữ liệu đã bị xóa', 'success')
          }))
      })
    },
    created () {
      var me = this
      this.$store.dispatch('adminQuizs/getAll').then(() => {})
    }
  }
</script>
<style scoped>

</style>
