<template>

  <div>
    <top-nav></top-nav>
  <div class="ui main text container">
    <router-view></router-view>
    
  </div>
   
  
  </div>
</template>

<script>
import TopNav from './DashBoard/TopNav'
import RightSidebar from './DashBoard/RightSidebar'
export default {
  name: 'dashboard',
  components: {
    TopNav,
    RightSidebar
  }
}
</script>

