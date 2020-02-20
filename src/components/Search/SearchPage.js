import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchThunkCreator } from '../../store/reducers/searchReducer';

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
  }

  render () {
    console.log('searchResults>>>>:', this.props.stock);
    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m12">
            <div className="section">
              <div className="card z-depth-0">
                <form onSubmit={this.handleSubmit} className="card white">
                  <div className="card-content grey-text text-darken-3">
                    <span className="card-title">
                      <span className="bold-text-style">Search</span>
                    </span>

                    <div className="input-field">
                      <label htmlFor="ticker">
                        Ticker<span className="red-text-color">*</span>
                      </label>

                      <input
                        type="text"
                        id='ticker'
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <button className="btn blue lighten-1 z-depth-0">Sign In</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  stock: state.search,
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
