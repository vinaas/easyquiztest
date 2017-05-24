<template>
    <div class="ui middle aligned center aligned grid">
        <div class="column">
            <h2 class="ui teal image header">
                              <img src="../assets/vinaas-logo.png" class="image">
                              <div class="content">
                                Đăng nhập vào hệ thống
                              </div>
                            </h2>
            <form class="ui large form " v-on:submit.prevent="submit">
                <div class="ui stacked segment">
                    <div class="field">
                        <div class="ui left icon input">
                            <i class="user icon"></i>
                            <input type="text" name="username" placeholder="username">
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui left icon input">
                            <i class="lock icon"></i>
                            <input type="password" name="password" placeholder="Password">
                        </div>
                    </div>
                    <button class="ui fluid large teal submit button">Đăng Nhập</button>
                </div>
    
                <div class="ui error message"></div>
    
            </form>
    
            <div class="ui message">
                Chưa có tài khoản đăng nhập, liên hệ với chúng tôi!
                <!--New to us? <a href="#">Sign Up</a>-->
            </div>
        </div>
    </div>
</template>
<script>
export default {
  mounted: function () {
  },
  methods: {
    submit: function () {
      window.localStorage.setItem('user', 'admin')
      this.$router.push({ path: 'quiz' })
    }
  }

}
</script>
<style scoped>
body {
    background-color: #DADADA;
}

body>.grid {
    height: 100%;
}

.image {
    margin-top: -100px;
}

.column {
    max-width: 450px; 
}
</style>
