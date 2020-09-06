import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import SignedInLinks from './SignedInLinks';
import SignedInLinksBurger from './SignedInLinksBurger';
import SignedOutLinks from './SignedOutLinks';
import SignedOutLinksBurger from './SignedOutLinksBurger';

function Navbar ({auth, profile}) {
  const [width, updateWidth] = useState(0);
  
  const updateWindowDimensions = () => {
    updateWidth(window.innerWidth);
  }

  useEffect(() => {
    updateWindowDimensions();
    window.addEventListener('resize', updateWindowDimensions);
    return () => {
      window.removeEventListener('resize', updateWindowDimensions);
    }
  }, [])

    const largeViewCheck = width > 1007;
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
                <span className="bold-text-style">My Market Manager</span>  
            </NavLink>

            {curLinks}
          </div>
        </nav>
      </div>
    );
}

const mapStateToProps = state => {
  return { auth: state.firebase.auth, profile: state.firebase.profile };
};

export default connect(mapStateToProps)(Navbar);
