import VGconfig from '@/api/dataManagement/VGconfig.js';
export const VG = {
	state: {
		uploadVGStatus: 0,
		uploadSiteStatus: 0,
		TableDatas:{},
		TableDatasStatus: 0
	},
	actions: {
		uploadVGExcel({ commit, dispatch }, data){
			commit("setuploadVGStatus", 1);
			return new Promise(function(resolve, reject){
				VGconfig.uploadData(data.params, data.config)
				.then(function(response){
					setTimeout(function(){
						if (response == undefined) {
							commit("setuploadVGStatus", 4);
						} else if (response.data.error != undefined) {
							commit("setuploadVGStatus", 3);
						} else {
							commit("setuploadVGStatus", 2);
						}
						resolve();
					}, 1000);											
				})
				.catch();
			});
		},
		getTableDatas({ commit }, data){
			commit("setTableDatasStatus", 1);
			VGconfig.getTableDatas(data.table)
			.then(function(response){
				commit("setTableDatasStatus", 2);
				commit("setTableDatas", response.data);
			})
			.catch()
		},
		createexcel({ commit }){
			uploadExcel.createexcel()
			.then()
			.catch()		
		}
	},
	mutations: {
		setuploadVGStatus(state, status){
			state.uploadVGStatus = status;
		},
		setuploadSiteStatus(state, status){
			state.uploadSiteStatus = status;
		},
		setTableDatas(state, TableDatas){
			state.TableDatas = TableDatas;
		},
		setTableDatasStatus(state, status){
			state.TableDatasStatus = status;
		}
	},
	getters: {
		getuploadVGStatus(state){
			return state.uploadVGStatus;
		},
		getuploadSiteStatus(state){
			return state.uploadSiteStatus;
		},
		getTableDatasStatus(state){
			return state.TableDatasStatus;
		},
		getTableDatas(state){
			return state.TableDatas;
		}
	}
}