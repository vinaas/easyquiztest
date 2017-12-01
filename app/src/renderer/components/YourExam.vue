<template>
    <div class="ui fluid-container">
        <div class="ui menu">
            <div class="ui container">
                <div class="item header item">
                    <router-link class="item header item" to="/">
                        <img class="logo" src="./assets/vinaas-logo.png">EasyQuizTest
                    </router-link>
                </div>
            </div>
        </div>
        <div class="ui main container">
            <div id="result_2" class="ui modal">
                <i class="close icon"></i>
                <div class="header">
                    Kết quả: {{usersQuizsRow.scopesPraction}} - Điểm : {{usersQuizsRow.scopes}}
                </div>
                <div class="image content">
                    <table class="ui celled table">
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
                </div>
            </div>
            <h1>Danh sách các kỳ thi của bạn</h1>
            <table class="ui celled table tbl-header">
                <thead>
                    <tr>
                        <th></th>
                        <th>Trạng thái</th>
                        <th>Thời gian</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody class="tbl-content">
                    <tr v-for="item in quizs">
                        <td>{{ item.name }}</td>
                        <td>{{item.quizStatus}}</td>
                        <td>{{ item.totalTime }} phút</td>
                        <td class="right aligned">
                            <!-- <template v-if="item.quizStatus === '####'">
                                <router-link class="item header item" :to="{params: {quizId: item.id}}">
                                    <button v-on:click="showResults" class="ui twitter button">Xem kết quả</button>
                                </router-link>
                            </template> -->
                            <template v-if="item.quizStatus === 'ACTIVE'">
                                <router-link class="item header item" :to="{ name: 'Quiz', params: {quizId: item.id} }">
                                    <button class="ui youtube button">Tham gia ngay</button>
                                </router-link>
                            </template>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import toastr from 'toastr'
import startTimer from '../../common/coundown.js'
import '../style/style.css'
import _ from 'lodash'
import Promise from 'bluebird'
import swal from 'sweetalert'

const co = Promise.coroutine

export default {
  name: 'exams',
  computed: mapGetters({
    quizs: 'exams/quizs',
    usersQuizsRow: 'usersQuizsRow'
  }),
  components: {},
  mounted: function () {
  },
  methods: {
    showResults: co(function* () {
      yield this.$store.dispatch('end')
      $('#result_2')
            .modal('show')
    })
  },
  created: co(function* () {
    yield this.$store.dispatch('exams/getQuizs')
  })

}
</script>
<style scoped>

</style>
