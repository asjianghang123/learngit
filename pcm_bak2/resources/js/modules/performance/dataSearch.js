import dataSearch from '@/api/performance/dataSearch.js';
export const dataSearchState = {
	state: {
		loadKPIStatus: 0,
		kpisData: [],

		kpisTypes: [],
		loadKpisTypesStatus: 0,

		kpiTree: [],

		loadkpiTreeStatus: 0,
		AddTemplateStatus: 0,
		template: [],
		templateStatus: 0,
		templateTree: [],
		templateTreeStatus: 0,

		UpdateTemplateStatus: 0,

		DataQueryStatus: 0,
		DataQuery: [],

	},
	actions: {
		ShowKPI({ commit }, data){
			commit("setloadKPIStatus", 1);
			dataSearch.ShowKPI(data.kpiType)
			.then(function(response){
				commit("setloadKPIStatus", 2);
				commit("setkpisData", response.data);
			})
			.catch()
		},
		ShowKpiType({ commit }){
			commit("setloadKpisTypesStatus", 1);
			dataSearch.ShowKpiType()
			.then(function(response){
				commit("setloadKpisTypesStatus", 2);
				commit("setkpisTypes", response.data);
			})
			.catch()
		},
		KpiTree({ commit }, data) {
			commit("setloadkpiTreeStatus", 1);
			return new Promise(function(resolve, reject){
				dataSearch.KpiTree(data.ids)
				.then(function(response){
					setTimeout(function(){
						commit("setkpiTree", response.data);
						commit("setloadkpiTreeStatus", 2);
						resolve();
					}, 1000);
					
				})
				.catch()
			});
		},
		AddTemplate({ commit }, data) {
			// commit("setAddTemplateStatus", 1);
			return new Promise(function(resolve, reject){
				dataSearch.AddTemplate(data.id, data.templateName)
				.then(function(response){
					setTimeout(function(){
						// commit("updateGroupMenuStatus", 2);
						resolve();
					}, 1000);
				})
				.catch()
			});
		},
		GetTemplate({ commit }) {
			commit("settemplateStatus", 1);
			return new Promise(function(resolve, reject){
				dataSearch.GetTemplate()
				.then(function(response){
					setTimeout(function(){
						commit("settemplate", response.data);
						commit("settemplateStatus", 2);
						resolve();
					}, 1000);
					
				})
				.catch()
			});
		},
		UpdateTemplate({ commit }, data){
			// commit("setUpdateTemplateStatus", 1);
			return new Promise(function(resolve, reject){
				dataSearch.UpdateTemplate(data.kpiName, data.templateName)
				.then(function(response){
					setTimeout(function(){
						// commit("updateGroupMenuStatus", 2);
						resolve();
					}, 1000);
				})
				.catch()
			});
		},
		DeleteTemplate({ commit }, data){
			// commit("setUpdateTemplateStatus", 1);
			return new Promise(function(resolve, reject){
				dataSearch.DeleteTemplate(data.templateName)
				.then(function(response){
					setTimeout(function(){
						// commit("updateGroupMenuStatus", 2);
						resolve();
					}, 1000);
				})
				.catch()
			});
		},
		SaveTemplate({ commit }, data){
			// commit("setUpdateTemplateStatus", 1);
			return new Promise(function(resolve, reject){
				dataSearch.SaveTemplate(data.kpiName, data.templateName)
				.then(function(response){
					setTimeout(function(){
						resolve();
					}, 1000);
				})
				.catch()
			});
		},
		DataQuery({ commit }, data){
			commit("setDataQueryStatus", 1);
			return new Promise(function(resolve, reject){
				dataSearch.DataQuery(data.date, data.dateType, data.hour, data.kpiName, data.templateName, data.locationDim)
				.then(function(response){
					setTimeout(function(){
						commit("setDataQueryStatus", 2);
						commit("setDataQuery", response.data);
						resolve();
					}, 1000);
				})
				.catch()
			});
		},
	},
	mutations: {
		setkpisData(state, kpisData) {
			state.kpisData = kpisData;
		},
		setloadKPIStatus(state, status) {
			state.loadKPIStatus = status;
		},
		setkpisTypes(state, kpisTypes) {
			state.kpisTypes = kpisTypes;
		},
		setloadKpisTypesStatus(state, status){
			state.loadKpisTypesStatus = status;
		},
		setkpiTree(state, kpiTree) {
			state.kpiTree = kpiTree;
		},
		setloadkpiTreeStatus(state, status) {
			state.loadkpiTreeStatus = status;
		},
		setAddTemplateStatus(state, status) {
			state.AddTemplateStatus = status;
		},
		settemplate(state, template) {
			state.template = template;
		},
		settemplateStatus(state, status) {
			state.templateStatus = status;
		},
		settemplateTree(state, templateTree) {
			state.templateTree = templateTree;
		},
		settemplateTreeStatus(state, status) {
			state.templateTreeStatus = status;
		},
		setUpdateTemplateStatus(state, status) {
			state.UpdateTemplateStatus = status;
		},
		setDataQueryStatus(state, status) {
			state.DataQueryStatus = status;
		},
		setDataQuery(state, DataQuery) {
			state.DataQuery = DataQuery;
		}
	},
	getters: {
		getkpisData(state) {
			return state.kpisData;
		},
		getloadKPIStatus(state) {
			return state.loadKPIStatus;
		},
		getkpisTypes(state) {
			return state.kpisTypes;
		},
		getloadKpisTypesStatus(state) {
			return state.loadKpisTypesStatus;
		},
		getkpiTree(state) {
			return state.kpiTree;
		},
		getloadkpiTreeStatus(state) {
			return state.loadkpiTreeStatus;
		},
		getAddTemplateStatus(state) {
			return state.AddTemplateStatus;
		},
		gettemplate(state) {
			return state.template;
		},
		gettemplateStatus(state) {
			return state.templateStatus;
		},
		gettemplateTree(state) {
			return state.templateTree;
		},
		gettemplateTreeStatus(state) {
			return state.templateTreeStatus;
		},
		getUpdateTemplateStatus(state) {
			return state.UpdateTemplateStatus;
		},
		getDataQueryStatus(state) {
			return state.DataQueryStatus;
		},
		getDataQuery(state) {
			return state.DataQuery;
		}
	}
}