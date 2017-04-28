<template>
  <div class="container">
    <div class="row">
    <div class="col col-lg-4">
      <div class="card card-outline-info" >
        <div class="card-block">
          <h4 class="card-title">Card title</h4>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
      <div class="card card-outline-info" >
        <div class="card-block">
          <h4 class="card-title">Thông tin kì thi</h4>
          <h6><span class="badge badge-info">Kì thi</span> kiểm tra 15p </h6>
          <p class="card-text"><span class="badge badge-info">Khóa ngày:</span> 24/04/2017 </p>
        </div>
      </div>
      <div class="card card-outline-info" >
        <div class="card-block">
          <h4 class="card-title">Thông tin thí sinh</h4>
          <p class="card-text">SBD: nguyễn văn A</p>
          <p class="card-text">SBD: nguyễn văn A</p>
          <p class="card-text">SBD: nguyễn văn A</p>
        </div>
      </div>
    </div>
    <div class="col col-lg-6">
      <div class="progress">
        <div class="progress-bar bg-info" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
      <login class="badge badge-success"></login>
      
      <div class="btn-group mr-2" role="group" aria-label="First group">
        <button type="button" class="btn btn-info">1</button>
        <button type="button" class="btn btn-secondary">2</button>
        <button type="button" class="btn btn-primary">3</button>
        <button type="button" class="btn btn-disabled" disabled>4</button>
      </div>
      
    </div>
    <div class="col col-lg-2">
      Right panel
    </div>
  </div>
  <div class="row align-items-end">
    <div class="col col-center">
       Copyright VinaAS Co., Ltd
    </div>
    
  </div>  
    
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
