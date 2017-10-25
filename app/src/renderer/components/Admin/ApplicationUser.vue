<template>
    <div class="ui main container">
        <h1>Danh sách user</h1>
        <div class="createApp ui modal">
            <i class="close icon"></i>
            <div class="header">
                <h1>{{checked==true?"Cập nhật":"Tạo mới"}}</h1>
            </div>
            <div class="ui content">
                <form class="ui form create">
                    <div class="two fields">
                        <div class="field">
                            <label>Tên</label>

                            <input type="text" name="firstName" placeholder="Tên" v-model="current.firstName">
                        </div>
                        <div class="field">
                            <label>Họ</label>

                            <input type="text" name="lastName" placeholder="Họ" v-model="current.lastName">
                        </div>
                    </div>
                    <div class="two fields">
                        <div class="field">
                            <label>Tên tài khoản</label>

                            <input type="text" name="username" placeholder="Tên đầy đủ" v-model="current.username">
                        </div>
                        <div class="field">
                            <label>Địa chỉ</label>

                            <input type="text" name="address" placeholder="Địa chỉ" v-model="current.address">
                        </div>
                    </div>
                    <div class="two fields">
                        <div class="field">
                            <label>Ngày sinh</label>

                            <input type="date" name="birthday" placeholder="Ngày sinh" v-model="current.birthday">
                        </div>
                        <div class="field">
                            <label>Email</label>

                            <input type="text" name="email" placeholder="Email" v-model="current.email">
                        </div>
                    </div>
                    <div class="two fields">
                        <div class="field" v-show="checked==false">
                            <label>Mật khẩu</label>

                            <input type="password" name="password" v-model="current.password">
                        </div>
                        <div class="field">
                            <label>Số báo danh</label>

                            <input type="text" name="identification" placeholder="Số báo danh" v-model="current.identification">
                        </div>
                        <div class="field" v-show="checked==true">
                            <label>EmailVerified</label>
                            <input type="checkbox" v-model="current.emailVerified">

                        </div>
                    </div>

                    <div class="ui primary submit button">Submit</div>
                </form>
            </div>
        </div>

          <div class="updateApp ui modal">
            <i class="close icon"></i>
            <div class="header">
                <h1>{{checked==true?"Cập nhật":"Tạo mới"}}</h1>
            </div>
            <div class="ui content">
                <form class="ui form update">
                    <div class="two fields">
                        <div class="field">
                            <label>Tên</label>

                            <input type="text" name="firstName" placeholder="Tên" v-model="current.firstName">
                        </div>
                        <div class="field">
                            <label>Họ</label>

                            <input type="text" name="lastName" placeholder="Họ" v-model="current.lastName">
                        </div>
                    </div>
                    <div class="two fields">
                        <div class="field">
                            <label>Tên tài khoản</label>

                            <input type="text" name="username" placeholder="Tên đầy đủ" v-model="current.username" Disabled>
                        </div>
                        <div class="field">
                            <label>Địa chỉ</label>

                            <input type="text" name="address" placeholder="Địa chỉ" v-model="current.address">
                        </div>
                    </div>
                    <div class="two fields">
                        <div class="field">
                            <label>Ngày sinh</label>

                            <input type="date" name="birthday" placeholder="Ngày sinh" v-model="current.birthday">
                        </div>
                        <div class="field">
                            <label>Email</label>

                            <input type="text" name="email" placeholder="Email" v-model="current.email" Disabled>
                        </div>
                    </div>
                    <div class="two fields">
                        
                        <div class="field">
                            <label>Số báo danh</label>

                            <input type="text" name="identification" placeholder="Số báo danh" v-model="current.identification">
                        </div>
                        <div class="field" v-show="checked==true">
                            <label>EmailVerified</label>
                            <input type="checkbox" v-model="current.emailVerified">

                        </div>
                    </div>

                    <div class="ui primary submit button">Submit</div>
                </form>
            </div>
        </div>

        <div>
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
    import {mapState, mapGetters} from 'vuex'
    import 'datatables.net-dt/css/jquery.datatables.css'
