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
                                        <h1><div id="basicUsage">00:00:00</div> <i class="alarm outline icon"></i></h1>
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
                                            <li> <b>SBD :</b> 1</li>
                                            <li><b>Họ tên:</b> Phạm Văn A </li>
                                            <li><b>Ngày sinh:</b> 20/4/2000 </li>
                                        </ul>
                                    </div>
                                    <div class="ui info message">
                                        <div class="header">Thông tin kỳ thi</div>
                                        <ul class="list">
                                            <li> <b>Kì thi :</b> kiểm tra 60 phút</li>
                                            <li><b>Khóa ngày:</b> 6/5/2017 </li>
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
                                    <div class="header">Câu {{current.id}}</div>
                                </div>
                                <div class="content">
                                    <h4 class="ui sub header ">{{current.description}}</h4>
                                    <table class="ui table celled">
    
                                        <tbody>
                                            <tr v-for="a of current.answers">
                                                <td>{{a.id}}</td>
                                                <td>{{a.content}}</td>
                                            </tr>
    
                                        </tbody>
                                    </table>
                                    <!--<div class="ui divided items">
                                                                    <div class="item">
                                                                        <div class="ui tiny image">
                                                                            A
                                                                        </div>
                                                                        <div class="middle aligned content">
                                                                            Đáp án trả lời A
                                                                        </div>
                                                                    </div>
                                                                    <div class="item">
                                                                        <div class="ui tiny image">
                                                                            B
                                                                        </div>
                                                                        <div class="middle aligned content">
                                                                            Đáp án trả lời B
                                                                        </div>
                                                                    </div>
                                                                    <div class="item">
                                                                        <div class="ui tiny image">
                                                                            C
                                                                        </div>
                                                                        <div class="middle aligned content">
                                                                            Đáp án trả lời C
                                                                        </div>
                                                                    </div>
                                                                    <div class="item">
                                                                        <div class="ui tiny image">
                                                                            D
                                                                        </div>
                                                                        <div class="middle aligned content">
                                                                            Đáp án trả lời D
                                                                        </div>
                                                                    </div>
                                                                </div>-->
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
                                            <div v-for="a of current.answers" class="field">
                                                <div v-bind:class="[ 'ui','checkbox', current.type ]">
                                                    <input v-bind:type="current.type" v-bind:name="current.id" >
                                                    <label>{{a.id}}</label>
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
            <div id="quiz-progress" class="ui teal progress" data-value="16" data-total="20">
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
                            <button v-for="(q, index) of quizs" @click="goToQuestion(q)" class="mini ui button" v-bind:class="{inverted: (index+1)!==current.id, orange: !q.isAnswered, green:q.isAnswered}">Câu {{index+ 1}}</button>
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

import * as Timer from 'easytimer'
import { mapGetters, mapActions } from 'vuex'
import toastr from  'toastr'

export default {
    name: 'quiz',
    computed: mapGetters({
        quizs: 'getAllQuizs',
        current: 'getCurrentQuestion',
        next: 'next',
        previous: 'previous'
    }),
    components: {},
    mounted: function () {
        
        $('#quiz-progress').progress({
            label: 'ratio',
            text: {
                ratio: '{value} / {total}'
            },
            showActivity: false
        });
        var timer = new Timer();
        timer.start();
        timer.addEventListener('secondsUpdated', function (e) {
            $('#basicUsage').html(timer.getTimeValues().toString());
        });

    },
    methods: {
        goToQuestion(q) {
            this.$store.dispatch('goToQuestion', q)
        },
        goNext() {
            this.$store.dispatch('goToQuestion', { id: this.current.id + 1 })
        },
        goPrevious() {
            this.$store.dispatch('goToQuestion', { id: this.current.id - 1 })

        },
        answer(){
            this.$store.dispatch('answer');
            toastr.info('Bạn đã trả lời thành công')
        }
    },
    created() {
        console.log('create');
        this.$store.dispatch('getAllQuizs').then(() => {
            console.log('done get data');
            this.$store.dispatch('goToQuestion', { id: 1 })
        })
    }

}
</script>
<style scoped>
#nav-buttons {
    padding-top: 100px;
    padding-bottom: 10px;
}
</style>