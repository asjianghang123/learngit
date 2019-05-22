import request from '@/utils/request'
export default {
    PasswdPolicy: function(){
        return request({
            url: '/PasswdPolicy',
            method: 'get'
        })
    },
    PasswdPolicyChange: function(num, label, required){     
        return request({
            url: '/PasswdPolicyChange',
            method: 'get',
            params: {
                num: num,
                label: label,
                required: required
            }
        })
    },
    PasswdChecked: function(){
        return request({
            url: '/PasswdChecked',
            method: 'get'
        })
    },
    AccoutPolicy: function(){
        return request({
            url: '/AccoutPolicy',
            method: 'get'
        })
    },
    AccoutChecked: function(){
        return request({
            url: '/AccoutChecked',
            method: 'get'
        }) 
    },
    AccoutPolicyChange: function(num, label, required){   
        return request({
            url: '/AccoutPolicyChange',
            method: 'get',
            params: {
                num: num,
                label: label,
                required: required
            }
        }) 
    },
}