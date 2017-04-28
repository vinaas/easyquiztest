<template>
  <div>
    <img src="./LandingPageView/assets/logo.png" alt="electron-vue">
     <router-link to="/about">Đến trang giới thiệu</router-link>
    <login></login>
    <current-page></current-page>
  </div>
</template>

<script>
  
  import CurrentPage from './LandingPageView/CurrentPage'
  import Links from './LandingPageView/Links'
  import Versions from './LandingPageView/Versions'
  import Login from './LandingPageView/Login'
  export default {
    components: {
      CurrentPage,
      Links,
      Versions,
      Login
    },
    name: 'landing-page'
  }
</script>

<style scoped>
  img {
    margin-top: -25px;
    width: 450px;
  }
</style>
