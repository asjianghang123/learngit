<?php

namespace App\Http\Controllers\dataManagement;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
// use App\Http\Controllers\Input;
use Illuminate\Support\Facades\Input;
use App\Http\Controllers\ExcelSystem\Excel;
use Illuminate\Support\Facades\Schema;
use App\configTables;

class ENodeBController extends Controller
{
   
    /**
     * 获取eNodeB表全部数据
     *
     * @return json
     */
    public function getENodeBDatas()
    {
        $table =      Input::get("table");
    	// $city =       Input::get("city");
        // $eNodeBID =   Input::get("eNodeBID");
       	/*if($city !='' || $eNodeBID !=''){
            $map = [['省/自治区/直辖市','like',"%".$city."%"],['eNBID','like',"%".$eNodeBID."%"]];
        }else{
            $map = array();
        }*/
        $columns = Schema::getColumnListing("$table");
        $eNodeB = new configTables($table);
        // $tableNames = $eNodeB->selectRaw("*")->limit(1)->get()->toArray();
        // print_r($tableNames[0]);
        // $tableHeads = array_keys($tableNames[0]);
        // print_r($tableHeads);
        // $select = "`".implode("`,`", $tableHeads)."`";
        // print_r($select);
        // print_r($citys);return;
        $citys = $eNodeB->select("省/自治区/直辖市")->distinct()->get()->toArray();
        $tableDatas = $eNodeB->select("*")->get()->toArray();
        $options = [];
        $result = [];
        $tableHeads = [];
        $width = intval(1920/count($columns));
        foreach ($columns as $key=>$column) {
            $tableHeads[$key]["label"] = $column;
            $tableHeads[$key]["prop"]  = $column;
            $tableHeads[$key]["width"] = $width;
        }//表格头
        foreach ($citys as $city) {
            $options["city"][]["label"] = $city['省/自治区/直辖市'];
        }//所有城市
        // print_r($options);return;
        $result['options'] = $options;
        $result['tableHeads'] = $tableHeads;
        $result['tableDatas'] = $tableDatas;
        unset($eNodeB);
        return ["code"=>20000, "data"=>$result, "status"=>"success", "status_code"=>200];
    }

    /**
     *导出数据
     * 
     * @return json
     */
    public function eNodeBExport()
    {
        $table = Input::get("table");
        $city  = Input::get("city");
        $eNBID = Input::get("eNodeBID");
        // print_r($table);
        // print_r($city);
        // print_r($eNodeBID);return;
        $columns = Schema::getColumnListing("$table");

        $eNodeB = new configTables($table);
        $map = [];
        $result = [];
        if ($city != "") {
            array_push($map, ['省/自治区/直辖市','like','%'.$city.'%']);
            // $map['省/自治区/直辖市'] = $city;
        }
        if ($eNBID != "") {
            array_push($map, ['eNBID','like','%'.$eNBID.'%']);
            // $map['eNBID'] = $eNBID;
        }        
        $datas = $eNodeB->select("*")->where($map)->get()->toArray();
        unset($eNodeB);

        $Excel = new Excel();
        $path = "files";
        $fileName = "eNodeB_".date("Ymd").mt_rand(1, 10000).".xlsx";
        $result['downloadurl'] = $path."/".$fileName;//下载文件路径
        $result['downloadData'] = $datas;
        $sheetDatas = [];
        foreach ($datas as $data) {
            array_push($sheetDatas, array_values($data));
        }
        // print_r($sheetDatas);return;
        $Excel->CreateExcel("eNodeB", $columns, $sheetDatas, $path, $fileName);

        return ["code"=>20000, "data"=>$result, "status"=>"success", "status_code"=>200];
    }
}
