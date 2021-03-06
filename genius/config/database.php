<?php

return [

    /*
    |--------------------------------------------------------------------------
    | PDO Fetch Style
    |--------------------------------------------------------------------------
    |
    | By default, database results will be returned as instances of the PHP
    | stdClass object; however, you may desire to retrieve records in an
    | array format for simplicity. Here you can tweak the fetch style.
    |
    */

    'fetch' => PDO::FETCH_CLASS,

    /*
    |--------------------------------------------------------------------------
    | Default Database Connection Name
    |--------------------------------------------------------------------------
    |
    | Here you may specify which of the database connections below you wish
    | to use as your default connection for all database work. Of course
    | you may use many connections at once using the Database library.
    |
    */

    'default' => env('DB_CONNECTION', 'mysql'),

    /*
    |--------------------------------------------------------------------------
    | Database Connections
    |--------------------------------------------------------------------------
    |
    | Here are each of the database connections setup for your application.
    | Of course, examples of configuring each database platform that is
    | supported by Laravel is shown below to make development simple.
    |
    |
    | All database work in Laravel is done through the PHP PDO facilities
    | so make sure you have the driver for your particular database of
    | choice installed on your machine before you begin development.
    |
    */

    'connections' => [

        'sqlite' => [
            'driver' => 'sqlite',
            'database' => env('DB_DATABASE', database_path('database.sqlite')),
            'prefix' => '',
        ],

        'mysql' => [
            'driver' => 'mysql',
            'host' => env('DB_HOST', '10.39.148.187'),
            'port' => env('DB_PORT', '3306'),
            'database' => env('DB_DATABASE', 'forge'),
            'username' => env('DB_USERNAME', 'forge'),
            'password' => env('DB_PASSWORD', ''),
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
            'strict' => false,
            'engine' => null,
        ],

        'autokpi' => [
            'driver' => 'mysql',
            'host' => env('DB_HOST', '10.39.148.187'),
//            'host' => '7.140.28.88',
            'port' => env('DB_PORT', '3306'),
//            'port' => '33063',
            'database' => 'AutoKPI',
            'username' => env('DB_USERNAME', 'root'),
            'password' => env('DB_PASSWORD', 'mongs'),
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
            'strict' => false,
            'engine' => null,
        ],

        'nbi' => [
            'driver' => 'mysql',
            'host' => env('DB_HOST', '10.39.148.187'),
//            'host' => '7.140.28.88',
            'port' => env('DB_PORT', '3306'),
//            'port' => '33063',
            'database' => 'nbi',
            'username' => env('DB_USERNAME', 'root'),
            'password' => env('DB_PASSWORD', 'mongs'),
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
            'strict' => false,
            'engine' => null,
        ],

        'nbm' => [
            'driver' => 'mysql',
            'host' => env('DB_HOST', '10.39.148.187'),
//            'host' => '7.140.28.88',
            'port' => env('DB_PORT', '3306'),
//            'port' => '33063',
            'database' => 'nbm',
            'username' => env('DB_USERNAME', 'root'),
            'password' => env('DB_PASSWORD', 'mongs'),
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
            'strict' => false,
            'engine' => null,
        ],

        'NBI' => [
            'driver' => 'mysql',
            'host' => '10.39.148.187',
            'port' => '3306',
            'database' => 'nbi',
            'username' => 'root',
            'password' => 'mongs',
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
            'strict' => false,
            'engine' => null,
        ],

        'alarm' => [
            'driver' => 'mysql',
            'host' => env('DB_HOST', '10.39.148.187'),
//            'host' => '7.140.28.88',
            'port' => env('DB_PORT', '3306'),
//            'port' => '33063',
            'database' => 'Alarm',
            'username' => env('DB_USERNAME', 'root'),
            'password' => env('DB_PASSWORD', 'mongs'),
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
            'strict' => false,
            'engine' => null,
        ],
        'alarm_2G' => [
            'driver' => 'mysql',
            'host' => env('DB_HOST', '10.39.148.187'),
//            'host' => '7.140.28.88',
            'port' => env('DB_PORT', '3306'),
//            'port' => '33063',
            'database' => 'Alarm_2G',
            'username' => env('DB_USERNAME', 'root'),
            'password' => env('DB_PASSWORD', 'mongs'),
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
            'strict' => false,
            'engine' => null,
        ],
        
        'mongs' => [
            'driver' => 'mysql',
            'host' => env('DB_HOST', '10.39.148.187'),
//            'host' => '7.140.28.88',
            'port' => env('DB_PORT', '3306'),
//            'port' => '33063',
            'database' => 'mongs',
            'username' => env('DB_USERNAME', 'root'),
            'password' => env('DB_PASSWORD', 'mongs'),
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
            'strict' => false,
            'engine' => null,
        ],

        'William' => [
            'driver' => 'mysql',
            'host' => env('DB_HOST', '10.39.148.186'),
//            'host' => '7.140.28.88',
            'port' => env('DB_PORT', '3306'),
//            'port' => '33063',
            'database' => 'william',
            'username' => env('DB_USERNAME', 'root'),
            'password' => env('DB_PASSWORD', 'mongs'),
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
            'strict' => false,
            'engine' => null,
        ],
        'wk_app' => [
            'driver' => 'mysql',
            'host' => env('DB_HOST', '10.39.148.186'),
            'port' => env('DB_PORT', '3306'),
            'database' => 'wk_app',
            'username' => env('DB_USERNAME', 'root'),
            'password' => env('DB_PASSWORD', 'mongs'),
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
            'strict' => false,
            'engine' => null,
        ],

        'information_schema' => [
            'driver' => 'mysql',
            'host' => env('DB_HOST', '10.39.148.187'),
//            'host' => '7.140.28.88',
            'port' => env('DB_PORT', '3306'),
//            'port' => '33063',
            'database' => 'information_schema',
            'username' => env('DB_USERNAME', 'root'),
            'password' => env('DB_PASSWORD', 'mongs'),
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
            'strict' => false,
            'engine' => null,
        ],
        'kget' => [
            'driver' => 'mysql',
            'host' => env('DB_HOST', '10.39.148.187'),
//            'host' => '7.140.28.88',
            'port' => env('DB_PORT', '3306'),
//            'port' => '33063',
            'database' => 'mongs',
            'username' => env('DB_USERNAME', 'root'),
            'password' => env('DB_PASSWORD', 'mongs'),
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
            'strict' => false,
            'engine' => null,
        ],
        'kgetpart' => [
            'driver' => 'mysql',
            'host' => env('DB_HOST', '10.39.148.187'),
//            'host' => '7.140.28.88',
            'port' => env('DB_PORT', '3306'),
//            'port' => '33063',
            'database' => 'mongs',
            'username' => env('DB_USERNAME', 'root'),
            'password' => env('DB_PASSWORD', 'mongs'),
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
            'strict' => false,
            'engine' => null,
        ],
        'bulkcm' => [
            'driver' => 'mysql',
            'host' => env('DB_HOST', '10.39.148.187'),
//            'host' => '7.140.28.88',
            'port' => env('DB_PORT', '3306'),
//            'port' => '33063',
            'database' => 'mongs',
            'username' => env('DB_USERNAME', 'root'),
            'password' => env('DB_PASSWORD', 'mongs'),
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
            'strict' => false,
            'engine' => null,
        ],
        'UeCapability' => [
            'driver' => 'mysql',
            'host' => env('DB_HOST', '10.39.148.187'),
//            'host' => '7.140.28.88',
            'port' => env('DB_PORT', '3306'),
//            'port' => '33063',
            'database' => 'UECapability',
            'username' => env('DB_USERNAME', 'root'),
            'password' => env('DB_PASSWORD', 'mongs'),
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
            'strict' => false,
            'engine' => null,
        ],
        'pgsql' => [
            'driver' => 'pgsql',
            'host' => env('DB_HOST', '10.39.148.187'),
            'port' => env('DB_PORT', '5432'),
            'database' => env('DB_DATABASE', 'forge'),
            'username' => env('DB_USERNAME', 'forge'),
            'password' => env('DB_PASSWORD', ''),
            'charset' => 'utf8',
            'prefix' => '',
            'schema' => 'public',
        ],

        'MR' => [
            'driver' => 'mysql',
            'host' => '10.40.57.134',
            'port' => '8066',
            'database' => '',
            'username' => 'mr',
            'password' => 'mr',
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
            'strict' => false,
            'engine' => null,
            'options' =>[PDO::ATTR_EMULATE_PREPARES => true]
        ],
        'MR_CZ' => [
            'driver' => 'mysql',
            'host' => '10.40.57.134',
            'port' => '8066',
            'database' => 'MR_CZ',
            'username' => 'mr',
            'password' => 'mr',
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
            'strict' => false,
            'engine' => null,
            'options' =>[PDO::ATTR_EMULATE_PREPARES => true]
        ],
        'MR_NT' => [
            'driver' => 'mysql',
            'host' => '10.40.57.134',
            'port' => '8066',
            'database' => 'MR_NT',
            'username' => 'mr',
            'password' => 'mr',
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
            'strict' => false,
            'engine' => null,
            'options' =>[PDO::ATTR_EMULATE_PREPARES => true]
        ],
        'MR_SZ' => [
            'driver' => 'mysql',
            'host' => '10.40.57.134',
            'port' => '8066',
            'database' => 'MR_SZ',
            'username' => 'mr',
            'password' => 'mr',
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
            'strict' => false,
            'engine' => null,
            'options' =>[PDO::ATTR_EMULATE_PREPARES => true]
        ],
        'MR_WX' => [
            'driver' => 'mysql',
            'host' => '10.40.57.134',
            'port' => '8066',
            'database' => 'MR_WX',
            'username' => 'mr',
            'password' => 'mr',
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
            'strict' => false,
            'engine' => null,
            'options' =>[PDO::ATTR_EMULATE_PREPARES => true]
        ],
        'MR_ZJ' => [
            'driver' => 'mysql',
            'host' => '10.40.57.134',
            'port' => '8066',
            'database' => 'MR_ZJ',
            'username' => 'mr',
            'password' => 'mr',
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
            'strict' => false,
            'engine' => null,
            'options' =>[PDO::ATTR_EMULATE_PREPARES => true]
        ],

        'CDR' => [
            'driver' => 'mysql',
            'host' => '10.40.57.134',
            'port' => '8066',
            'database' => '',
            'username' => 'cdr',
            'password' => 'cdr',
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
            'strict' => false,
            'engine' => null,
            'options' =>[PDO::ATTR_EMULATE_PREPARES => true]
        ],
        'CDR_CZ' => [
            'driver' => 'mysql',
            'host' => '10.40.57.134',
            'port' => '8066',
            'database' => 'CDR_CZ',
            'username' => 'cdr',
            'password' => 'cdr',
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
            'strict' => false,
            'engine' => null,
            'options' =>[PDO::ATTR_EMULATE_PREPARES => true]
        ],
        'CDR_WX' => [
            'driver' => 'mysql',
            'host' => '10.40.57.134',
            'port' => '8066',
            'database' => 'CDR_WX',
            'username' => 'cdr',
            'password' => 'cdr',
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
            'strict' => false,
            'engine' => null,
            'options' =>[PDO::ATTR_EMULATE_PREPARES => true]
        ],
        'CDR_NT' => [
            'driver' => 'mysql',
            'host' => '10.40.57.134',
            'port' => '8066',
            'database' => 'CDR_NT',
            'username' => 'cdr',
            'password' => 'cdr',
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
            'strict' => false,
            'engine' => null,
            'options' =>[PDO::ATTR_EMULATE_PREPARES => true]
        ],
        'CDR_SZ' => [
            'driver' => 'mysql',
            'host' => '10.40.57.134',
            'port' => '8066',
            'database' => 'CDR_SZ',
            'username' => 'cdr',
            'password' => 'cdr',
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
            'strict' => false,
            'engine' => null,
            'options' =>[PDO::ATTR_EMULATE_PREPARES => true]
        ],
        'CDR_ZJ' => [
            'driver' => 'mysql',
            'host' => '10.40.57.134',
            'port' => '8066',
            'database' => 'CDR_ZJ',
            'username' => 'cdr',
            'password' => 'cdr',
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
            'strict' => false,
            'engine' => null,
            'options' =>[PDO::ATTR_EMULATE_PREPARES => true]
        ],

        'CTR' => [
            'driver' => 'mysql',
            'host' => '10.40.57.134',
            'port' => '8066',
            'database' => '',
            'username' => 'ctr',
            'password' => 'ctr',
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
            'strict' => false,
            'engine' => null,
            'options' =>[PDO::ATTR_EMULATE_PREPARES => true]
        ],
        'CTR_CZ' => [
            'driver' => 'mysql',
            'host' => '10.40.57.134',
            'port' => '8066',
            'database' => 'CTR_CZ',
            'username' => 'ctr',
            'password' => 'ctr',
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
            'strict' => false,
            'engine' => null,
            'options' =>[PDO::ATTR_EMULATE_PREPARES => true]
        ],
        'CTR_NT' => [
            'driver' => 'mysql',
            'host' => '10.40.57.134',
            'port' => '8066',
            'database' => 'CTR_NT',
            'username' => 'ctr',
            'password' => 'ctr',
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
            'strict' => false,
            'engine' => null,
            'options' =>[PDO::ATTR_EMULATE_PREPARES => true]
        ],
        'CTR_WX' => [
            'driver' => 'mysql',
            'host' => '10.40.57.134',
            'port' => '8066',
            'database' => 'CTR_WX',
            'username' => 'ctr',
            'password' => 'ctr',
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
            'strict' => false,
            'engine' => null,
            'options' =>[PDO::ATTR_EMULATE_PREPARES => true]
        ],
        'CTR_SZ' => [
            'driver' => 'mysql',
            'host' => '10.40.57.134',
            'port' => '8066',
            'database' => 'CTR_SZ',
            'username' => 'ctr',
            'password' => 'ctr',
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
            'strict' => false,
            'engine' => null,
            'options' =>[PDO::ATTR_EMULATE_PREPARES => true]
        ],
        'CTR_ZJ' => [
            'driver' => 'mysql',
            'host' => '10.40.57.134',
            'port' => '8066',
            'database' => 'CTR_ZJ',
            'username' => 'ctr',
            'password' => 'ctr',
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
            'strict' => false,
            'engine' => null,
            'options' =>[PDO::ATTR_EMULATE_PREPARES => true]
        ],
        'Global' => [
            'driver' => 'mysql',
            'host' => '10.40.57.134',
            'port' => '8066',
            'database' => 'Global',
            'username' => 'root',
            'password' => 'mongs',
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
            'strict' => false,
            'engine' => null,
        ],

        'mongoDB_ctr' => [
            'host' => '10.197.132.31',
            'port' => '20000',
            'dbname'=>'ctr',
            'username'=>'root',
            'password'=>'mongs123'
        ],
        'mongoDB_kget' => [
            'host' => '10.39.148.186',
            'port' => '27028',
            'dbname'=>'kgetParser',
            'username'=>'root',
            'password'=>'ericsson'
        ],
        
        'CTR_test' => [
            'driver' => 'mysql',
            'host' => '10.40.57.190',
            'port' => '3306',
            'database' => 'mdt_ctr',
            'username' => 'root',
            'password' => 'mongs',
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
            'strict' => false,
            'engine' => null,
        ],
        'pgsql_cz' => [
            'driver' => 'pgsql',
            'host' => '10.197.132.31',
            'port' => '5432',
            'database' => 'mrs_cz',
            'username' => 'gpadmin',
            'password' => 'gpadmin',
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
            'strict' => false,
            'engine' => null,
            'options' =>[PDO::ATTR_EMULATE_PREPARES => true]
        ],
        'pgsql_nt' => [
            'driver' => 'pgsql',
            'host' => '10.40.51.190',
            'port' => '5432',
            'database' => 'mrs_nt',
            'username' => 'gpadmin',
            'password' => 'Mongs@123',
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
            'strict' => false,
            'engine' => null,
            'options' =>[PDO::ATTR_EMULATE_PREPARES => true]
        ],
        'pgsql_wx' => [
            'driver' => 'pgsql',
            'host' => '10.40.61.185',
            'port' => '5432',
            'database' => 'mrs_wx',
            'username' => 'gpadmin',
            'password' => 'Mongs@123',
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
            'strict' => false,
            'engine' => null,
            'options' =>[PDO::ATTR_EMULATE_PREPARES => true]
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Migration Repository Table
    |--------------------------------------------------------------------------
    |
    | This table keeps track of all the migrations that have already run for
    | your application. Using this information, we can determine which of
    | the migrations on disk haven't actually been run in the database.
    |
    */

    'migrations' => 'migrations',

    /*
    |--------------------------------------------------------------------------
    | Redis Databases
    |--------------------------------------------------------------------------
    |
    | Redis is an open source, fast, and advanced key-value store that also
    | provides a richer set of commands than a typical key-value systems
    | such as APC or Memcached. Laravel makes it easy to dig right in.
    |
    */

    'redis' => [

        'cluster' => false,

        'default' => [
            'host' => env('REDIS_HOST', '10.39.148.187'),
            'password' => env('REDIS_PASSWORD', null),
            'port' => env('REDIS_PORT', 6379),
            'database' => 0,
        ],

    ],

];
