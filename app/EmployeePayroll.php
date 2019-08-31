<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EmployeePayroll extends Model
{
    protected $fillable = [
        'employee_id', 'payroll_details'
    ];
}
