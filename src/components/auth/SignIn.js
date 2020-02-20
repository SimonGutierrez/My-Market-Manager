import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { signInThunkCreator } from '../../store/reducers/authReducer';

export class SignIn extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.signInThunk(this.state);
  }

  render() {
    const { auth } = this.props;

    if (auth.uid) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className="container">
          <form onSubmit={this.handleSubmit} className="card white">
            <h5 className="grey-text text-darken-3">Sign In</h5>

            <div className="input-field">
              <label htmlFor="email">
                Email<span className="red-text-color">*</span>
              </label>

              <input
                type="email"
                id="email"
                required
                autoComplete="username"
                onChange={this.handleChange}
              />
            </div>

            <div className="input-field">
              <label htmlFor="password">
                Password<span className="red-text-color">*</span>
              </label>

              <input
                type="password"
                id="password"
                required
                autoComplete="current-password"
                onChange={this.handleChange}
              />
            </div>

            <div className="input-field">
              <button className="btn blue lighten-1 z-depth-0">Sign In</button>
            </div>
            
          </form>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  authError: state.auth.authError,
});

const mapDispatchToProps = dispatch => ({
  signInThunk(userCredentials) {
    dispatch(signInThunkCreator(userCredentials));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
