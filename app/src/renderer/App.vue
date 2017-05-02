<template>
  <div id="app" class="container-fluid">
    <b-navbar toggleable type="inverse" variant="success">
  
      <b-nav-toggle target="nav_collapse"></b-nav-toggle>
  
      <b-link class="navbar-brand" to="#">
        <span>EasyQuizTest</span>
      </b-link>
  
      <b-collapse is-nav id="nav_collapse">
  
        <b-nav is-nav-bar>
          <b-nav-item to="/about">Giới Thiệu</b-nav-item>
          <b-nav-item>Docs</b-nav-item>
          <b-nav-item>Contact Us</b-nav-item>
        </b-nav>
  
        <b-nav is-nav-bar class="ml-auto">
  
          <b-nav-item-dropdown right-alignment>
  
            <!-- Using text slot -->
            <template slot="text">
              <span style="font-weight: bold;">User</span>
            </template>
  
            <b-dropdown-item to="#">Profile</b-dropdown-item>
            <b-dropdown-item to="#">Signout</b-dropdown-item>
          </b-nav-item-dropdown>
  
        </b-nav>
      </b-collapse>
    </b-navbar>
    <router-view></router-view>
  </div>
</template>

<script>

import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import store from 'renderer/vuex/store'

export default {
  store
}
</script>
