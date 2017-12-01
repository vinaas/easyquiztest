<template>
  <div class="ui main container">
    <!--<h1 class="ui header">Bảng quản lý</h1>-->
    <h1>Danh sách các đề thi</h1>
    <!-- Exchange button Tạo mới -->
    <div v-on:click="addQuiz()" class="ui vertical animated button" style="background-color:transparent;border: 1px solid green;margin-bottom:50px">
      <div class=" hidden content">
        <i class="plus icon green"></i>
      </div>
      <div class="visible content" style="color:green; ">Tạo mới</div>
    </div>

    <div id="saveQuiz" class="ui modal saveQuiz">
      <i class="close icon"></i>
      <div class="header">
        {{header}}
      </div>
      <div class="ui content">

        <form class="ui form">
          <div class="field">
            <label>Tên</label>
            <input type="text" name="name" placeholder="Tên đề thi" v-model="currentQuiz.quizInfo.quizName" >
          </div>
          <div class="four fields">
            <div class="field">
              <label>Thời gian làm bài</label>
              <input type="number" name="totalTime" placeholder="Thời gian làm bài" v-model="currentQuiz.totalTime" >
            </div>
                <div class="field">
              <label>Số câu hỏi cho 1 thí sinh</label>
              <input type="number" name="numberOfQuestions" placeholder="Số câu hỏi cho 1 thí sinh" v-model="currentQuiz.numberOfQuestions" >
            </div>
            <div class="field">
              <label>Thời gian bắt đầu kỳ thi</label>
              <date-picker  v-model="currentQuiz.startTime" lang="en" format="dd-MM-yyyy"> </date-picker>
            </div>
            <div class="field">
              <label>Thời gian kết thúc kỳ thi</label>
              <date-picker  v-model="currentQuiz.endTime" lang="en" format="dd-MM-yyyy"> </date-picker>
              <!-- <input type="date" name="endTime" placeholder="Thời gian kết thúc kỳ thi" v-model="currentQuiz.endTime"> -->
            </div>
          </div>
          <div class="four fields">
            <div class="field">
              <label>Tổng số câu hỏi</label>
              <input type="number" name="totalQuestions" placeholder="Tổng số câu hỏi" v-model="currentQuiz.totalQuestions" >
            </div>
            <div class="field">
              <label>Kì thi</label>
              <date-picker  v-model="currentQuiz.quizInfo.quizTime" lang="en" format="dd-MM-yyyy"> </date-picker>
            </div>
          
          </div>
          <div class="ui primary submit button">Submit</div>
        </form>
      </div>

    </div>

    <table id="example" class="ui celled striped table teal">
      <thead>
        <tr>
          <th style="width: 50px;">STT</th>
          <th> Tên </th>
          <th> Số câu hỏi </th>
          <th> Thời gian </th>
          <th> Kỳ thi</th>
          <th style="width: 80px;"> Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in listQuiz">
          <td>{{index+1}}</td>
          <td class="collapsing">{{item.quizInfo.quizName}}</td>
          <td>{{item.numberOfQuestions}} </td>
          <td>{{item.totalTime}} phút</td>
          <td>{{item.quizInfo.quizTime| formatDate}}</td>
          <td>
            <span data-tooltip="cập nhật" data-position="top left" v-on:click="toSave(item)">
              <i class="edit icon edit_question blue"></i>
            </span> | 
            <a :href="'/#/admin/questionList/' + item.id" class="item" data-tooltip="Quản lý câu hỏi" data-position="top left">
              <i class="linkify icon go_to_answers orange"></i>
            </a> | 
            <a :href="'/#/admin/userQuizList/' + item.id" class="item" data-tooltip="Danh sách user" data-position="top left">
              <i class="linkify icon add user"></i>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import moment from "moment";
import { mapState, mapGetters } from "vuex";
import Logger from "../../../common/logger.js";
import Promise from "bluebird";
import toastr from "toastr";
import swal from "sweetalert";
import _ from "lodash";
import DatePicker from 'vue2-datepicker'

