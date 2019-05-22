window.Vue = require('vue');
window.Vuex = require('vuex');

Vue.use( Vuex );

import user from './modules/user'

import { VG } from '@/modules/dataManagement/VGconfig.js'

import { stationInfostate } from '@/modules/dataManagement/stationInfo.js'

import { eNodeBstate } from '@/modules/dataManagement/eNodeB.js'

import { alarmQuerystate } from '@/modules/alarm/alarmQuery.js'

import { paramcheckstate } from '@/modules/dataManagement/paramCheck.js'
import { UserGroupManageState } from './modules/UserGroupManage.js'
import { dataSearchState } from '@/modules/performance/dataSearch.js'

import { PolicyState } from '@/modules/systemSecurityManagement/Policy.js'

import getters from './modules/getters'

import userRightsManagement from './modules/systemSecurityManagement/UserRightsManagement'

const store = new Vuex.Store({
  modules: {
    user,
    VG,
    stationInfostate,
    eNodeBstate,
    alarmQuerystate,
    paramcheckstate,
    UserGroupManageState,
    dataSearchState,
    userRightsManagement,
    PolicyState
  },
  getters
})
export default store
