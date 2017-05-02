<template>
  <div>
    <top-nav></top-nav>
  
    <div class="container-fluid">
      <div class="row">
        <right-sidebar></right-sidebar>
  
        <main class="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
          <router-view></router-view>
        </main>
      </div>
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
    RightSidebar,
  }
}
</script>

