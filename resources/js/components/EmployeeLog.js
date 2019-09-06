import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class EmployeeLog extends Component {

    constructor () {
        super();
        this.state = {
            employee_list: [],
            selected_employee: 0,
            days_present: 0,
            mins_late: 0
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
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

    handleChange(event) {
        event.preventDefault();
        let value = event.target.value

        if(event.target.name == "days_present") {
            if (event.target.value > 10) {
                this.setState({
                    days_present: 10
                })
                event.target.value = 10
            }
        }
        
        if (event.target.name == "selected_employee") {
            let id = event.target.value
            axios.post(`api/auth/employee-log-info`,
                { 
                    'id': id
                },
                {
                    headers: {
                        'Authorization': 'Bearer ' + this.props.token
                    }
                }
            ).then(response => {
                this.setState({
                    selected_employee: id,
                    days_present: response.data.days_present,
                    mins_late: response.data.mins_late
                })
            })
        } else {
            this.setState({
                [event.target.name]: value
            })
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        axios.post(`api/auth/file-log-info`, { 
            'days_present': this.state.days_present,
            'mins_late': this.state.mins_late,
            'id': this.state.selected_employee
        },
        {
            headers: {
                'Authorization': 'Bearer ' + this.props.token
            }
        }).then(response => {
            console.log(response);
            console.log(response.data);
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Employee Logs</div>

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

                                <form onSubmit={this.handleSubmit}>
                                    <div>
                                        <label>Days Present:</label>
                                        <input type="number" min="0" max="10" name="days_present" onChange={this.handleChange} value={this.state.days_present}/>
                                    </div>
                                    <div>
                                        <label>Minutes Late:</label> 
                                        <input type="number" min="0" name="mins_late" onChange={this.handleChange} value={this.state.mins_late}/>
                                    </div>
                                    <div>
                                        <button type="submit">Update Log</button>
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

if (document.getElementById('employee-log')) {
    ReactDOM.render(<EmployeeLog />, document.getElementById('employee-log'));
}
