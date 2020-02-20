import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { signOutThunkCreator } from '../../store/reducers/authReducer';

const SignedInLinks = ({ profile, signOutThunk }) => {
  return (
    <ul className="right">
      <li>
        <NavLink to="/">
        <span className="bold-text-style">Home</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/search">
          <span className="bold-text-style">Search</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/" onClick={signOutThunk}>
          <span className="bold-text-style">Sign Out</span>
        </NavLink>
      </li>
    </ul>
  );
};

const mapDispatchToProps = dispatch => ({
  signOutThunk() {
    dispatch(signOutThunkCreator());
  },
});

export default connect(
  null,
  mapDispatchToProps
)(SignedInLinks);
