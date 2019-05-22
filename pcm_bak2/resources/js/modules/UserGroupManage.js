import UserGroupManage from '../api/UserGroupManage.js';
export const UserGroupManageState = {
	state: {
		menuTree: [],
		menuTreeStatus: 0,

		usergrouptables: [],
		usergrouptableStatus: 0,

		updateGroupMenuStatus:0,

		userTree: [],
		userTreeStatus: 0,

		deleteGroupStatus: 0
	},
	actions: {
		getMenuTree({ commit }, data){
			commit("setmenuTreeStatus", 1);
			UserGroupManage.getMenuTree(data.usergroup)
			.then(function(response){
				commit("setmenuTree", response.data);
				commit("setmenuTreeStatus", 2);
			})
			.catch()
		},
		UserGroupTable({ commit }){
			commit("setusergrouptableStatus", 1);
			UserGroupManage.getUserGroupTables()
			.then(function(response){
				commit("setusergrouptables", response.data);
				commit("setusergrouptableStatus", 2);
			})
			.catch()
		},
		updateGroupMenu({ commit }, data) {
			commit("updateGroupMenuStatus", 1);
			return new Promise(function(resolve, reject){
				UserGroupManage.updateGroupMenu(data.usergroup, data.id)
				.then(function(response){
					setTimeout(function(){
						commit("updateGroupMenuStatus", 2);
						resolve();
					}, 1000);
				})
				.catch();	
			});
		},
		getUserTree({ commit }, data) {
			commit("setuserTreeStatus", 1);
			UserGroupManage.getUserTree(data.usergroup)
			.then(function(response){
				commit("setuserTree", response.data);
				commit("setuserTreeStatus", 2);
			})
			.catch()	
		},
		updateUserGroup({ commit }, data) {
			return new Promise(function(resolve, reject){
				UserGroupManage.UpdateUsergroup(data.usergroup, data.username)
				.then(function(response){
					setTimeout(function(){
						resolve();
					}, 1000);
				})
				.catch();	
			});
		},
		AddUserGroup({ commit }, data) {
			return new Promise(function(resolve, reject){
				UserGroupManage.AddUserGroup(data.usergroup, data.describe, data.id)
				.then(function(response){
					setTimeout(function(){
						resolve();
					}, 1000);
				})
				.catch();	
			});
		},
		DeleteGroup({ commit }, data){
			commit("setdeleteGroupStatus", 1);
			UserGroupManage.DeleteGroup(data.usergroup)
			.then(function(response){
				commit("setdeleteGroupStatus", 2);
			})
			.catch()
		},
	},
	mutations: {
		setmenuTree(state, menuTree){
			state.menuTree = menuTree;
		},
		setmenuTreeStatus(state, status) {
			state.menuTreeStatus = status;
		},
		setusergrouptables(state, usergrouptables){
			state.usergrouptables = usergrouptables;
		},
		setusergrouptableStatus(state, status) {
			state.usergrouptableStatus = status;
		},
		setupdateGroupMenuStatus(state, status) {
			state.updateGroupMenuStatus = status
		},
		setuserTree(state, userTree){
			state.userTree = userTree;
		},
		setuserTreeStatus(state, status) {
			state.userTreeStatus = status;
		},
		setdeleteGroupStatus(state, status) {
			state.deleteGroupStatus = status;
		}
	},
	getters: {
		getmenuTree(state) {
			return state.menuTree;
		},
		getmenuTreeStatus(state) {
			return state.menuTreeStatus;
		},
		getusergrouptables(state) {
			return state.usergrouptables;
		},
		getusergrouptableStatus(state) {
			return state.usergrouptableStatus;
		},
		getupdateGroupMenuStatus(state) {
			return state.updateGroupMenuStatus;
		},
		getuserTree(state) {
			return state.userTree;
		},
		getuserTreeStatus(state) {
			return state.userTreeStatus;
		},
		getdeleteGroupStatus(state) {
			return state.deleteGroupStatus;
		}
	}
}