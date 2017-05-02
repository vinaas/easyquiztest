<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './style/login.css'
import './style/style.css'
import store from 'renderer/vuex/store'
export default {
  store
}
</script>
