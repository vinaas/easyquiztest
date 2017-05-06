<template>
    <div class="ui fixed inverted menu">
        <div class="ui container">
            <router-link class="item header item" to="/"> <img class="logo" src="../assets/logo.png"> EasyQuizTest
            </router-link>
            <!--<router-link class="item" to="/about">Giới thiệu</router-link>-->
    
            <router-link class="item" to="/login">Đăng nhập</router-link>
    
        </div>
    </div>
</template>

<script>
export default {
    mounted: function () {
        $(document)
            .ready(function () {
                $('.ui.menu .ui.dropdown').dropdown({
                    on: 'hover'
                });
                $('.ui.menu a.item')
                    .on('click', function () {
                        $(this)
                            .addClass('active')
                            .siblings()
                            .removeClass('active');
                    });
            });
    }
}
</script>
