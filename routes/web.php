<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('auth.login');
});

Route::get('/home', function () {
    return view('welcome');
});

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
Route::get('export-employee-payslip', "EmployeePayrollController@exportEmployeePayslip");
Route::get('export-payroll', "EmployeePayrollController@exportPayrollExcel");

Route::get('index', 'EmployeeInfoController@showToken');


Auth::routes();
// Route::post('/file-employee-info', 'EmployeeInfoController@fileEmployeeInfo');

// Route::group(['middleware' => 'auth'], function () {
// 	Route::post('/file-employee-info', 'EmployeeInfoController@fileEmployeeInfo');
// 	Route::get('/employee-info', 'EmployeeInfoController@getEmployeeInfo');
// }


// Route::get('/home', 'HomeController@index')->name('home');