var $ = require('jquery')
require('datatables.net')(window, $)
const configColumns = [{
      'data': 'username'
    },
    {
      'data': 'email'
    }, {
      'data': 'identification'
    },

    {
      'data': 'Action'
    }
    ]
    const configColumnDefs = [{
      'targets': -1,
      'data': null,
      'defaultContent': '<div style="text-align:center"><span data-tooltip="cập nhật" data-position="top left"><i class="edit icon blue edit_app_user" ></i></span>|<span data-tooltip="Xóa" data-position="top left"><i class="delete icon remove_app_user red"></i></span></div>'
    }]
    export default {
      data () {
        return {
          current: {},
          checked: false
    
        }
      },
      computed: {
        ...mapState('adminApplicationUsers', {
          all: state => state.all,
          selected: state => state.current

        }),
        ...mapGetters('adminApplicationUsers', {
          title: 'title'
        })
      },
      created: co(function* () {
        yield this.viewDataTable()
  }),
      mounted: function () {
        let me = this
    
        $('.ui.form.create')
                .form({
                  fields: {
                    password: {
                      identifier: 'password',
                      rules: [{
                        type: 'empty',
                        prompt: 'Vui lòng nhập password'
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

        $('.ui.form.create').api({
          mockResponseAsync: co(function* (st, cb) {
            yield me.save()
            cb()
            $('.ui.modal').modal('hide')
            toastr.success('Lưu thành công')
            this.current = {}
          }),
          on: 'submit'
        })
        $('.ui.form.update')
                .form({
                  fields: {
    
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

        $('.ui.form.update').api({
          mockResponseAsync: co(function* (st, cb) {
            yield me.save()
            cb()
            $('.ui.modal').modal('hide')
            toastr.success('Lưu thành công')
            this.current = {}
          }),
          on: 'submit'
        })
    
        $('.createApp').modal({
          closable: false,
          onHidden: co(function* () {
            $('.ui.form.create').form('reset')
            this.current = {}
          })
        })
        $('.updateApp').modal({
          closable: false,
          onHidden: co(function* () {
            $('.ui.form.update').form('reset')
            this.current = {}
          })
        })
        me.$forceUpdate()
      },
      methods: {
        save: co(function* () {
          console.log('@', JSON.stringify(this.current))
          yield this.$store.dispatch('adminApplicationUsers/patch', this.current)
          yield this.viewDataTable()
        }),
        add: function () {
          logger.debug('add', this.checked)
          this.current = {}
          this.checked = false
    
          $('.createApp').last()
                    .modal('show')
        },
        viewDataTable: co(function* () {
          let me = this
          yield this.$store.dispatch('adminApplicationUsers/getAll')
          $(document).ready(() => {
            $('#application').DataTable().destroy()

            let table = $('#application').DataTable({
              data: _.clone(me.all),

              'columns': configColumns,
              'columnDefs': configColumnDefs
            })
            $('#application').off('click')
            $('#application').on('click', 'tr .edit_app_user', co(function* () {
              let selected = table.row($(this).parents('tr')).data()
              me.current = _.clone(selected)
              me.checked = true
    
              logger.debug('edit', me.checked)
              $('.updateApp').last().modal('show')
            }))

            $('#application').on('click', 'tr .remove_app_user', function () {
              let selectedRow = table.row($(this).parents('tr')).data()

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
                                yield me.$store.dispatch(
                                        'adminApplicationUsers/remove', {
                                          id: selectedRow.id
                                        })
                                me.viewDataTable()
                                swal('Đã xóa!', 'Dữ liệu đã bị xóa', 'success')
                              } catch (error) {
                                swal('Thông báo!', 'Lỗi không thể xóa', 'error')
                              }
                            }))
            })
          })
        })

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
