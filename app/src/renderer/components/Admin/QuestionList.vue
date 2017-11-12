<template>
  <div class="ui main text container">
    <h1>Danh sách câu hỏi</h1>
    <div>
      <span data-tooltip="Tạo mới">
      <i class="add to circle icon green" v-on:click="add()"></i></span>
    </div>
    <div class="questionbank ui modal">
      <i class="close icon"></i>
      <div class="header">
        Thêm câu hỏi từ ngân hàng câu hỏi
      </div>
      <div class="ui content">

        <form class="ui form">
         
          <div class="field">
            <table id="questionBank" class="ui celled table" cellspacing="0" width="100%">
            <thead>
              <tr>
                <th>Chọn</th>
                <th>Kiểu</th>
                <th>Nội dung</th>
              </tr>
            </thead>
          
          </table>
          <paginate
            :page-count="Math.ceil(totalRows/pageSize)"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :clickHandler="changePage"
            :containerClass="'pagination'"
            ref="paginate">
          </paginate>
          </div>

          <div class="ui primary submit button">Thêm câu hỏi</div>
        </form>
      </div>

    </div>
 
    <br>
    <table id="questions" class="cell-border" cellspacing="0" width="100%">
      <thead>
        <tr>
          <th>Kiểu</th>
          <th>Mô tả</th>
          <th>Hoạt động</th>
        </tr>
      </thead>
    </table>
  </div>

</template>

<script>
import { mapState, mapGetters } from "vuex";

