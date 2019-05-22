<?php

namespace App\Http\Controllers\systemSecurityManagement;
use Illuminate\Support\Facades\Input;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use App\configTables;
use App\Http\Controllers\ExcelSystem\Excel;
use PhpOffice\PhpSpreadsheet\IOFactory;

class MenuListController 
{
    public function MenuTree() {
    	$usergroup = Input::get("usergroup");
        $db = new configTables("menulist", "user");
        $menus = $db->selectRaw("`menuid` as 'id',`一级菜单` as 'label'")->whereRaw("`二级菜单` ='无'" )->get()->toArray();
        $childrens = $db->selectRaw("`一级菜单`,`menuid` as 'id',`二级菜单` as 'label'")->whereRaw("`二级菜单` !='无'" )->get()->toArray();
       	foreach ($menus as &$menu) {
       		$i = 0;
       		foreach ($childrens as $children) {
       			if ($menu["label"] == $children["一级菜单"]) {
       				$menu["children"][$i]["id"] =  $children["id"];
       				$menu["children"][$i]["label"] = $children["label"];
       				$i++;
       			}
       		}
       	}
       	$db = new configTables("usergroup", "user");
       	$checkid = $db->select("menuid")->where("用户组", "=", $usergroup)->get()->toArray();
       	$checkidArr = [];
       	if ($checkid) {
       		$checkidArr = explode(",", $checkid[0]["menuid"]);
       	}
       	$result["menu"] = $menus;
       	$result["checkid"] = $checkidArr;
       	return $result;

    }

    public function UserGroupTable() {
    	$dataTable = new configTables("usergroup", "user");
        $tableNames = $dataTable->selectRaw("`用户组`,`描述`")->limit(1)->get()->toArray();
        $tableHeads = array_keys($tableNames[0]);
        $select = "`".implode("`,`", $tableHeads)."`";
        $datas = $dataTable->selectRaw($select)->get()->toArray();
        $arr = [];
        $i = 0;
        foreach ($tableHeads as $tableHead) {
            $arr[$i]["label"] = $tableHead;
            $arr[$i]["prop"] = $tableHead;
            // $arr[$i]["width"] = "75";
            $i++;
        }
        unset($dataTable);
        return json_encode(array("tableHeads"=>$arr, "tableDatas"=>$datas));
    }

    public function UpdateGroupMenu() {
    	$usergroup = Input::get("usergroup");
    	$menuid = Input::get("id");
    	$menuidString = implode(",", $menuid);
    	$db = new configTables("usergroup", "user");
    	$res = $db->where("用户组", "=", $usergroup)->update(["menuid"=>"$menuidString"]);
    	return $res;

    }

    public function UserTree() {
    	$usergroupname = Input::get("usergroup");
    	$db = new configTables("user_view", "user");
    	$userdb = new configTables("users", "user");
    	$usernames = $userdb->select("name")->where("usergroup", "=", $usergroupname)->get()->toArray();
    	$users = $db->selectRaw("`用户名` as 'label',`用户组`")->get()->toArray();
    	$usergroups = $db->selectRaw("`用户组` as 'label'")->get()->toArray();
    	$i = 1;
    	foreach ($usergroups as &$usergroup) {
    		$usergroup["id"] = $i;
    		$j = 0;
    		foreach ($users as $user) {
    			if ($usergroup["label"] == $user["用户组"]) {
    				foreach (explode(",", $user["label"]) as $usename) {
    					$usergroup["children"][$j]["id"] =  $i+1;
       					$usergroup["children"][$j]["label"] = $usename;
       					$i++;
       					$j++;
    				}
       			}
    		}
    		$i++;
    	}
    	$id = [];
    	foreach ($usergroups as $usergroupValue) {
    		if ($usergroupValue["label"] == $usergroupname) {

    			foreach ($usergroupValue["children"] as $user) {
    				foreach ($usernames as $username) {
    					if ($user["label"] == $username["name"]) {
    						array_push($id, $user["id"]);
    					}
    				}
    			}
    		}	
    	}
    	$result["user"] = $usergroups;
       	$result["checkid"] = $id;
       	return $result;
    }

    public function UpdateUsergroup() {
    	$usergroup = Input::get("usergroup");
    	$usernames = Input::get("username");
    	$db = new configTables("users", "user");
    	foreach ($usernames as $username) {
    		$res = $db->where("name", "=", $username)->update(["usergroup"=>$usergroup]);
    	}

    	return $res;
    }

    public function AddUserGroup() {
    	$usergroup = Input::get("usergroup");
    	$describe = Input::get("describe");
    	$id = Input::get("id");
      $idstring = "";
      if($id) {
        $idstring = implode(",", $id);
      }
    	$db = new configTables("usergroup", "user");
    	$res = $db->insert(["用户组"=>$usergroup, "menuid"=>$idstring, "描述"=>$describe]);
    	if ($res) {
    		return "成功";
    	}
    }

    public function DeleteGroup() {
    	$usergroup = Input::get("usergroup");
    	$db = new configTables("usergroup", "user");
    	$res = $db->whereIn("用户组", $usergroup)->delete();
    	if ($res) {
    		return "成功";
    	}
    }

    public function ExportGroup() {
      $usergroups = Input::get("usergroup");
      $Excel = new Excel();
      $db = new configTables("usergroup", "user");
      $menudb = new configTables("menulist", "user");
      $arr = [];
      $i = 0;
      foreach ($usergroups as $usergroup) {
        $arr[$i][] = $usergroup;
        $row = $db->select("menuid", "描述")->where("用户组", "=", $usergroup)->get()->toArray();
        if ($row) {
          $menuid = $row[0]["menuid"];
          $menus = $menudb->select("二级菜单")->whereIn("menuid", explode(",", $menuid))->get()->toArray();
          $menunames = "";
          foreach ($menus as $menu) {
            $menunames = $menunames .$menu["二级菜单"].",";
          } 
          $arr[$i][] = rtrim($menunames, ",");
          $arr[$i][] = $row[0]["描述"];
        } else {
          $arr[$i][] = $row[0]["menuid"];
          $arr[$i][] = $row[0]["描述"];
        }
        $i++;
      }
      $sheetColumns = array("用户组", "菜单名", "描述");
      $path = "files";
      $fileName = "usergroup_".md5(time() . mt_rand(1, 10000)).".xlsx";
      $downloadurl = $path."/".$fileName;
      $Excel->CreateExcel("用户组权限", $sheetColumns, $arr, $path, $fileName);
      return $downloadurl; 
    }

    public function uploadUsergroup(Request $request) {
        $db = new configTables("menulist", "user");
        $Excel = new Excel();
        $file = $request->file('file');
        $fileName = $file->getClientOriginalName();
        $extension = $file->getClientOriginalExtension();
        // $fileType = strtolower();
        $newFileName = md5($fileName . time() . mt_rand(1, 10000)) . '.' . $extension;
        $file->storePubliclyAs('', $newFileName, ['disk' => 'public']);
        $filePath = config("filesystems.disks.public.url") . $newFileName;
        // print_r($filePath);
        $sheet = $Excel->ReadExcel($filePath);
        foreach ($sheet[1] as &$usergroup) {
          $menuids = $db->select("menuid")->whereIn("二级菜单", explode(",", $usergroup[1]))->get()->toArray();
          $menuidstring = "";
          foreach ($menuids as $menuid) {
            $menuidstring = $menuidstring .$menuid["menuid"].",";
          }
          $usergroup[1] = $menuidstring;
        }
        $res = $Excel->UpdateToDatabase($sheet[0], $sheet[1], "usergroup", "user");
        if($res) {
          return "success";
        }
    }
}
