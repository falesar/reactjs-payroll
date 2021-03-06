import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class UpdateEmployee extends Component {

    constructor () {
        super();
        this.state = {
            employee_list: [],
            firstname: '',
            lastname: '',
            monthly_pay: 0,
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
        
        if (event.target.name == "selected_employee") {
            let id = event.target.value
            axios.post(`api/auth/employee-info`,
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
                    firstname: response.data.firstname,
                    lastname: response.data.lastname,
                    monthly_pay: response.data.monthly_pay,
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

        axios.post(`api/auth/file-employee-info`, { 
            'firstname': this.state.firstname,
            'lastname': this.state.lastname,
            'monthly_pay': this.state.monthly_pay,
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
                                        <label>Firstname:</label>
                                        <input type="text" name="firstname" onChange={this.handleChange} value={this.state.firstname}/>
                                    </div>
                                    <div>
                                        <label>Lastname:</label> 
                                        <input type="text" name="lastname" onChange={this.handleChange} value={this.state.lastname}/>
                                    </div>
                                    <div>
                                        <label>Monthly Pay:</label> 
                                        <input type="number" name="monthly_pay" onChange={this.handleChange} value={this.state.monthly_pay}/>
                                    </div>
                                    <div>
                                        <button type="submit">Update</button>
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

if (document.getElementById('update-employee')) {
    ReactDOM.render(<UpdateEmployee />, document.getElementById('update-employee'));
}
