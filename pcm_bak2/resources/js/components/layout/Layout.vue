<template>
  <el-container>
    <el-header style="padding: 0; position: relative;"><!--  style="padding: 0; position: fixed; top: 0px; width: -webkit-fill-available" -->
      <el-row>
        <el-col :span="2" style="height: -webkit-fill-available; background: #128bc1; text-align: -webkit-center;">
          <a href="/"><img src="@/img/nav/中国电信.png" style="height: 100px; margin-top: -15px; "></a>
        </el-col>
        <el-col :span="20">
          <nav-menu></nav-menu>
        </el-col>
        <el-col :span="1">
          <!--通知栏-->
          <div style="height: -webkit-fill-available; background: #0eb093; padding-top:13px; position: relative;">
            <div style="width: 15px; height: 15px; background-color: #f64747; text-align: -webkit-center; border-radius: 100px; left: 15px; top: 5px; color: white; font-size: xx-small; position: absolute;">
              9+
            </div>
            <img src="@/img/nav/提醒@2x.png" />
          </div>
        </el-col>
        <el-col :span="1">
          <div style="height: -webkit-fill-available; background: #0eb093; padding-top: 5px;">
            <el-dropdown class="avatar-container" trigger="click">
              <div class="avatar-wrapper">
                <img style=" width: 40px; border-radius: 50px;" class="user-avatar" src="@/img/avatar_test.jpg">
                <i class="el-icon-caret-bottom"></i>
              </div>
              <el-dropdown-menu class="user-dropdown" slot="dropdown">
                <!-- <router-link class='inlineBlock' to="/">
                  <el-dropdown-item>
                    首页
                  </el-dropdown-item>
                </router-link> -->
                <el-dropdown-item><span @click="logout" style="display:block;">退出</span></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
        <el-col :span="24" style="margin-top: 20px; margin-left: 36px;">
          <tabs></tabs>
        </el-col>
        <el-col :span="24">
          <div style="border-bottom: 1px solid #ccc; position: relative;"></div>
        </el-col>
      </el-row>
    </el-header>
    <el-main style="margin-top: 30px;">
      <!-- <tabs></tabs> -->
      <main-view></main-view>
    </el-main>
    <!-- <el-footer>footer</el-footer> -->
  </el-container>
</template>

<script>
  import navMenu from '../navigationBar/NavMenu.vue';
  import tabs from '../tab/Tabs.vue';
  import mainView from '../view/Main.vue';
  export default {
    components: {
      navMenu,
      tabs,
      mainView
    },
    methods: {
      logout() {
        this.$store.dispatch('LogOut').then(() => {
          this.$router.push({ path: `/login` });
        })
      }
    }
  }
</script>

<style scoped>
  /*.el-header, .el-footer {
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #fff;
    color: #333;
    text-align: center;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }*/
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    top: 5px;
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>