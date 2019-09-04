import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class CreateEmployee extends Component {

    constructor () {
        super();
        this.state = {
            firstname: '',
            lastname: '',
            monthly_pay: 0
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

        axios.post(`file-employee-info`, { 
            'firstname': this.state.firstname,
            'lastname': this.state.lastname,
            'monthly_pay': this.state.monthly_pay 
        }).then(ressponse => {
            console.log(ressponse);
            console.log(ressponse.data);
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">New Employee</div>

                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div>
                                        <label>Firstname:</label>
                                        <input type="text" name="firstname" onChange={this.handleChange} />
                                    </div>
                                    <div>
                                        <label>Lastname:</label> 
                                        <input type="text" name="lastname" onChange={this.handleChange} />
                                    </div>
                                    <div>
                                        <label>Monthly Pay:</label> 
                                        <input type="number" name="monthly_pay" onChange={this.handleChange} />
                                    </div>
                                    <div>
                                        <button type="submit">Add</button>
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

if (document.getElementById('create-employee')) {
    ReactDOM.render(<CreateEmployee />, document.getElementById('create-employee'));
}
