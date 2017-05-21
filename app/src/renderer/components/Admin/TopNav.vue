<template>
    <div class="ui fixed  menu">
        <div class="ui container">
            <router-link class="item header item" to="/"> <img class="logo" src="../assets/vinaas-logo.png">EasyQuizTest</router-link>
            <a href="javascript:void()" class="item">Quản lý thí sinh</a>
            <a href="javascript:void()" class="item">Quản lý đề thi</a>
            <!--<a href="/" class="header item">
                <img class="logo" src="../assets/vinaas-logo.png">EasyQuizTest
            </a>-->
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
