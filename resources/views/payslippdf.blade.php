<div class="payroll_details">
    <div class="section">
        <div class="group">
            <div style="display: inline-block; text-align: left">Monthly Salary:</div>
            <div style="text-align: right">{{ number_format(floatval($payroll_details['salary']), 2) }}</div>
        </div>
        <div class="group">
            <div style="text-align: left">Basic Pay:</div>
            <div style="text-align: right">{{ number_format(floatval($payroll_details['basic_pay']), 2) }}</div>
        </div>
    </div>
    <div class="section">
        <div style="font-weight: bold">Attendance</div>
        <div class="group">
            <div style="text-align: left">Absences:</div>
            <div style="text-align: right">{{ number_format(floatval($payroll_details['absences']), 2) }}</div>
        </div>
        <div class="group">
            <div style="text-align: left">Tardiness:</div>
            <div style="text-align: right">{{ number_format(floatval($payroll_details['tardiness']), 2) }}</div>
        </div>
        <div class="group" style="border-bottom: 1px solid #e6e6e6;">
            <div style="font-weight: bold; text-align: left">Gross Pay:</div>
            <div style="text-align: right">{{ number_format(floatval($payroll_details['gross_pay']), 2) }}</div>
        </div>
    </div>
    <div class="section">
        <div style="font-weight: bold">Deductions</div>
        <div class="group">
            <div style="text-align: left">Tax:</div>
            <div style="text-align: right">{{ number_format(floatval($payroll_details['tax']), 2) }}</div>
        </div>
        <div class="group">
            <div style="text-align: left">SSS:</div>
            <div style="text-align: right">{{ number_format(floatval($payroll_details['sss']), 2) }}</div>
        </div>
        <div class="group">
            <div style="text-align: left">PhilHealth:</div>
            <div style="text-align: right">{{ number_format(floatval($payroll_details['philhealth']), 2) }}</div>
        </div>
        <div class="group">
            <div style="text-align: left">Pag-Ibig:</div>
            <div style="text-align: right">{{ number_format(floatval($payroll_details['pagibig']), 2) }}</div>
        </div>
        <div class="group" style="border-bottom: 2px solid #9c9c9c">
            <div style="font-weight: bold; text-align: left">Total Deductions:</div>
            <div style="text-align: right">{{ number_format(floatval($payroll_details['total_deduction']), 2) }}</div>
        </div>
    </div>
    <div class="section">
        <div class="group">
            <div style="font-weight: bold; text-align: left">Net Total:</div>
            <div style="font-weight: bold; text-align: right">{{ number_format(floatval($payroll_details['net']), 2) }}</div>
        </div>
    </div>
</div>