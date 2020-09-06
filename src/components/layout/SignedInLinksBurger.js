import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { slide as Menu } from 'react-burger-menu';

import { signOutThunkCreator } from '../../store/reducers/authReducer';
import { burgerStyles } from '../../styles';

function SignedInLinksBurger ({signOutThunk}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleStateChange = (state) => {
    setMenuOpen(state.isOpen);
  }

  const closeMenu = () => {
    setMenuOpen(false);
  }

    return (
      <div>
        <Menu
          isOpen={menuOpen}
          onStateChange={state => handleStateChange(state)}
          right
          width="50%"
          styles={burgerStyles}
        >
          <div className="remove-outline">
            <div>
              <NavLink onClick={() => closeMenu()} to="/">
              <span className="bold-text-style">Home</span>
              </NavLink>
            </div>

            <div>
              <NavLink onClick={() => closeMenu()} to="/search">
                <span className="bold-text-style">Search and Buy</span>
              </NavLink>
            </div>

            <div>
              <NavLink onClick={() => closeMenu()} to="/portfolio">
                <span className="bold-text-style">Portfolio</span>
              </NavLink>
            </div>

            <div>
              <NavLink onClick={() => closeMenu()} to="/transactions">
                <span className="bold-text-style">Transactions</span>
              </NavLink>
            </div>

            <div>
              <NavLink
                onClick={() => {
                  closeMenu();
                  signOutThunk();
                }}
                to="/"
              >
                <span className="bold-text-style">Sign Out</span>
              </NavLink>
            </div>
          </div>
        </Menu>
      </div>
    );
}

const mapDispatchToProps = dispatch => ({
  signOutThunk() {
    dispatch(signOutThunkCreator());
  },
});

export default connect(
  null,
  mapDispatchToProps
)(SignedInLinksBurger);
