<template>
    <div class="ui fluid-container">
        <div class="ui menu">
            <div class="ui container">
                <div class="item header item">
                    <img class="logo" src="./assets/vinaas-logo.png">EasyQuizTest</div>

            </div>
        </div>
        <div class="ui container">
            <div class="row">
                <div class="ui three column grid">
                    <div class="four wide column">
                        <div class="row" style="padding-bottom:10px">
                            <button v-on:click="endQuizTest" class="positive ui button fluid">Kết thúc thi</button>
                        </div>
                        <div class="row">
                            <div class="ui card">

                                <div class="content">
                                    <div class="ui info message center aligned green">
                                        <div class="header">Thời gian</div>
                                        <h1>
                                            <div id="basicUsage">--:--</div>
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
                                                <b>SBD :</b> {{user.identification}}</li>
                                            <li>
                                                <b>Họ tên:</b> {{user.lastName}} {{user.firstName}} </li>
                                            <li>
                                                <b>Ngày sinh:</b>{{user.birthday}} </li>
                                        </ul>
                                    </div>
                                    <div class="ui info message">
                                        <div class="header">Thông tin kỳ thi</div>
                                        <ul class="list">
                                            <li>
                                                <b>Kì thi :</b> {{quiz.name}}</li>
                                            <li>
                                                <b>Khóa ngày:</b> {{quiz.quizTime}} </li>
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
                                    <div class="header">Câu {{ current.number}}</div>
                                </div>
                                <div class="content">
                                    <h4 class="ui sub header ">{{current.description}}</h4>
                                    <table class="ui red table">

                                        <tbody>
                                            <tr v-for="a in current.answersForAQuestions">
                                                <td>{{a.name}}</td>
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
                                            <div v-for="(a ,i) in current.answersForAQuestions" class="field">
                                                <div v-bind:class="[ 'ui','checkbox', current.type ]">
                                                    <input v-if="current.type=='checkbox'" type="checkbox" v-bind:name="current.id" :value="a.id" v-model="cloneUserCheck">
                                                    <input v-if="current.type=='radio'" type="radio" v-bind:name="current.id" :value="a.id" v-model="cloneUserCheck[0]">
                                                    <label>{{a.name}}</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="extra content">
                                    <button class="ui button green fluid" @click="answer()">Trả lời</button>
                                    <div class="ui divider"></div>
                                    <div id="nav-buttons" class="ui  buttons fluid  center alinged">
                                        <button class="ui button left attached blue " v-bind:disabled="!previous " @click="goPrevious()">
                                            <i class="left chevron icon"></i>Trước</button>
                                        <button class="ui button right attached blue " v-bind:disabled="!next" @click="goNext()"> Sau
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
                <!--<div class="label"> 6/50 </div>-->
            </div>
            <!--<div class="ui divider"></div>-->
            <div class="row">
                <footer>
                    <div class="ui card fluid">
                        <div class="content">
                            <button v-for="(q, index) in userQuestions" @click="goToQuestion(q.id)" class="mini ui button" v-bind:class="{inverted: q.id!==current.id, orange: !q.isAnswered, green:q.isAnswered}">Câu {{index+ 1}}</button>
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
                    Kết quả: {{usersQuizsRow.scopesPraction}} - Điểm : {{usersQuizsRow.scopes}}
                </div>
                <div class="image content">
                    <table class="ui red table">
                        <thead>
                            <tr>
                                <th>Câu</th>
                                <th>Trả lời</th>
                                <th>Đáp án</th>
                                <th>Kết quả </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item , index) in usersQuizsRow.answerDetail" v-bind:class="{error : !item.userAnswerResult}">
                                <td>{{index +1 }}</td>
                                <td> {{ (item.userCheck)? item.userCheck.map(x=> item.answersForAQuestions.filter(y=>y.id==x).shift().name ).sort():'Chưa trả lời' }} </td>
                                <td>
                                    {{item.answersForAQuestions.filter(x=>x.isCorrect==true).map(x=>x.name).sort()}}
                                </td>
                                <td>{{item.userAnswerResult? "Đúng" : "Sai"}} </td>
                                <!--<td>None</td>-->
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

import { mapGetters, mapActions } from 'vuex'
import toastr from 'toastr'
import startTimer from '../../common/coundown.js'
import _ from 'lodash'
import Promise from 'bluebird'
import swal from 'sweetalert'

const co = Promise.coroutine

export default {
  name: 'quiz',
  data: function () {
    return {
      cloneUserCheck: []
    }
  },
  computed: mapGetters({
    quiz: 'quiz',
    current: 'currentQuestion',
    userQuestions: 'mapUserQuestions',
    next: 'next',
    previous: 'previous',
    answereds: 'answereds',
    user: 'user',
    usersQuizsRow: 'usersQuizsRow'
  }),
  components: {},
  mounted: function () {
  },
  methods: {
    goToQuestion (id) {
      this.$store.dispatch('goToQuestion', id)
                .then(() => {
                  this._cloneCurrentCheck()
                })
    },
    goNext () {
      this.$store.dispatch('goNext')
                .then(() => {
                  this._cloneCurrentCheck()
                })
    },
    goPrevious () {
      this.$store.dispatch('goPre')
                .then(() => {
                  this._cloneCurrentCheck()
                })
    },
    answer: co(function* () {
      toastr.options.timeOut = 100
      if (this.cloneUserCheck.length == 0) {
        toastr.warning('Bạn chưa chọn đáp án')
        return
      }
      toastr.info('Bạn đã trả lời thành công')
      yield this.$store.dispatch('answer', Object.assign({}, this.current, { userCheck: this.cloneUserCheck }))
      $('#quiz-progress').progress({
        value: this.answereds,
        total: this.userQuestions.length
      })
    }),
    endQuizTest: co(function* () {
      swal({
        title: 'Kết thúc bài kiểm tra',
        text: 'Bạn có chắc chắn muốn kết thúc bài kiểm tra không?',
        type: 'info',
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true,
        confirmButtonText: 'Kết thúc',
        cancelButtonText: 'Tiếp tục làm bài'
      },
                co(function* () {
                  yield this.$store.dispatch('end')
                  $('#result')
                        .modal('show')
                  swal.close()
                }).bind(this))
    }),

    _cloneCurrentCheck () {
      this.cloneUserCheck = _.clone(this.current.userCheck)
    }
  },
  created: co(function* () {
    yield this.$store.dispatch('getQuiz', '59510cf0bb487b0608a6399a')
    yield this.$store.dispatch('getQuestions', this.quiz.id)
    yield this.$store.dispatch('getUsersQuizsRow', { userId: JSON.parse(sessionStorage.getItem('userinfo')).userId, quizId: this.quiz.id })
    yield this.$store.dispatch('goToQuestion', this.userQuestions[0].id)
        // load timer
    var totalSecond = this.quiz.totalTime * 60,
      display = document.querySelector('#basicUsage')
    startTimer(totalSecond, display)
    this._cloneCurrentCheck()

    $('#quiz-progress').progress({
      label: 'ratio',
      value: this.answereds,
      total: this.userQuestions.length,
      text: {
        ratio: '{value}/{total}'
      },
      showActivity: false
    })
  })

}

</script>
<style scoped>
#nav-buttons {
    padding-top: 100px;
    padding-bottom: 10px;
}
</style>
