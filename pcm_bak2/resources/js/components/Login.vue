<template>
  <div>
    <img class="wrp" src="@/img/bg.jpg" alt="" style="height: -webkit-fill-available">
    <img src="@/img/1.png" class="img1" alt="">
    <div class="login-wrp">
        <img src="@/img/login-text.png" class="text-img login-text" alt="">
        <img src="@/img/login-ENtext.png" class="text-img login-ENtext" alt="">
        <div class="login-chunk">
          <img src="@/img/loginCN.png" class="loginCN" alt="" style="">
          <img src="@/img/loginEN.png" class="loginEN" alt="">
          <!-- <input class="login-input" type="text">
          <input class="login-input" type="password">
          <button class="login-btn" @click.stop="login">登录</button> -->
          <el-form :model="loginForm" ref="loginForm" :rules="loginRules" >
            <el-form-item prop="username">
              <!-- <span class="svg-container">
                <svg-icon icon-class="user" />
              </span> -->
              <el-input v-model="loginForm.username" name="username" type="text" auto-complete="on" placeholder="username" />
            </el-form-item>
            <el-form-item prop="password">
              <!-- <span class="svg-container">
                <svg-icon icon-class="password" />
              </span> -->
              <el-input
                :type="pwdType"
                v-model="loginForm.password"
                name="password"
                placeholder="password"
                @keyup.enter.native="handleLogin" />
              <!-- <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'" />
              </span> -->
            </el-form-item>
            <el-form-item prop="captcha">
              <el-row :gutter="20"  style="line-height: initial;">
                <el-col :span="15">
                  <el-input type='text' v-model="loginForm.captcha" name="captcha" auto-complete="on" placeholder="captcha" @keyup.enter="handleLogin('loginForm')"></el-input>
                  <el-input type='hidden' v-model="loginForm.key" name="key" auto-complete="on" placeholder="key" @keyup.enter="handleLogin('loginForm')"></el-input>
                </el-col>
                <el-col :span="9">
                  <img @click="changeCodeImg"  :src="imgcode" alt="图片验证码">
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
                登录
              </el-button>
            </el-form-item>
            <!-- <div class="tips">
              <span style="margin-right:20px;">username: admin</span>
              <span> password: admin</span>
            </div> -->
          </el-form>
        </div>
    </div>
  </div>
</template>

<script>
  //https://blog.csdn.net/u013711961/article/details/70237515
  var CryptoJS = require("crypto-js");
  // import myCaptcha from 'vue-captcha'
  // import sha256 from 'crypto-js/sha256';
  // import hmacSHA512 from 'crypto-js/hmac-sha512';
  // import Base64 from 'crypto-js/enc-base64';
  import { isvalidUsername } from '../utils/validate';
  // import Verify from 'vue2-verify';
  window.Vue = require('vue');
  // Vue.component('mytests', {
  //   props: {
  //     test: String
  //   },
  //   render(h) {
  //     return h(Vue.extend({template: this.test}))
  //   }
  // })
  Vue.component('captcha', {
    props: {
      html: String
    },
    render(h) {
      return h(Vue.extend({template: this.html}))
    }
  })
  export default {
    components: {
      // Verify
      // myCaptcha
    },
    name: 'Login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!isvalidUsername(value)) {
          callback(new Error('邮箱格式错误'))
        } else {
          callback()
        }
      }
      const validatePass = (rule, value, callback) => {
        if (value.length < 5) {
          callback(new Error('密码不能小于5位'))
        } else {
          callback()
        }
      }
      return {
        imgcode: '',
        html: '',
        loginForm: {
          username: '',
          password: '',
          captcha: '',
          key: ''
        },
        loginRules: {
          username: [{ required: true, trigger: 'blur', validator: validateUsername }],
          password: [{ required: true, trigger: 'blur', validator: validatePass }],
          captcha: [{ required: true }]
        },
        loading: false,
        pwdType: 'password',
        redirect: undefined
      }
    },
    watch: {
      $route: {
        handler: function(route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    methods: {
      handleLogin() {
        this.$refs.loginForm.validate(vaild=>{
          if(vaild) {
            this.loading = true
            this.$store.dispatch('Login', this.loginForm).then(() => {
              this.loading = false
              // console.log(this.redirect)
              this.$router.push({ path: this.redirect || '/dashboard/index' })
              // this.$router.push({ path: this.redirect || '/' })
            }).catch(() => {
              this.loading = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        });
      },
      get_cp() {
        return axios({
          url:'cp',
          method: 'GET',
        })
      },
      changeCodeImg() {
        this.get_cp().then((r) => {
          if(r.data.status_code == 200){
              this.imgcode = r.data.url.img
              this.loginForm.key = r.data.url.key
          }
        })
      },
    },
    created() {
      // axios.get('captcha-test', {

      // }).then((e)=>{
      //   // console.log(e.data)
      //   this.html = e.data
      // })

      this.get_cp().then((r)=>{
        // console.log(r.data)
      })
    },
    mounted() {
      // this.$nextTick(function () {
      //   this.$forceUpdate();
      // })
      this.changeCodeImg()
    }
  }
</script>

<style>
html,
body,
.wrp {
    width: 100%;
    height: 100%;
}

.wrp {
    text-align: center;
}

/*.wrp:before{
    content: '';
    width: 0;
    height: 100%;
    display: inline-block;
    vertical-align: middle;
  }*/
.img1 {
    /*width: 39rem;*/
    width: 40.6%;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-100%, -30%);
}

.login-wrp {
    display: inline-block;
    vertical-align: middle;
}

.login-wrp {
    width: 31.7%;
    position: absolute;
    top: 15%;
    right: 14%;
    /*top: 50%;
    right: 50%;*/
    /*transform: translate(0%, -170%);*/
}

.login-wrp .text-img {
    width: 100%;
    display: block;
}

.login-chunk {
    width: 100%;
    border-radius: 10px;
    background: rgba(255, 255, 255, .2);
    box-shadow: 0px 6px 19.32px 1.68px rgba(0, 0, 0, 0.14);
    padding: 4vh 4vw;
    position: relative;
    margin-top: 1.5vh;
}

.loginCN {
    width: 65%;
    float: left;
}

.loginEN {
    width: 45%;
    position: absolute;
    left: 34%;
    margin-top: .5%;
}

.login-chunk .login-input {
    width: 100%;
    height: 6vh;
    background: rgba(255, 255, 255, .3);
    margin: 2.5vh 0;
    padding: 0 5%;
    color: #393b3e;
    /*border: 1px solid ;*/
    border-radius: 15px;
    box-shadow: 0px 6px 19.32px 1.68px rgba(0, 0, 0, 0.3);
}

.login-btn {
    width: 100%;
    height: 6vh;
    background: #14b2dd;
    color: #fff;
    font-size: 1.2rem;
    letter-spacing: .5rem;
    border-radius: 15px;
    margin: 2.5vh 0;
    box-shadow: 0px 6px 19.32px 1.68px rgba(0, 0, 0, 0.3);
    display: block;
}
</style>