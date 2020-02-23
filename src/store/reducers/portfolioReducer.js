import { getFirestore } from 'redux-firestore';
import axios from 'axios';
import { apiToken } from '../../secrets';

// Initial State
const initialState = {
    portfolio: [],
  };
  
  // Action
  const GET_PORTFOLIO_SUCCESS = 'GET_PORTFOLIO_SUCCESS';
  const GET_PORTFOLIO_ERROR = 'GET_PORTFOLIO_ERROR';
  
  // Action Creators
  const getPortfolioSuccessActionCreator = portfolio => ({
    type: GET_PORTFOLIO_SUCCESS,
    portfolio,
  });
  
  const getPortfolioErrorActionCreator = error => ({
    type: GET_PORTFOLIO_ERROR,
    error,
  });
  
  // Thunk Creators
  export const getPortfolioThunkCreator = (userId) => {
    return async (dispatch) => {
      try {
        let usersPortfolio = [];
        // first make an instance of our database (fireStore)
        const fireStore = getFirestore();
        // using that instance make a call to update/get the database with the desired data
        const portfolioRef = await fireStore
                                        .collection('users')
                                        .doc(userId)
                                        .collection('portfolio')
                                        .get();
        
        for (let i = 0; i < portfolioRef.docs.length; i++) {
            let doc = portfolioRef.docs[i];
            const docData = doc.data();
            const { data } = await axios.get(`https://cloud.iexapis.com/stable/stock/${doc.id}/quote?token=${apiToken}`);
  
            let currentValue = docData.totalShares * data.latestPrice;

            usersPortfolio.push({
                companyName: data.companyName,
                symbol: doc.id,
                totalNumOfShares: docData.totalShares,
                currentPrice: data.latestPrice,
                openingPrice: data.open,
                currentValue,
            })
        }

        dispatch(getPortfolioSuccessActionCreator(usersPortfolio));
      } catch (error) {
        console.error(error);
        dispatch(getPortfolioErrorActionCreator(error));
      }
    };
  };
 
  // Reducer
  const portfolioReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_PORTFOLIO_SUCCESS:
        return  action.portfolio;
      case GET_PORTFOLIO_ERROR:
        return { ...state, portfolio: action.error.message };   
      default:
        return state;
    }
  };
  
  export default portfolioReducer;