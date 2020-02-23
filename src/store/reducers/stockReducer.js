import { getFirestore } from 'redux-firestore';

// Initial State
const initialState = {
    currStock: {},
  };
  
  // Action
  const BUY_STOCK_SUCCESS = 'BUY_STOCK_SUCCESS';
  const BUY_STOCK_ERROR = 'BUY_STOCK_ERROR';
  
  // Action Creators
  const buyStockSuccessActionCreator = stock => ({
    type: BUY_STOCK_SUCCESS,
    stock,
  });
  
  const buyStockErrorActionCreator = error => ({
    type: BUY_STOCK_ERROR,
    error,
  });
  
  // Thunk Creators
  export const buyStockThunkCreator = (stock, userId) => {
    return async (dispatch) => {
      try {
        // first make an instance of our database (fireStore)
        const fireStore = getFirestore();
        const total = stock.total;
        const decrement = fireStore.FieldValue.increment(-total);
        // using that instance make a call to update the database with the desired data
        const currUsersProfile = await fireStore
                                        .collection('users')
                                        .doc(userId);

        await currUsersProfile.update({balance: decrement});

        await fireStore
            .collection('users')
            .doc(userId)
            .collection('portfolio')
            .doc(stock.symbol)
            .collection('date')
            .doc(stock.date.toString())
            .set(stock);

        stock.type = 'Buy';

        await fireStore
          .collection('users')
          .doc(userId)
          .collection('transactions')
          .doc(stock.date.toString())
          .set(stock)
    
        dispatch(buyStockSuccessActionCreator(stock));
      } catch (error) {
        console.error(error);
        dispatch(buyStockErrorActionCreator(error));
      }
    };
  };
 
  // Reducer
  const buyStockReducer = (state = initialState, action) => {
    switch (action.type) {
      case BUY_STOCK_SUCCESS:
        return { ...state, currStock: action.stock };
      case BUY_STOCK_ERROR:
        return { ...state, currStock: action.error.message };   
      default:
        return state;
    }
  };
  
  export default buyStockReducer;