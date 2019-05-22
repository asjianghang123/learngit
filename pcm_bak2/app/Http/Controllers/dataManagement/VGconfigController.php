<?php

namespace App\Http\Controllers\dataManagement;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\DB;
use PDO;
use config;
use Storage;
use App\Http\Requests;
use Illuminate\Http\Request;
use App\configTables;

class VGconfigController extends Controller
{   
    /**
     * 上传data文件
     *
     * @param Requset $requset 请求
     *
     * @return string
     */
    public function uploadData(Request $request)
    {   
        $file = $request->file();
        $filesarr = array_keys($file);//批量传递文件名
        $tablesNames = [];
        $tablesAll = [];
        foreach ($filesarr as $singleFile) {
            $fileHead = $request->file($singleFile);
            $fileName = $fileHead->getClientOriginalName();
            $fileStyle = explode(" ", $fileName)[0];
            $extension = $fileHead->getClientOriginalExtension();
            $newFileName = md5($fileName . time() . mt_rand(1, 10000)) . '.' . $extension;//随机生成上传的文件名
            $fileHead->storePubliclyAs('', $newFileName, ['disk' => 'public']);
            $filePath = config("filesystems.disks.public.url") . $newFileName;//生成文件路径
            $arr = $this->ReadDatas($filePath, $fileStyle);
            array_push($tablesNames, $arr["tableName"]);
            array_push($tablesAll, $arr);
        }
        foreach ($tablesNames as $tablesName) {
            $dataTable = new configTables($tablesName);
            $dataTable->truncate();
            unset($dataTable);
        }//清空原数据表
        foreach ($tablesAll as $singleTable) {
            $res = $this->IsExistColumns($singleTable["tableFields"], $singleTable["tableName"]);
            if ($res == 1) {
                return array("error"=>"字段名称不能对应");
            }
            $this->UpdateToDatabase($singleTable["tableFields"], $singleTable["tableDatas"], $singleTable["tableName"]);
        }
        $db = DB::connection("param")->getPdo();
        $db->query("call hz()");
        $db->query("call tj()");//调用存储过程
        unset($db);
        
        return ["code"=>20000, "data"=>$newFileName, "status"=>"success", "status_code"=>200];

    }
    /**
     * 读取data文件内容
     *
     * @param string $filePath 文件路径 | string $fileStyle data文件数据表类型
     *
     * @return array
     */
    public function ReadDatas($filePath, $fileStyle)
    {   
        $file = fopen($filePath, "r") or die("Unable to open file!");
        $str = fread($file, filesize($filePath));
        $datas = explode("\r\n", $str);
        $tablestr = $datas[11];
        $columnstr = $datas[12] . " " . $datas[13];
        $str = substr($str, strpos($str, $datas[13])+strlen($datas[13]));
        $str = str_replace("\r\n", "", $str);
        $pattern = "/\s+/";
        $tableName = substr($tablestr, strpos($tablestr, "Name=")+5);
        $tableName = str_replace("`", "", $tableName);
        $tableDatas = preg_split($pattern, $str);
        $tables = str_replace("#", "", $columnstr);
        $pattern = "/\d+=/";
        preg_match_all($pattern, $tables, $matchs);
        $match = preg_split($pattern, $tables);
        $fields = [];
        $pattern = "/`[\s\S]*`/";
        foreach ($match as $value) {
            if ($value !="") {
                preg_match($pattern, $value, $matchTable);
                $fields[] = str_replace("`", "", $matchTable[0]);//表字段名称
            }
        }
        $arr = [];
        $i = 0;
        foreach ($tableDatas as $key=>$tableData) {
            foreach ($matchs[0] as $id) {
                if (strpos($tableData, $id) !== false) {
                    
                    $arr[intval($key/count($fields))][$id] = $tableData;
                }
            }
        }
        $newDatas = [];
        foreach ($arr as $num=>$value) {
            $i = 0;
            foreach ($value as $key=>$data) {
                $newDatas[$num][$i] = str_replace($key, "", str_replace("`", "", $data));//表中数据集
                $i++;
            }
            $i = 0;
        }
        $newTableDatas = [];
        if ($tableName == "虚拟网关配置表") {
            array_push($fields, "网关ID-支持位置跟踪区集");
            foreach ($newDatas as $newData) {
                $newData[count($newData)] = $fileStyle . "-" .$newData[1];
                array_push($newTableDatas, $newData);
            }
        } else if ($tableName == "位置跟踪区表") {
            foreach ($newDatas as $newData) {
                $newData[count($newData)] = $fileStyle . "-" .$newData[0];
                array_push($newTableDatas, $newData);
            }
            array_push($fields, "网关-位置跟踪区集");    
        }//根据表中数据生成字段
        // file_put_contents("test", print_r($newTableDatas, true));
        return array("tableFields"=>$fields, "tableDatas"=>$newTableDatas, "tableName"=>$tableName);
        
    }


    /**
     * 将数据写入数据库
     *
     * @param string $tables 数据表字段名 | array $datas 数据内容 | string $databaseTable 数据表名称
     *
     * @return array
     */
    public function UpdateToDatabase($tables, $datas, $databaseTable)
    {	
    	$dataTable = new configTables($databaseTable);
    	$newdDatas = [];
    	$i = 0;
    	foreach ($datas as $data) {
    		foreach ($data as $key=>$value) {
    			$newdDatas[$i][$tables[$key]] = $value;
    		}
    		$i++;
    	}
        for ($j=0;$j<count($newdDatas);$j++) {
            if (implode("", $newdDatas[$j]) != "") {
                $dataTable->insert($newdDatas[$j]);//插入数据 
            }
        }
        unset($dataTable);
    	
    }


    /**
     * 判断字段是否匹配
     *
     * @param string $tables 数据表字段名 | string $databaseTable 数据表名称
     *
     * @return int
     */
    public function IsExistColumns($tables, $databaseTable)
    {   
        $columnsTable = new configTables("COLUMNS", "information_schema");
        $columns = $columnsTable->select("COLUMN_NAME")->where("table_name", "=", $databaseTable)->get()->toArray();
        $flag = 0;
        for ($i=0,$j=count($tables);$i<$j;$i++) {
            if ($columns[$i+1]["COLUMN_NAME"] != $tables[$i]) {
                $flag = 1;
            }
        }
        return $flag;
    }

    /**
     * 从数据表中读取数据
     *
     * @return void 
     */
    public function TableDatas()
    {
        $table = Input::get("table");
        $dataTable = new configTables($table);
        $tableNames = $dataTable->selectRaw("*")->limit(1)->get()->toArray();
        $tableHeads = array_keys($tableNames[0]);
        $select = "`".implode("`,`", $tableHeads)."`";
        $datas = $dataTable->selectRaw($select)->get()->toArray();//表中数据
        $arr = [];
        $i = 0;
        foreach ($tableHeads as $tableHead) {
            $arr[$i]["label"] = $tableHead;
            $arr[$i]["prop"] = $tableHead;
            $arr[$i]["width"] = "75";
            $i++;
        }//表头
        unset($dataTable);
        $result = [];
        $result["tableHeads"] = $arr;
        $result["tableDatas"] = $datas;
        return ["code"=>20000, "data"=>$result, "status"=>"success", "status_code"=>200];
        
    }

}
