<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
   <!--  <script>
            const test = '<img src="{{captcha_src()}}" style="cursor: pointer" onclick="this.src=\'{{captcha_src()}}\'+Math.random()">';
        </script> -->
</head>
<body>
    <div id="app">
        <!-- <div class="form-group">
          <label for="captcha" class="col-md-4 control-label">验证码</label>
              <div class="form-group">
                  <div class="col-md-3">
                      <input id="captcha"  class="form-control" type="captcha" name="captcha" value="{{ old('captcha')  }}" required>
                      @if($errors->has('captcha'))
                          <div class="col-md-12">
                              <p class="text-danger text-left"><strong>{{$errors->first('captcha')}}</strong></p>
                          </div>
                      @endif
                  </div>
                  <div class="col-md-4">
                      <img src="{{captcha_src()}}" style="cursor: pointer" onclick="this.src='{{captcha_src()}}'+Math.random()">
                  </div>
              </div>
          </div>
 -->
        
        <router-view name="login"></router-view>
        <router-view name="layout"></router-view>
        <router-view name="VG"></router-view>
        <!-- <example-component></example-component> -->
        <!-- <nav class="navbar navbar-expand-md navbar-light navbar-laravel">
            <div class="container">
                <a class="navbar-brand" href="{{ url('/') }}">
                    {{ config('app.name', 'Laravel') }}
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    Left Side Of Navbar
                    <ul class="navbar-nav mr-auto">

                    </ul>

                    Right Side Of Navbar
                    <ul class="navbar-nav ml-auto">
                        Authentication Links
                        @guest
                            <li class="nav-item">
                                <a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a>
                            </li>
                            @if (Route::has('register'))
                                <li class="nav-item">
                                    <a class="nav-link" href="{{ route('register') }}">{{ __('Register') }}</a>
                                </li>
                            @endif
                        @else
                            <li class="nav-item dropdown">
                                <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                    {{ Auth::user()->name }} <span class="caret"></span>
                                </a>

                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <a class="dropdown-item" href="{{ route('logout') }}"
                                       onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                        {{ __('Logout') }}
                                    </a>

                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                        @csrf
                                    </form>
                                </div>
                            </li>
                        @endguest
                    </ul>
                </div>
            </div>
        </nav> 

        <main class="py-4">
            @yield('content')
        </main> -->
    </div>
</body>
<style type="text/css">
    body {
        background-color: #f4f4f4;
    }
</style>
</html>
