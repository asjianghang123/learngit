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
use App\Http\Controllers\ExcelSystem\Excel;
use PhpOffice\PhpSpreadsheet\IOFactory;
use Illuminate\Support\Facades\Schema;
use App\configTables;

class StationInfoController extends Controller
{
	/**
     * 从数据表中获取数据
     *
     * @return array 
     */
    public function StationInfoDatas()
    {    
        $table =       Input::get("table");
        $city =        Input::get("city");
        $stationName = Input::get("stationName");
        $eNodeBID =    Input::get("eNodeBID");
        /*if($city !='' || $stationName !='' || $eNodeBID !=''){
            $map = [['省/自治区/直辖市','like',"%".$city."%"],['小站名称','like',"%".$stationName."%"],['所属eNodeBID','like',"%".$eNodeBID."%"]];
        }else{
            $map = array();
        }*/
        // print_r($map);
        $columns = Schema::getColumnListing("小站");
        $Station = new configTables($table);
        // $tableNames = $Station->selectRaw("*")->limit(1)->get()->toArray();
        // $tableHeads = array_keys($tableNames[0]);
        // $select = "`".implode("`,`", $tableHeads)."`";
        $citys = $Station->select("省/自治区/直辖市")->distinct()->get()->toArray();
        $tableDatas = $Station->select("*")->get()->toArray();//表中数据
        $options = [];
        $result = [];
        $tableHeads = [];
        $width = intval(1920/count($columns));
        foreach ($columns as $key=>$column) {
            $tableHeads[$key]["label"] = $column;
            $tableHeads[$key]["prop"]  = $column;
            $tableHeads[$key]["width"]  = $width;
        }//表格头
        foreach ($citys as $city) {
            $options["city"][]["label"] = $city['省/自治区/直辖市'];
        }//所有城市
        // print_r($options);return;        
        $result['options'] = $options;
        $result['tableHeads'] = $tableHeads;
        $result['tableDatas'] = $tableDatas;
        unset($Station);       
        // return json_encode($result);
        return ["code"=>20000, "data"=>$result, "status"=>"success", "status_code"=>200];
    }

    /**
     * 导出数据
     * @return json
     */
    public function stationInfoExport()
    {
        $table =      Input::get("table");
        $city =       Input::get("city");
        $stationName = Input::get("stationName");
        $eNodeBID =   Input::get("eNodeBID");
        // print_r($table);
        // print_r($city);
        // print_r($stationName);
        // print_r($eNodeBID);return;
        $columns = Schema::getColumnListing("$table");

        $Station = new configTables($table);
        $map = [];
        $result = [];
        // $map = [['省/自治区/直辖市','like',"%".$city."%"],['小站名称','like',"%".$stationName."%"],['所属eNodeBID','like',"%".$eNodeBID."%"]];
        if ($city != "") {
            array_push($map, ['省/自治区/直辖市','like','%'.$city.'%']);
        }
        if ($stationName != "") {
            array_push($map, ['小站名称','like','%'.$stationName.'%']);
        }
        if ($eNodeBID != "") {
            array_push($map, ['所属eNodeBID','like','%'.$eNodeBID.'%']);
        }
        // print_r($map);return;
        $datas = $Station->select("*")->where($map)->get()->toArray();
        unset($Station);

        $Excel = new Excel();
        $path = "files";
        $fileName = "stationInfo_".date("Ymd").mt_rand(1, 10000).".xlsx";
        $result['downloadurl'] = $path."/".$fileName;//下载文件路径
        $result['downloadData'] = $datas;
        $sheetDatas = [];
        foreach ($datas as $data) {
            array_push($sheetDatas, array_values($data));
        }
        // print_r($sheetDatas);return;
        $Excel->CreateExcel("stationInfo", $columns, $sheetDatas, $path, $fileName);

        return ["code"=>20000, "data"=>$result, "status"=>"success", "status_code"=>200];
    }


