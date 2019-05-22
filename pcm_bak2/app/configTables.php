<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class configTables extends Model
{
    protected $connection = 'param';
    protected $table = '虚拟网关配置表';
    public $timestamps = false;

    function __construct($type, $connection="") {
    	if ($type) {
    		$this->table = $type;
    	}
    	if ($connection) {
    		$this->connection = $connection;
    	}
    	
    }     
}
