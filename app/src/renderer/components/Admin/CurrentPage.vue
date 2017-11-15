<template>
  <div class="ui main container">
    <h1>Danh sách các đề thi</h1> 
    <button class="ui right labeled icon button vk" v-on:click="addQuiz()">
      <i class="level down icon"></i> Tạo mới
    </button>
    <br><br>
    <div id="saveQuiz" class="ui modal saveQuiz">
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
          <div class="four fields">
            <div class="field">
              <label>Thời gian làm bài</label>
              <input type="number" name="totalTime" placeholder="Thời gian làm bài" :value="current.totalTime" @input="updateCurrent">
            </div>
                <div class="field">
              <label>Số câu hỏi cho 1 thí sinh</label>
              <input type="number" name="numberOfQuestions" placeholder="Số câu hỏi cho 1 thí sinh" :value="current.numberOfQuestions" @input="updateCurrent">
            </div>
            <div class="field">
              <label>Thời gian bắt đầu kỳ thi</label>
              <input type="date" name="startTime" placeholder="Thời gian bắt đầu kỳ thi" :value="current.startTime" @input="updateCurrent">
            </div>
            <div class="field">
              <label>Thời gian kết thúc kỳ thi</label>
              <input type="date" name="endTime" placeholder="Thời gian kết thúc kỳ thi" :value="current.endTime" @input="updateCurrent">
            </div>
          </div>
          <div class="four fields">
            <div class="field">
              <label>Tổng số câu hỏi</label>
              <input type="number" name="totalQuestions" placeholder="Tổng số câu hỏi" :value="current.totalQuestions" @input="updateCurrent">
            </div>
            <div class="field">
              <label>Ký thi</label>
              <input type="date" name="quizTime" placeholder="Số câu hỏi cho 1 thí sinh" :value="current.quizTime" @input="updateCurrent">
            </div>
          
          </div>
          <div class="ui primary submit button">Submit</div>
        </form>
      </div>

    </div>

    <table id="example" class="ui selectable celled table">
      <thead>
        <tr>
          <th class="left aligned a1">STT</th>
          <th class="a2"> Tên </th>
          <th class="center aligned a3"> Số câu hỏi </th>
          <th class="a4"> Thời gian </th>
          <th> Kỳ thi</th>
          <th> Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in all">
          <td>{{index+1}}</td>
          <td class="collapsing">{{item.name}}</td>
          <td class="center aligned">{{item.numberOfQuestions}} </td>
          <td>{{item.totalTime}} phút</td>
          <td>{{item.quizTime| moment}}</td>
          <td>
            <span data-tooltip="cập nhật" data-position="top left" v-on:click="toSave(item)">
              <button class="ui icon button teal">
                <i class="edit icon edit_question"></i>
              </button>
            </span>
            <a :href="'/#/admin/questionList/' + item.id" class="item" data-tooltip="Quản lý câu hỏi" data-position="top left">
              <button class="ui icon button orange">
                <i class="linkify icon go_to_answers"></i>
              </button>
            </a> 
            <a :href="'/#/admin/userQuizList/' + item.id" class="item" data-tooltip="Danh sách user" data-position="top left">
              <button class="ui icon button blue">
                <i class="linkify icon add user go_to_answers"></i>
              </button>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import moment from "moment";
import { mapState, mapGetters } from "vuex";
import Logger from "../../../common/logger.js";
import Promise from "bluebird";
import toastr from "toastr";
import swal from "sweetalert";
import _ from "lodash";
const logger = Logger("Admin Quiz List");
const co = Promise.coroutine;
export default {
  // Format ngày tháng năm/////////////////////////////
  filters: {
    moment: function(date) {
      return moment(date).format("DD-MM-YYYY");
    }
  },
  computed: {
    ...mapState("adminQuizs", {
      all: state => state.all,
      current: state => state.currentQuiz
    }),
    ...mapGetters("adminQuizs", {
      title: "title"
    })
  },
  mounted: function() {
    let me = this;
    $(document).ready(function() {
      $("#example").DataTable();
    });
    $(".ui.form").form({
      fields: {
        name: {
          identifier: "name",
          rules: [
            {
              type: "empty",
              prompt: "Please enter your name"
            }
          ]
        },
        totalTime: {
          identifier: "totalTime",
          rules: [
            {
              type: "empty",
              prompt: "Please enter totalTime"
            }
          ]
        }
      },
      onSuccess: function(event, fields) {
        event.preventDefault();
        return true;
      },
      onFailure: function() {
        toastr.error("Lưu không thành công");
        return false;
      }
    });

    $(".ui.form").api({
      mockResponseAsync: Promise.coroutine(function*(st, cb) {
        yield me.save();
        cb();
        $(".ui.modal").modal("hide");
        toastr.success("Lưu thành công");
      }),
      on: "submit"
    });
    $(".saveQuiz").modal({
      closable: false,
      onHidden: function() {
        $(".ui.form").form("reset");
        me.$store.dispatch("adminQuizs/updateCurrent", {});
      }
    });
    me.$forceUpdate();
  },
  methods: {
    goNext() {
      this.$store.dispatch("goNext").then(() => {
        this._cloneCurrentCheck();
      });
    },
    goPrevious() {
      this.$store.dispatch("goPre").then(() => {
        this._cloneCurrentCheck();
      });
    },
    toQuestion: function(item) {
      logger.debug("link to Question", JSON.stringify(item));
      // this.$router.push({ path: 'questionList'+item.id })
    },
    addQuiz: function() {
      logger.debug("add");
      this.$store.dispatch("adminQuizs/selectQuiz", {});

      $(".saveQuiz")
        .last()
        .modal("show");
    },
    toSave: co(function*(item) {
      logger.debug(item);
      // $('.saveQuiz').remove()
      yield this.$store.dispatch("adminQuizs/selectQuiz", item);

      $(".saveQuiz")
        .last()
        .modal("show");
    }),
    save: Promise.coroutine(function*() {
      yield this.$store.dispatch("adminQuizs/saveQuiz", this.current);
      yield this.$store.dispatch("adminQuizs/getAll");
    }),
    updateCurrent: function(e) {
      let cloneQuiz = Object.assign({}, this.current, {
        [e.target.name]: e.target.value
      });
      this.$store.dispatch("adminQuizs/updateCurrent", cloneQuiz);
    },
    toRemove: Promise.coroutine(function*(item) {
      let me = this;
      swal(
        {
          title: "Bạn có chắc chắn?",
          text: "Xóa dữ liệu : " + item.name,
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Có, Xóa",
          closeOnConfirm: false,
          showLoaderOnConfirm: true
        },
        Promise.coroutine(function*() {
          yield me.$store.dispatch("adminQuizs/removeQuiz", item);
          yield me.$store.dispatch("adminQuizs/getAll");
          swal("Đã xóa!", "Dữ liệu đã bị xóa", "success");
        })
      );
    })
  },
  created() {
    var me = this;
    logger.debug("quan ly bo de");
    this.$store.dispatch("adminQuizs/getAll").then(() => {});
  }
};
</script>
<style scoped>

</style>
