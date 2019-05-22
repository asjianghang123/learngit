<?php

namespace App\Http\Controllers\systemSecurityManagement;
use Illuminate\Support\Facades\Input;
use Illuminate\Http\Request;
use App\configTables;

Class PolicyController
{
    public function PasswdPolicy() {
    	$db = new configTables("PasswdPolicy_view", "user");
    	$rows = $db->select("*")->get()->toArray();
    	$result = [];
    	$i = 0;
    	foreach ($rows[0] as $key=>$value) {
    		if ($key != "id") {
    			$result[$i]["label"] = $key;
	    		$result[$i]["num"] = $value;
	    		if ($key == "密码有效天数:" || $key == "密码必须使用的最短天数:" || $key == "密码不能与最近历史密码相同的个数:") {
	    			$result[$i]["required"] = 1;
	    		} else {
	    			$result[$i]["required"] = 0;
	    		}
	    		if ($key == "普通用户密码长度最小值:" || $key == "系统管理员密码长度最小值:" || $key == "密码长度最大值:") {
	    			$result[$i]["min"] = 6;
	    			$result[$i]["max"] = 32;
	    		} else if ($key == "密码不能与历史密码重复时长(月):" || $key == "密码有效天数:") {
	    			$result[$i]["min"] = 0;
	    			$result[$i]["max"] = 36;
	    		} else if ($key == "密码提前到期提示天数:" || $key == "密码必须使用的最短天数:") {
	    			$result[$i]["min"] = 1;
	    			$result[$i]["max"] = 365;
	    		} else if ($key == "密码不能与最近历史密码相同的个数:") {
	    			$result[$i]["min"] = 0;
	    			$result[$i]["max"] = 32;
	    		}
	    		$i++;
    		}
			
    	}
    	return ["code"=>20000, "data"=>$result, "status"=>"success", "status_code"=>200];
    }

    public function PasswdChecked() {
    	$sourceDB = new configTables("PasswdPolicy", "user");
    	$rows = $sourceDB->select("enable_passwd_valid_days", "enable_passwd_used_shortest_days", "enable_passwd_norepeated_latest_num")->get()->toArray();
    	return ["code"=>20000, "data"=>$rows[0], "status"=>"success", "status_code"=>200];;
    }

    public function PasswdPolicyChange() {
    	$num = Input::get("num");
    	$label = Input::get("label");
    	$required = Input::get("required");
    	if ($num != "checked") {
    		$db = new configTables("PasswdPolicy_view", "user");
    		$res = $db->where("id", "=", '1')->update([$label=> intval($num)]);
    		if ($res) {
	    		return ["code"=>20000, "data"=>"success", "status"=>"success", "status_code"=>200];
	    	} else {
	    		return ["code"=>20001, "data"=>"failed", "status"=>"failed", "status_code"=>200];
	    	}
    	} else {
    		$sourceDB = new configTables("PasswdPolicy", "user");
    		$table = "";
	    	if ($label == "密码有效天数:") {
	    		$table = "enable_passwd_valid_days";
	    	} else if ($label == "密码必须使用的最短天数:") {
	    		$table = "enable_passwd_used_shortest_days";
	    	} else if ($label == "密码不能与最近历史密码相同的个数:") {
	    		$table = "enable_passwd_norepeated_latest_num";
	    	} 
	    	if ($required == 'true') {
	    		$num = 1;
	    	} elseif ($required == 'false') {
	    		$num = 0;
	    	}
	    	$res = $sourceDB->where("id", "=", '1')->update([$table=> intval($num)]);
	    	if ($res) {
	    		return ["code"=>20000, "data"=>"success", "status"=>"success", "status_code"=>200];
	    	} else {
	    		return ["code"=>20001, "data"=>"failed", "status"=>"failed", "status_code"=>200];
	    	}
    	}
    }

    public function AccoutPolicy() {
    	$db = new configTables("AccoutPolicy_view", "user");
    	$rows = $db->select("*")->get()->toArray();
    	$result = [];
    	$i = 0;
    	foreach ($rows[0] as $key=>$value) {
    		if ($key != "id") {
    			$result[$i]["label"] = $key;
	    		$result[$i]["num"] = $value;
	    		if ($key == "自动注销等待时间:" || $key == "未登陆用户禁止使用服务的未登录天数:" || $key == "自动解锁时间(分钟):" || $key == "用户非法登陆锁定次数:") {
	    			$result[$i]["required"] = 1;
	    		} else {
	    			$result[$i]["required"] = 0;
	    		}
	    		if ($key == "自动解锁时间(分钟):" || $key == "登陆或解锁失败延时时间:" || $key == "自动注销等待时间:") {
	    			$result[$i]["min"] = 1;
	    			$result[$i]["max"] = 120;
	    		} else if ($key == "用户非法登陆锁定次数:") {
	    			$result[$i]["min"] = 1;
	    			$result[$i]["max"] = 32;
	    		} else if ($key == "用户名最小长度:") {
	    			$result[$i]["min"] = 4;
	    			$result[$i]["max"] = 32;
	    		} else if ($key == "未登陆用户禁止使用服务的未登录天数:") {
	    			$result[$i]["min"] = 1;
	    			$result[$i]["max"] = 365;
	    		}
	    		$i++;
    		}
			
    	}
    	return ["code"=>20000, "data"=>$result, "status"=>"success", "status_code"=>200];
    }


    public function AccoutChecked() {
    	$sourceDB = new configTables("AccoutPolicy", "user");
    	$rows = $sourceDB->select("enable_lock", "enable_auto_logout_waiting", "enable_system_lock", "unlogged_user_policy")->get()->toArray();
    	return ["code"=>20000, "data"=>$rows[0], "status"=>"success", "status_code"=>200];;
    }

    public function AccoutPolicyChange() {
    	$num = Input::get("num");
    	$label = Input::get("label");
    	$required = Input::get("required");
    	if ($num != "checked") {
    		$db = new configTables("AccoutPolicy_view", "user");
    		$res = $db->where("id", "=", '1')->update([$label=> intval($num)]);
    		if ($res) {
	    		return ["code"=>20000, "data"=>"success", "status"=>"success", "status_code"=>200];
	    	} else {
	    		return ["code"=>20000, "data"=>"failed", "status"=>"failed", "status_code"=>200];
	    	}
    	} else {
    		$sourceDB = new configTables("AccoutPolicy", "user");
    		$table = "";
	    	if ($label == "自动解锁时间(分钟):") {
	    		$table = "enable_lock";
	    	} else if ($label == "自动注销等待时间:") {
	    		$table = "enable_auto_logout_waiting";
	    	} else if ($label == "用户非法登陆锁定次数:") {
	    		$table = "enable_system_lock";
	    	} else if ($label == "未登陆用户禁止使用服务的未登录天数:") {
	    		$table = "unlogged_user_policy";
	    	}
	    	if ($required == 'true') {
	    		$num = 1;
	    	} elseif ($required == 'false') {
	    		$num = 0;
	    	}
	    	$res = $sourceDB->where("id", "=", '1')->update([$table=> intval($num)]);
	    	if ($res) {
	    		return ["code"=>20000, "data"=>"success", "status"=>"success", "status_code"=>200];
	    	} else {
	    		return ["code"=>20000, "data"=>"failed", "status"=>"failed", "status_code"=>200];
	    	}
    	}
    }
}
