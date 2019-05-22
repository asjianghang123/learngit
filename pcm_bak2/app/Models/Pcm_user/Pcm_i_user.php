<?php

namespace App\Models\Pcm_user;

use Illuminate\Database\Eloquent\Model;

class Pcm_i_user extends Model
{
    //
  protected $table = "users";

  // protected $fillable = ['city', 'county', 'name', 'unit', 'department', 'userClassification', 'username', 'idCard', 'contactPhone',];
  protected $hidden = [
      'id', 'password', 'remember_token', 'api_token'
  ];
}
