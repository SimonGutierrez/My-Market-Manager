import React, { useState } from 'react';
import { clearSearchThunkCreator } from '../../store/reducers/searchReducer';
import { buyStockThunkCreator } from '../../store/reducers/stockReducer';
import { connect } from 'react-redux';

function BuyStock ({auth, profile, clearSearch, buyStock, searchResults}) {
    const [amount, setAmount] = useState(1);

    const handleChange = (event) => {
        const newAmount = event.target.value;
        setAmount(newAmount);
      }

        const date = Date();
        let stockBought = {};
        
        if (searchResults["Meta Data"]) {
            const stockDate = searchResults["Meta Data"]["3. Last Refreshed"];
            
            stockBought = {
                symbol: searchResults["Meta Data"]["2. Symbol"],
                buyPrice: Number.parseFloat(Number(searchResults["Time Series (5min)"][stockDate]["1. open"])).toFixed(2),
                numOfSharesBought: amount,
                total: Number.parseFloat(amount * Number(searchResults["Time Series (5min)"][stockDate]["1. open"])).toFixed(2),
                date: date.toString(),
            }
        }
        
        const currBalance = profile.balance - stockBought.total;

        return (
            <div className="section">
                <div className="card z-depth-0">
                    <div className="card-content grey-text text-darken-3">
                        <span className="card-title">
                            <span className="bold-text-style">Company: {stockBought.symbol ? stockBought.symbol.toUpperCase() : 'No Company Yet'} </span>
                        </span>

                        <ul className="placeholder">
                            <li>
                            <span className="bold-text-style" >Your Wallet: ${Number.parseFloat(profile.balance).toFixed(2)}</span>
                            </li>

                            <li>
                            <span className="bold-text-style" >Current Price: ${stockBought.buyPrice}</span>
                            </li>
                            
                            <li>
                                <label htmlFor="amount">
                                Number of Shares<span className="red-text-color">*</span>
                                </label>

                                <input
                                type="number"
                                id="amount"
                                value={amount}
                                min="1"
                                onChange={handleChange}
                                />
                            </li>
                            
                            <li>
                                <span className="bold-text-style">Total: ${stockBought.total}</span>
                            </li>
                        </ul>
                        <div className="input-field">
                            <button 
                            className="btn blue lighten-1 z-depth-0"
                            onClick={
                                () => {
                                    currBalance >= 0 ? buyStock(stockBought, auth.uid) : window.alert('Not enough funds!')
                                    clearSearch()
                                    setAmount(1)
                            }}
                            >
                                Buy
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

const mapStateToProps = state => ({
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  });
  
const mapDispatchToProps = dispatch => ({
    clearSearch() {
      dispatch(clearSearchThunkCreator());
    },
    buyStock(stock, userId) {
        dispatch(buyStockThunkCreator(stock, userId));
    },
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(BuyStock);