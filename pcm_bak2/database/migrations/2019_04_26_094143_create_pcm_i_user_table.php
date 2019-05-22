<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePcmIUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pcm_i_user', function (Blueprint $table) {
            // $table->integer('userId');
            $table->bigIncrements('userId');
            $table->string('city', 100)->default('Not configured');
            $table->string('county', 100)->default('Not configured');
            $table->string('name', 100);    //登陆账号名
            $table->string('password', 100);
            $table->string('email', 100);
            $table->string('unit', 100)->nullable()->default('Not configured');    //所属单位
            $table->string('department', 100)->nullable()->default('Not configured');    //部门
            $table->string('userClassification', 100)->default('Not configured');    //用户分类
            $table->string('username', 100);    //用户姓名
            $table->string('idCard', 100)->nullable()->default('Not configured');    //身份证号
            $table->bigInteger('contactPhone')->nullable()->default('0');    //联系电话
            $table->string('role', 100);    //角色
            $table->timestamps();    //创建日期
            $table->integer('passwordValidDays')->default(0);    //密码有效天数
            $table->integer('maximumNumberOfOnline')->default('0');    //最大在线数目
            $table->string('status', 100)->default('off');    //账号状态
            $table->string('useStatus', 100)->default('on');    //账号使用状态
            $table->rememberToken();
            $table->string('api_token', 60)->unique();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pcm_i_user');
    }
}
