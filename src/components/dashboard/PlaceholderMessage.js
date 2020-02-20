import React from 'react';

const PlaceholderMessage = props => {
  return (
    <div className="section">
      <div className="card z-depth-0">
        <div className="card-content grey-text text-darken-3">
          <span className="card-title">
            <span className="bold-text-style">Welcome {props.profile.firstName}!</span>
          </span>

          <ul className="placeholder">
            <li>
              <span>Your current balance is: {props.profile.balance} </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderMessage;
