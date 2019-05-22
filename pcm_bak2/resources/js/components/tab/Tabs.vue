<template>
  <div class="tabs">
    <div>
      <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="tabClick">
        <el-tab-pane
          v-for="(item, index) in editableTabs"
          :key="item.name"
          :label="item.title"
          :name="item.name"
        >
          <!-- {{item.content}} -->
          <!-- <layout-index v-if="item.name==='index'"></layout-index> -->
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- <div style="border-bottom: 1px solid #ccc; position: relative; top: -15px;"></div> -->
  </div>
</template>
<script scoped>
  // import layoutIndex from './tabs/index/LayoutIndex.vue';
  import {routes} from '../../config';
  export default {
    components: {
      // layoutIndex
    },
    data() {
      return {
        editableTabsValue: 'index',
        editableTabs: [{
          title: '首页',
          name: 'index',
          content: 'Tab 1 content'
        }],
        tabIndex: 'index'
      }
    },
    watch: {
      '$route' (to, from) {
        // console.log(routes)
        // console.log(to.path)
        this.$router.push({ path: to.path});
        let path = _.split(to.path, '/', 3)[2];
        let targetName = routes[_.split(to.path, '/', 3)[1]][_.split(to.path, '/', 3)[2]];
        // route[]
        this.editableTabsValue = path;
        if(_.findIndex(this.editableTabs, o=>o.name===path) === -1) {
          this.addTab(targetName, path);
        }
      }
    },
    methods: {
      addTab(targetName='首页', title='index') {
        // let newTabName = ++this.tabIndex + '';
        this.editableTabs.push({
          title: targetName,
          name: title,
          content: 'New'+ title +'content'
        });
        this.editableTabsValue = title;
      },
      removeTab(targetName) {
        let tabs = this.editableTabs;

        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        
        this.editableTabsValue = activeName;
        this.$router.push({ path: `/dashboard/${activeName}` });
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);

        if( this.editableTabs.length ===0 ) {
          this.addTab();
        } 
      },
      tabClick(vue){
        this.$router.push({ path: `/dashboard/${vue.name}` });
      }
    }
  }
</script>

<style>
  .tabs .el-tabs__nav-wrap {
    height: 31px;
  }
  .tabs .el-tabs--card>.el-tabs__header .el-tabs__nav {
    padding: 0 15px 0 15px;
  }
  .tabs {
    height: 31px;
  }
  /*.el-tabs--card>.el-tabs__header .el-tabs__item {
    border: 2px solid #ccc;
  }*/
  /*.tabs .el-tabs--card>.el-tabs__header .el-tabs__nav {
    border: 2px solid #ccc;
  }
  .el-tabs--card>.el-tabs__header .el-tabs__item {
    border-right: 2px solid #ccc;
  }*/
  /*.el-tabs--card>.el-tabs__header .el-tabs__item:last-child {
    border-right: 0px;
  }*/

  .tabs .el-tabs--card>.el-tabs__header .el-tabs__nav {
    padding: 0;
  }
  .tabs .el-tabs--card>.el-tabs__header .el-tabs__item:last-child {
    padding: 0 15px 0 15px;
  }

  .el-tabs--card>.el-tabs__header .el-tabs__item {
    top: -5px;
    font-weight: bolder;
  }
  .el-tabs--card>.el-tabs__header .el-tabs__item.is-active.is-closable {
    top: -5px;
    background-color: #128bc1;
    color: white;
    font-weight: bolder;
  }
  /*.el-tabs--border-card>.el-tabs__content {
    display: none;
  }
  .el-tabs--border-card>.el-tabs__header {
    border-bottom: 0px;
  }*/
</style>