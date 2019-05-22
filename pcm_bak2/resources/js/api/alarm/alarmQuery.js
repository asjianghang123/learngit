import request from '@/utils/request'
export default {
    getAlarmSelectOptions: function(){
        return request({
            url: '/AlarmSelectOptions',
            method: 'get'
        })
    },
    getAlarmQueryDatas: function(cancelToken, date, origSeverity, alarmstatus, locationInfo, alarmstyle, alarmTitle, factorycode, neType, neName){
        return request({
            url: '/AlarmQuery',
            method: 'post',
            data: {
                date: date,
                origSeverity: origSeverity,
                alarmstatus: alarmstatus,
                locationInfo: locationInfo,
                alarmstyle: alarmstyle,
                alarmTitle: alarmTitle,
                factorycode: factorycode,
                neType: neType,
                neName: neName
            },
            header: {
                cancelToken: cancelToken.token
            }
        })
    }

}