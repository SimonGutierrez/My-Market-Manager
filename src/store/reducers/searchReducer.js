import axios from 'axios';
import { alphaApiToken } from '../../secrets';

// Initial State
const initialState = {
    searchResults: {},
  };
  
  // Action
  const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
  const SEARCH_ERROR = 'SEARCH_ERROR';
  const CLEAR_SEARCH ='CLEAR_SEARCH';
  
  // Action Creators
  const searchSuccessActionCreator = stock => ({
    type: SEARCH_SUCCESS,
    stock,
  });
  
  const searchErrorActionCreator = error => ({
    type: SEARCH_ERROR,
    error,
  });

  const clearSearchActionCreator = () => ({
      type: CLEAR_SEARCH,
  })
  
  // Thunk Creators
  export const searchThunkCreator = (ticker) => {
    return async (dispatch) => {
      try {
        const { data } = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=5min&apikey=${alphaApiToken}`);
  
        dispatch(searchSuccessActionCreator(data));
      } catch (error) {
        console.error(error);
        dispatch(searchErrorActionCreator(error));
      }
    };
  };

  export const clearSearchThunkCreator = () => {
    return async (dispatch) => {
      try {
        dispatch(clearSearchActionCreator());
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
        return { ...state, searchResults: action.stock };
      case CLEAR_SEARCH:
        return { ...state, searchResults: {} };
      case SEARCH_ERROR:
        return { ...state, searchResults: action.error.message };   
      default:
        return state;
    }
  };
  
  export default SearchReducer;