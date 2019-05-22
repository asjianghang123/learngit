<?php

namespace App\Http\Controllers\performance;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\DB;
use App\configTables;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\ExcelSystem\Excel;
use App\Http\Controllers\Controller;

Class DataSearchController extends Controller
{   
    public $kpiDB;
    public $tableDB;
    public $templateDB;

    public function ShowKPI() {
        $kpiType = Input::get("kpiType");
        $temp = $this->kpiDB->select("kpiName");
        if ($kpiType !== "allkpi") {
            $temp = $temp->where("kpiType", "=", $kpiType);
        }
        $kpiNames = $temp->get()->toArray();
        $result = [];
        foreach ($kpiNames as $kpiName) {
            array_push($result, $kpiName["kpiName"]);
        }
        return ["code"=>20000, "data"=>$result, "status"=>"success", "status_code"=>200];

    }

    public function ShowKpiType() {
        $kpiTypes = $this->kpiDB->select("kpiType")->distinct()->get()->toArray();
        $result = [];
        $i = 1;
        $result[0]["label"] = "所有指标";
        $result[0]["name"] = "allkpi";
        foreach ($kpiTypes as $kpiType) {
            $result[$i]["label"] = $kpiType["kpiType"];
            $result[$i]["name"] = $kpiType["kpiType"];
            $i++;
        }
        return ["code"=>20000, "data"=>$result, "status"=>"success", "status_code"=>200];
    }

    public function KpiTree() {
        $ids = Input::get("ids");
        $temp = $this->kpiDB->select("kpiName", "kpiType", "id")->orderBy("kpiType");
        if ($ids !="") {
            $temp = $temp->whereIn("id", explode(",", $ids));
        }
        $kpis = $temp->get()->toArray();
        $arrs = [];
        $i = 0;
        foreach ($kpis as $kpi) {
            $arrs[$kpi["kpiType"]][$i][] = $kpi["kpiName"];
            $arrs[$kpi["kpiType"]][$i][] = $kpi["id"];
            $i++;
        }
        $i = 1;
        $j = 0;
        $result = [];
        foreach ($arrs as $key=>$arr) {
            $result[$j]["id"] = $i;
            $result[$j]["label"] = $key;
            $k = 0;
            foreach ($arr as $key2=>$singlekpi) {
                $result[$j]["children"][$k]["id"] = $singlekpi[1];
                $result[$j]["children"][$k]["label"] = $singlekpi[0];
                $k++;
            }
            $i++;
            $j++;
        }
        return ["code"=>20000, "data"=>$result, "status"=>"success", "status_code"=>200];
    }

    public function AddTemplate() {
        $ids = Input::get("id");
        $user = "admin";
        $templateName = Input::get("templateName");
        $idstring = implode(",", $ids);
        $res = $this->templateDB->insert(["templateName"=>$templateName, "kpi"=>$idstring, "username"=>$user]);
        return ["code"=>20000, "data"=>"success", "status"=>"success", "status_code"=>200];
    }

    public function GetTemplate() {
        $user = "admin";
        $templateNames = $this->templateDB->select("templateName", "kpi")->where("username", "=", $user)->get()->toArray();
        $templates = [];
        $i = 0;
        foreach ($templateNames as $templateName) {
            $templates[$i]["label"] = $templateName["templateName"];
            $templates[$i]["value"] = $templateName["kpi"];
            $i++;
        }
        return ["code"=>20000, "data"=>$templates, "status"=>"success", "status_code"=>200];
    }

    public function UpdateTemplate() {
        $kpinames = Input::get("kpiName");
        $templateName = Input::get("templateName");
        $kpiids = $this->kpiDB->select("id")->whereIn("kpiName", $kpinames)->get()->toArray();
        $ids = "";
        foreach($kpiids as $kpiid) {
            $ids = $ids . $kpiid["id"] . ",";
        }
        $ids = rtrim($ids, ",");
        $res = $this->templateDB->where("templateName", "=", $templateName)->update(["kpi"=>"$ids"]);
        return ["code"=>20000, "data"=>"success", "status"=>"success", "status_code"=>200];
    }

    public function DeleteTemplate() {
        $templateName = Input::get("templateName");
        $res = $this->templateDB->where("templateName", "=", $templateName)->delete();
        return ["code"=>20000, "data"=>"success", "status"=>"success", "status_code"=>200];
    }

    public function SaveTemplate() {
        $kpiNames = Input::get("kpiName");
        $templateName = Input::get("templateName");
        $user = "admin";
        $kpiids = $this->kpiDB->select("id")->whereIn("kpiName", $kpiNames)->get()->toArray();
        $ids = "";
        foreach($kpiids as $kpiid) {
            $ids = $ids . $kpiid["id"] . ",";
        }
        $ids = rtrim($ids, ",");
        $res = $this->templateDB->insert(["kpi"=>$ids, "templateName"=>$templateName, "username"=>$user]);
        return ["code"=>20000, "data"=>"success", "status"=>"success", "status_code"=>200];
    }

    public function DataQuery() {
        $locationDim = Input::get("locationDim");
        $dateType = Input::get("dateType");
        $date = Input::get("date");
        $hour = Input::get("hour");
        $kpiNames = Input::get("kpiName");
        $templateName = Input::get("templateName");
        $columnsTable = new configTables("COLUMNS", "information_schema");
        $columns = $columnsTable->select("COLUMN_NAME")->where("table_name", "=", "PM_PC")->get()->toArray();
        $columnNames = [];
        foreach ($columns as $column) {
            array_push($columnNames, $column["COLUMN_NAME"]);
        }
        $wrongColumns = [];
        $selectSql = "";
        $sumSqlArr = [];
        foreach ($kpiNames as $kpiName) {
            $this->checkKPI($kpiName, $columnNames, $wrongColumns, $selectSql, $sumSqlArr);
        }
        if (count($wrongColumns) >0) {
            $wrong = implode("\n", $wrongColumns);
            return ["code"=>20001, "message"=>$wrong.".这些counter不存在", "status"=>"failed", "status_code"=>100];
        }
        $whereSql = "";
        $selectHeadDateSql = "";
        $selectDateSql = "";
        $groupSql = "";
        $this->DateWhereSql($dateType, $date, $hour, $whereSql, $selectHeadDateSql, $selectDateSql, $groupSql);
        $selectSql = rtrim($selectSql, ",");
        $sumSql = rtrim(implode("", array_unique($sumSqlArr)), ",");
        switch($locationDim) {
            case "cell":
                $sqlResult = $this->tableDB->selectRaw("$selectHeadDateSql,temp.小区,$selectSql")->fromRaw("(select $selectDateSql,userlabel as '小区', $sumSql from PM_PC $whereSql group by $groupSql,小区) temp")->get()->toArray();
                break;
            case "site":
                $sqlResult = $this->tableDB->selectRaw("$selectHeadDateSql,temp.基站,$selectSql")->fromRaw("(select $selectDateSql,related_enb_userlabel as '基站', $sumSql from PM_PC $whereSql group by $groupSql,基站) temp")->get()->toArray();
                break;
            default:
                $sqlResult = $this->tableDB->selectRaw("$selectHeadDateSql, $selectSql")->fromRaw("(select $selectDateSql, $sumSql from PM_PC $whereSql group by $groupSql) temp")->get()->toArray();
                break;
        }
        $tableHeads = [];
        $sheetColumns = [];
        if ($sqlResult) {
            $sheetColumns = array_keys($sqlResult[0]);
            foreach ($sheetColumns as $key=>$sheetColumn) {
                $tableHeads[$key]["label"] = $sheetColumn;
                $tableHeads[$key]["prop"] = $sheetColumn;
            }
        }
        
        $result["tableHeads"] = $tableHeads;
        $result["tableDatas"] = $sqlResult;
        $Excel = new Excel();
        $fileName = "";
        if($templateName) {
            $fileName = $templateName."_".md5(time() . mt_rand(1, 10000)).".xlsx";
        } else {
            $fileName = "default_".md5(time() . mt_rand(1, 10000)).".xlsx";
        }
        $path = "files";
        $result["downloadurl"] = $path."/".$fileName;
        $sheetDatas = [];
        foreach ($sqlResult as $tableData) {
            array_push($sheetDatas, array_values($tableData));
        }
        $Excel->CreateExcel("告警查询", $sheetColumns, $sheetDatas, $path, $fileName);
        return ["code"=>20000, "data"=>$result, "status"=>"success", "status_code"=>200];

    }

    public function checkKPI($kpiName, $columnNames, &$wrongColumns, &$selectSql, &$sumSqlArr) {
        $pattern = "/\)\*\(|floor|\(|\)|\*\d+|\/|%|\+|\-/";
        $kpi = $this->kpiDB->select("kpiformula")->where("kpiName", "=", $kpiName)->get()->toArray();
        $tempsql = $kpi[0]["kpiformula"]." as '$kpiName',";
        $kpiCounters = preg_split($pattern, $kpi[0]["kpiformula"], null, PREG_SPLIT_NO_EMPTY);
        foreach ($kpiCounters as $kpiCounter) {
            $tempsql = str_replace($kpiCounter, "temp.".$kpiCounter, $tempsql);
            if (strpos($kpiCounter, "Max") != false) {
                array_push($sumSqlArr, "max($kpiCounter) as '$kpiCounter',");
            } else {
                array_push($sumSqlArr, "sum($kpiCounter) as '$kpiCounter',");
            }
            
            if (!in_array($kpiCounter, $columnNames)) {
                array_push($wrongColumns, $kpiCounter);
            }
        }
        $selectSql = $selectSql . $tempsql;
    }

    public function DateWhereSql($dateType, $date, $hour, &$whereSql, &$selectHeadDateSql, &$selectDateSql, &$groupSql) {
        switch($dateType) {
            case "天":
                if ($hour != null) {
                    $hourstring = implode(",", $hour);
                    $whereSql = " where date_id >='$date[0]' and date_id <='$date[1]' and hour_id in ($hourstring)";
                    $selectDateSql = " date_id as '日期',hour_id as '小时'";
                    $selectHeadDateSql = " temp.日期, temp.小时";
                    $groupSql = "日期,小时";
                } else {
                    $whereSql = " where date_id >='$date[0]' and date_id <='$date[1]' ";
                    $selectDateSql = " date_id as '日期'";
                    $selectHeadDateSql = " temp.日期";
                    $groupSql = "日期";  
                }
                break;
            case "月":
                $startMonth = date('n', strtotime("$date[0]"));
                $endMonth = date('n', strtotime("$date[1]"));
                if ($hour != null) {
                    $hourstring = implode(",", $hour);
                    $whereSql = $whereSql . " where month(date_id) >=$startMonth and month(date_id) <=$endMonth and hour_id in ($hourstring)";
                    $selectDateSql = " month(date_id) as '月份',hour_id as '小时'";
                    $selectHeadDateSql = " temp.月份, temp.小时";
                    $groupSql = "月份,小时";
                } else {
                    $whereSql = $whereSql . " where month(date_id) >=$startMonth and month(date_id) <=$endMonth ";
                    $selectDateSql = " month(date_id) as '月份'";
                    $selectHeadDateSql = " temp.月份";
                    $groupSql = "月份";
                }
                
                break;
            case "周":
                if ($hour != null) {
                    $hourstring = implode(",", $hour);
                    $whereSql = $whereSql . " where date_id >='$date[0]' and date_id <='$date[1]' and hour_id in ($hourstring)";
                    $selectDateSql = "'$date[0]到$date[1]' as '周',hour_id as '小时'";
                    $selectHeadDateSql = "temp.周, temp.小时";
                    $groupSql = "周,小时";
                }
                $whereSql = $whereSql . " where date_id >='$date[0]' and date_id <='$date[1]' ";
                $selectDateSql = " '$date[0]到$date[1]' as '周' ";
                $selectHeadDateSql = " temp.周";
                $groupSql = "周";
                break;
            default:
                if (count($hour)>0) {
                    $hourstring = implode(",", $hour);
                    $whereSql = " where date_id >=$date[0] and date_id <=$date[1] and hour_id in ($hourstring)";
                    $selectDateSql = " date_id as '日期',hour_id as '小时',";
                    $selectHeadDateSql = " temp.日期, temp.小时";
                    $groupSql = "日期,小时";
                }
                $whereSql = $whereSql . " where date_id >=$date[0] and date_id <=$date[1] ";
                $selectDateSql = " date_id as '日期'";
                $selectHeadDateSql = " temp.日期";
                $groupSql = "日期";
                break;
        }
    }

    function __construct() {
        $this->kpiDB = new configTables("PM_KPI", "pm");
        $this->tableDB = new configTables("PM_PC", "pm");
        $this->templateDB = new configTables("PM_TEMPLATE", "pm");
    }


}
