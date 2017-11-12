<template>
  <div class="ui main text container">
    <h1>Danh sách user</h1>
    <div>
      <span data-tooltip="Tạo mới">
      <i class="add to circle icon green" v-on:click="add()"></i></span>
    </div>
    <div class="userlist ui modal">
      <i class="close icon"></i>
      <div class="header">
        Thêm user vào kỳ thi
      </div>
      <div class="ui content">

        <form class="ui form">
         
          <div class="field">
            <table id="userlist" class="ui celled table" cellspacing="0" width="100%">
              <thead>
                <tr>
                    <th>Chọn</th>
                    <th>Tài khoản</th>
                    <th>Email</th>
                    <th>Số báo danh</th>
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

          <div class="ui primary submit button">Thêm user</div>
        </form>
      </div>

    </div>
 
    <br>
    <table id="userQuizs" class="cell-border" cellspacing="0" width="100%">
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
const configUserQuizsColumns = [
  {
    data: "userInfo.username"
  },
  {
    data: "userInfo.email"
  },
  {
    data: "userInfo.userId"
  },

  {
    data: "Action"
  }
];
const configUserQuizsColumnDefs = [
  {
    targets: -1,
    data: null,
    width: "60px",
    defaultContent:
      '<div style="text-align:center"><span data-tooltip="Xóa" data-position="top left"><i class="delete icon remove_app_user red"></i></span></div>'
  }
];
const configUsersColumns = [
  {
    data: "id"
  },
  {
    data: "username"
  },
  {
    data: "email"
  },
  {
    data: "id"
  }
];
const configUsersColumnDefs = [
  {
    targets: 0,
    orderable: false,
    width: "30px",
    render: function(data, type, row) {
      return (
        "<input type='checkbox' class='selecteduser' data-id='" + data + "' />"
      );
    }
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
    ...mapState("adminUserQuizs", {
      allByQuizId: state => state.allByQuizId
    }),
    ...mapState("adminApplicationUsers", {
      searchUsers: state => state.searchUsers,
      totalRows: state => state.totalRows
    }),
    ...mapState("adminQuizs", {
      current: state => state.currentQuiz
    })
  },
  created: co(function*() {
    yield this.$store.dispatch("adminQuizs/findOneQuiz", this.$route.params.id);
    yield this.viewUserQuizsDataTable();
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
        if ($(".selecteduser:checkbox:checked").length <= 0) {
          toastr.error("Vui lòng chọn user");
          cb();
        } else {
          me.save();
          cb();
          $(".ui.modal").modal("hide");
        }
      }),
      on: "submit"
    });
    $(".userlist").modal({
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
      this.viewUsersDataTable(pageNum - 1);
    },

    save: co(function*() {
      let me = this;
      var totalSelected = 0;
      var totalSuccess = 0;
      var userQuizsList = [];
      $(".selecteduser:checkbox:checked").each(function(index) {
        totalSelected++;
        var userId = $(this).data("id");
        var result = $.grep(me.allByQuizId, function(e) {
          return e.userInfo.userId == userId;
        });

        // nếu không kiếm thấy user trong danh sách có sẵn
        if (result.length == 0) {
          var table = $("#userlist").DataTable();
          var rowData = table.row("#" + userId).data();
          userQuizsList.push({
            quizId: me.$route.params.id,
            userInfo: {
              userId: userId,
              username: rowData.username,
              email: rowData.email
            }
          });

          totalSuccess++;
        }
      });

      if (totalSuccess > 0) {
        for (var i = 0; i < userQuizsList.length; i++) {
          yield me.$store.dispatch(
            "adminUserQuizs/saveUserQuiz",
            userQuizsList[i]
          );
        }
        yield me.viewUserQuizsDataTable();
        toastr.success(
          "Thêm thành công " +
            totalSuccess +
            " câu, có " +
            (totalSelected - totalSuccess) +
            " user bị trùng."
        );
      } else {
        toastr.error("User bạn chọn đã nằm trong danh sách");
      }
    }),
    add: function() {
      this.viewUsersDataTable(0);
      $(".userlist")
        .last()
        .modal("show");
    },
    show: function() {
      this.$modal.show("answers");
    },
    viewUserQuizsDataTable: co(function*() {
      let me = this;
      yield this.$store.dispatch(
        "adminUserQuizs/getAllByQuizId",
        this.$route.params.id
      );
      $(document).ready(() => {
        $("#userQuizs")
          .DataTable()
          .destroy();
        let table = $("#userQuizs").DataTable({
          data: _.clone(me.allByQuizId),
          columns: configUserQuizsColumns,
          columnDefs: configUserQuizsColumnDefs
        });
        $("#userQuizs").off("click");
        $("#userQuizs").on("click", "tr .remove_app_user", function() {
          let selectedRow = table.row($(this).parents("tr")).data();
          swal(
            {
              title: "Bạn có chắc chắn",
              text:
                "Xóa user : " +
                selectedRow.userInfo.username +
                " ra khỏi cuộc thi",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "Có, Xóa",
              closeOnConfirm: false,
              showLoaderOnConfirm: true
            },
            co(function*() {
              try {
                yield me.$store.dispatch(
                  "adminUserQuizs/remove",
                  selectedRow.id
                );
                yield me.viewUserQuizsDataTable();
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
    }),
    viewUsersDataTable: co(function*(pageNum) {
      let me = this;
      yield this.$store.dispatch("adminApplicationUsers/count", null);
      yield this.$store.dispatch("adminApplicationUsers/search", {
        keyword: "",
        page: pageNum,
        pageSize: me.pageSize
      });
      $(document).ready(() => {
        $("#userlist")
          .DataTable()
          .destroy();
        let table = $("#userlist").DataTable({
          ordering: false,
          data: _.clone(me.searchUsers),
          pageLength: me.pageSize,
          columns: configUsersColumns,
          columnDefs: configUsersColumnDefs,
          paging: false,
          info: false,
          rowId: "id"
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
