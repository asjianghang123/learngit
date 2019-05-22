<template>
  <div>
    <index v-if="url==='index'"></index>
    <alarmView v-if="url==='alarmView'"></alarmView>
    <alarmQuery v-if="url==='alarmQuery'"></alarmQuery>
    <configGetaway v-if="url==='configGetaway'"></configGetaway>
    <configParamCheck v-if="url==='configParamCheck'"></configParamCheck>
    <stationInfoManagement v-if="url==='stationInfoManagement'"></stationInfoManagement>
    <eNBInfo v-if="url==='eNBInfo'"></eNBInfo>
    <userGroupManagement v-if="url==='userGroupManagement'"></userGroupManagement>
    <userRightsManagement v-if="url==='userRightsManagement'"></userRightsManagement>
    <dataSearch v-if="url==='dataSearch'"></dataSearch>
    <SecurityPolicy v-if="url==='securityPolicySettings'"></SecurityPolicy>
  </div>
</template>

<script>
  window.Vue = require('vue');
  Vue.component('index', function (resolve) {
    require([`./index/Index.vue`], resolve)
  });
  Vue.component('alarmView', function (resolve) {
    require([`./alarm/AlarmviewComponent.vue`], resolve)
  });
  Vue.component('alarmQuery', function (resolve) {
    require([`./alarm/AlarmqueryComponent.vue`], resolve)
  });
  Vue.component('configGetaway', function (resolve) {
    require([`./configManagement/VgComponent.vue`], resolve)
  });
  Vue.component('configParamCheck', function (resolve) {
    require([`./configManagement/ParamcheckComponent.vue`], resolve)
  });
  Vue.component('stationInfoManagement', function (resolve) {
    require([`./configManagement/StationinfoComponent.vue`], resolve)
  });
  Vue.component('eNBInfo', function (resolve) {
    require([`./configManagement/ENodeBComponent.vue`], resolve)
  });
  Vue.component('userGroupManagement', function (resolve) {
    // require([`./systemSecurityManagement/Index.vue`], resolve)
    require([`./systemSecurityManagement/UserGroupManagementComponent.vue`], resolve)
  });
  Vue.component('userRightsManagement', function (resolve) {
    // require([`./systemSecurityManagement/Index.vue`], resolve)
    require([`./systemSecurityManagement/userRightsManagementComponent.vue`], resolve)
  });
  Vue.component('dataSearch', function (resolve) {
    require([`./performance/DataSearchComponent.vue`], resolve)
  });
  Vue.component('SecurityPolicy', function (resolve) {
    require([`./systemSecurityManagement/SecurityPolicyComponent.vue`], resolve)
  });
  export default {
    data() {
      return {
        url: 'index'
      }
    },
    watch: {
      $route(to, from) {
        this.url = to.path.split('/')[2];
      }
    }
  }
</script>