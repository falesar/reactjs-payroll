import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class ViewPayslip extends Component {

    constructor () {
        super();
        this.state = {
            employee_list: [],
            selected_employee: 0,
            payslip_data: [],
            user: {},
            role: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.exportPayslip = this.exportPayslip.bind(this);
    }

    componentWillMount() {
        axios.post(`api/auth/me`, {}, {
            headers: {
                'Authorization': 'Bearer ' + this.props.token
            }
        }).then(response => {
            let user_data = response.data
            this.setState({
                user: user_data,
                role: response.data.roles[0]
            })

            if (response.data.roles[0].role_name == 'employee') {
                axios.post(`api/auth/employee-payslip`, { 
                    'id': 1
                },
                {
                    headers: {
                        'Authorization': 'Bearer ' + this.props.token
                    }
                }).then(response => {
                    this.setState({
                        selected_employee: user_data.employee_id,
                        payslip_data: response.data
                    })
                })
            } else {
                axios.get('api/auth/employee-list-no-sal', {
                    params: {},
                    headers: {
                        'Authorization': 'Bearer ' + this.props.token
                    }
                }).then(response => {
                    this.setState({
                        employee_list: response.data
                    })
                }).catch(error => {
                    console.log(error);
                })
            }
        })
    }

    handleChange(event) {
        event.preventDefault();
        let value = event.target.value

        let id = event.target.value
        axios.post(`api/auth/employee-payslip`, { 
            'id': id
        },
        {
            headers: {
                'Authorization': 'Bearer ' + this.props.token
            }
        }).then(response => {
            this.setState({
                payslip_data: response.data
            })
        })
    }

    exportPayslip(event) {
        event.preventDefault();
        let url = 'export-employee-payslip?id='+this.state.selected_employee
        window.open(url)
    }

    render() {
        if (this.state.role.role_name == 'admin') {
            return (
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">Employee Payslips</div>
                                <button onClick={this.exportPayslip}>Export Payslip</button>
                                <div className="card-body">
                                    <label>Select Employee:</label>
                                    <select name="selected_employee" defaultValue="0" onChange={this.handleChange}>
                                        <option disabled value="0">Select Employee</option>
                                        {
                                            this.state.employee_list.map( (employee, index) =>  
                                                <option value={employee.id} key={index}>{employee.lastname}, {employee.firstname}</option>
                                            )
                                        }
                                    </select>

                                    <div>
                                        <label>Monthly Pay:</label>
                                        <span>{this.state.payslip_data.salary}</span>
                                    </div>
                                    <div>
                                        <label>Basic Pay:</label>
                                        <span>{this.state.payslip_data.basic_pay}</span>
                                    </div>
                                    <div>
                                        <label>Absences:</label>
                                        <span>{this.state.payslip_data.absences}</span>
                                    </div>
                                    <div>
                                        <label>Tardiness:</label>
                                        <span>{this.state.payslip_data.tardiness}</span>
                                    </div>
                                    <div>
                                        <label><strong>Gross Pay:</strong></label>
                                        <strong>{this.state.payslip_data.gross_pay}</strong>
                                    </div>
                                    <div>
                                        <label>Tax:</label>
                                        <span>{this.state.payslip_data.tax}</span>
                                    </div>
                                    <div>
                                        <label>SSS:</label>
                                        <span>{this.state.payslip_data.sss}</span>
                                    </div>
                                    <div>
                                        <label>PhilHealth:</label>
                                        <span>{this.state.payslip_data.philhealth}</span>
                                    </div>
                                    <div>
                                        <label>Pag-Ibig:</label>
                                        <span>{this.state.payslip_data.pagibig}</span>
                                    </div>
                                    <div>
                                        <label><strong>Total Government Deductions:</strong></label>
                                        <strong>{this.state.payslip_data.total_deduction}</strong>
                                    </div>
                                    <div>
                                        <label><strong>Net Total:</strong></label>
                                        <strong>{this.state.payslip_data.net}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            );
        } else {
            return (
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">Employee Payslips</div>
                                <button onClick={this.exportPayslip}>Export Payslip</button>
                                <div className="card-body">
                                    <div>
                                        <label>Monthly Pay:</label>
                                        <span>{this.state.payslip_data.salary}</span>
                                    </div>
                                    <div>
                                        <label>Basic Pay:</label>
                                        <span>{this.state.payslip_data.basic_pay}</span>
                                    </div>
                                    <div>
                                        <label>Absences:</label>
                                        <span>{this.state.payslip_data.absences}</span>
                                    </div>
                                    <div>
                                        <label>Tardiness:</label>
                                        <span>{this.state.payslip_data.tardiness}</span>
                                    </div>
                                    <div>
                                        <label><strong>Gross Pay:</strong></label>
                                        <strong>{this.state.payslip_data.gross_pay}</strong>
                                    </div>
                                    <div>
                                        <label>Tax:</label>
                                        <span>{this.state.payslip_data.tax}</span>
                                    </div>
                                    <div>
                                        <label>SSS:</label>
                                        <span>{this.state.payslip_data.sss}</span>
                                    </div>
                                    <div>
                                        <label>PhilHealth:</label>
                                        <span>{this.state.payslip_data.philhealth}</span>
                                    </div>
                                    <div>
                                        <label>Pag-Ibig:</label>
                                        <span>{this.state.payslip_data.pagibig}</span>
                                    </div>
                                    <div>
                                        <label><strong>Total Government Deductions:</strong></label>
                                        <strong>{this.state.payslip_data.total_deduction}</strong>
                                    </div>
                                    <div>
                                        <label><strong>Net Total:</strong></label>
                                        <strong>{this.state.payslip_data.net}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            );
        }
    }
}

if (document.getElementById('view-payslip')) {
    ReactDOM.render(<ViewPayslip />, document.getElementById('view-payslip'));
}
