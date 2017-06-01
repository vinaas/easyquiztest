<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

import 'jquery/dist/jquery.min.js'
import 'semantic-ui-css/semantic.css'
import '../../node_modules/semantic-ui-css/semantic.js'
import 'font-awesome/css/font-awesome.css'
import '../../node_modules/toastr/build/toastr.min.css'
import 'sweetalert/dist/sweetalert.css'
import './style/style.css'
import store from 'renderer/vuex/store'
import appConfig from '../../application.json'
import 'axios'
axios.defaults.baseURL = appConfig.endpointApi
export default {
  store
}
</script>
