import eNodeB from '@/api/dataManagement/eNodeB.js';
export const eNodeBstate = {
	state: {
		eNodeBStatus:0,
		eNodeBDatas:{},
		eNodeBExportStatus: 0,
		eNodeBExportPath: '',
		// DownloadNBStatus:0
	},
	actions: {
		geteNodeBDatas({ commit }, data){
			// console.log(data);
			commit("seteNodeBStatus", 1);
			eNodeB.geteNodeBDatas(data)
			.then(function(response){
				// console.log(response.data);
				commit("seteNodeBStatus", 2);
				// commit("setDownloadNBStatus", 1);
				commit("seteNodeBDatas", response.data);
			})
			.catch()
		},
		eNodeBExport({ commit }, data){
			// console.log(data);
			commit("seteNodeBExportStatus", 1);// 正在导出中
			return new Promise(function(resolve, reject){
				eNodeB.eNodeBExport(data)
				.then(function(response){
					// console.log(response.data);
					setTimeout(function(){
						if(response == undefined) {
							commit("seteNodeBExportStatus", 4);
						} else if(response.data.error != undefined) {
							commit("seteNodeBExportStatus", 3);
						} else {
							commit("seteNodeBExportPath", response.data) //获取导出路径和数据
							commit("seteNodeBExportStatus", 2); // 导出成功
						}
						resolve();
					}, 1000);
				})
				.catch();

			});
			
		},

	},
	mutations: {
		seteNodeBStatus(state, status){
			state.eNodeBStatus = status;
		},
		seteNodeBDatas(state, eNodeBDatas){
			state.eNodeBDatas = eNodeBDatas;
		},
		seteNodeBExportStatus(state, status){
			state.eNodeBExportStatus = status;		
		},
		seteNodeBExportPath(state, status){
			state.eNodeBExportPath = status;
		}
	},
	getters: {
		geteNodeBstatus(state){
			return state.eNodeBStatus;
		},
		geteNodeBDatas(state){
			return state.eNodeBDatas;
		},
		geteNodeBExportStatus(state){
			return state.eNodeBExportStatus;
		},
		geteNodeBExportPath(state){
			return state.eNodeBExportPath;
		},
	}
}