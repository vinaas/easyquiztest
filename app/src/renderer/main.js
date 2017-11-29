// apply global overrides stuff here
import Vue from 'vue'
import Electron from 'vue-electron'
import Resource from 'vue-resource'
import Router from 'vue-router'
import App from './App'
import routes from './routes'
import VueLogger from 'vuejs-logger'

Vue.use(Electron)
Vue.use(Resource)
Vue.use(Router)

const options = {
    // required ['debug', 'info', 'warn', 'error', 'fatal']
    logLevel : 'debug', 
    // optional : defaults to false if not specified
    stringifyArguments : false,
    // optional : defaults to false if not specified
    showLogLevel : true,
    // optional : defaults to false if not specified
    showMethodName : false,
    // optional : defaults to '|' if not specified
    separator: '|',
    // optional : defaults to false if not specified
    showConsoleColors: true
}

Vue.use(VueLogger, options)

const router = new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes
})

/* eslint-disable no-new */
new Vue({
  router,
  ...App
}).$mount('#app')
