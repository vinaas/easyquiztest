<template>
  <div class="ui main text container">
    <h1>Ngân hàng đề thi</h1>
    <div>
      <span data-tooltip="Tạo mới">
      <i class="add to circle icon green" v-on:click="add()"></i></span>
    </div>
    <div class="question ui modal">
      <i class="close icon"></i>
      <div class="header">
        {{checked==true?'Cập nhật':'Tạo mới'}}
      </div>
      <div class="ui content">

        <form class="ui form">
          <div class="field" style="display:none">
            <label>Mã câu đố</label>
            <input type="text" name="id" placeholder="Id" v-model="current.id" Disabled>
          </div> 
          <div class="field">
            <label>Mô tả</label>
            <input type="text" name="description" placeholder="Mô tả" v-model="current.description">
          </div>
          <div class="field">
            <label>Kiểu</label>
            <select v-model="current.questionType" name="type">
              <option value="">--Chọn kiểu--</option>
              <option value="ONE">Một kết quả đúng</option> 
              <option value="MANY">Nhiều kết quả đúng</option>
            </select>
          </div>
          <div class="field">
             <table style="width: 100%;">
                <thead>
                  <tr>
                    <td><strong>Câu trả lời</strong></td>
                    <td><strong>Đúng</strong></td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in current.listAnswers">
                    <td><input type="text" v-model="row.content"></td>
                    <td><input type="checkbox" v-model="row.isCorrect"></td>
                    <td><a @click="removeRow(row)">Xóa</a></td>
                  </tr>
                </tbody>
             </table>
             <div>
               <a @click="addRow" href="#">Thêm câu trả lời</a>
            </div>
          </div>
         
          <div class="ui primary submit button">Submit</div>
        </form>
      </div>

    </div>
 
    <br>
    <table id="questionsBankList" class="cell-border" cellspacing="0" width="100%">
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
const logger = Logger("Admin Questions");
Vue.use(vmodal);
const co = Promise.coroutine;
var $ = require("jquery");
require("datatables.net")(window, $);
const AnswersName = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

const configQuestionBankColumns = [
  {
    data: "questionType"
  },
  {
    data: "description"
  },
  {
    data: ""
  }
];
const configQuestionBankColumnDefs = [
  {
    targets: 0,
    width: "80px"
  },
  {
    targets: 2,
    width: "80px",
    defaultContent:
      '<div style="text-align:center"><span data-tooltip="cập nhật" data-position="top left" v-on:click="toSave(item)"><i class="edit icon edit_question blue"></i></span> | <span data-tooltip="Xóa câu hỏi" data-position="top left"><i class="delete icon editor_remove red"></i></span></div>'
  }
];
export default {
  data() {
    return {
      current: {},
      checked: false,
      question: {},
      answers: [],
      disabledSaveAnswer: 0
    };
  },

  computed: {
    ...mapState("adminQuestions", {
      questionsBank: state => state.questionsBank,
      questions: state => state.questionsOfQuiz,
      currentAnswers: state => state.currentAnswers
    })
  },
  created: co(function*() {
    yield this.$store.dispatch("adminQuestions/search", {
      keyword: "",
      page: 0,
      pageSize: 20
    });
    yield this.viewQuestionBankDataTable();
  }),
  mounted: function() {
    let me = this;

    $(".ui.form").form({
      fields: {
        description: {
          identifier: "description",
          rules: [
            {
              type: "empty",
              prompt: "Please enter your description"
            }
          ]
        },
        type: {
          identifier: "questionType",
          rules: [
            {
              type: "empty",
              prompt: "Please enter your type"
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
      }),
      on: "submit"
    });
    $(".question").modal({
      closable: false,
      onHidden: function() {
        $(".ui.form").form("reset");
        this.current = {};
        me.$forceUpdate();
      }
    });
    me.$forceUpdate();
  },
  methods: {
    addRow: function() {
      if (!this.current.listAnswers) this.current.listAnswers = [];
      this.current.listAnswers.push({ content: "", isCorrect: false });
      this.$forceUpdate();
    },
    removeRow: function(row) {
      var index = this.current.listAnswers.indexOf(row);
      this.current.listAnswers.splice(index);
      this.$forceUpdate();
    },
    closeAnswer: co(function*() {
      this.$modal.hide("answers");
      yield this.viewDataTable();
    }),
    save: co(function*() {
      let me = this;
      yield this.$store.dispatch("adminQuestions/saveQuestion", this.current);
      yield this.viewQuestionBankDataTable();
    }),
    add: function() {
      this.current = {}
      this.$forceUpdate();
      $(".question")
        .last()
        .modal("show");
    },
    show: function() {
      this.$modal.show("answers");
    },
    viewQuestionBankDataTable: co(function*() {
      let me = this;
      yield this.$store.dispatch("adminQuestions/search", {
        keyword: "",
        page: 0,
        pageSize: 20
      });
      $(document).ready(() => {
        $("#questionsBankList")
          .DataTable()
          .destroy();
        let table = $("#questionsBankList").DataTable({
          ordering: false,
          data: _.clone(me.questionsBank),
          columns: configQuestionBankColumns,
          columnDefs: configQuestionBankColumnDefs
        });
        $("#questionsBankList").on(
          "click",
          "tr .edit_question",
          co(function*() {
            let selected = table.row($(this).parents("tr")).data();
            me.current = _.clone(selected);
            $(".question")
              .last()
              .modal("show");
          })
        );
        $("#questionsBankList").on("click", "tr .editor_remove", function() {
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
                yield me.$store.dispatch("adminQuestions/removeQuestion", {
                  id: selectedRow.id
                });
                me.viewQuestionBankDataTable();
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
