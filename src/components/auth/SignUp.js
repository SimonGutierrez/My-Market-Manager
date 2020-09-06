import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { signUpThunkCreator } from '../../store/reducers/authReducer';

export function SignUp ({signUpThunk, auth}) {
  const [newUser, setNewUser] = useState({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
  });

  const handleChange = (event) => {
    const target = event.target.id;
    const value = event.target.value;
    setNewUser({...newUser, [target]: value});
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    signUpThunk(newUser);
 
  }

    if (auth.uid) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className="container">
          <form onSubmit={handleSubmit} className="card white">
            <h5 className="grey-text text-darken-3">Sign Up</h5>

            <div className="input-field">
              <label htmlFor="email">
                Email<span className="red-text-color">*</span> (Example:
                cody@email.com)
              </label>

              <input
                type="email"
                id="email"
                required
                autoComplete="username"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title="Example: cody@email.com"
                onChange={handleChange}
              />
            </div>

            <div className="input-field">
              <label htmlFor="password">
                Password<span className="red-text-color">*</span> (May only
                contain one uppercase letter, one lowercase letter, one digit,
                and at least 8 characters in total)
              </label>

              <input
                type="password"
                id="password"
                required
                autoComplete="current-password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}"
                title="May only contain one uppercase letter, one lowercase letter, one digit, and at least 8 characters in total"
                onChange={handleChange}
              />
            </div>

            <div className="input-field">
              <label htmlFor="firstName">
                First Name<span className="red-text-color">*</span> (May only
                contain uppercase and lowercase letters only, and at least 2
                characters in total)
              </label>

              <input
                type="text"
                id="firstName"
                required
                pattern="[A-Za-z]{2,32}"
                title="May only contain uppercase and lowercase letters only, and at least 2 characters in total"
                onChange={handleChange}
              />
            </div>

            <div className="input-field">
              <label htmlFor="lastName">
                Last Name<span className="red-text-color">*</span> (May only
                contain uppercase and lowercase letters only, and at least 2
                characters in total)
              </label>

              <input
                type="text"
                id="lastName"
                required
                pattern="[A-Za-z]{2,32}"
                title="May only contain uppercase and lowercase letters only, and at least 2 characters in total"
                onChange={handleChange}
              />
            </div>

            <button className="btn blue lighten-1 z-depth-0">Sign Up</button>

          </form>
        </div>
      );
    }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
});

const mapDispatchToProps = dispatch => ({
  signUpThunk(newUser) {
    dispatch(signUpThunkCreator(newUser));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
