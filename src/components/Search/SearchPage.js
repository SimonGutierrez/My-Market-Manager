import React, { useState } from 'react';
import { connect } from 'react-redux';
import { searchThunkCreator } from '../../store/reducers/searchReducer';
import BuyStock from '../stocks/BuyStock';

function SearchPage ({foundStock, searchThunk}) {
  const [ticker, setTicker] = useState('')

  const handleChange = (event) => {
    let newTicker = event.target.value;
    setTicker(newTicker);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    searchThunk(ticker);
    setTicker('');
  }

    const { searchResults } = foundStock;

    return (
      <div className="dashboard container">
        <div className="column">
          <div className="col s12 m6">
            <form onSubmit={handleSubmit} className="card white">
              <div className="card-content grey-text text-darken-3">
                <span className="card-title">
                  <span className="bold-text-style">Find Your Company</span>
                </span>

                <div className="input-field">
                  <label htmlFor="ticker">
                    Ticker<span className="red-text-color">*</span>
                  </label>

                  <input
                    type="text"
                    id='ticker'
                    value={ticker}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="input-field">
                <button className="btn blue lighten-1 z-depth-0">Search</button>
              </div>
            </form>
          </div>

          <div className="col s12 m5 offset-m1">
              <BuyStock searchResults={searchResults}/>
            </div>
        </div>
      </div>
    );
};

const mapStateToProps = state => ({
  foundStock: state.search,
});

const mapDispatchToProps = dispatch => ({
  searchThunk(ticker) {
    dispatch(searchThunkCreator(ticker));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage);
