import React, { Component } from "react";
import "./App.css";

class Registration extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);

    this.state = {
      firstName: "",
      lastName: "",
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
    console.log("Registration: onChange", name, value);
  }

  render() {
    return (
      <div className="Registration">
        <h1>Sign up for a free account</h1>
        <form onSubmit={(evt) => {
          evt.preventDefault(); // prevent putting query parameters to URL
          this.props.onSubmit(this.state.firstName, this.state.lastName, this.state.email, this.state.password);
        }}>
          <div className="row">
            <input name="firstName" type="text" value={this.state.firstName} onChange={this.onChange} placeholder="First name" />
            <input name="lastName" type="text" value={this.state.lastName} onChange={this.onChange} placeholder="Last name" />
          </div>
          <div className="single">
            <input name="email" type="email" value={this.state.email} onChange={this.onChange} placeholder="Email address" />
          </div>
          <div className="single">
            <input name="password" type="password" value={this.state.password} onChange={this.onChange} placeholder="Create password" />
          </div>
          <input type="submit" value="Register" />
        </form>
      </div>
    );
  }
}

export default Registration;
