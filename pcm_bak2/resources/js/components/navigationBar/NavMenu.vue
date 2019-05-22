<template>
  <div>
    <!-- <nav-bar></nav-bar> -->
    <el-menu 
      :default-active="activeIndex" 
      class="el-menu-demo" 
      mode="horizontal" 
      @select="handleSelect"
      text-color="#fff"
      active-text-color="#fff"
      
      style="background-image: -webkit-linear-gradient(0deg, #128bc1, #0eb093);"
    ><!-- style="background-image: -webkit-linear-gradient(0deg, #128bc1, #0eb093);" -->
      <!-- <el-menu-item index="icon">
        <img src="@/img/nav/中国电信.png" style="height: 80px;">
      </el-menu-item> -->
      <el-menu-item index="index">
        <!-- <i class="el-icon-menu"></i>  -->
        <img src="@/img/nav/首页@2x.png">
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="alarm">
        <template slot="title">
          <img src="@/img/nav/告警管理@2x.png">
          <span slot="title">告警管理</span>
        </template>
        <el-menu-item index="alarmView">
          <div style="text-align: center;">告警总览</div>
        </el-menu-item>
        <el-menu-item index="alarmQuery">
          <div style="text-align: center;">告警查询</div>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="performance">
        <template slot="title">
          <img src="@/img/nav/性能管理@2x.png">
          <span slot="title">性能报表</span>
        </template>
        <el-menu-item index="dataCollection">
          <div style="text-align: center;">性能数据采集</div>
        </el-menu-item>
        <el-menu-item index="dataStorage">
          <div style="text-align: center;">性能数据储存</div>
        </el-menu-item>
        <el-menu-item index="dataSearch">
          <div style="text-align: center;">性能数据查询</div>
      </el-menu-item>
        <el-menu-item index="dataAnalysis">
          <div style="text-align: center;">性能数据分析</div>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="topologyManagement">
        <img src="@/img/nav/拓扑管理@2x.png">
        <span slot="title">拓扑管理</span>
      </el-menu-item>
      <el-submenu index="dataManagement">
        <template slot="title">
          <img src="@/img/nav/数据管理@2x.png">
          <span slot="title">数据管理</span>
        </template>
        <el-menu-item index="stationInfoManagement">
          <div style="text-align: center;">基础台账信息</div>
        </el-menu-item>
        <el-menu-item index="configGetaway">
          <div style="text-align: center;">网关信息查询</div>
        </el-menu-item>
        <el-menu-item index="configParamCheck">
          <div style="text-align: center;">参数核查</div>
        </el-menu-item>        
      </el-submenu>
      <!-- <el-menu-item index="acquisitionMonitoring">
        <img src="@/img/nav/采集监控@2x.png">
        <span slot="title">采集监控</span>
      </el-menu-item> -->
      <el-submenu index="acquisitionMonitoring">
        <template slot="title">
          <img src="@/img/nav/采集监控@2x.png">
          <span slot="title">采集监控</span>
        </template>
        <el-menu-item index="operationLogManagement">
          <div style="text-align: center;">操作日志管理</div>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="systemSecurityManagement">
        <template slot="title">
          <img src="@/img/nav/系统安全管理@2x.png">
          <span slot="title">系统安全管理</span>
        </template>
        <el-menu-item index="onlineUserQuery">
          <div style="text-align: center;">在线用户查询</div>
        </el-menu-item>
        <el-menu-item index="securityPolicySettings">
          <div style="text-align: center;">安全策略设置</div>
        </el-menu-item>
        <el-menu-item index="userRightsManagement">
          <div style="text-align: center;">用户权限管理</div>
        </el-menu-item>
        <el-menu-item index="userGroupManagement">
          <div style="text-align: center;">用户组权限管理</div>
        </el-menu-item>
      </el-submenu>
      <!-- <el-menu-item index="systemSecurityManagement">
        <img src="@/img/nav/系统安全管理@2x.png">
        <span slot="title">系统安全管理</span>
      </el-menu-item> -->
      <!-- <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
      <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item> -->
    </el-menu>
  </div>
</template>
<script>
  // import {Menu} from 'element-ui';
  // import { routes } from '@/config.js';
  import navBar from '../plugin/navBar/index.vue';
  export default {
    components: {
      navBar
    },
    data() {
      return {
        activeIndex: 'index',
        // hoverBackground: '#000'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        // console.log(key, keyPath);
        this.$router.push({ path: `/dashboard/${key}` });
      }/*,
      hover() {
        alert(123)
      }*/
    },
    created() {
      this.$router.push({ path: `/dashboard/index` });
      // Menu.computed.hoverBackground = function(){
      //   return '#484848';
      // }
      // console.log(Menu)
    }
  }
</script>
<style>
.el-menu-item .is-active {
  background-image: -webkit-linear-gradient(0deg, #128bc1, #0eb093);
  transition: all 999s linear;
}
.el-menu-item:hover  {
  background-image: -webkit-linear-gradient(0deg, #128bc1, #0eb093);
  transition: all 999s linear;
}
.el-submenu__title:hover {
  background-image: -webkit-linear-gradient(0deg, #128bc1, #0eb093);
  transition: all 999s linear;
}
.el-menu--horizontal .el-menu .el-menu-item, .el-menu--horizontal .el-menu .el-submenu__title {
  background: #484848;
}
.el-menu--horizontal .el-menu .el-menu-item:hover {
  background-image: -webkit-linear-gradient(0deg, #128bc1, #0eb093) ;
}
.el-menu--horizontal .el-menu {
  background: #484848;
}
</style>