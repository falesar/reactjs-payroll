<?php

namespace App\Http\Controllers;

use App\EmployeeInfo;
use Illuminate\Http\Request;

class EmployeeInfoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        dd(csrf_token());
    }


    /**
     * Get Employee Info.
     *
     * @return \Illuminate\Http\Response
     */
    public function getEmployeeInfo (Request $request)
    {
        $input = $request->all();
        $employee = EmployeeInfo::where('id', $input['id'])->first();
        $encoded_info = decrypt($employee->employee_info);
        $employee_info = json_decode($encoded_info);

        return response($employee_info, 200);
    }

    /**
     * Create / Update Employee Info.
     *
     * @return \Illuminate\Http\Response
     */
    public function fileEmployeeInfo (Request $request)
    {
        $input = $request->all();
        $employee = EmployeeInfo::where('id', $input['id'])->first();

        if ($employee) {
            $info = [
                'firstname' => $input['firstname'],
                'lastname' => $input['lastname'],
                'monthly_pay' => $input['monthly_pay'],
            ];

            $encoded_info = json_encode($info);
            $employee->employee_info = encrypt($encoded_info);
        } else {
            $info = [
                'firstname' => $input['firstname'],
                'lastname' => $input['lastname'],
                'monthly_pay' => $input['monthly_pay'],
            ];

            $encoded_info = json_encode($info);

            $employee = new EmployeeInfo();
            $employee->employee_info = encrypt($encoded_info);
        }
        $employee->save();
        return response($employee, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {   
        // 
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\EmployeeInfo  $employeeInfo
     * @return \Illuminate\Http\Response
     */
    public function show(EmployeeInfo $employeeInfo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\EmployeeInfo  $employeeInfo
     * @return \Illuminate\Http\Response
     */
    public function edit(EmployeeInfo $employeeInfo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\EmployeeInfo  $employeeInfo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, EmployeeInfo $employeeInfo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\EmployeeInfo  $employeeInfo
     * @return \Illuminate\Http\Response
     */
    public function destroy(EmployeeInfo $employeeInfo)
    {
        //
    }
}
