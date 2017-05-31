<template>
    <div class="ui main container">
        <!--<h1 class="ui header">Bảng quản lý</h1>-->
        <h1>Danh sách các đề thi</h1>
        <button class="ui button primary" v-on:click="addQuiz()">Tạo mới</button>
        <div class="ui modal">
            <i class="close icon"></i>
            <div class="header">
                Profile Picture
            </div>
            <div class="ui content">
    
                <form class="ui form segment">
                    <p>Tell Us About Yourself</p>
                    <div class="two fields">
                        <div class="field">
                            <label>Name</label>
                            <input placeholder="First Name" name="name" type="text">
                        </div>
                        <div class="field">
                            <label>Gender</label>
                            <select class="ui dropdown" name="gender">
                                <option value="">Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                    </div>
                    <div class="two fields">
                        <div class="field">
                            <label>Username</label>
                            <input placeholder="Username" name="username" type="text">
                        </div>
                        <div class="field">
                            <label>Password</label>
                            <input type="password" name="password">
                        </div>
                    </div>
                    <div class="field">
                        <label>Skills</label>
                        <select name="skills" multiple="" class="ui dropdown">
                            <option value="">Select Skills</option>
                            <option value="css">CSS</option>
                            <option value="html">HTML</option>
                            <option value="javascript">Javascript</option>
                            <option value="design">Graphic Design</option>
                            <option value="plumbing">Plumbing</option>
                            <option value="mech">Mechanical Engineering</option>
                            <option value="repair">Kitchen Repair</option>
                        </select>
                    </div>
                    <div class="inline field">
                        <div class="ui checkbox">
                            <input type="checkbox" name="terms">
                            <label>I agree to the terms and conditions</label>
                        </div>
                    </div>
                    <div class="ui primary submit button">Submit</div>
                </form>
            </div>
    
        </div>
    
        <table class="ui celled striped table">
            <thead>
                <tr>
                    <th> Tên </th>
                    <th> Số câu hỏi </th>
                    <th> Thời gian </th>
                    <th> Kỳ thi</th>
                    <th> Hành động</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in all">
                    <td class="collapsing">
                        {{item.name}}
                    </td>
                    <td>{{item.numberOfQuestions}} </td>
                    <td>{{item.totalTime}} phút</td>
                    <td>{{item.quizTime}}</td>
                    <td>
                        <button class="ui button primary"> Cập nhật</button>
                        <button class="ui button "> Xóa</button>
                    </td>
    
                </tr>
    
            </tbody>
        </table>
    </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import * as logger from '../../../common/logger.js'
export default {
    computed: {
        ...mapState('adminQuizs', {
            all: state => state.all,
            current: state => state.current
        }),
        ...mapGetters('adminQuizs', {
            title: 'title'
        })
    },

    mounted: function () {
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
                    skills: {
                        identifier: 'skills',
                        rules: [{
                            type: 'minCount[2]',
                            prompt: 'Please select at least two skills'
                        }]
                    },
                    gender: {
                        identifier: 'gender',
                        rules: [{
                            type: 'empty',
                            prompt: 'Please select a gender'
                        }]
                    },
                    username: {
                        identifier: 'username',
                        rules: [{
                            type: 'empty',
                            prompt: 'Please enter a username'
                        }]
                    },
                    password: {
                        identifier: 'password',
                        rules: [{
                            type: 'empty',
                            prompt: 'Please enter a password'
                        },
                        {
                            type: 'minLength[6]',
                            prompt: 'Your password must be at least {ruleValue} characters'
                        }
                        ]
                    },
                    terms: {
                        identifier: 'terms',
                        rules: [{
                            type: 'checked',
                            prompt: 'You must agree to the terms and conditions'
                        }]
                    }
                },
                onSuccess: function (event, fields) {
                    event.preventDefault()

                    alert('ok')
                    $('.ui.modal').modal('hide')
                    return true
                },
                onFailure: function () {
                    alert('eee')
                    return false
                }
            })
        $('.ui.modal').modal({
            closable: false
        })
    },
    methods: {
        addQuiz: function () {
            $('.ui.modal')
                .modal('show')
        }

    },
    created() {
        this.$store.dispatch('adminQuizs/getAll').then(() => {
        })

    }

}
</script>
<style scoped>

</style>
