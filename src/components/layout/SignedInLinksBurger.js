import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { slide as Menu } from 'react-burger-menu';

import { signOutThunkCreator } from '../../store/reducers/authReducer';
import { burgerStyles } from '../../styles';

class SignedInLinksBurger extends Component {
  constructor() {
    super();

    this.state = {
      menuOpen: false,
    };

    this.handleStateChange = this.handleStateChange.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen });
  }

  closeMenu() {
    this.setState({ menuOpen: false });
  }

  render() {
    return (
      <div>
        <Menu
          isOpen={this.state.menuOpen}
          onStateChange={state => this.handleStateChange(state)}
          right
          width="50%"
          styles={burgerStyles}
        >
          <div className="remove-outline">
            <div>
              <NavLink onClick={() => this.closeMenu()} to="/">
              <span className="bold-text-style">Home</span>
              </NavLink>
            </div>

            <div>
              <NavLink onClick={() => this.closeMenu()} to="/search">
                <span className="bold-text-style">Search and Buy</span>
              </NavLink>
            </div>

            <div>
              <NavLink onClick={() => this.closeMenu()} to="/portfolio">
                <span className="bold-text-style">Portfolio</span>
              </NavLink>
            </div>

            <div>
              <NavLink onClick={() => this.closeMenu()} to="/transactions">
                <span className="bold-text-style">Transactions</span>
              </NavLink>
            </div>

            <div>
              <NavLink
                onClick={() => {
                  this.closeMenu();
                  this.props.signOutThunk();
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
