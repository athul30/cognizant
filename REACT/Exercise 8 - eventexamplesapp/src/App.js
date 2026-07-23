import React from 'react';
import CurrencyConvertor from './CurrencyConvertor';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        };
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.sayHello = this.sayHello.bind(this);
        this.sayWelcome = this.sayWelcome.bind(this);
        this.handlePress = this.handlePress.bind(this);
    }

    increment() {
        this.setState({ counter: this.state.counter + 1 });
        this.sayHello();
    }

    decrement() {
        this.setState({ counter: this.state.counter - 1 });
    }

    sayHello() {
        console.log('Hello, this is a static message.');
    }

    sayWelcome(message) {
        alert('Say ' + message);
    }

    handlePress(event) {
        alert('I was clicked');
    }

    render() {
        return (
            <div>
                <h2>Counter: {this.state.counter}</h2>
                <button onClick={this.increment}>Increment</button>
                <button onClick={this.decrement}>Decrement</button>

                <br />
                <button onClick={() => this.sayWelcome('welcome')}>Say Welcome</button>

                <br />
                <button onClick={this.handlePress}>OnPress</button>

                <CurrencyConvertor />
            </div>
        );
    }
}

export default App;
