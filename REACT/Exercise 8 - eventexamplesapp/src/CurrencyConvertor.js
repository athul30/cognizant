import React from 'react';

class CurrencyConvertor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rupees: 0,
            euro: 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ rupees: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const conversionRate = 0.011;
        this.setState({ euro: (this.state.rupees * conversionRate).toFixed(2) });
    }

    render() {
        return (
            <div>
                <h3>Currency Convertor</h3>
                <input type="number" value={this.state.rupees} onChange={this.handleChange} />
                <button onClick={this.handleSubmit}>Convert</button>
                <p>Euro: {this.state.euro}</p>
            </div>
        );
    }
}

export default CurrencyConvertor;
