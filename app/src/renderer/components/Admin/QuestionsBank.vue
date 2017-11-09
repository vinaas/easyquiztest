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
          <div class="two fields">
            <div class="field">
              <label>Kiểu</label>
              <select v-model="current.questionType" name="questionType">
                <option>--Chọn kiểu--</option>
                <option value="ONE">Một kết quả đúng</option> 
                <option value="MANY">Nhiều kết quả đúng</option>
              </select>
            </div>
            <div class="field">
              <label>Độ khó</label>
              <select v-model="current.difficultLevel" name="difficultLevel">
                <option>--Chọn độ khó--</option>
                <option value="1">1</option> 
                <option value="2">2</option>
                <option value="3">3</option> 
                <option value="4">4</option>
                <option value="5">5</option> 
                <option value="6">6</option>
                <option value="7">7</option> 
                <option value="8">8</option>
                <option value="9">9</option> 
                <option value="10">10</option>
              </select>
            </div>
            
          </div>
           <div class="field">
               
              <div class="ui checkbox">
                <input type="checkbox" v-model="current.isRandom" name="isRandom" />
               <label>Xáo trộn</label>
              </div>
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
                    <td><input name="answercontent" type="text" v-model="row.content"></td>
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
    <paginate
      :page-count="Math.ceil(totalRows/pageSize)"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :clickHandler="changePage"
      :containerClass="'pagination'"
      ref="paginate">
    </paginate>
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
    })
  },
  created: co(function*() {
    yield this.viewQuestionBankDataTable(0);
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
        questionType: {
          identifier: "questionType",
          rules: [
            {
              type: "empty",
              prompt: "Please enter your question type"
            }
          ]
        },
        difficultLevel: {
          identifier: "difficultLevel",
          rules: [
            {
              type: "empty",
              prompt: "Please enter your difficult level"
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
        if (me.validateCurrentQuestion()) {
          yield me.save();
          $(".ui.modal").modal("hide");
        }
        cb();
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
    validateCurrentQuestion: function() {
      if (!this.current.listAnswers || this.current.listAnswers.length <= 0) {
        toastr.error("Phải có ít nhất 1 câu trả lời");
        return false;
      }
      var result = true;
      var isCorrectCount = 0;
      $.each(this.current.listAnswers, function(index, value) {
        if ($.trim(value.content) == "") {
          toastr.error("Câu trả lời không được để trống");
          result = false;
          return false;
        }
        if (value.isCorrect) isCorrectCount++;
      });
      if (isCorrectCount <= 0 && result) {
        toastr.error("Phải có ít nhất một câu trả lời đúng");
        result = false;
      }
      return result;
    },
    changePage: function(pageNum) {
      this.viewQuestionBankDataTable(pageNum - 1);
    },
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
      yield this.viewQuestionBankDataTable(0);
    }),
    add: function() {
      this.current = {};
      this.$forceUpdate();
      $(".question")
        .last()
        .modal("show");
    },
    show: function() {
      this.$modal.show("answers");
    },
    viewQuestionBankDataTable: co(function*(pageIndex) {
      let me = this;
      yield this.$store.dispatch("adminQuestions/count", null);
      yield this.$store.dispatch("adminQuestions/search", {
        keyword: "",
        page: pageIndex,
        pageSize: this.pageSize
      });
      $(document).ready(() => {
        $("#questionsBankList")
          .DataTable()
          .destroy();
        let table = $("#questionsBankList").DataTable({
          ordering: false,
          data: _.clone(me.questionsBank),
          pageLength: me.pageSize,
          columns: configQuestionBankColumns,
          columnDefs: configQuestionBankColumnDefs,
          paging: false
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
                me.viewQuestionBankDataTable(0);
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
.center {
  text-align: center;
}
</style>
