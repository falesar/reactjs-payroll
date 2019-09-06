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
    return view('welcome');
});


Route::get('export-employee-payslip', "EmployeePayrollController@exportEmployeePayslip");
Route::get('index', 'EmployeeInfoController@showToken');


Auth::routes();
// Route::post('/file-employee-info', 'EmployeeInfoController@fileEmployeeInfo');

// Route::group(['middleware' => 'auth'], function () {
// 	Route::post('/file-employee-info', 'EmployeeInfoController@fileEmployeeInfo');
// 	Route::get('/employee-info', 'EmployeeInfoController@getEmployeeInfo');
// }


// Route::get('/home', 'HomeController@index')->name('home');
