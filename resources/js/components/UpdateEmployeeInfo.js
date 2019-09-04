import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class UpdateEmployee extends Component {

    constructor () {
        super();
        this.state = {
            firstname: '',
            lastname: '',
            monthly_pay: 0,
            id: 0
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        axios.post('/employee-info', {
            'id': 1
        }).then(response => {
            console.log(response.data)
            this.setState({
                firstname: response.data.firstname,
                lastname: response.data.lastname,
                monthly_pay: response.data.monthly_pay,
                id: response.data.id
            })
        }).catch(error => {
            console.log(error);
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

        axios.post(`file-employee-info`, { 
            'firstname': this.state.firstname,
            'lastname': this.state.lastname,
            'monthly_pay': this.state.monthly_pay,
            'id': this.state.id
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
                            <div className="card-header">Edit Employee</div>

                            <div className="card-body">
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
