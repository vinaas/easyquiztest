<template>
    <div class="ui main container">
        <!--<h1 class="ui header">Bảng quản lý</h1>-->
        <h1>Danh sách các đề thi</h1>
        <button class="ui button primary" v-on:click="addQuiz()">Tạo mới</button>
        <div class="ui modal">
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
                        <button class="ui button primary" v-on:click="toSave(item)"> Cập nhật</button>
                        <button class="ui button " v-on:click="toRemove(item)"> Xóa</button>
                    </td>
    
                </tr>
    
            </tbody>
        </table>
    </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import Logger from '../../../common/logger.js'
import Promise from 'bluebird'
import toastr from 'toastr'
import swal from 'sweetalert'
import _ from 'lodash'
const logger = Logger('Admin Quiz List')
export default {
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
        $('.ui.modal').modal({
            closable: false,
            onHidden: function () {
                $('.ui.form').form('reset')
                me.$store.dispatch('adminQuizs/updateCurrent', {})
            }
        })
        $('.ui.form').api({
            mockResponseAsync: Promise.coroutine(function* (st, cb) {
                yield me.save();
                cb();
                $('.ui.modal').modal('hide')
                toastr.success('Lưu thành công')
            }),
            on: 'submit'
        })
    },
    methods: {
        addQuiz: function () {
            this.$store.dispatch('adminQuizs/selectQuiz', {})

            $('.ui.modal')
                .modal('show')
        },
        toSave: function (item) {
            logger.debug(item)
            this.$store.dispatch('adminQuizs/selectQuiz', item)

            $('.ui.modal')
                .modal('show')
        },
        save: Promise.coroutine(function* () {
            yield this.$store.dispatch('adminQuizs/saveQuiz', this.current)
            yield this.$store.dispatch('adminQuizs/getAll')
        }),
        updateCurrent: function (e) {
            let cloneQuiz = Object.assign({}, this.current, { [e.target.name]: e.target.value })
            this.$store.dispatch('adminQuizs/updateCurrent', cloneQuiz)
        },
        toRemove: Promise.coroutine(function* (item) {
            let me = this;
            swal({
                title: "Bạn có chắc chắn?",
                text: "Xóa dữ liệu : " + item.name,
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Có, Xóa",
                closeOnConfirm: false
            },
                Promise.coroutine(function* () {
                    yield me.$store.dispatch('adminQuizs/removeQuiz', item)
                    yield me.$store.dispatch('adminQuizs/getAll')
                    swal("Đã xóa!", "Dữ liệu đã bị xóa", "success");
                }))

        })

    },
    created() {
        this.$store.dispatch('adminQuizs/getAll').then(() => {
        })

    }

}
</script>
<style scoped>

</style>
