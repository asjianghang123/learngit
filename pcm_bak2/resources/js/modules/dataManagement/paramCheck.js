import paramCheck from '@/api/dataManagement/paramCheck.js';
export const paramcheckstate = {
	state: {
		ParamDatasStatus: 0,
		ParamDatas:[],

		ParamExportStatus: 0,
		ParamExprotPath: ""
	},
	actions: {
		getParamDatas({ commit }, data){
			commit("setParamDatasStatus", 1);
			paramCheck.getParamDatas(data.table)
			.then(function(response){
				commit("setParamDatasStatus", 2);
				commit("setParamDatas", response.data);
			})
			.catch()
		},
		ExportParam({ commit }, data){
			commit("setParamExportStatus", 1);
			return new Promise(function(resolve, reject){
				paramCheck.ParamExport(data.table, data.location, data.enodeid, data.cellid, data.cellname)
				.then(function(response){
					setTimeout(function(){
						if (response == undefined) {
							commit("setParamExportStatus", 4);
						} else if (response.data.error != undefined) {
							commit("setParamExportStatus", 3);
						} else {
							commit("setParamExprotPath", response.data);
							commit("setParamExportStatus", 2);
						}
						resolve();
					}, 1000);											
				})
				.catch();
			});
		},

	},
	mutations: {
		setParamDatas(state, ParamDatas){
			state.ParamDatas = ParamDatas;
		},
		setParamDatasStatus(state, status){
			state.ParamDatasStatus = status;
		},
		setParamExprotPath(state, ParamExprotPath){
			state.ParamExprotPath = ParamExprotPath;
		},
		setParamExportStatus(state, status){
			state.ParamExportStatus = status;
		},
	},
	getters: {
		getParamDatasStatus(state){
			return state.ParamDatasStatus;
		},
		getParamDatas(state){
			return state.ParamDatas;
		},
		getParamExportStatus(state){
			return state.ParamExportStatus;
		},
		getParamExprotPath(state){
			return state.ParamExprotPath;
		},
	}
}