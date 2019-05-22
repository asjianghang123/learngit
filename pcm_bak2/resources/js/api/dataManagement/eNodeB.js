import request from '@/utils/request'
export default {
	geteNodeBDatas: function(data){
		/*return axios.get("getENodeBDatas", {
			params: {
				table: data.query.table,
				city: data.query.queryParams.city,
				eNodeBID: data.query.queryParams.eNodeBID,
			}
		})
		.catch()*/
		return request({
			url: '/getENodeBDatas',
			method: 'get',
			params: {
				table: data.query.table,
				/*city: data.query.queryParams.city,
				eNodeBID: data.query.queryParams.eNodeBID,*/
			}
		});
	},
	eNodeBExport: function(data){
		// console.log('api');
		// console.log(data);
		return request({
			url: '/eNodeBExport',
			method: 'get',
			params:{
				table: data.table,
				city: data.queryParams.city,
				eNodeBID: data.queryParams.eNodeBID
			}
		});
	}
	
}