const logger = Logger("Admin Quiz List");
const co = Promise.coroutine;
export default {
  components: { DatePicker },  
  data() {
    return {
      listQuiz: [],
      currentQuiz: {
        startTime: new Date().toString(),
        endTime: '',

        quizInfo: {
          quizName: "",
          quizTime: new Date().toString('dd/mm/yyyy')
        },
        quizStatus: "",
        totalTime: 0,
        numberOfQuestions: 0,
        totalQuestions: 0,
        listQuestionIds: []
      }
    }
  },
  // Format ngày tháng năm/////////////////////////////
  filters: {
    moment: function(date) {
      return moment(date).format("L");
    }
  },
  computed: {
    ...mapState('adminQuizs', {
      all: state => state.all,
      current: state => state.currentQuiz
    }),
    ...mapGetters('adminQuizs', {
      title: 'title'
    }),
    header: {
      get() {
        return this.title;
      },
      set(value) {
        //this.$store.commit("updateMessage", value);
        this.title = 'bao'
      }
    },
    mapCurrentQuiz() {
      //set
    }
  },
  mounted: function () {
    let me = this
    this.$log.debug('Admin/CurrentPage mounted()')
    $(document).ready(function () {
      $('#example').DataTable()
    })
    $('.ui.form').form({
      fields: {
        name: {
          identifier: 'name',
          rules: [
            {
              type: 'empty',
              prompt: 'Please enter your name'
            }
          ]
        },
        totalTime: {
          identifier: 'totalTime',
          rules: [
            {
              type: 'empty',
              prompt: 'Please enter totalTime'
            }
          ]
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
      mockResponseAsync: Promise.coroutine(function*(st, cb) {
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
    goNext () {
      this.$store.dispatch('goNext').then(() => {
        this._cloneCurrentCheck()
      })
    },
    goPrevious () {
      this.$store.dispatch('goPre').then(() => {
        this._cloneCurrentCheck()
      })
    },
    toQuestion: function (item) {
      logger.debug('link to Question', JSON.stringify(item))
      // this.$router.push({ path: 'questionList'+item.id })
    },
    addQuiz: function() {
      logger.debug("add");
      console.log('addQuiz()', this.currentQuiz)
      this.$store.dispatch("adminQuizs/selectQuiz", this.currentQuiz);

      $('.saveQuiz')
        .last()
        .modal('show')
    },
    toSave: co(function*(item) {
      logger.debug(item)
      // $('.saveQuiz').remove()
      yield this.$store.dispatch('adminQuizs/selectQuiz', item)

      $('.saveQuiz')
        .last()
        .modal('show')
    }),
    save: Promise.coroutine(function*() {
      yield this.$store.dispatch("adminQuizs/saveQuiz", this.currentQuiz);
      yield this.$store.dispatch("adminQuizs/getAll");
    }),
    getAll: Promise.coroutine(function*() {
      this.listQuiz = yield this.$store.dispatch('adminQuizs/getAll')
    }),
    updateCurrent: function (e) {
      let cloneQuiz = Object.assign({}, this.current, {
        [e.target.name]: e.target.value
      })
      this.$store.dispatch('adminQuizs/updateCurrent', cloneQuiz)
    },
    toRemove: Promise.coroutine(function*(item) {
      let me = this
      swal(
        {
          title: 'Bạn có chắc chắn?',
          text: 'Xóa dữ liệu : ' + item.name,
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Có, Xóa',
          closeOnConfirm: false,
          showLoaderOnConfirm: true
        },
        Promise.coroutine(function*() {
          yield me.$store.dispatch('adminQuizs/removeQuiz', item)
          yield me.$store.dispatch('adminQuizs/getAll')
          swal('Đã xóa!', 'Dữ liệu đã bị xóa', 'success')
        })
      )
    })
  },
  created () {
    var me = this
    this.$log.debug('Danh Sách Kì Thi')
    this.getAll().then(() => {
      this.$log.debug('this.listQuiz', this.listQuiz)
    })
  }
}
</script>
<style scoped>

</style>
