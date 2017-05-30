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
                            <input type="text" name="username" placeholder="username" v-model="username">
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui left icon input">
                            <i class="lock icon"></i>
                            <input type="password" name="password" placeholder="Password" v-model="password">
                        </div>
                    </div>
                    <button class="ui fluid large teal submit button">Đăng Nhập</button>
                </div>
    
                <div class="ui error message"></div>
    
            </form>
    
            <div class="ui message">
                Chưa có tài khoản đăng nhập, liên hệ với chúng tôi!
                <p>tài khoản quản trị
                    <code>admin/1234</code>
                </p>
                <p>tài khoản thí sinh
                    <code>user/1234</code>
                </p>
                <!--New to us? <a href="#">Sign Up</a>-->
            </div>
        </div>
    </div>
</template>
<script>
import toastr from 'toastr'
import { AuthServices } from '../../services/auth.js'
const _authServices = new AuthServices()
export default {
    mounted: function () {
    },
    data: function () { return { username: '', password: '' } },
    methods: {
        submit: function () {
            _authServices.login({
                "username": this.username,
                "password": this.password
            }).then(ret => {
                console.log('login retrict', ret)
                if (ret) {
                    _authServices.getUserRoles(roles => {
                        console.log(`""""""""""""""`, roles)
                        //user admin
                        if (roles.filter(x => x.name == 'admin').length !== 0) {
                            this.$router.push({ path: 'admin' })
                            toastr.info('Đăng nhập thành công')
                        }
                        // user thường
                        this.$router.push({ path: 'quiz' })
                        toastr.info('Đăng nhập thành công')
                    })


                }
                else {

                }
            }).catch(err => {
                toastr.error('Đăng nhập không thành công', 'Invalid login')
            })
            // window.localStorage.setItem(this.username, this.password)
            // if (this.username === 'admin' && this.password === '1234') {
            //     this.$router.push({ path: 'admin' })
            //     toastr.info('Đăng nhập thành công')

            // }
            // else
            //     if (this.username === 'user' && this.password === '1234') {
            //         this.$router.push({ path: 'quiz' })
            //         toastr.info('Đăng nhập thành công')

            //     }
            //     else {
            //         toastr.error('Đăng nhập không thành công', 'Invalid login')
            //     }
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