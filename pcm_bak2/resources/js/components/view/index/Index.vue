<template>
  <div class="index">
    <el-row>
      <el-col :span="24">
        <div class="color-red font marginBottom">急办「{{ urgentNum }}项」</div>
        <el-card shadow="hover">
          <urgent-table></urgent-table>
        </el-card>
      </el-col>
      <el-col :span="24">
        <el-card shadow="hover" class="font marginTop">待办「{{ upcomingNum }}」</el-card>
      </el-col>
      <el-col :span="24">
        <el-card shadow="hover" class="marginTop bg-grey-light">
          <over-view></over-view>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import urgentTable from './components/UrgentTable';
  import overView from './components/OverView';
  /*//自动化全局注册
  import upperFirst from 'lodash/upperFirst'
  import camelCase from 'lodash/camelCase'
  const requireComponent = require.context(
    './components',
    false,
    /\w+\.(vue|js)$/
  )
  requireComponent.keys().forEach(fileName => {
    // 获取组件配置
    const componentConfig = requireComponent(fileName)

    // 获取组件的 PascalCase 命名
    const componentName = upperFirst(
      camelCase(
        // 获取和目录深度无关的文件名
        fileName
          .split('/')
          .pop()
          .replace(/\.\w+$/, '')
      )
    )
    Vue.component(componentName, componentConfig.default || componentConfig)
  })*/
  export default {
    components: {
      urgentTable,
      overView
    },
    data() {
      return {
        urgentNum: 4,
        upcomingNum: '无'
      }
    }
  }
</script>

<style>
  .index {
    margin: 0px 15px 0px 15px;
  }
  .index .el-card__body {
    padding: 10px;
  }
  .index .el-row {
    margin-top: 15px;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .index .color-red {
    color: #f56e6e;
  }
  .index .font {
    font-weight: bold;
    /*font-size: smaller;*/
  }
  .index .marginBottom {
    margin-bottom: 0px;
  }
  .index .marginTop {
    margin-top: 5px;
  }
  .index .bg-grey-light {
    background: #f8f8f8; 
  }
  /*.el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }*/
</style>