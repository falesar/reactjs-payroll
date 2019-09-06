import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

export default class EmployeeList extends Component {

    constructor () {
        super();
        this.state = {
            employees: [],
            selected_id: 0,
        }

        this.editEmployee = this.editEmployee.bind(this);
    }

    editEmployee(event) {
        event.preventDefault();
        let id = event.target.value
        this.setState({
            selected_id: id
        })
    }

    componentWillMount() {
        let token = this.props.token
        axios.get('/api/auth/employee-list', {
            params: {},
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response => {
            this.setState({
                employees: response.data
            })
        }).catch(error => {
            console.log(error);
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Employee List</div>
                            <Link to="/create-new-employee"><button>Add Employee </button></Link>
                            <Link to="/update-employees"><button>Update Employees </button></Link>
                            <div className="card-body">
                                <table> 
                                    <thead>
                                        <tr>
                                            <th>Employee Name:</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.employees.map( (employee, index) => 
                                                <tr key={index}>
                                                    <td>{employee.lastname}, {employee.firstname}</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

if (document.getElementById('employee-list')) {
    ReactDOM.render(<EmployeeList />, document.getElementById('employee-list'));
}
