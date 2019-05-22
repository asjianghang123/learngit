import request from '@/utils/request'
export default {
    ShowKPI: function(kpiType){
        return request({
            url: '/ShowKPI',
            method: 'get',
            params: {
                kpiType: kpiType
            }
        })
    },
    ShowKpiType: function() {
    	return request({
            url: '/ShowKpiType',
            method: 'get'
        })
    },
    KpiTree: function(ids) {
        return request({
            url: '/KpiTree',
            method: 'get',
            params: {
                ids:ids
            }
        })
    },
    AddTemplate: function(id, templateName) {
        return request({
            url: '/AddTemplate',
            method: 'get',
            params: {
                id: id,
                templateName: templateName
            }
        })

    },
    GetTemplate: function() {
        return request({
            url: '/GetTemplate',
            method: 'get'
        })
    },
    UpdateTemplate: function(kpiName, templateName) {
        return request({
            url: '/UpdateTemplate',
            method: 'get',
            params: {
                kpiName: kpiName,
                templateName: templateName
            }
        })
    },
    DeleteTemplate: function(templateName) {
        return request({
            url: '/DeleteTemplate',
            method: 'get',
            params: {
                templateName: templateName
            }
        })
    },
    SaveTemplate: function(kpiName, templateName) {
        return request({
            url: '/SaveTemplate',
            method: 'get',
            params: {
                kpiName: kpiName,
                templateName: templateName
            }
        })
    },
    DataQuery: function(date, dateType, hour, kpiName, templateName, locationDim) {
        return request({
            url: '/DataQuery',
            method: 'get',
            params: {
                kpiName: kpiName,
                templateName: templateName,
                date: date,
                dateType: dateType,
                hour: hour,
                locationDim: locationDim
            }
        })
    },

}