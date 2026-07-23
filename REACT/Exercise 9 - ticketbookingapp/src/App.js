import React from 'react';
import Guest from './Guest';
import User from './User';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        };
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogin() {
        this.setState({ isLoggedIn: true });
    }

    handleLogout() {
        this.setState({ isLoggedIn: false });
    }

    render() {
        return (
            <div>
                {this.state.isLoggedIn ? (
                    <button onClick={this.handleLogout}>Logout</button>
                ) : (
                    <button onClick={this.handleLogin}>Login</button>
                )}

                {this.state.isLoggedIn ? <User /> : <Guest />}
            </div>
        );
    }
}

export default App;
