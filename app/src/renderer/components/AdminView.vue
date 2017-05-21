<template>

  <div>
    <top-nav></top-nav>
  <div class="ui main text container">
    <router-view></router-view>
    
  </div>
   
  
  </div>
</template>

<script>
import TopNav from './Admin/TopNav'
export default {
  name: 'admin',
  components: {
    TopNav,
  }
}
</script>

