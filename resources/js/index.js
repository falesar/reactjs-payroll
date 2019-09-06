import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

import EmployeeList from './components/EmployeeList';
import CreateEmployee from './components/CreateEmployee';
import EmployeeLog from './components/EmployeeLog';
import ViewPayslip from './components/ViewPayslip';
import GeneratePayroll from './components/GeneratePayroll';
import UpdateEmployee from './components/UpdateEmployeeInfo';

export default class Index extends Component {

    constructor () {
        super();
        this.state = {
            user_token: '',
            email: '',
            password: '',
            user: {},
            role: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.userLogout = this.userLogout.bind(this);
    }

    userLogout (event) {
        event.preventDefault();
         axios.post(`api/auth/logout`, {}, {
            headers: {
                'Authorization': 'Bearer ' + this.state.user_token
            }
         }).then(response => {
            this.setState({
                user_token: ''
            })
            console.log('successfully Logged out')
         })
    }

    handleChange(event) {
        event.preventDefault();
        let value = event.target.value

        this.setState({
            [event.target.name]: value
        })
    }

    handleSubmit(event) {
        event.preventDefault();

        axios.post(`api/auth/login`, { 
            'email': this.state.email,
            'password': this.state.password 
        }).then(response => {
            this.setState({
                user_token: response.data.access_token
            })

            axios.post(`api/auth/me`, {}, {
                headers: {
                    'Authorization': 'Bearer ' + response.data.access_token
                }
            }).then(response => {
                this.setState({
                    user: response.data,
                    role: response.data.roles[0]
                })
            })
        })
    }

    render() {
        if(this.state.user_token != '') {
            let role = this.state.role
            if(role.role_name == 'admin') {
                return (
                    <div className="container">
                        <Router>
                            <div className="col-md-10">
                                <div className="card">
                                    <div className="card-header">
                                        <Link to="/employees">Employee List </Link> |
                                        <Link to="/employee-logs">Employee Logs </Link> |
                                        <Link to="/view-payslips">View Employee Payslips </Link> |
                                        <Link to="/generate-employee-payrolls">Generate Payroll</Link> |
                                        <a onClick={this.userLogout}>Logout</a>
                                    </div>
                                    <div className="card-body">
                                        <Route path="/employees" render={(props) => <EmployeeList {...props} token={this.state.user_token} />} />
                                        <Route path="/employee-logs" render={(props) => <EmployeeLog {...props} token={this.state.user_token} />} />
                                        <Route path="/view-payslips" render={(props) => <ViewPayslip {...props} token={this.state.user_token} />} />
                                        <Route path="/generate-employee-payrolls" render={(props) => <GeneratePayroll {...props} token={this.state.user_token} />} />
                                        <Route path="/create-new-employee" render={(props) => <CreateEmployee {...props} token={this.state.user_token} />} />
                                        <Route path="/update-employees" render={(props) => <UpdateEmployee {...props} token={this.state.user_token} />} />
                                    </div>
                                </div>
                            </div>
                        </Router>
                    </div>
                );
            } else {
                return (
                    <div className="container">
                        <Router>
                            <div className="col-md-10">
                                <div className="card">
                                    <div className="card-header">
                                        <Link to="/view-payslips">View Employee Payslips </Link>
                                        <a onClick={this.userLogout}>Logout</a>
                                    </div>
                                    <div className="card-body">
                                        <Route path="/view-payslips" render={(props) => <ViewPayslip {...props} token={this.state.user_token} />} />
                                    </div>
                                </div>
                            </div>
                        </Router>
                    </div>
                );
            }
        } else {
            return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">User Login</div>

                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div>
                                        <label>Email:</label>
                                        <input type="text" name="email" onChange={this.handleChange} />
                                    </div>
                                    <div>
                                        <label>Password:</label> 
                                        <input type="password" name="password" onChange={this.handleChange} />
                                    </div>
                                    <div>
                                        <button type="submit">Login</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        );
        }
    }
}

if (document.getElementById('index')) {
    ReactDOM.render(<Index />, document.getElementById('index'));
}
