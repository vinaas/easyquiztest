<template>
    <div class="ui fixed menu">
        <div class="ui container">
            <router-link class="item header item" to="/">
                <img class="logo" src="../assets/vinaas-logo.png">EasyQuizTest</router-link>
            <!--<a href="javascript:void()" class="item">Quản lý thí sinh</a>-->
            <router-link to="/admin" class="item">Quản lý đề thi</router-link>
            <router-link to="/admin/appuserslist" class="item">Quản thí sinh</router-link>
            <router-link to="#" class="item" id="mnuSync">Sync</router-link>
            <div class="ui dropdown item right">
                admin
                <i class="dropdown icon"></i>
                <div class="menu">
                    <a class="item">
                        <i class="settings icon"></i> Cài đặt</a>
                    <a class="item">
                        <i class="sign out icon"></i> Đăng xuất</a>
                </div>
            </div>
        </div>
    </div>
   
</template>

<script>
import toastr from 'toastr'
export default {
  
  mounted: function() {
    $(document).ready(function() {
      $(".ui.dropdown").dropdown({
        on: "hover"
      });
      $("#mnuSync").click(function() {
        const { dialog } = require("electron").remote;
        dialog.showOpenDialog({ properties: ["openDirectory"] }, function(
          filePaths
        ) {
          if (filePaths && filePaths.length > 0) {
            toastr.info('Đang import câu hỏi')
            var child = require("child_process").execFile;
            var executablePath =
              "D:\Git\EasyQuizTest\easyquiztest\ParseTools\\WordParser.exe";
            var parameters = [filePaths[0]];
            child(executablePath, parameters, (error, stdout, stderr) => {
              if (error) {
                toastr.info('Import lỗi')
                throw error;
              }
              toastr.info(stdout)
            });
          }
        });
      });
      $(".ui.menu a.item").on("click", function() {
        $(this)
          .addClass("active")
          .siblings()
          .removeClass("active");
      });
    });
  }
};
</script>

<style scoped>

</style>
