<template>
    <div class="ui main container">
        <!--<h1 class="ui header">Bảng quản lý</h1>-->
        <h1>Danh sách các đề thi</h1>
        <button class="ui button" v-on:click="themDeThi()">thêm ...</button>
        <div class="ui modal">
            <i class="close icon"></i>
            <div class="header">
                Profile Picture
            </div>
            <div class="ui content">

                <form class="ui form segment">
                    <p>Tell Us About Yourself</p>
                    <div class="two fields">
                        <div class="field">
                            <label>Name</label>
                            <input placeholder="First Name" name="name" type="text">
                        </div>
                        <div class="field">
                            <label>Gender</label>
                            <select class="ui dropdown" name="gender">
                        <option value="">Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                        </div>
                    </div>
                    <div class="two fields">
                        <div class="field">
                            <label>Username</label>
                            <input placeholder="Username" name="username" type="text">
                        </div>
                        <div class="field">
                            <label>Password</label>
                            <input type="password" name="password">
                        </div>
                    </div>
                    <div class="field">
                        <label>Skills</label>
                        <select name="skills" multiple="" class="ui dropdown">
                    <option value="">Select Skills</option>
                    <option value="css">CSS</option>
                    <option value="html">HTML</option>
                    <option value="javascript">Javascript</option>
                    <option value="design">Graphic Design</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="mech">Mechanical Engineering</option>
                    <option value="repair">Kitchen Repair</option>
                </select>
                    </div>
                    <div class="inline field">
                        <div class="ui checkbox">
                            <input type="checkbox" name="terms">
                            <label>I agree to the terms and conditions</label>
                        </div>
                    </div>
                    <div class="ui primary submit button">Submit</div>
                </form>
            </div>
            <!--<div class="actions">
                <div class="ui black deny button">
                    Nope
                </div>
                <div class="ui positive right labeled icon button">
                    Yep, that's me
                    <i class="checkmark icon"></i>
                </div>
            </div>-->
        </div>

        <table class="ui celled striped table">
            <thead>
                <tr>
                    <th colspan="3">
                        Danh sách các đề thi
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="collapsing">
                        Đề thi 1
                    </td>
                    <td>Đề thi môn ABC năm 2016/2017</td>
                    <td class="right aligned collapsing">60 phút</td>
                </tr>
                <tr>
                    <td class="collapsing">
                        Đề thi 2
                    </td>
                    <td>Đề thi môn ABC năm 2016/2017</td>
                    <td class="right aligned collapsing">60 phút</td>
                </tr>
                <tr>
                    <td class="collapsing">
                        Đề thi 3
                    </td>
                    <td>Đề thi môn ABC năm 2016/2017</td>
                    <td class="right aligned collapsing">60 phút</td>
                </tr>
                <tr>
                    <td class="collapsing">
                        Đề thi 3
                    </td>
                    <td>Đề thi môn ABC năm 2016/2017</td>
                    <td class="right aligned collapsing">60 phút</td>
                </tr>

            </tbody>
        </table>
    </div>
</template>
<script>
    export default {
      mounted: function () {
        $('.ui.form')
                .form({
                  fields: {
                    name: {
                      identifier: 'name',
                      rules: [{
                        type: 'empty',
                        prompt: 'Please enter your name'
                      }]
                    },
                    skills: {
                      identifier: 'skills',
                      rules: [{
                        type: 'minCount[2]',
                        prompt: 'Please select at least two skills'
                      }]
                    },
                    gender: {
                      identifier: 'gender',
                      rules: [{
                        type: 'empty',
                        prompt: 'Please select a gender'
                      }]
                    },
                    username: {
                      identifier: 'username',
                      rules: [{
                        type: 'empty',
                        prompt: 'Please enter a username'
                      }]
                    },
                    password: {
                      identifier: 'password',
                      rules: [{
                        type: 'empty',
                        prompt: 'Please enter a password'
                      },
                      {
                        type: 'minLength[6]',
                        prompt: 'Your password must be at least {ruleValue} characters'
                      }
                      ]
                    },
                    terms: {
                      identifier: 'terms',
                      rules: [{
                        type: 'checked',
                        prompt: 'You must agree to the terms and conditions'
                      }]
                    }
                  },
                  onSuccess: function (event, fields) {
                    event.preventDefault()

                    alert('ok')
                    $('.ui.modal').modal('hide')
                    return true
                  },
                  onFailure: function () {
                    alert('eee')
                    return false
                  }
                })
        $('.ui.modal').modal({
          closable: false
        })
      },
      methods: {
        themDeThi: function () {
          $('.ui.modal')
                    .modal('show')
        }

      }

    }
</script>
<style scoped>
</style>
