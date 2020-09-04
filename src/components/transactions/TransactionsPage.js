import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getTransactionsThunkCreator } from '../../store/reducers/transactionsReducer';

function TransactionsPage ({auth, transactions, getTransactions}) {

  useEffect(() => getTransactions(auth.uid), [auth.uid, getTransactions]);

  const renderTableData = () => {
    return transactions.map((stock) => {
      const { 
        date,
        symbol, 
        buyPrice, 
        shares, 
        total, 
        type, 
         } = stock 
      return (
         <tr key={date}>
            <td >{date}</td>
            <td>{symbol.toUpperCase()}</td>
            <td>${Number.parseFloat(buyPrice).toFixed(2)}</td>
            <td>{shares}</td>
            <td>${Number.parseFloat(total).toFixed(2)}</td>
            <td>{type}</td>
         </tr>
      )
    })
  }

  const renderTableHeader = () => {
    let header = Object.keys(transactions[0])
    return header.map((key, index) => {
       return <th key={index}>{key.toUpperCase()}</th>
    })
 }
    
      return (
        <div className="section">
          <div className="card z-depth-0">
            <div className="card-content grey-text text-darken-3">
              <h1 className='title'>Transactions</h1>
              <table className='transactions'>
                <tbody>
                  { transactions.length ?
                    <tr>{renderTableHeader()}</tr> : 
                    <tr>
                      <th>No Transactions yet</th>
                      </tr>
                  }
                  {
                    transactions.length ?
                    renderTableData() :
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
  }

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  transactions: state.transactions,
});
  
const mapDispatchToProps = dispatch => ({
    getTransactions(userId) { 
      dispatch(getTransactionsThunkCreator(userId))
    },
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(TransactionsPage);
  