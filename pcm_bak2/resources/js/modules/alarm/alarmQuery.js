import alarmQuery from '@/api/alarm/alarmQuery.js';
export const alarmQuerystate = {
	state: {
		SelectOptionsStatus: 0,
		SelectOptions:[],

		AlarmQueryDatas: [],
		AlarmQueryStatus: 0
	},
	actions: {
		getAlarmSelectOptions({ commit }){
			commit("setSelectOptionsStatus", 1);
			alarmQuery.getAlarmSelectOptions()
			.then(function(response){
				commit("setSelectOptionsStatus", 2);
				commit("setSelectOptions", response.data);
			})
			.catch()
		},
		getAlarmQueryDatas( {commit}, data ) {
            this.cancelToken = axios.CancelToken.source();
            commit( 'setAlarmQueryStatus', 1 );
            alarmQuery.getAlarmQueryDatas( this.cancelToken, data.date, data.origSeverity, data.alarmstatus, data.locationInfo, data.alarmstyle, data.alarmTitle, data.factorycode, data.neType, data.neName)
            .then( function( response ){
                if ( response.data != undefined ) {
                    commit( 'setAlarmQueryDatas', response.data );
                    commit( 'setAlarmQueryStatus', 2 );
                }else {
                    commit( 'setAlarmQueryDatas', [ response ] );
                    commit( 'setAlarmQueryStatus' , 3 ); 
                }
            })
            .catch( function(){
                commit( 'setAlarmQueryDatas', [ 'Connection failed' ] );
                commit( 'setAlarmQueryStatus', 3 );
            });
        },
	},
	mutations: {
		setSelectOptions(state, SelectOptions){
			state.SelectOptions = SelectOptions;
		},
		setSelectOptionsStatus(state, status){
			state.SelectOptionsStatus = status;
		},
		setAlarmQueryStatus(state, status){
			state.AlarmQueryStatus = status;
		},
		setAlarmQueryDatas(state, AlarmQueryDatas){
			state.AlarmQueryDatas = AlarmQueryDatas;
		}
	},
	getters: {
		getSelectOptionsStatus(state){
			return state.SelectOptionsStatus;
		},
		getSelectOptions(state){
			return state.SelectOptions;
		},
		getAlarmQueryStatus(state){
			return state.AlarmQueryStatus;
		},
		getAlarmQueryDatas(state){
			return state.AlarmQueryDatas;
		}
	}
}