import request from '@/utils/request'
export default {
	uploadData: function(params, config){
		// console.log(params);
        return axios.post("uploadData", params, {
        	headers: {
        		config
        	}
        })
        return request({
            url: '/uploadData',
            method: 'post',
            data: {
               params
            },
            header: {
                config
            }
        })
    },
    getTableDatas: function(table){
        return request({
            url: '/TableDatas',
            method: 'get',
            params: {
                table:table
            }
        })
    }

}