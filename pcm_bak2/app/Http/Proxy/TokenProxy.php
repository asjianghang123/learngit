<?php
namespace App\Http\Proxy;

use Illuminate\Support\Facades\Auth;
use App\User;

use Illuminate\Support\Str;

use Illuminate\Http\Request;

class TokenProxy 
{
  // protected $http;

  protected $proxy;
  protected $token;
  // public function __construct(\GuzzleHttp\Client $http)
  // {
  //     $this->http = $http;
  // }

  public function proxy($grantType, array $data = []) {
    // $data     = array_merge($data, ['client_id'     => '123',//env('PASSPORT_CLIENT_ID'),
    //                                 'client_secret' => '345',//env('PASSPORT_CLIENT_SECRET'),
    //                                 'grant_type'    => $grantType
    // ]);
    // $website = $_SERVER['HTTP_HOST'];
    // $response = $this->http->post('http://' . $website . '/oauth/token', ['form_params' => $data
    // ]);
    // $token = json_decode((string)$response->getBody(), true);
    // dd($token);
    return response()->json(['token'      => $this->token,//Str::random(60),//Auth::user()->api_token,//$token['access_token'],
                             'expires_in' => '345',//$token['expires_in'],
                             'status' => 'success',
                             'code' => 20000,
                             'success'=> true,
                             'data'=>'',
                             'status_code' => 200
    ])->cookie('refreshToken', '567'/*$token['refresh_token']*/, 14400, null, null, false, true);
  }

  public function login($email, $password) {

    $key = getenv('ENV_KEY');
    $iv = getenv('ENV_IV');
    $decrypted = openssl_decrypt($password, 'aes-128-cbc', $key, OPENSSL_ZERO_PADDING, $iv);
    $decrypted = json_decode(trim($decrypted),true);    
    // dd(hash::make('lijian123'));
    // dd($decrypted['pwd']);
    // return $this->sendLoginResponse($request, $user);
    /*if ( auth()->attempt(['email'=> $email, 'password'=> $password])){
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
    if (auth()->attempt(['email'=> $email, 'password'=> $decrypted['password']])){

      $user = User::where('email', $email)->first();
      $token = Str::random(60);
      $this->token = hash('sha256', $token);//uniqid($user->id);
      $user->api_token = $this->token;
      $user->save();
      /*return \Response::make([
          'user' => $user,
          'token' => $user->api_token,
          'code' => 20000,
          'success'=> true,
      ]);*/
      // event(new UserLogin());
      return $this->proxy('password', [
        'username' => $email,
        'password' => $decrypted,
        'scope' => '',
      ]);
    }
    return response()->json([
      'status' => 'login error',
      'status_code' => 421,
      'message' => 'Credentials not match'
    ],421);
  }

  public function logout($request)
  {
    // request()->cookie('gg_token')
      // $user = auth()->guard('api')->user();
    // dd(Auth::user());
      // $accessToken = $user->token();
      // app('db')->table('oauth_refresh_tokens')
      //                  ->where('access_token_id', $accessToken->id)
      //                  ->update([
      //                      'revoked' => true
      //                  ]);
      app('cookie')->forget('refreshToken');
      // dd(Auth::user());
      $user = User::where('api_token', $request->header('Api-Token'))->first();
      // $token = Str::random(60);
      $this->token = '';//hash('sha256', $token);
      // $this->token = uniqid($user->id);
      $user->api_token = $this->token;
      $user->save();
      // $accessToken->revoke();
//       $log = new LogLogin();
//        $log->saveLogoutLog($user);
     // event(new UserLogout($user));
//        event(new UserLogout($user));
      return response()->json([
          'status' => 'success',
          'status_code' => 200,
          'code' => 20000,
          'message' => 'logout success'
          ]
      ,200);
  }
}