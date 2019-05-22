export default {
    getMenuTree: function(usergroup){
        return axios.get("MenuTree", {
        	params: {
                usergroup:usergroup
            }
        })
        .catch()
    },
    getUserGroupTables: function(){
        return axios.get("UserGroupTable")
        .catch()
    },
    updateGroupMenu: function(usergroup, id){
        return axios.get("UpdateGroupMenu", {
        	params: {
        		usergroup:usergroup,
        		id: id
        	}
        })
        .catch()
    },
    getUserTree: function(usergroup) {
    	return axios.get("UserTree", {
    		params: {
    			usergroup: usergroup
    		}
    	})
    	.catch()
    },
    UpdateUsergroup: function(usergroup, username) {
    	return axios.get("UpdateUsergroup", {
    		params: {
    			usergroup: usergroup,
    			username: username
    		}
    	})
    	.catch()
    },
    AddUserGroup: function(usergroup, describe, id) {
    	return axios.get("AddUserGroup", {
    		params: {
    			usergroup: usergroup,
    			describe: describe,
    			id: id
    		}
    	})
    	.catch()
    },
    DeleteGroup: function(usergroup) {
    	return axios.get("DeleteGroup", {
    		params: {
    			usergroup: usergroup
    		}
    	})
    	.catch()
    }
}