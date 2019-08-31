<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PayPeriodInfo extends Model
{
    protected $fillable = [
        'employee_id', 'days_present', 'mins_late'
    ];
}