    /**
     * 获取上传文件
     * @param Request $request
     *
     * @return json
     */
    public function uploadData(Request $request)
    {
        if ($request->isMethod('post')) {
            $file = $request->file();
            // print_r($file);return;
            // 获取文件名
            $files = [];
            $files = array_keys($file);
            // print_r($files);return;
            $arr = [];//读取的内容
            $columns = [];
            $newFileNames = [];
            foreach ($files as $singleFile) {
                // $i = 0;
                $fileHead = $request->file($singleFile);
                // print_r($fileHead);return;
                // 文件名
                $fileName = $fileHead->getClientOriginalName();
                // print_r($fileName);return;
                $fileStyle = explode(" ", $fileName)[0];
                // print_r($fileStyle);return;
                // 文件扩展名
                $extension = $fileHead->getClientOriginalExtension();
                // 生成新的统一格式的文件名
                $newFileName = md5($fileName . time() . mt_rand(1, 10000)) . '.' . $extension;
                $newFileNames[] = $newFileName;
                // 保存文件
                $fileHead->storePubliclyAs('', $newFileName, ['disk' => 'public']);
                // 文件保存路径
                $filePath = config("filesystems.disks.public.url") . $newFileName;
                // 读取保存文件的内容
                $arr[] = $this->readDatas($filePath, $fileStyle);
            }
            // 获取每个文件字段名
            foreach ($arr as $key=>$value) {
                $columns[$key] = $value[1];
                // 去除字段名称保留数据
                array_shift($value);
                $arr[$key] = $value;  
            }
            // print_r($arr);
            // 检查字段字段是否对应
            foreach ($columns as $column) {
                $res = $this->IsExistColumns($column);
                if($res == 1) {
                    return array("colError"=>"字段名称不能对应");
                } else {
                    $this->UpdateToDatabase($arr, $columns);
                }
            }
            return ["code"=>20000, "data"=>$filePath, "status"=>"success", "status_code"=>200];
        }
    }

    /**
     * 读取上传文件内容
     *
     * @param string $filePath 文件路径 | string $fileStyle data文件数据表类型
     * @return array
     */
    public function readDatas($filePath, $fileStyle)
    {   
        try {
            $reader = IOFactory::createReaderForFile("$filePath");
            // $reader->setReadDataOnly(true);
            $spreadsheet = $reader->load("$filePath");
        } catch (\PhpOffice\PhpSpreadsheet\Reader\Exception $e) {
            // die($e->getMessage());
            $error = $e->getMessage();
            return array('readError'=>$error);
        }
        $sheet = $spreadsheet->getActiveSheet();
        $res = array();
        foreach ($sheet->getRowIterator(1) as $row) {
            $tmp = array();
            foreach ($row->getCellIterator() as $cell) {
                $tmp[] = $cell->getFormattedValue();
            }
            $res[$row->getRowIndex()] = $tmp;
        }
        return $res;
        // print_r($res[1]);
    }

    /**
     * 判断字段是否匹配
     *
     * @param string $column 传入的数据表字段名 | string $databaseName数据表名称
     * @return int
     */
    public function IsExistColumns($column, $databaseName='小站')
    {
        $TableColumns = Schema::getColumnListing("$databaseName");       
        $flag = 0;       
        for ($i=0,$j=count($TableColumns);$i<$j;$i++) {
            if ($column[$i] != $TableColumns[$i]) {
                $flag = 1;
            }
        }
        return $flag;
    }

    /**
     * 将数据写入数据库
     *
     * @param array $datas 数据内容 | array $columns数据字段名 | string $databaseTable 数据表名称
     *
     * @return array
     */
    public function UpdateToDatabase($datas, $columns, $databaseName='小站')
    {   
        $Station = new configTables($databaseName);
        $primary = $Station->pluck('小站标识')->toArray();
        // print_r($columns);
        // print_r($datas);
        foreach ($datas as $kk => $vv) {
            // print_r($vv);         
            foreach ($vv as $kkk => $vvv) {
                if (in_array($vvv[0], $primary)) {
                    // print_r($vvv[0]);
                    $Station->where('小站标识',$vvv[0])->delete();
                }
                $insertData = array_combine($columns[0], $vvv);
                // print_r($insertData); 
                $Station->insert($insertData);               
            }
        }
        unset($Station);
    }
}