import _ from "lodash";
import Promise from "Bluebird";
import toastr from "toastr";
import vmodal from "vue-js-modal";
import Logger from "../../../common/logger.js";
import Vue from "vue";
import "datatables.net-dt/css/jquery.datatables.css";
import swal from "sweetalert";
import Paginate from "vuejs-paginate";
Vue.component("paginate", Paginate);
const logger = Logger("Admin Questions");
Vue.use(vmodal);
const co = Promise.coroutine;
var $ = require("jquery");
require("datatables.net")(window, $);
const AnswersName = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
const configColumns = [
  {
    data: "questionType"
  },
  {
    data: "description"
  }
];
const configColumnDefs = [
  {
    targets: 2,
    data: null,
    width: "50px",
    defaultContent:
      '<div style="text-align:center"><span data-tooltip="Xóa câu hỏi" data-position="top left"><i class="delete icon editor_remove red"></i></span></div>'
  }
];
const configQuestionBankColumns = [
  {
    data: "id"
  },
  {
    data: "questionType"
  },
  {
    data: "description"
  }
];
const configQuestionBankColumnDefs = [
  {
    targets: 0,
    orderable: false,
    width: "30px",
    render: function(data, type, row) {
      return (
        "<input type='checkbox' class='selectedquestion' data-id='" +
        data +
        "' />"
      );
    }
  },
  {
    targets: 1,
    width: "80px"
  }
];
export default {
  data() {
    return {
      //current: {},
      checked: false,
      question: {},
      answers: [],
      disabledSaveAnswer: 0,
      pageSize: 20
    };
  },

  computed: {
    ...mapState("adminQuestions", {
      questionsBank: state => state.questionsBank,
      questions: state => state.questionsOfQuiz,
      currentAnswers: state => state.currentAnswers,
      totalRows: state => state.totalRows
    }),
    ...mapState("adminQuizs", {
      current: state => state.currentQuiz
    })
  },
  created: co(function*() {
    yield this.$store.dispatch("adminQuizs/findOneQuiz", this.$route.params.id);
    yield this.viewDataTable();
    yield this.viewQuestionBankDataTable(0);
  }),
  mounted: function() {
    let me = this;
    $(".ui.form").form({
      fields: {},
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
        if ($(".selectedquestion:checkbox:checked").length <= 0) {
          toastr.error("Vui lòng chọn câu hỏi");
          cb();
        } else {
          yield me.save();
          cb();
          $(".ui.modal").modal("hide");
        }
      }),
      on: "submit"
    });
    $(".questionbank").modal({
      closable: false,
      onHidden: function() {
        $(".ui.form").form("reset");
        //this.current = {};
      }
    });
    me.$forceUpdate();
  },
  methods: {
    changePage: function(pageNum) {
      this.viewQuestionBankDataTable(pageNum - 1);
    },
    closeAnswer: co(function*() {
      this.$modal.hide("answers");
      yield this.viewDataTable();
    }),
    save: co(function*() {
      let me = this;
      if (!me.current.listQuestions) me.current.listQuestions = [];
      var totalSelected = 0;
      var totalSuccess = 0;
      $(".selectedquestion:checkbox:checked").each(function(index) {
        totalSelected++;
        var questionId = $(this).data("id");
        var result = $.grep(me.current.listQuestions, function(e) {
          return e.id == questionId;
        });
        if (result.length == 0) {
          var questionItem = $.grep(me.questionsBank, function(e) {
            if (e.id == questionId) return e;
          });
          if (questionItem) {
            me.current.listQuestions.push(questionItem[0]);
            totalSuccess++;
          }
        }
      });
      yield this.$store.dispatch("adminQuizs/saveQuiz", this.current);
      yield this.$store.dispatch(
        "adminQuizs/findOneQuiz",
        this.$route.params.id
      );

      if (totalSuccess > 0) {
        toastr.success(
          "Thêm thành công " +
            totalSuccess +
            " câu, có " +
            (totalSelected - totalSuccess) +
            " câu bị trùng."
        );
      } else {
        toastr.error("Các câu hỏi bạn chọn đã nằm trong danh sách");
      }
      yield this.viewDataTable();
      //this.current.listQuestions.push()

      // console.log(this.current);
      //yield this.$store.dispatch("adminQuestions/saveQuestion", this.current);
      //yield this.viewDataTable();
    }),
    add: function() {
      $(".questionbank")
        .last()
        .modal("show");
    },
    show: function() {
      this.$modal.show("answers");
    },
    viewDataTable: co(function*() {
      let me = this;
      $(document).ready(() => {
        $("#questions")
          .DataTable()
          .destroy();
        let table = $("#questions").DataTable({
          data: me.current.listQuestions,
          columns: configColumns,
          columnDefs: configColumnDefs
        });
        $("#questions").off("click");
        $("#questions").on(
          "click",
          "tr .edit_question",
          co(function*() {
            let selected = table.row($(this).parents("tr")).data();
            me.current = _.clone(selected);
            me.checked = true;
            $(".questionbank")
              .last()
              .modal("show");
          })
        );
        $("#questions").on("click", "tr .editor_remove", function() {
          let selectedRow = table.row($(this).parents("tr")).data();
          swal(
            {
              title: "Bạn có chắc chắn",
              text: "Xóa dữ liệu : " + selectedRow.description,
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "Có, Xóa",
              closeOnConfirm: false,
              showLoaderOnConfirm: true
            },
            co(function*() {
              try {
                //debugger
                me.current.listQuestions = me.current.listQuestions.filter(
                  obj => obj.id != selectedRow.id
                );
                console.log(me.current);
                yield me.$store.dispatch("adminQuizs/saveQuiz", me.current);
                yield me.$store.dispatch(
                  "adminQuizs/findOneQuiz",
                  me.$route.params.id
                );
                me.viewDataTable();
                swal({
                  type: "success",
                  title: "Ðã xóa!",
                  text: "Dữ liệu đã bị xóa"
                });
              } catch (error) {
                swal({
                  type: "error",
                  title: "Thông báo!",
                  text: "Lỗi không thể xóa " + error
                });
              }
            })
          );
        });
        $("#questions").on("click", "tr .go_to_answers", function() {
          let selectedAnswers = table.row($(this).parents("tr")).data();
          let answers =
            _.isEmpty(selectedAnswers.answersForAQuestions) == true
              ? []
              : selectedAnswers.answersForAQuestions.map(x => {
                  return _.clone(x);
                });
          me.answers = answers;
          delete selectedAnswers.answersForAQuestions;
          me.question = selectedAnswers;
          me.$modal.show("answers");
        });
      });
    }),
    viewQuestionBankDataTable: co(function*(pageNum) {
      let me = this;
      yield this.$store.dispatch("adminQuestions/count", null);
      yield this.$store.dispatch("adminQuestions/search", {
        keyword: "",
        page: pageNum,
        pageSize: me.pageSize
      });
      $(document).ready(() => {
        $("#questionBank")
          .DataTable()
          .destroy();
        let table = $("#questionBank").DataTable({
          ordering: false,
          data: _.clone(me.questionsBank),
          pageLength: me.pageSize,
          columns: configQuestionBankColumns,
          columnDefs: configQuestionBankColumnDefs,
          paging: false,
          info: false
        });
      });
    })
  }
};
</script>
<style scoped>
.container-modal {
  height: 100%;
  overflow-x: scroll;
  margin: 0 auto;
  padding: 3em;
  font: 100%/1.4 serif;
  border: 1px solid rgba(0, 0, 0, 0.25);
}
.btn-position-right {
  text-align: right;
}
.ui.text.container {
  max-width: 2000px !important;
}
</style>
