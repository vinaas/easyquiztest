<template>
  <div class="ui main container">
    <h1>Danh sách các kỳ thi</h1>
    <table class="ui celled padded table">
      <thead>
        <tr>
          <th class="single line"></th>
          <th>Trạng thái</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            Kỳ thi Toán Quốc Gia
          </td>
          <td class="single line">
            Đã thi
          </td>
          <td class="right aligned">
            <button class="ui twitter button">Xem kết quả</button>
          </td>
        </tr>
        <tr>
          <td>
            Thi Tiếng Anh đầu vào
          </td>
          <td class="single line">
            Chưa thi
          </td>
          <td class="right aligned">
            <button class="ui youtube button">Tham gia ngay</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import moment from 'moment'
import { mapState, mapGetters } from 'vuex'
import Logger from '../../../common/logger.js'
import Promise from 'bluebird'
import toastr from 'toastr'
import swal from 'sweetalert'
import _ from 'lodash'
const logger = Logger('Admin Quiz List')
const co = Promise.coroutine

export default {
  /////// UPLOAD file with VueJs ///////////////////
  // Format ngày tháng năm/////////////////////////////
  filters: {
    moment: function(date) {
      return moment(date).format('DD-MM-YYYY')
    }
  },
  computed: {
    ...mapState('adminQuizs', {
      all: state => state.all,
      current: state => state.currentQuiz
    }),
    ...mapGetters('adminQuizs', {
      title: 'title'
    })
  },
  mounted: function() {
    let me = this
    $(document).ready(function() {
      $('#example').DataTable()
    })
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
        onSuccess: function(event, fields) {
          event.preventDefault()
          return true
        },
        onFailure: function() {
          toastr.error('Lưu không thành công')
          return false
        }

      })

    $('.ui.form').api({
      mockResponseAsync: Promise.coroutine(function* (st, cb) {
        yield me.save()
        cb()
        $('.ui.modal').modal('hide')
        toastr.success('Lưu thành công')
      }),
      on: 'submit'
    })
    $('.saveQuiz').modal({
      closable: false,
      onHidden: function() {
        $('.ui.form').form('reset')
        me.$store.dispatch('adminQuizs/updateCurrent', {})
      }
    })
    me.$forceUpdate()
  },
  methods: {
    goNext() {
      this.$store.dispatch('goNext')
        .then(() => {
          this._cloneCurrentCheck()
        })
    },
    goPrevious() {
      this.$store.dispatch('goPre')
        .then(() => {
          this._cloneCurrentCheck()
        })
    },
    toQuestion: function(item) {
      logger.debug('link to Question', JSON.stringify(item))
      // this.$router.push({ path: 'questionList'+item.id })
    },
    addQuiz: function() {
      logger.debug('add')
      this.$store.dispatch('adminQuizs/selectQuiz', {})

      $('.saveQuiz').last()
        .modal('show')
    },
    toSave: co(function* (item) {
      logger.debug(item)
      // $('.saveQuiz').remove()
      yield this.$store.dispatch('adminQuizs/selectQuiz', item)

      $('.saveQuiz').last()
        .modal('show')
    }),
    save: Promise.coroutine(function* () {
      yield this.$store.dispatch('adminQuizs/saveQuiz', this.current)
      yield this.$store.dispatch('adminQuizs/getAll')
    }),
    updateCurrent: function(e) {
      let cloneQuiz = Object.assign({}, this.current, {
        [e.target.name]: e.target.value
      })
      this.$store.dispatch('adminQuizs/updateCurrent', cloneQuiz)
    },
    toRemove: Promise.coroutine(function* (item) {
      let me = this
      swal({
        title: 'Bạn có chắc chắn?',
        text: 'Xóa dữ liệu : ' + item.name,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Có, Xóa',
        closeOnConfirm: false,
        showLoaderOnConfirm: true
      },
        Promise.coroutine(function* () {
          yield me.$store.dispatch('adminQuizs/removeQuiz', item)
          yield me.$store.dispatch('adminQuizs/getAll')
          swal('Đã xóa!', 'Dữ liệu đã bị xóa', 'success')
        }))
    })

  },
  created() {
    var me = this
    this.$store.dispatch('adminQuizs/getAll').then(() => { })
  }
}

</script>
<style scoped>

</style>
