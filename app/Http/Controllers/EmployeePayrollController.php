<?php

namespace App\Http\Controllers;

use App\EmployeePayroll;
use App\EmployeeInfo;
use App\PayPeriodInfo;
use Illuminate\Http\Request;
use PDF;

class EmployeePayrollController extends Controller
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

    public function getEmployeePayslip (Request $request)
    {
        $input = $request->all();
        $employee_payroll = EmployeePayroll::where('employee_id', $input['id'])->first();
        $decrypted_details = decrypt($employee_payroll->payroll_details);
        $decoded_details = json_decode($decrypted_details, true);
        return response($decoded_details, 200);
    }

    public function generatePayroll (Request $request) 
    {
        $employees = EmployeeInfo::orderBy('id', 'asc')->get();
        $payroll_details = [];

        foreach ($employees as $key => $employee) {
            $employee_log = PayPeriodInfo::where('employee_id', $employee->id)->first();
            $decrypted_info = decrypt($employee->employee_info);
            $decoded_info = json_decode($decrypted_info);
            $basic_pay = $decoded_info->monthly_pay / 2;

            $payroll_details['salary'] = $decoded_info->monthly_pay;
            $payroll_details['basic_pay'] = $basic_pay;
            $payroll_details['tardiness'] = $this->getLatesDeduction($employee_log->mins_late, $basic_pay);
            $payroll_details['absences'] = $this->getAbsencesDeduction($employee_log->days_present, $basic_pay);
            $payroll_details['gross_pay'] = $this->getGrossPay($basic_pay, $payroll_details['tardiness'], $payroll_details['absences']); // After Deductions Pay TODO
            $payroll_details['sss'] = $this->getSSSContribution($decoded_info->monthly_pay);  // SSS
            $payroll_details['philhealth'] = $this->getPhilHealthContribution($decoded_info->monthly_pay); // PhilHealth
            $payroll_details['pagibig'] = $this->getPagibigContribution($decoded_info->monthly_pay); // PagIbig
            $payroll_details['tax'] = $this->getTax($decoded_info->monthly_pay); // Tax
            $payroll_details['total_deduction'] = $payroll_details['sss'] + $payroll_details['philhealth'] + $payroll_details['pagibig'] + $payroll_details['tax']; // Total deductions
            $payroll_details['net'] = $payroll_details['gross_pay'] - $payroll_details['total_deduction']; // Net after deductions

            $encoded_details = json_encode($payroll_details);
            $payroll_encrypt = encrypt($encoded_details);

            $employee_payroll = EmployeePayroll::where('employee_id', $employee->id)->first();
            if ($employee_payroll) {
                $employee_payroll->payroll_details = $payroll_encrypt;
            } else {
                $employee_payroll = new EmployeePayroll();
                $employee_payroll->employee_id = $employee->id;
                $employee_payroll->payroll_details = $payroll_encrypt;
            }

            $employee_payroll->save();
        }

        return "Payroll Generated!";
    }

    /**
     * Get deduction from lates.
     *
     * @return Deduction amount from lates.
     */
    private function getLatesDeduction ($mins_late, $basic_pay) 
    {
        $daily = $basic_pay / 10;
        $hourly = $daily / 8;
        $min_by_min = $hourly / 60;

        return $mins_late * $min_by_min;
    }

    /**
     * Get deduction from absences.
     *
     * @return Deduction amount from absences.
     */
    private function getAbsencesDeduction ($days_present, $basic_pay)
    {
        $daily = $basic_pay / 10;
        $days_absent = 10 - $days_present;

        return $days_absent * $daily;
    }

    private function getGrossPay ($basic_pay, $lates, $absences)
    {
        $deductions = $lates + $absences;
        $gross_pay = $basic_pay - $deductions;
        return $gross_pay;
    }

    /**
     * Get SSS contribution.
     *
     * @return $contribution
     */
    private function getSSSContribution ($monthly_pay)
    {
        $contribution = 0;

        // Salary Range
        $range = [[0, 2249.99], [2250, 2749.99], [2750, 3249.99], [3250, 3749.99], [3750, 4249.99], [4250, 4749.99], [4750, 5249.99], [5250, 5749.99], [5750, 6249.99], [6250, 6749.99], [6750, 7249.99], [7250, 7749.99], [7750, 8249.99], [8250, 8749.99], [8750, 9249.99], [9250, 9749.99], [9750, 10249.99], [10250, 10749.99], [10750, 11249.99], [11250, 11749.99], [11750, 12249.99], [12250, 12749.99], [12750, 13249.99], [13250, 13749.99], [13750, 14249.99], [14250, 14749.99], [14750, 15249.99], [15250, 15749.99], [15750, 16249.99], [16250, 16749.99], [16750, 17249.99], [17250, 17749.99], [17750, 18249.99], [18250, 18749.99], [18750, 19249.99], [19250, 19749.99], [19750, 1000000]]; // Max is 1,000,000 monthly
            
        $deduct = [80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 400, 420, 440, 460, 480, 500, 520, 540, 560, 580, 600, 620, 640, 660, 680, 700, 720, 740, 760, 780, 800];

        for ($y = count($range) - 1; $y >= 0; $y--) 
        {                
            //Find salary range
            if ($monthly_pay >= $range[$y][0] && $monthly_pay <= $range[$y][1]) {
                // Get Contribution deduction
                $contribution = $deduct[$y];
                break;
            }
        }

        return $contribution;
    }

    /**
     * Get SSS contribution.
     *
     * @return $contribution
     */
    private function getPagibigContribution ($monthly_pay)
    {
        $contribution = 0;

        $contribution = $monthly_pay * 0.02;

        if ($contribution > 100)
            $contribution = 100;

        return $contribution;
    }

    /**
     * Get PhilHealth contribution.
     *
     * @return $contribution
     */
    private function getPhilHealthContribution ($monthly_pay)
    {
        $contribution = 0;

        $contrib_percentage = ($monthly_pay * 0.0275) / 2;

         if ($monthly_pay <= 10000) { 
            // Monthly Basic Salary 10,000.00 and below
            $contribution = 137.50;
        } elseif ($monthly_pay >= 40000) { 
            // Monthly Basic Salary 40,000.00 and above
            $contribution = 550.00;
        } else {
            // Monthly Basic Salary from 10,000.01 - 39,999.99
            $contribution = $contrib_percentage;
        }

        return $contribution;
    }

    /**
     * Get Tax
     *
     * @return $contribution
     */
    private function getTax ($monthly_pay)
    {
        $tax = 0;
        $yearly_salary = $monthly_pay * 12;

        // If Yearly Salary is 250,000 or below, then the employee tax exempted.
        if ($yearly_salary <= 250000) {
            $tax = 0;
        } elseif ($yearly_salary > 250000 && $yearly_salary <= 400000) {
            $excess = $yearly_salary - 250000; // Get the excess, then get the 20% of it.
            $tax = ($excess * 0.20) / 24; // Divide to 24 since the payroll period is twice every month(12)
        } elseif ($yearly_salary > 400000 && $yearly_salary <= 800000) {
            $excess = $yearly_salary - 400000;
            $percentage = ($excess * 0.25) + 30000; // Get the excess, then get the 25% of it.
            $tax = $percentage / 24; // Divide to 24 since the payroll period is twice every month(12)
        } elseif ($yearly_salary > 800000 && $yearly_salary <= 2000000) {
            $excess = $yearly_salary - 800000;
            $percentage = ($excess * 0.30) + 130000; // Get the excess, then get the 30% of it.
            $tax = $percentage / 24; // Divide to 24 since the payroll period is twice every month(12)
        }

        return $tax;
    }

    public function exportEmployeePayslip(Request $request)
    {
        // $input = $request->all();
        $employee_payroll = EmployeePayroll::where('employee_id', 1)->first();
        $decrypted_details = decrypt($employee_payroll->payroll_details);
        $payroll_details = json_decode($decrypted_details, true);

        $pdf = PDF::loadView('payslippdf', compact("payroll_details"));
        return $pdf->download('payslip.pdf');
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
     * @param  \App\EmployeePayroll  $employeePayroll
     * @return \Illuminate\Http\Response
     */
    public function show(EmployeePayroll $employeePayroll)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\EmployeePayroll  $employeePayroll
     * @return \Illuminate\Http\Response
     */
    public function edit(EmployeePayroll $employeePayroll)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\EmployeePayroll  $employeePayroll
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, EmployeePayroll $employeePayroll)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\EmployeePayroll  $employeePayroll
     * @return \Illuminate\Http\Response
     */
    public function destroy(EmployeePayroll $employeePayroll)
    {
        //
    }
}
