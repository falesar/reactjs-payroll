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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');

    // Employee Info
	Route::get('employee-list', 'EmployeeInfoController@index');
	Route::get('employee-list-no-sal', 'EmployeeInfoController@getEmployeeInfoNoSalary');
	Route::post('employee-info', 'EmployeeInfoController@getEmployeeInfo');
	Route::post('file-employee-info', 'EmployeeInfoController@fileEmployeeInfo');

	// Employee Logs
	Route::post('employee-log-info', 'PayPeriodInfoController@getEmployeeLog');
	Route::post('file-log-info', 'PayPeriodInfoController@fileEmployeeLog');

	// Payroll and Payslip
	Route::post('generate-payroll', 'EmployeePayrollController@generatePayroll');
	Route::post('employee-payslip', "EmployeePayrollController@getEmployeePayslip");
	Route::get('export-payroll', "EmployeePayrollController@exportPayrollExcel");
});