<?php

namespace App\Http\Controllers;

use App\PayPeriodInfo;
use Illuminate\Http\Request;

class PayPeriodInfoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Get Employee Log.
     *
     * @return \Illuminate\Http\Response
     */
    public function getEmployeeLog (Request $request)
    {
        // TODO: TEST!!
        $input = $request->all();
        $employee_log = PayPeriodInfo::where('employee_id', $input['id'])->first();

        return response($employee_log, 200);
    }

    /**
     * Create / Update Employee Log.
     *
     * @return \Illuminate\Http\Response
     */
    public function fileEmployeeLog (Request $request)
    {
        // TODO: TEST!!
        $input = $request->all();

        $employee_log = PayPeriodInfo::where('employee_id', $input['id'])->first();

        if ($employee) {
            $employee_log->days_present = $input['days_present'];
            $employee_log->mins_late = $input['mins_late'];
        } else {
            $employee_log = new PayPeriodInfo();
            $employee_log->employee_id = $input['id'];
            $employee_log->days_present = $input['days_present'];
            $employee_log->mins_late = $input['mins_late'];
        }
        $employee_log->save();
        return response($employee, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
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
     * @param  \App\PayPeriodInfo  $payPeriodInfo
     * @return \Illuminate\Http\Response
     */
    public function show(PayPeriodInfo $payPeriodInfo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\PayPeriodInfo  $payPeriodInfo
     * @return \Illuminate\Http\Response
     */
    public function edit(PayPeriodInfo $payPeriodInfo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\PayPeriodInfo  $payPeriodInfo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, PayPeriodInfo $payPeriodInfo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\PayPeriodInfo  $payPeriodInfo
     * @return \Illuminate\Http\Response
     */
    public function destroy(PayPeriodInfo $payPeriodInfo)
    {
        //
    }
}
