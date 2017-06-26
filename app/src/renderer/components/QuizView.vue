<template>
    <div class="ui fluid-container">
        <div class="ui menu">
            <div class="ui container">
                <div class="item header item"> <img class="logo" src="./assets/vinaas-logo.png">EasyQuizTest</div>
    
            </div>
        </div>
        <div class="ui container">
            <div class="row">
                <div class="ui three column grid">
                    <div class="four wide column">
                        <div class="row" style="padding-bottom:10px">
                            <router-link class="positive ui button fluid" to="/">Kết thúc thi</router-link>
                        </div>
                        <div class="row">
                            <div class="ui card">
    
                                <div class="content">
                                    <div class="ui info message center aligned green">
                                        <div class="header">Thời gian</div>
                                        <h1><div id="basicUsage">--:--</div> <i class="alarm outline icon"></i></h1>
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
                                            <li> <b>SBD :</b> {{user.identification}}</li>
                                            <li><b>Họ tên:</b> {{user.lastName}} {{user.firstName}} </li>
                                            <li><b>Ngày sinh:</b>{{user.birthday}} </li>
                                        </ul>
                                    </div>
                                    <div class="ui info message">
                                        <div class="header">Thông tin kỳ thi</div>
                                        <ul class="list">
                                            <li> <b>Kì thi :</b> {{quiz.name}}</li>
                                            <li><b>Khóa ngày:</b> {{quiz.quizTime}} </li>
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
                                    <table class="ui table celled">
    
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
                                        <button class="ui button left attached blue " v-bind:disabled="!previous " @click="goPrevious()"><i class="left chevron icon"></i>Trước</button>
                                        <button class="ui button right attached blue " v-bind:disabled="!next" @click="goNext()"> Sau <i class="right chevron icon"></i></button>
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
        </div>
    </div>
</template>

<script>

// import * as Timer from 'easytimer'
import { mapGetters, mapActions } from 'vuex'
import toastr from 'toastr'
import startTimer from '../../common/coundown.js'
import _ from 'lodash'
import Promise from 'bluebird'

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
    userQuestions:'mapUserQuestions',
    next: 'next',
    previous: 'previous',
    answereds: 'answereds',
    user:'user'
  }),
  components: {},
  mounted: function () {
    setTimeout(function () {
      $('#quiz-progress').progress({
        label: 'ratio',
        value: me.answereds,
        total: me.userQuestions.length ,
        text: {
          ratio: '{value}/{total}'
        },
        showActivity: false
      })
    }, 500)
    var me = this
       
    // var totalSecond = this.quiz.totalTime * 60 ,
    //      display = document.querySelector('#basicUsage')
    //     startTimer(totalSecond, display)
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
    answer : co ( function *() {
      toastr.options.timeOut = 100
      if (this.cloneUserCheck.length == 0) {
        toastr.warning('Bạn chưa chọn đáp án')
        return
      }
      toastr.info('Bạn đã trả lời thành công')
       yield this.$store.dispatch('answer', Object.assign({}, this.current, {userCheck : this.cloneUserCheck  } ) )
        $('#quiz-progress').progress({
            value: this.answereds,
            total: this.userQuestions.length
        })
       
    }),

    _cloneCurrentCheck () {
      this.cloneUserCheck = _.clone(this.current.userCheck)
    }
  },
  created : co( function*() {
    // yield this.$store.dispatch('login', JSON.parse( sessionStorage.getItem('userinfo')).userId )
    yield this.$store.dispatch('getQuiz', '592e41ea5420803fec1137a8')
    console.log(this.quiz)
    yield  this.$store.dispatch('getQuestions', this.quiz.id )
    yield  this.$store.dispatch('getUsersQuizsRow',{userId : '592ff76d5fc5ed23ec231333' , quizId: this.quiz.id })
    yield  this.$store.dispatch('goToQuestion', this.userQuestions[0].id )
    // load timer
    var totalSecond = this.quiz.totalTime * 60 ,
        display = document.querySelector('#basicUsage')
        startTimer(totalSecond, display)
    this._cloneCurrentCheck()
     setTimeout( ()=> {
      $('#quiz-progress').progress({
        label: 'ratio',
        value: this.answereds,
        total: this.userQuestions.length ,
        text: {
          ratio: '{value}/{total}'
        },
        showActivity: false
      })
    }, 500)
  })

}

</script>
<style scoped>
#nav-buttons {
    padding-top: 100px;
    padding-bottom: 10px;
}
</style>
