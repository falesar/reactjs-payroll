import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class GeneratePayroll extends Component {
    constructor () {
        super();
        this.state = {
            
        }
        this.generatePayroll = this.generatePayroll.bind(this);
    }

    generatePayroll(event) {
        event.preventDefault();
        axios.post(`api/auth/generate-payroll`, {},
        {
            headers: {
                'Authorization': 'Bearer ' + this.props.token
            }
        }).then(response => {
            
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Generate Payroll</div>
                            <button onClick={this.generatePayroll}>Export Payslip</button>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

if (document.getElementById('generate-payroll')) {
    ReactDOM.render(<GeneratePayroll />, document.getElementById('generate-payroll'));
}
