<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

use Illuminate\Support\Facades\Crypt;

use Illuminate\Http\Request;

use Validator;

use App\Http\Proxy\TokenProxy;

// use Illuminate\Support\Str;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    protected $proxy;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(TokenProxy $proxy)
    {
        $this->middleware('guest')->except('logout');
        $this->proxy = $proxy;
    }

    public function login(Request $request)
    {
        if (!captcha_api_check($request->captcha, $request->key)){
            return response()->json(['status_code' => 400, 'message' => '验证码不匹配' ]);
        }
        // dd(request('password'));
        // print_r($request->session()->all());
        return $this->proxy->login(request('email'), request('password'));
       
        // $this->validate($request, [
        //     $this->username() => 'required|string',
        //     'password' => 'required|string',
        //     'captcha' => 'required|captcha',
        // ],[
        //     'captcha.required' => '请填写验证码',
        //     'captcha.captcha' => '验证码错误',
        // ]);
       
        /*$email = request('email');
        $password = request('password');
        if ( auth()->attempt(['email'=> $email, 'password'=> $password])){
            return response()->json([
                'success' => 'true',
                'code'=> 20000,
                'data'=>'ceshi'
            ]);
        }
        return response()->json([
            'status' => 'login error',
            'status_code' => 421,
            'message' => 'Credentials not match'
        ],421);*/
    }

    // protected function validateLogin(Request $request){
    //     $this->validate($request, [
    //         $this->username() => 'required|string',
    //         'password' => 'required|string',
    //         'captcha' => 'required|captcha',
    //     ],[
    //         'captcha.required' => '请填写验证码',
    //         'captcha.captcha' => '验证码错误',
    //     ]);
    // }
    public function captcha() {
        return response()->json([
           'status_code' => '200',
           'message' => 'created succeed',
           'url' => app('captcha')->create('default', true)
        ]);
    }

    /**
     * @api {post} /api/logout 注销用户登陆
     * @apiGroup login
     *
     *
     * @apiSuccessExample 注销成功
     * HTTP/1.1 200 OK
     * {
     * "status": "success",
     * "status_code": 200,
     * "message": "logout success"
     * }
     *
     */
    public function logout(Request $request)
    {
        // dd($request->user()->email);
        return $this->proxy->logout($request);
    }
}
