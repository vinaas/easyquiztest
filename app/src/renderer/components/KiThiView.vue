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
            <h1>Danh sách các kỳ thi của bạn</h1>
            <table class="ui celled table tbl-header">
                <thead>
                    <tr>
                        <th></th>
                        <th>Trạng thái</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody class="tbl-content">
                    <tr v-for="item in quizs">
                        <td>{{item.name}}</td>
                        <td class="single line">Chưa thi</td>
                        <td class="right aligned">
                            <router-link class="item header item" :to="{ name: 'Quiz', params: { quizId: item.id}}">
                                <button class="ui youtube button">Tham gia ngay</button>
                            </router-link>
                        </td>
                    </tr>                 
                    <tr>
                        <td>Thi Hóa</td>
                        <td class="single line">Đã thi</td>
                        <td class="right aligned">
                            <!--<button v-on:click="seeResults" class="ui twitter button">Xem kết quả</button>-->
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
    name: 'kythi',
    computed: mapGetters({
        quizs: 'ki-thi/quizs',
    }),
    components: {},
    mounted: function() {
    },
    methods: {

    },
    created: co(function* () {
        yield this.$store.dispatch('ki-thi/getQuizs')

    })

}
</script>
<style scoped>

</style>
