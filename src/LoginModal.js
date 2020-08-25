import React, { Component } from "react";
import "./App.css";

class LoginModal extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);

    this.state = {
      email: "",
      password: ""
    };
  }

  onChange(evt) {
    const target = evt.target;
    const {name, value} = target;
    this.setState({
      [name]: value
    });
    console.log("LoginModal: onChange", name, value);
  }

  render() {
    return (
      <div className="LoginModal">
        <h1>Login</h1>
        <form onSubmit={(evt) => {
          evt.preventDefault(); // prevent putting query parameters to URL
          this.props.onSubmit(this.state.email, this.state.password);
        }}>
          <div className="row">
            <input name="email" type="email" value={this.state.email} onChange={this.onChange} placeholder="Email address" />
            <input name="password" type="password" value={this.state.password} onChange={this.onChange} placeholder="Create password" />
          </div>
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

export default LoginModal;
