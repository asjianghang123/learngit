<?php

namespace App\Http\Controllers\systemSecurityManagement;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Models\Pcm_user\Pcm_i_user;

use Illuminate\Support\Facades\Hash;
use Storage;

// require 'vendor/autoload.php';
use PhpOffice\PhpSpreadsheet\Cell\Coordinate;
use PhpOffice\PhpSpreadsheet\IOFactory;
// use PhpOffice\PhpSpreadsheet\Spreadsheet;
// use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class UserRightsManagement extends Controller
{
  public function getUsers() {
    return response()->json(Pcm_i_user::get()->toArray());
  }

  public function deleteUsers(Request $request) {
    $delete = Pcm_i_user::whereIn('email', $request->get('usersId'))->delete();
    if ( !$delete ) {
      return response()->json(array('status'=>'false'));
    }
    return response()->json(array('status'=>'true'));
  }

  public function addUser(Request $request) {
    $city = $request->get('city');
    $contactPhone = $request->get('contactPhone');
    $county = $request->get('county');
    $department = $request->get('department');
    $email = $request->get('email');
    $idCard = $request->get('idCard');
    $name = $request->get('name');
    // $password = hash::make($request->get('password'));
    $key = getenv('ENV_KEY');
    $iv = getenv('ENV_IV');
    $decrypted = openssl_decrypt($request->get('password'), 'aes-128-cbc', $key, OPENSSL_ZERO_PADDING, $iv);
    $decrypted = json_decode(trim($decrypted),true); 
    $password = hash::make($decrypted['password']);
    
    $passwordValidDays = $request->get('passwordValidDays');
    $role = $request->get('role');
    $unit = $request->get('unit');
    $userClassification = $request->get('userClassification');
    $username = $request->get('username');

    if( Pcm_i_user::where('email', $email)->count() != 0 ) {
        return response()->json(array('status'=>'email必须唯一,添加失败!'));
    }
    if( Pcm_i_user::where('name', $name)->count() != 0 ) {
        return response()->json(array('status'=>'用户名必须唯一,添加失败!'));
    }

    $pcmIUser = new Pcm_i_user;
    $pcmIUser->city = $city;
    $pcmIUser->contactPhone = $contactPhone;
    $pcmIUser->county = $county;
    $pcmIUser->department = $department;
    $pcmIUser->email = $email;
    $pcmIUser->idCard = $idCard;
    $pcmIUser->name = $name;
    $pcmIUser->password = $password;
    $pcmIUser->passwordValidDays = $passwordValidDays;
    $pcmIUser->role = $role;
    $pcmIUser->unit = $unit;
    $pcmIUser->userClassification = $userClassification;
    $pcmIUser->username = $username;
    $pcmIUser->maximumNumberOfOnline = 0;
    $pcmIUser->status = 'off';
    $save = $pcmIUser->save();
    if(!$save) {
      return response()->json(array('status'=>'false'));
    }
    return response()->json(array('status'=>'true'));
  }

  public function switchUseStatus(Request $request) {
    $email = $request->get('email');
    $useStatus = $request->get('useStatus');
    $pcmIUser = Pcm_i_user::where('email', $email)->get()->toArray()[0];
    if( $pcmIUser['useStatus'] === 'on' ) {
        $pcmIUser['useStatus'] = 'off';
    }else {
        $pcmIUser['useStatus'] = 'on';
    }
    $pcmIUser = Pcm_i_user::where('email', $email)->update(['useStatus'=> $pcmIUser['useStatus']]);
    if(!$pcmIUser) {
      return response()->json(array('status'=>'false'));
    }
    return response()->json(array('status'=>'true'));
  }

  public function resetPwd(Request $request) {
    $email = $request->get('email');
    // dd($request->get('password'));
    $key = getenv('ENV_KEY');
    $iv = getenv('ENV_IV');
    $decrypted = openssl_decrypt($request->get('password'), 'aes-128-cbc', $key, OPENSSL_ZERO_PADDING, $iv);
    $decrypted = json_decode(trim($decrypted),true); 

    $password = hash::make($decrypted['password']);
    $save = Pcm_i_user::where('email', $email)->update(['password'=> $password]);
    if(!$save) {
      return response()->json(array('status'=>'false'));
    }
    return response()->json(array('status'=>'true'));
  }

  private function readArrFromExcel($route) {
    $whatTable = 0;
    $filename = storage_path('/app/').$route;
    $inputFileType = \PhpOffice\PhpSpreadsheet\IOFactory::identify($filename); 
    $reader = \PhpOffice\PhpSpreadsheet\IOFactory::createReader($inputFileType);
    // $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($route);
    $spreadsheet = $reader->load($filename);  //将文件读取到到$spreadsheet对象中
    $worksheet = $spreadsheet->getActiveSheet();   //获取当前文件内容
    $sheetAllCount = $spreadsheet->getSheetCount(); // 工作表总数
    for ($index = 0; $index < $sheetAllCount; $index++) {   //工作表标题
        $title[] = $spreadsheet->getSheet($index)->getTitle();
    }

    $sheet = $spreadsheet->getSheet($whatTable); // 读取第一個工作表

    $highest_row = $sheet->getHighestRow(); // 取得总行数

    $highest_column = $sheet->getHighestColumn(); ///取得列数  字母abc...
    //
    $highestColumnIndex = Coordinate::columnIndexFromString($highest_column);  //转化为数字;
    for ($i = 1; $i <= $highestColumnIndex; $i++) {
        for ($j = 1; $j <= $highest_row; $j++) {

//                $conent = $sheet->getCellByColumnAndRow($i, $j)->getValue();
            $conent = $sheet->getCellByColumnAndRow($i, $j)->getCalculatedValue();

            $info[$j][$i] = $conent;
        }
    }
    return $info;
  }

  public function uploadUser(Request $request) {

    $route = $request->file('file')->store('UserRightsManagement');
    $arr = $this->readArrFromExcel($route);
    $length = count($arr[1]);
    
    if( $length !== 15 ) {
        response()->json(array('status'=>'上传文件列数错误!'));
    }else {
        foreach ($arr as $key => $value) {
            if( $key === 1 ) continue;
            //暂未验证数据合法性
            if( Pcm_i_user::where( 'email', $value[4] )->count() !== 0 ) continue;
            $pcmIUser = new Pcm_i_user;
            $pcmIUser->city = $value[1];
            $pcmIUser->county = $value[2];
            $pcmIUser->name = $value[3];
            $pcmIUser->email = $value[4];
            $pcmIUser->password = hash::make($value[5]);
            $pcmIUser->unit = $value[6];
            $pcmIUser->department = $value[7];
            $pcmIUser->userClassification = $value[8];
            $pcmIUser->username = $value[9];
            $pcmIUser->idCard = $value[10];
            $pcmIUser->contactPhone = $value[11];
            $pcmIUser->role = $value[12];
            $pcmIUser->passwordValidDays = $value[13];
            $pcmIUser->status = $value[14];
            $pcmIUser->useStatus = $value[15];  
            $test = $pcmIUser->save();
            if( !$test ) {
                return response()->json(array('status'=>'上传失败，请重新上传!'));
            }
        }
        return response()->json(array('status'=>'true'));
    }
  }
}
