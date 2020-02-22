import React from 'react';

const WelcomeMessage = ({profile}) => {
  const {firstName, balance} = profile;
  
  return (
    <div className="section">
      <div className="card z-depth-0">
        <div className="card-content grey-text text-darken-3">
          <span className="card-title">
            <span className="bold-text-style">Welcome {firstName}!</span>
          </span>

          <ul className="placeholder">
            <li>
              <span>Your current balance is: ${Number.parseFloat(balance).toFixed(2)} </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
