import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { signInThunkCreator } from '../../store/reducers/authReducer';

export function SignIn ({signInThunk, auth}) {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const target = event.target.id;
    const value = event.target.value;

    setUser({...user, [target]: value});
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    signInThunk(user);
  }

    if (auth.uid) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className="container">
          <form onSubmit={handleSubmit} className="card white">
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
                onChange={handleChange}
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
                onChange={handleChange}
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

const mapStateToProps = state => ({
  auth: state.firebase.auth,
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
