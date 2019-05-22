import Policy from '@/api/systemSecurityManagement/Policy.js';
export const PolicyState = {
	state: {
		PasswdPolicy:[],
		loadPasswdPolicyStatus: 0,

		checkedvalue:[],
		loadcheckedvalueStatus: 0,

		AccoutPolicy: [],
		loadAccoutPolicyStatus: 0,

		accoutchecked: [],
		loadaccoutchecked: 0
	},
	actions: {
		PasswdPolicy({ commit }){
			commit("setloadPasswdPolicyStatus", 1);
			Policy.PasswdPolicy()
			.then(function(response){
				commit("setloadPasswdPolicyStatus", 2);
				commit("setPasswdPolicy", response.data);
			})
			.catch()
		},
		PasswdPolicyChange({ commit }, data){
			Policy.PasswdPolicyChange(data.num, data.label, data.required)
			.then(function(response){
			})
			.catch()
		},
		PasswdChecked({ commit }){
			commit("setloadcheckedvalueStatus", 1);
			Policy.PasswdChecked()
			.then(function(response){
				commit("setloadcheckedvalueStatus", 2);
				commit("setcheckedvalue", response.data);
			})
			.catch()
		},
		AccoutPolicy({ commit }){
			commit("setloadPasswdPolicyStatus", 1);
			Policy.AccoutPolicy()
			.then(function(response){
				commit("setloadAccoutPolicyStatus", 2);
				commit("setAccoutPolicy", response.data);
			})
			.catch()
		},
		AccoutChecked({ commit }){
			commit("setloadaccoutchecked", 1);
			Policy.AccoutChecked()
			.then(function(response){
				commit("setloadaccoutchecked", 2);
				commit("setaccoutchecked", response.data);
			})
			.catch()
		},
		AccoutPolicyChange({ commit }, data){
			Policy.AccoutPolicyChange(data.num, data.label, data.required)
			.then(function(response){
			})
			.catch()
		},
	},
	mutations: {
		setPasswdPolicy(state, PasswdPolicy) {
			state.PasswdPolicy = PasswdPolicy;
		},
		setloadPasswdPolicyStatus(state, status) {
			state.loadPasswdPolicyStatus = status;
		},
		setcheckedvalue(state, checkedvalue){
			state.checkedvalue = checkedvalue;
		},
		setloadcheckedvalueStatus(state, status) {
			state.loadcheckedvalueStatus = status;
		},
		setAccoutPolicy(state, AccoutPolicy) {
			state.AccoutPolicy = AccoutPolicy;
		},
		setloadAccoutPolicyStatus(state, status) {
			state.loadAccoutPolicyStatus = status;
		},
		setaccoutchecked(state, accoutchecked) {
			state.accoutchecked = accoutchecked;
		},
		setloadaccoutchecked(state, status) {
			state.loadaccoutchecked = status;
		}
	},
	getters: {
		getPasswdPolicy(state) {
			return state.PasswdPolicy;
		},
		getloadPasswdPolicyStatus(state) {
			return state.loadPasswdPolicyStatus;
		},
		getcheckedvalue(state) {
			return state.checkedvalue;
		},
		getloadcheckedvalueStatus(state) {
			return state.loadcheckedvalueStatus;
		},
		getAccoutPolicy(state){
			return state.AccoutPolicy;
		},
		getloadAccoutPolicyStatus(state) {
			return state.loadAccoutPolicyStatus;
		},
		getaccoutchecked(state) {
			return state.accoutchecked;
		},
		getloadaccoutchecked(state) {
			return state.loadaccoutchecked;
		}
	}
}