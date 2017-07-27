<template>
    <div class="ui main container">

        <div class="createApp ui modal">
            <i class="close icon"></i>
            <div class="header">
                <h1>{{title}}</h1>
            </div>
            <div class="ui content">
                <form class="ui form">
                    <div class="two fields">
                        <div class="field">
                            <label>Tên</label>

                            <input type="text" name="firstName" placeholder="Tên" :value="current.firstName" @input="updateCurrent">
                        </div>
                        <div class="field">
                            <label>Họ</label>

                            <input type="text" name="lastName" placeholder="Họ" :value="current.lastName" @input="updateCurrent">
                        </div>
                    </div>
                    <div class="two fields">
                        <div class="field">
                            <label>Tên tài khoản</label>

                            <input type="text" name="username" placeholder="Tên đầy đủ" :value="current.username" @input="updateCurrent">
                        </div>
                        <div class="field">
                            <label>Địa chỉ</label>

                            <input type="text" name="address" placeholder="Địa chỉ" :value="current.address" @input="updateCurrent">
                        </div>
                    </div>
                    <div class="two fields">
                        <div class="field">
                            <label>Ngày sinh</label>

                            <input type="date" name="birthday" placeholder="Ngày sinh" :value="current.birthday" @input="updateCurrent">
                        </div>
                        <div class="field">
                            <label>Email</label>

                            <input type="text" name="email" placeholder="Email" :value="current.email" @input="updateCurrent">
                        </div>
                    </div>
                    <div class="two fields">
                        <div class="field">
                            <label>Mật khẩu</label>

                            <input type="password" name="password" placeholder="password" :value="current.password" @input="updateCurrent">
                        </div>
                        <div class="field">
                            <label>Số báo danh</label>

                            <input type="text" name="identification" placeholder="Số báo danh" :value="current.identification" @input="updateCurrent">
                        </div>
                    </div>
                    <div class="two fields">

                        <!--<div class="field" v-if="title=='Cập nhật'">
                            <label>EmailVerified</label>
                            <input type="checkbox" name="emailVerified" :value="current.emailVerified" 
                           @change="updateCurrent">
                         
                        </div>-->


                    </div>
                    <div class="ui primary submit button">Submit</div>
                </form>
            </div>
        </div>

        <div class='btn-position-right'>
            <span data-tooltip="Tạo mới">
      <i class="add to circle icon green" v-on:click="add()"></i></span>
        </div>
        <br>
        <table id="application" class="cell-border" cellspacing="0" width="100%">
            <thead>
                <tr>
                    <th>Tài khoản</th>
                    <th>Email</th>

                    <th>Số báo danh</th>

                    <th>Hoạt động</th>
                </tr>
            </thead>
        </table>
    </div>
</template>
<script>
    import Logger from '../../../common/logger.js'
    import Promise from 'bluebird'
    import toastr from 'toastr'
    import swal from 'sweetalert'
    import _ from 'lodash'
    const logger = Logger('Admin AppicationUsers List')
    const co = Promise.coroutine
    import {
        mapState,
        mapGetters
    } from 'vuex'
    import 'datatables.net-dt/css/jquery.datatables.css';
    var $ = require('jquery');
    require('datatables.net')(window, $);
    const configColumns = [{
            "data": "username"
        },
        {
            "data": "email"
        }, {
            "data": "identification"
        },

        {
            "data": "Action"
        }
    ]
    const configColumnDefs = [{
        "targets": -1,
        "data": null,
        "defaultContent": '<div style="text-align:center"><span data-tooltip="cập nhật" data-position="top left"><i class="edit icon blue edit_app_user" ></i></span>|<span data-tooltip="Xóa" data-position="top left"><i class="delete icon remove_app_user red"></i></span></div>'
    }]
    export default {

        computed: {
            ...mapState('adminApplicationUsers', {
                all: state => state.all,
                current: state => state.current

            }),

            ...mapGetters('adminApplicationUsers', {
                title: 'title'
            })
        },
        created: co(function* () {
            yield this.showDataTable();

        }),
        mounted: function () {

            let me = this
            $('.ui.form')
                .form({
                    fields: {
                        password: {
                            identifier: 'password',
                            rules: [{
                                    type: 'empty',
                                    prompt: 'Xin vui lòng nhập mật khẩu'
                                },
                                {
                                    type: 'minLength[4]',
                                    prompt: 'Mật khẩu phải ít nhất 4 kí tự'
                                }
                            ]
                        },
                        identification: {
                            identifier: 'identification',
                            rules: [{
                                type: 'empty',
                                prompt: 'Vui lòng nhập số báo danh'
                            }]
                        },
                        email: {
                            identifier: 'email',
                            rules: [{
                                type: 'email',
                                prompt: 'Vui lòng họ email'
                            }]
                        },
                        username: {
                            identifier: 'username',
                            rules: [{
                                type: 'empty',
                                prompt: 'Vui lòng họ email'
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
                mockResponseAsync: co(function* (st, cb) {
                    yield me.save()
                    cb()
                    $('.ui.modal').modal('hide')
                    toastr.success('Lưu thành công')
                }),
                on: 'submit'
            })
            $('.createApp').modal({
                closable: false,
                onHidden: co(function* () {
                    $('.ui.form').form('reset');
                    me.$store.dispatch('adminApplicationUsers/updateCurrent', {})

                })
            })
            me.$forceUpdate()
        },
        methods: {
            updateCurrent: co(function* (e) {
                
                let userDTO = Object.assign({}, this.current, {
                    [e.target.name]: e.target.value
                });
               
             
                yield this.$store.dispatch('adminApplicationUsers/updateCurrent', userDTO)
            }),
            save: co(function* () {
                yield this.$store.dispatch('adminApplicationUsers/patch', this.current)
                yield this.showDataTable()

            }),
            add: function () {
                logger.debug('add')
                this.$store.dispatch('adminApplicationUsers/current', {})

                $('.createApp').last()
                    .modal('show')
            },
            showDataTable: co(function* () {
                let me = this;
                yield this.$store.dispatch('adminApplicationUsers/getAll');
                $(document).ready(() => {

                    $('#application').DataTable().destroy();

                    let table = $('#application').DataTable({
                        data: _.clone(me.all),

                        "columns": configColumns,
                        "columnDefs": configColumnDefs
                    })
                    $('#application').off('click');
                    $('#application').on('click', 'tr .edit_app_user', co(function* () {
                        let selected = table.row($(this).parents('tr')).data();
                        console.log('item', selected);
                        yield me.$store.dispatch('adminApplicationUsers/current', selected);
                        $('.createApp').last().modal('show');


                    }));

                      $('#application').on('click', 'tr .remove_app_user', function () {

            let selectedRow = table.row($(this).parents('tr')).data();
            console.log('123',selectedRow);
            swal({
                title: 'Bạn có chắc chắn?',
                text: 'Xóa dữ liệu : ' + selectedRow.username,
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'Có, Xóa',
                closeOnConfirm: false,
                showLoaderOnConfirm: true
              },
              co(function* () {

                try {
                   
                  yield me.$store.dispatch('adminApplicationUsers/remove', {
                    id: selectedRow.id
                  })
                  me.showDataTable();
                  swal('Đã xóa!', 'Dữ liệu đã bị xóa', 'success')
                } catch (error) {
                  swal('Thông báo!', 'Lỗi không thể xóa', 'error')
                }
              }))
          });


                })

            }),

        }
    }
</script>
<style scoped>
    .showClass {
        display: block;
    }

    .hideClass {
        display: none;
    }

    .btn-position-right {
        text-align: right;
    }
</style>