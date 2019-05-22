import request from '@/utils/request'
export default {
    getStationInfoDatas: function(data){
        // console.log('api');
        // console.log(data);
        return request({
            url: '/stationInfo',
            method: 'get',
            params: {
                table: data.query.table
            }
        })
    },
    stationInfoExport: function(data){
        // console.log('api');
        // console.log(data);
        return request({
            url: '/stationInfoExport',
            method: 'get',
            params:{
                table: data.table,
                city: data.queryParams.city,
                stationName: data.queryParams.stationName,
                eNodeBID: data.queryParams.eNodeBID
            }
        });
    },
    /*getStationInfoDatas: function(cancelToken, data){
        // console.log(data.query.table);
        return axios.get("stationInfo", {
            params: {
                table: data.query.table,
                city: data.query.queryParams.city,
                stationName: data.query.queryParams.stationName,
                eNodeBID: data.query.queryParams.eNodeBID
            }
        }, {
            cancelToken: cancelToken.token
        })
        .catch(function(error) {
            if (axios.isCancel(error)) {
                console.log('Request canceled', error.message);
            } else {
                // handle error
            }
            if (error.response) {
                if ( error.response.status == '404' ) {
                    return error.response.status + ' Not Found';
                }else {
                    return error.response.status;
                }
            } else if (error.request) {
                return 'Request failed'
            } else {
                return 'Other errors'
            }
        });
    },*/
    /*uploadData: function(params, header){
        // console.log(data.params);
        // console.log(data.header);
        return request({
            url: '/uploadStationData',
            method: 'post',
            data: {
                params
            },
            header: {
                header
            }
        })
    }*/
    StationUpload: function(data, header){
        // console.log(params);
        return axios.post("StationUpload", data, {
            headers: {
                header
            }
        })
    },   

}