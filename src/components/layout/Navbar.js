import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import SignedInLinks from './SignedInLinks';
import SignedInLinksBurger from './SignedInLinksBurger';
import SignedOutLinks from './SignedOutLinks';
import SignedOutLinksBurger from './SignedOutLinksBurger';

class Navbar extends Component {
  constructor() {
    super();

    this.state = {
      width: 0,
    };

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth });
  }

  render() {
    const { auth, profile } = this.props;
    const largeViewCheck = this.state.width > 1007;
    let curLinks;

    if (auth.uid) {
      if (largeViewCheck) {
        curLinks = <SignedInLinks profile={profile} />;
      } else {
        curLinks = <SignedInLinksBurger profile={profile} />;
      }
    } else if (largeViewCheck) {
      curLinks = <SignedOutLinks />;
    } else {
      curLinks = <SignedOutLinksBurger />;
    }

    return (
      <div className="navbar-fixed">
        <nav className="nav-wrapper grey darken-3">
          <div>
            <NavLink to="/" className="left brand-logo name-text-positioning">
              {largeViewCheck ? (
                <span className="bold-text-style">My Market Manager</span>
              ) : (
                <span className="bold-text-style">Bplater</span>
              )}
            </NavLink>

            {curLinks}
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log('state: ', state);

  return { auth: state.firebase.auth, profile: state.firebase.profile };
};

export default connect(mapStateToProps)(Navbar);
