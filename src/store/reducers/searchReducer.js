import axios from 'axios';
import { apiToken } from '../../secrets';

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
  export const searchThunkCreator = (ticker) => {
    return async (dispatch) => {
      try {
        const { data } = await axios.get(`https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=${apiToken}`);
  
        dispatch(searchSuccessActionCreator(data));
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
  
      case SEARCH_ERROR:
        return { ...state, searchResults: action.error.message };
  
      default:
        return state;
    }
  };
  
  export default SearchReducer;