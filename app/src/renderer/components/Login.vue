<template>
    <div class="container">
    
        <form class="form-signin">
            <h2 class="form-signin-heading">Please sign in</h2>
            <label for="inputEmail" class="sr-only">Email address</label>
            <input type="text" id="inputEmail" class="form-control" placeholder="Email address" autofocus>
            <label for="inputPassword" class="sr-only">Password</label>
            <input type="password" id="inputPassword" class="form-control" placeholder="Password">
            <div class="checkbox">
                <label>
                    <input type="checkbox" value="remember-me"> Remember me
                </label>
            </div>
            <button class="btn btn-lg btn-primary btn-block" v-on:click="login()" type="submit">Sign in</button>
        </form>
    
    </div>
    <!-- /container -->
</template>

<script>
export default {
    created() {
    },
    methods: {
        login: function () {
            window.localStorage.setItem('user', 'admin');
            this.$router.push({ path: 'dashboard' })
        }
    }
}

</script>
