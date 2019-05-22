<?php
use Illuminate\Support\Facades\Input;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('layouts/app');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
//网管信息查询
Route::namespace('dataManagement')->group(function () {
  Route::post('uploadData', 'VGconfigController@uploadData');

  Route::get('TableDatas', 'VGconfigController@TableDatas');
});

// 基础台账信息
Route::namespace('dataManagement')->group(function() {
  Route::get('stationInfo', 'StationInfoController@StationInfoDatas');

  Route::get('stationInfoExport', 'StationInfoController@stationInfoExport');
  
  Route::post('StationUpload', 'StationInfoController@uploadData');

  Route::get('getENodeBDatas', 'ENodeBController@getENodeBDatas');

  Route::get('eNodeBExport', 'ENodeBController@eNodeBExport');
});

//参数核查
Route::namespace('dataManagement')->group(function () {
  Route::get('GetParamDatas', 'ParamCheckController@GetParamDatas');

  Route::get('ParamExport', 'ParamCheckController@ParamExport');
});





//告警查询
Route::namespace('alarm')->group(function () {
  Route::get('AlarmSelectOptions', 'AlarmQueryController@AlarmSelectOptions');

  Route::post('AlarmQuery', 'AlarmQueryController@AlarmQuery');
});
//用户组权限管理
Route::namespace('systemSecurityManagement')->group(function () {
  Route::get('MenuTree', 'MenuListController@MenuTree');

  Route::get('UserGroupTable', 'MenuListController@UserGroupTable');

  Route::get('UpdateGroupMenu', 'MenuListController@UpdateGroupMenu');

  Route::get('UserTree', 'MenuListController@UserTree');

  Route::get('UpdateUsergroup', 'MenuListController@UpdateUsergroup');

  Route::get('AddUserGroup', 'MenuListController@AddUserGroup');

  Route::get('DeleteGroup', 'MenuListController@DeleteGroup');
  
  Route::get('ExportGroup', 'MenuListController@ExportGroup');

  Route::post('uploadUsergroup', 'MenuListController@uploadUsergroup');
});

//安全策略设置
Route::namespace('systemSecurityManagement')->group(function () {

  Route::get('PasswdPolicy', 'PolicyController@PasswdPolicy');

  Route::get('PasswdPolicyChange', 'PolicyController@PasswdPolicyChange');

  Route::get('PasswdChecked', 'PolicyController@PasswdChecked');

  Route::get('AccoutPolicy', 'PolicyController@AccoutPolicy');

  Route::get('AccoutPolicyChange', 'PolicyController@AccoutPolicyChange');

  Route::get('AccoutChecked', 'PolicyController@AccoutChecked');
});

Route::namespace('performance')->group(function () {
  Route::get('ShowKPI', 'DataSearchController@ShowKPI');

  Route::get('ShowKpiType', 'DataSearchController@ShowKpiType');

  Route::get('KpiTree', 'DataSearchController@KpiTree');

  Route::get('AddTemplate', 'DataSearchController@AddTemplate');

  Route::get('GetTemplate', 'DataSearchController@GetTemplate');

  Route::get('UpdateTemplate', 'DataSearchController@UpdateTemplate');

  Route::get('DeleteTemplate', 'DataSearchController@DeleteTemplate');

  Route::get('SaveTemplate', 'DataSearchController@SaveTemplate');

  Route::get('DataQuery', 'DataSearchController@DataQuery');
});

//用户权限管理
Route::namespace('systemSecurityManagement')->group(function () {
  Route::get('getUsers', 'UserRightsManagement@getUsers');
  Route::get('deleteUsers', 'UserRightsManagement@deleteUsers');
  Route::get('addUser', 'UserRightsManagement@addUser');
  Route::get('switchUseStatus', 'UserRightsManagement@switchUseStatus');
  Route::get('resetPwd', 'UserRightsManagement@resetPwd'); 
  Route::post('uploadUser', 'UserRightsManagement@uploadUser'); 
});


// Route::post('/user/login', 'Auth\LoginController@login');
//貌似走session，vue获取不到。。。
Route::any('/captcha-test', function()
{
  $test = '';
  if (Request::getMethod() == 'POST')
  {
      $rules = ['captcha' => 'required|captcha'];
      // print_r(Input::all());
      $validator = Validator::make(Input::all(), $rules);
      // dd($validator);
      if ($validator->fails())
      {
        $test = '验证码输入错误！';
        // return view('home');
      }
      else
      {
        $test = '验证码输入正确！';
          // return view('home');
      }
  }
  // print_r(csrf_token());
  $form = '<form method="post" action="/captcha-test" name="captcha1">';
  $form .= '<input type="hidden" name="_token" value="' . csrf_token() . '">';
  // $form .= '<p>' . captcha_img() . '</p>';
  $form .= '<img src="'.captcha_src().'" style="cursor: pointer" onclick="this.src=\''.captcha_src().'\'+Math.random()">';
  $form .= '<p><input type="text" name="captcha" id="captcha"></p>';
  $form .= $test;
  $form .= '<p><button type="submit" name="check">Check</button></p>';
  $form .= '</form>';
  return $form;
});

Route::get('cp', 'Auth\LoginController@captcha');
