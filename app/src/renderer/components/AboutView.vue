<template>
  <div>
    
    <h1>Welcome.</h1>
    <login></login>
    <current-page></current-page>
    <versions></versions>
    <links></links>
    <router-link to="/landing">Về trang chủ</router-link>
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
