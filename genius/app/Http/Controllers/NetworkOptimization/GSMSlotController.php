<?php

/**
 * GSMSlotController.php
 *
 * @category NetworkOptimization
 * @package  App\Http\Controllers\NetworkOptimization
 * @author   ericsson <genius@ericsson.com>
 * @license  MIT License
 * @link     https://laravel.com/docs/5.4/controllers
 */
namespace App\Http\Controllers\NetworkOptimization;

use App\DatabaseConn;
use App\Http\Controllers\Common\DataBaseConnection;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Utils\FileUtil;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use PDO;
use Config;
use App\Models\Mongs\Task;
use App\Models\Kget\GSM_SERIAL_INFO;

/**
 * DOT查询
 * Class GSMSlotController
 *
 * @category NetworkOptimization
 * @package  App\Http\Controllers\NetworkOptimization
 * @author   ericsson <genius@ericsson.com>
 * @license  MIT License
 * @link     https://laravel.com/docs/5.4/controllers
 */
class GSMSlotController extends Controller
{
    /**
     * 获得KGET任务列表
     *
     * @return string
     * KGET任务列表(JSON)
     */
    public function getData()
    {
        $user = Auth::user();//获取登录用户信息
        $userName = $user->user;
        $tasks = Task::where('type', 'parameter')->where('status', 'complete')->where('taskName', 'like', 'kget______');
        if ($userName != 'admin') {
            $tasks = $tasks->whereIn('owner', [$userName,'admin']);
        }
        $tasks = $tasks->orderBy('taskName', 'desc')->get()->toArray();
        $items = array();
        foreach ($tasks as $task) {
            $items[] = array("text"=>$task['taskName'],"id"=>$task['taskName']);
        }
        return json_encode($items);//需要通过response返回响应数据

    }
    /**
     *
     *@return array
     */
    public function getCityList()
    {
        $dbc = new DataBaseConnection();
        return $dbc->getCityOptions();
    }//end getCityList()
    /**
     * 获得表头
     *
     * @return array
     */
    public function getGSMSlotDataHeader()
    {
        $dbname = Input::get('dataBase');
        $dbname = $this->check_input($dbname);
        Config::set("database.connections.kget.database", $dbname);
        $dbc = new DataBaseConnection();
        $citys = Input::get('citys');
        $subNetworkIsNull = '';
        //获取数据开始
        $subNetwork = '';
        $subNetworkArr = [];
      
        $result = array();

        $conn = GSM_SERIAL_INFO::selectRaw('*');
        if ($conn->exists()) {
          
            if ($citys) {
                $cityStr = '';
                foreach ($citys as $value) {
                    $cityStr .= "'".$value."',";
                }
                $cityStr = substr($cityStr, 0, -1);
                $conn = $conn->whereIn('city', $citys);
            } 

            if ($conn->exists()) {
                return $conn->first()->toArray();
            } else {
                $result['error'] = 'error';
            }
        } else {
            $result['error'] = 'error';
        }
        return $result;
    }
    function check_input($value)
    {
        //去除斜杠
        if (get_magic_quotes_gpc()) {
            $value=stripslashes($value);
        }
        return $value;
    }
    /**
     * 获得GSMSlot统计结果(分页)
     *
     * @return string
     */
    public function getGSMSlotData()
    {
        $page = isset($_REQUEST['page']) ? intval($_REQUEST['page']) : 1;
        $limit = isset($_REQUEST['limit']) ? intval($_REQUEST['limit']) : 50;
        $dbname = Input::get('dataBase');
        $dbname = $this->check_input($dbname);
        Config::set("database.connections.kget.database", $dbname);
        $result = array();
        $dbc = new DataBaseConnection();
        $citys = Input::get('citys');
        $subNetworkIsNull = '';
        $subNetwork = '';
        $subNetworkArr = [];
     
        $conn = GSM_SERIAL_INFO::selectRaw('*');
        if ($conn->exists()) {
            if ($citys) {
                $cityStr = '';
                    foreach ($citys as $value) {
                    $cityStr .= "'".$value."',";
                }
                $cityStr = substr($cityStr, 0, -1);
                $conn = $conn->whereIn('city', $citys);
            } 
            if ($conn->count()>0) {
                $rows = $conn->paginate($limit)->toArray();
                $result['total'] = $rows['total'];
                $result['records'] = $rows['data'];
            } else {
                $result['total'] = 0;
                $result['records'] = [];
            }
        } else {
            $result['total'] = 0;
            $result['records'] = [];
        }

        return json_encode($result);

    }
    public function getAllGSMSlotData()
    {
        $dbname = Input::get('dataBase');
        $dbname = $this->check_input($dbname);
        Config::set("database.connections.kget.database", $dbname);
        $dbc = new DataBaseConnection();
        $citys = Input::get('citys');
        $subNetworkIsNull = '';  
        $subNetwork = '';
        $subNetworkArr = [];
       
        $result = array();
        $conn = GSM_SERIAL_INFO::selectRaw('*');
        if ($conn->exists()) {
            if ($citys) {
                $cityStr = '';
                foreach ($citys as $value) {
                    $cityStr .= "'".$value."',";
                }
                $cityStr = substr($cityStr, 0, -1);
                $conn = $conn->whereIn('city', $citys);
            } 
            $totalCount = $conn->count();
            if ($totalCount>0) {
                $fileName = "files/" . $dbname . "_GSM板卡串号统计_" . date('YmdHis') . ".csv";
                $rows = $conn->get()->toArray();

                $fp = fopen($fileName, "w");
                $column = implode(",", array_keys($rows[0]));
                $csvContent = mb_convert_encoding($column . "\n", 'GBK');
                fwrite($fp, $csvContent);
                foreach ($rows as $row) {
                    $newRow = array();
                    foreach ($row as $key => $value) {
                        $newRow[$key] = mb_convert_encoding($value, 'GBK');
                    }
                    fputcsv($fp, $newRow);
                }
                fclose($fp);

                $result['fileName'] = $fileName;
                $result['result'] = true;
            } else {
                $result['result'] = false;
            }
        } else {
            $result['result'] = false;
        }
        return $result;
    }// getAllGSMSlotData()

}