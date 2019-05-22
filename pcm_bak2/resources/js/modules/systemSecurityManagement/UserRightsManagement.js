import {getUsers} from '../../api/systemSecurityManagement/UserRightsManagement'
// import usersData from '../../api/systemSecurityManagement/UserRightsManagement'
const userRightsManagement = {
  state: {
    userData: {},
    userDataStatus: 0
  },

  mutations: {
    userData: (state, userData) => {
      state.userData = userData
    },
    userDataStatus: (state, userDataStatus) => {
      state.userDataStatus = userDataStatus
    },
  },

  actions: {
    GetUsers({commit}) {
      commit("userDataStatus", 1);
      // usersData.getUsersData().then(response => {
      getUsers().then(response => {
          // console.log(response)
          const data = response.data
          // setToken(data.token)
          // commit('SET_TOKEN', data.token)
          // setToken(response.token)
          // commit('SET_TOKEN', response.token)
          commit("userDataStatus", 2);
          commit('userData', response.data)
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      }).catch()
      // return new Promise((resolve, reject) => {
        //getUsersData().then(
        /*response => {

          // console.log(response)
          const data = response.data
          // setToken(data.token)
          // commit('SET_TOKEN', data.token)
          // setToken(response.token)
          // commit('SET_TOKEN', response.token)
          commit("userDataStatus", 2);
          commit('userData', response.data)
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      }*/
      //).catch()
    }
  },

  getters: {
    getUserData(state) {
      return state.userData;
    },
    getUserDataStatus(state) {
      return state.userDataStatus;
    }
  }
}

export default userRightsManagement