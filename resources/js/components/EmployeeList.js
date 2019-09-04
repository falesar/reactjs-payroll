import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class EmployeeList extends Component {

    constructor () {
        super();
        this.state = {
            employees: []
        }
    }

    componentWillMount() {
        axios.get('/employee-list').then(response => {
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

                            <div className="card-body">
                                <table> 
                                    <thead>
                                        <tr>
                                            <th>Employee Name</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.employees.map( (employee, index) => 
                                                <tr key={index}>
                                                    <td>{employee.lastname}, {employee.firstname}</td>
                                                    <td><button>Edit</button> <button>Delete</button></td>
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
