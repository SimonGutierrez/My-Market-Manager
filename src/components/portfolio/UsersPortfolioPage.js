import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { getTransactionsThunkCreator } from '../../store/reducers/transactionsReducer';

class UsersPortfolioPage extends Component {
  constructor() {
    super();

    this.state = {
        dummyData : [
            {
                companyName: 'apple',
                symbol: 'aapl',
                numOfSharesBought: 5,
                currentPrice: 500,
                openingPrice: 400,
            },
            {
                companyName: 'microsoft',
                symbol: 'msft',
                numOfSharesBought: 10,
                currentPrice: 100,
                openingPrice: 300,
            },
        ]
    };
  }

  componentDidMount() {
    // this.props.getTransactions(this.props.auth.uid)
  }

  renderTableData() {
    return this.state.dummyData.map((stock, index) => {
      const { 
        companyName, 
        symbol, 
        numOfSharesBought, 
        currentPrice, 
        openingPrice, 
         } = stock 
      return (
         <tr key={index}>
            <td>{companyName}</td>
            <td>{symbol}</td>
            <td>{numOfSharesBought}</td>
            <td>${currentPrice}</td>
            <td>${openingPrice}</td>
         </tr>
      )
    })
  }

  renderTableHeader() {
    let header = Object.keys(this.state.dummyData[0])
    return header.map((key, index) => {
       return <th key={index}>{key.toUpperCase()}</th>
    })
 }
    
    render () {
      return (
        <div className="section">
          <div className="card z-depth-0">
            <div className="card-content grey-text text-darken-3">
              <h1 className='title'>My Portfolio</h1>
              <table className='transactions'>
                <tbody>
                  { this.state.dummyData.length ?
                    <tr>{this.renderTableHeader()}</tr> : 
                    <tr>
                      <th>No Stock Owned Yet</th>
                      </tr>
                  }
                  {
                    this.state.dummyData.length ?
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
    // auth: state.firebase.auth,
    // transactions: state.transactions,
  });
  
const mapDispatchToProps = dispatch => ({
    // getTransactions(userId) {
    //     dispatch(getTransactionsThunkCreator(userId));
    // },
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(UsersPortfolioPage);