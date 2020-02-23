import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTransactionsThunkCreator } from '../../store/reducers/transactionsReducer';

class TransactionsPage extends Component {
  constructor() {
    super();

    this.state = {
      dummyData: [
        {
        date: '1582411571207',
        companyName: 'apple',
        symbol: 'AAPL',
        buyPrice: 20,
        numOfSharesBought: 5,
        total: 100,
        type: 'Buy',
        },
        {
          symbol: 'AAPL',
          companyName: 'apple',
          buyPrice: 20,
          numOfSharesBought: 5,
          total: 100,
          type: 'Buy',
          date: '1582411571207',
          },
          {
            symbol: 'AAPL',
            companyName: 'apple',
            buyPrice: 20,
            numOfSharesBought: 5,
            total: 100,
            type: 'Buy',
            date: '1582411571207',
            },
      ],
    };
  }

  componentDidMount() {
    this.props.getTransactions(this.props.auth.uid)
  }

  renderTableData() {
    return this.props.transactions.map((stock) => {
      const { 
        date,
        companyName, 
        symbol, 
        buyPrice, 
        numOfSharesBought, 
        total, 
        type, 
         } = stock 
      return (
         <tr key={date}>
            <td >{date}</td>
            <td>{companyName}</td>
            <td>{symbol}</td>
            <td>${buyPrice}</td>
            <td>{numOfSharesBought}</td>
            <td>${total}</td>
            <td>{type}</td>
         </tr>
      )
    })
  }

  renderTableHeader() {
    let header = Object.keys(this.props.transactions[0])
    return header.map((key, index) => {
       return <th key={index}>{key.toUpperCase()}</th>
    })
 }
    
    render () {
      console.log("transactions>>>:", this.props.transactions)
      return (
        <div className="section">
          <div className="card z-depth-0">
            <div className="card-content grey-text text-darken-3">
              <h1 className='title'>Transactions</h1>
              <table className='transactions'>
                <tbody>
                  { this.props.transactions.length ?
                    <tr>{this.renderTableHeader()}</tr> : 
                    <tr>
                      <th>No Transactions yet</th>
                      </tr>
                  }
                  {
                    this.props.transactions.length ?
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
    transactions: state.transactions,
  });
  
const mapDispatchToProps = dispatch => ({
    getTransactions(userId) {
        dispatch(getTransactionsThunkCreator(userId));
    },
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(TransactionsPage);
  