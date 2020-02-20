import axios from 'axios';

// Initial State
const initialState = {
    searchResults: {},
  };
  
  // Action
  const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
  const SEARCH_ERROR = 'SEARCH_ERROR';
  
  // Action Creators
  const searchSuccessActionCreator = stock => ({
    type: SEARCH_SUCCESS,
    stock,
  });
  
  const searchErrorActionCreator = error => ({
    type: SEARCH_ERROR,
    error,
  });
  
  // Thunk Creators
  export const searchThunkCreator = newUser => {
    return async (dispatch) => {
      try {
        const stock = await axios.get('https://cloud.iexapis.com/stable/stock/aapl/quote?token=pk_93e194ee2d534b2aa5ca92f44f3e50e5');
  
        dispatch(searchSuccessActionCreator(stock));
      } catch (error) {
        console.error(error);
        dispatch(searchErrorActionCreator(error));
      }
    };
  };

  
  // Reducer
  const SearchReducer = (state = initialState, action) => {
    switch (action.type) {
      case SEARCH_SUCCESS:
        console.log('Signed up successfully');
        return { ...state, searchResults: action.stock };
  
      case SEARCH_ERROR:
        console.log('Sign up error!', action.error.message);
        return { ...state, searchResults: action.error.message };
  
      default:
        return state;
    }
  };
  
  export default SearchReducer;