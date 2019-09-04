import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

import EmployeeList from './components/EmployeeList';
import CreateEmployee from './components/CreateEmployee';
import UpdateEmployee from './components/UpdateEmployeeInfo';
import EmployeeLog from './components/EmployeeLog';
import ViewPayslip from './components/ViewPayslip';

export default class Index extends Component {
    render() {
        return (
            <div className="container">
                <Router>
                    <div>
                        <Link to="/employees">Employee List </Link>
                        <Link to="/employee-logs">Employee Logs </Link>
                        <Link to="/view-payslips">View Employee Payslips </Link>
                    </div>
                    <div>
                        <Route path="/employees" component={EmployeeList}/>
                        <Route path="/employee-logs" component={EmployeeLog}/>
                        <Route path="/view-payslips" component={ViewPayslip}/>
                    </div>
                </Router>
            </div>
        );
    }
}

if (document.getElementById('index')) {
    ReactDOM.render(<Index />, document.getElementById('index'));
}
