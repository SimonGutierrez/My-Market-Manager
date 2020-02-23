import { getFirestore } from 'redux-firestore';

// Initial State
const initialState = {
    transactions: [],
  };
  
  // Action
  const GET_TRANSACTIONS_SUCCESS = 'GET_TRANSACTIONS_SUCCESS';
  const GET_TRANSACTIONS_ERROR = 'GET_TRANSACTIONS_ERROR';
  
  // Action Creators
  const getTransactionsSuccessActionCreator = transactions => ({
    type: GET_TRANSACTIONS_SUCCESS,
    transactions,
  });
  
  const getTransactionsErrorActionCreator = error => ({
    type: GET_TRANSACTIONS_ERROR,
    error,
  });
  
  // Thunk Creators
  export const getTransactionsThunkCreator = (userId) => {
    return async (dispatch) => {
      try {
        let usersTransactions = [];
        // first make an instance of our database (fireStore)
        const fireStore = getFirestore();
        // using that instance make a call to update/get the database with the desired data
        const transactionsRef = await fireStore
                                        .collection('users')
                                        .doc(userId)
                                        .collection('transactions')
                                        .get();
        
        transactionsRef.docs.forEach(doc => {
            const data = doc.data();
            usersTransactions.push({
                date: data.date,
                companyName: data.companyName,
                symbol: data.symbol,
                buyPrice: data.buyPrice,
                numOfSharesBought: data.numOfSharesBought,
                total: data.total,
                type: data.type,
            })
        })

        dispatch(getTransactionsSuccessActionCreator(usersTransactions));
      } catch (error) {
        console.error(error);
        dispatch(getTransactionsErrorActionCreator(error));
      }
    };
  };
 
  // Reducer
  const transactionsReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_TRANSACTIONS_SUCCESS:
        return action.transactions;
      case GET_TRANSACTIONS_ERROR:
        return { ...state, transactions: action.error.message };   
      default:
        return state;
    }
  };
  
  export default transactionsReducer;