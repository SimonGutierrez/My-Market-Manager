import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchThunkCreator } from '../../store/reducers/searchReducer';
import SingleStock from '../stock-view/Single-Stock';

class SearchPage extends Component {
  constructor() {
    super();

    this.state = {
      ticker: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.searchThunk(this.state.ticker);
    this.setState({
      ticker: '',
    })
  }

  render () {
    const { foundStock } = this.props;
    const { searchResults } = foundStock;

    return (
      <div className="dashboard container">
        <div className="column">
          <div className="col s12 m6">
            <form onSubmit={this.handleSubmit} className="card white">
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
                    value={this.state.ticker}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              
              <div className="input-field">
                <button className="btn blue lighten-1 z-depth-0">Search</button>
              </div>
            </form>
          </div>

          <div className="col s12 m5 offset-m1">
              <SingleStock searchResults={searchResults}/>
            </div>
        </div>
      </div>
    );
  }
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
