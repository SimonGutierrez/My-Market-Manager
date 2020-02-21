import React from 'react';

const SingleStock = ({searchResults, amount}) => {
    console.log("searchResults>>>>:", searchResults)
    console.log("amount>>>>>:", amount)
  return (
    <div className="section">
      <div className="card z-depth-0">
        <div className="card-content grey-text text-darken-3">
          <span className="card-title">
            <span className="bold-text-style">Welcome !</span>
          </span>

          <ul className="placeholder">
            <li>
              <span>Your current balance is:</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SingleStock;