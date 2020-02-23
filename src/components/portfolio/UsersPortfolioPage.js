import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPortfolioThunkCreator } from '../../store/reducers/portfolioReducer';

class UsersPortfolioPage extends Component {
  constructor() {
    super();

    this.state = {
        dummyData : [
            {
                companyName: 'apple',
                symbol: 'aapl',
                totalNumOfShares: 5,
                currentPrice: 500,
                openingPrice: 400,
            },
            {
                companyName: 'microsoft',
                symbol: 'msft',
                totalNumOfShares: 10,
                currentPrice: 100,
                openingPrice: 300,
            },
        ]
    };
  }

  componentDidMount() {
    this.props.getPortfolio(this.props.auth.uid);
  }

  renderTableData() {
    return this.props.usersPortfolio.map((stock, index) => {
      const { 
        companyName, 
        symbol, 
        totalNumOfShares, 
        currentPrice, 
        openingPrice, 
         } = stock 
      return (
         <tr key={index}>
            <td>{companyName}</td>
            <td>{symbol}</td>
            <td>{totalNumOfShares}</td>
            <td>${currentPrice}</td>
            <td>${openingPrice}</td>
         </tr>
      )
    })
  }

  renderTableHeader() {
    let header = Object.keys(this.props.usersPortfolio[0])
    return header.map((key, index) => {
       return <th key={index}>{key.toUpperCase()}</th>
    })
 }
    
    render () {
        console.log("usersPortfolio?>>>>>:", this.props.usersPortfolio)
      return (
        <div className="section">
          <div className="card z-depth-0">
            <div className="card-content grey-text text-darken-3">
              <h1 className='title'>My Portfolio</h1>
              <table className='transactions'>
                <tbody>
                  { 
                    this.props.usersPortfolio.length ?
                    <tr>{this.renderTableHeader()}</tr> : 
                    <tr>
                      <th>No Stock Owned Yet</th>
                      </tr>
                  }
                  {
                    this.props.usersPortfolio.length ?
                    this.renderTableData() :
                    <tr>
                      <td>Buy some Stock!</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    };
  }
  
const mapStateToProps = state => ({
    auth: state.firebase.auth,
    usersPortfolio: state.portfolio,
  });
  
const mapDispatchToProps = dispatch => ({
    getPortfolio(userId) {
        dispatch(getPortfolioThunkCreator(userId));
    },
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(UsersPortfolioPage);