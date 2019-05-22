import stationInfo from '@/api/dataManagement/stationInfo.js';
export const stationInfostate = {
	state: {
		StationInfoStatus: 0,
		StationInfoDatas: {},
		StationUploadStatus: 0,
		StationExportStatus: 0,
		StationExportPath: ''
	},
	actions: {
		StationUploadFile({ commit, dispatch }, data){
			commit("setStationUploadStatus", 1); // 正在上传文件
			return new Promise(function(resolve, reject){
				// console.log(data);
				stationInfo.StationUpload(data.data, data.header)
				.then(function(response){
					setTimeout(function(){
						if (response.data.readError != undefined) {
							commit("setStationUploadStatus", 4); // 读取文件失败
						} else if (response.data.colError != undefined) {
							commit("setStationUploadStatus", 3); // 字段不对应
						} else {
							commit("setStationUploadStatus", 2); // 数据导入成功
						}
						resolve();
					}, 1000);						
				})
				.catch();
			});
		},
		getStationInfoDatas({ commit }, data){
			// this.cancelToken = axios.CancelToken.source();
			commit("setStationInfoStatus", 1);
			// data.push({cancelToken: this.cancelToken});
			// console.log(data);
			stationInfo.getStationInfoDatas(data)
			.then(function( response ){
				// console.log(response);
				if( response.data != undefined ) {
					commit("setStationInfoDatas", response.data);
					commit("setStationInfoStatus", 2);
				} else {
					commit("setStationInfoDatas", [ response ]);
					commit("setStationInfoStatus", 3);
				}
			})
			.catch( function(){
                commit( 'setStationInfoDatas', [ 'Connection failed' ] );
                commit( 'setStationInfoStatus', 3 );
            });
		},
		StationExport({ commit }, data){
			commit("setStationExportStatus", 1); //正在导出中
			return new Promise((resolve, reject) => {
				stationInfo.stationInfoExport(data)
				.then((response) => {
					setTimeout(() => {
						if(response == undefined) {
							commit("setStationExportStatus", 4);
						} else if(response.data.error != undefined) {
							commit("setStationExportStatus", 3);
						} else {
							commit("setStationExportPath", response.data);
							commit("setStationExportStatus", 2); // 导出成功
						}
					resolve();
					}, 1000);
				})
			})
			// console.log(data);
		}
				
	},
	mutations: {		
		setStationUploadStatus(state, status){
			state.StationUploadStatus = status;
		},
		setStationExportStatus(state, status){
			state.StationExportStatus = status;
		},
		setStationExportPath(state, status){
			state.StationExportPath = status;
		},
		setStationInfoStatus(state, status){
			state.StationInfoStatus = status;
		},
		setStationInfoDatas(state, status){
			state.StationInfoDatas = status;
		},		
	},
	getters: {
		getStationUploadStatus(state){
			return state.StationUploadStatus;
		},
		getStationExportStatus(state){
			return state.StationExportStatus;
		},
		getStationExportPath(state){
			return state.StationExportPath;
		},
		getStationInfoStatus(state){
			return state.StationInfoStatus;
		},
		getStationInfoDatas(state){
			return state.StationInfoDatas;
		},		
	}
}