<?php

namespace App\Http\Controllers\dataManagement;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\DB;
use App\configTables;
use App\Http\Controllers\ExcelSystem\Excel;
use Illuminate\Support\Facades\Schema;

Class ParamCheckController extends Controller
{   
    /**
     * 获取参数数据
     *
     * @param void
     *
     * @return array
     */

    public function GetParamDatas()
    {
        $table = Input::get("table");
        $db = new configTables($table, "cm");
        // $columns = Schema::getColumnListing("alarm");
        $columnsTable = new configTables("COLUMNS", "information_schema");
        $columns = $columnsTable->select("COLUMN_NAME")->where("table_name", "=", $table)->get()->toArray();
        unset($columnsTable);
        $tableDatas = $db->select("*")->get()->toArray();
        $width = intval(1850/count($columns));
        $result = [];
        $tableHeads = [];
        foreach ($columns as $key=>$column) {
            $tableHeads[$key]["label"] = $column["COLUMN_NAME"];
            $tableHeads[$key]["prop"] = $column["COLUMN_NAME"];
            $tableHeads[$key]["width"] = $width;
        }
        $result["tableHeads"] = $tableHeads;
        $result["tableDatas"] = $tableDatas;
        return ["code"=>20000, "data"=>$result, "status"=>"success", "status_code"=>200];
    }

    /**
     * 参数数据导出
     *
     * @param void
     *
     * @return array
     */
    public function ParamExport()
    {
        $table = Input::get("table");
        $location = Input::get("location");
        $enodeid = Input::get("enodeid");
        $cellid = Input::get("cellid");
        $cellname = Input::get("cellname");
        $db = new configTables($table, "cm");
        // var_dump($enodeid);
        $temp = $db->select("*");
        if ($table == "CM_CC_view" || $table == "CM_CE_view") {
            if ($enodeid) {
                $temp->$temp->where("eNodeBDN值", "like", $enodeid);
            }
        } 
        if ($table == "CM_CP_view" || $table == "CM_EP_view") {
            if ($enodeid) {
                $temp->$temp->where("eNodeBID", "like", $enodeid);
            }
        }
        if ($table == "CM_CC_view" || $table == "CM_CP_view") {
            if ($cellname) {
                $temp->$temp->where("小区名称", "like", $cellname);
            }
            if ($cellid) {
                $temp->$temp->where("小区ID", "like", $cellid);
            }
        }
        if ($table == "CM_CE_view" || $table == "CM_EP_view") {
            if ($cellname) {
                $temp->$temp->where("基站名称", "like", $cellname);
            }
            if ($cellid) {
                $temp->$temp->where("厂商唯一标识DN", "like", $cellid);
            }
        }
        $Excel = new Excel();
        $columnsTable = new configTables("COLUMNS", "information_schema");
        $columns = $columnsTable->select("COLUMN_NAME")->where("table_name", "=", $table)->get()->toArray();
        unset($columnsTable);
        $fileName = "param_".md5(time() . mt_rand(1, 10000)).".xlsx";
        $path = "files";
        $result["downloadurl"] = $path."/".$fileName;//下载文件的路径
        $sheetColumns = [];
        foreach ($columns as $column) {
            $sheetColumns[] = $column["COLUMN_NAME"];
        }
        $datas = $temp->get()->toArray();
        $sheetDatas = [];
        foreach ($datas as $data) {
            array_push($sheetDatas, array_values($data));
        }
        $Excel->CreateExcel("参数检查", $sheetColumns, $sheetDatas, $path, $fileName);

        return ["code"=>20000, "data"=>$result, "status"=>"success", "status_code"=>200];
    }
}
