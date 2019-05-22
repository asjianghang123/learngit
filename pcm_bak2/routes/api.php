<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::middleware('auth:api')->get('/user', 'UserController@getUserInfo')->name('admin.userInfo');
// Route::middleware('auth:api')->get('/user', function (Request $request) {
//   print_r($request->user());
//     // return $request->user();
// });

// Route::get('/user', 'UserController@getUserInfo')->name('admin.userInfo');
Route::post('/logout', 'Auth\LoginController@logout')->name('login.logout');
// Route::middleware('auth:api')->post('/login', 'Auth\LoginController@login')->name('login.login');
// Route::middleware('web')->post('/login', 'Auth\LoginController@login')->name('login.login');
Route::post('/login', 'Auth\LoginController@login')->name('login.login');