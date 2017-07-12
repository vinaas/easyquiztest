<template>
    <div class="ui fixed menu">
        <div class="ui container">
            <router-link class="item header item" to="/">
                <img class="logo" src="../assets/vinaas-logo.png">EasyQuizTest</router-link>
            <!--<a href="javascript:void()" class="item">Quản lý thí sinh</a>-->
            <a :href='"/#/admin/"' class="item">Quản lý đề thi</a>
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
export default {
  mounted: function () {
    $(document)
            .ready(function () {
              $('.ui.dropdown').dropdown({
                on: 'hover'
              })
              $('.ui.menu a.item')
                    .on('click', function () {
                      $(this)
                            .addClass('active')
                            .siblings()
                            .removeClass('active')
                    })
            })
  }
}
</script>

<style scoped>

</style>
