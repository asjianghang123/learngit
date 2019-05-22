import request from '@/utils/request'
export default {
    getParamDatas: function(table){
        return request({
            url: '/GetParamDatas',
            method: 'get',
            params:{
                table: table
            }
        })
    },
    ParamExport: function(table, location, enodeid, cellid, cellname){
        return request({
            url: '/ParamExport',
            method: 'get',
            params:{
                table: table,
                location: location,
                enodeid: enodeid,
                cellid: cellid,
                cellname: cellname
            }
        })
    },

}