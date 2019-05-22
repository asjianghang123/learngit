<?php

namespace App\Http\Controllers\alarm;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\configTables;
use App\Http\Controllers\ExcelSystem\Excel;
use Illuminate\Support\Facades\Schema;

Class AlarmQueryController extends Controller
{
    public function AlarmQuery()
    {   
        $date = Input::get("date");
        $origSeverity = Input::get("origSeverity");
        $alarmstatus = Input::get("alarmstatus");
        $locationInfo = Input::get("locationInfo");
        $alarmstyle = Input::get("alarmstyle");
        $alarmTitle = Input::get("alarmTitle");
        $factorycode = Input::get("factorycode");
        $neType = Input::get("neType");
        $neName = Input::get("neName");
        $startTime = $date[0];
        $endTime = $date[1];
        $alarmDb = new configTables("alarm_view", "alarm");
        $columnsTable = new configTables("COLUMNS", "information_schema");
        $columns = $columnsTable->select("COLUMN_NAME")->where("table_name", "=", "alarm_view")->get()->toArray();
        unset($columnsTable);
        $sheetColumns = [];
        foreach ($columns as $column) {
            $sheetColumns[] = $column["COLUMN_NAME"];
        }
        $temp = $alarmDb->select("*")->whereRaw("date_format(`事件发生时间`, '%Y-%m-%d')>='$startTime' and date_format(`事件发生时间`, '%Y-%m-%d')<='$endTime'");
        if ($origSeverity !=[]) {
            $temp = $temp->whereIn("原始级别", $origSeverity);
        }
        if ($alarmstatus !=[]) {
            $temp = $temp->whereIn("告警状态", $alarmstatus);
        }
        if ($locationInfo !=[]) {
            $temp = $temp->whereIn("告警定位信息", $locationInfo);
        }
        if ($alarmstyle !=[]) {
            $temp = $temp->whereIn("告警类型", $alarmstyle);
        }
        if ($alarmTitle) {
            $temp = $temp->whereIn("告警标题", explode(",", $alarmTitle));
        }
        if ($factorycode) {
            $temp = $temp->whereIn("设备型号", explode(",", $factorycode));
        }
        if ($neType) {
            $temp = $temp->whereIn("告警网元设备类型", explode(",", $neType));
        }
        if ($neName) {
            $temp = $temp->whereIn("告警网元名称", explode(",", $neName));
        }
        $tableDatas = $temp->get()->toArray();
        $tableHeads = [];
        $width = intval(1920/count($columns));
        foreach ($sheetColumns as $key=>$sheetColumn) {
            $tableHeads[$key]["label"] = $sheetColumn;
            $tableHeads[$key]["prop"] = $sheetColumn;
            $tableHeads[$key]["width"] = $width;
        }
        $result["tableHeads"] = $tableHeads;
        $result["tableDatas"] = $tableDatas;

        $Excel = new Excel();
        $fileName = "alarm_".md5(time() . mt_rand(1, 10000)).".xlsx";
        $path = "files";
        $result["downloadurl"] = $path."/".$fileName;
        $sheetDatas = [];
        foreach ($tableDatas as $tableData) {
            array_push($sheetDatas, array_values($tableData));
        }
        $Excel->CreateExcel("告警查询", $sheetColumns, $sheetDatas, $path, $fileName);
        return ["code"=>20000, "data"=>$result, "status"=>"success", "status_code"=>200];
    }

    public function AlarmSelectOptions()
    {
    	$alarmDb = new configTables("alarm", "alarm");
        $origSeverities = $alarmDb->select("origSeverity")->distinct()->get()->toArray();
        $alarmStatuses = $alarmDb->select("alarmStatus")->distinct()->get()->toArray();
        $locationInfos = $alarmDb->select("locationInfo")->distinct()->get()->toArray();
        $alarmTypes = $alarmDb->select("alarmType")->distinct()->get()->toArray();
        $options = [];
        foreach ($origSeverities as $value) {
            $options["origSeverity"][]["label"] = $value["origSeverity"];
        }
        foreach ($alarmStatuses as $value) {
            $options["alarmStatus"][]["label"] = $value["alarmStatus"];
        }
        foreach ($locationInfos as $value) {
            $options["locationInfo"][]["label"] = $value["locationInfo"];
        }
        foreach ($alarmTypes as $value) {
            $options["alarmType"][]["label"] = $value["alarmType"];
        }
        return ["code"=>20000, "data"=>$options, "status"=>"success", "status_code"=>200];

    }

}
