import axios from 'axios';
import {
  FETCH_USER,
  SELECT_INDUSTRY
} from './types';

// export const fetchUser = () => {
//   return function(dispatch) {
//     axios
//       .get('/api/current_user') // relative path to backend server
//       .then(res => dispatch({ type: FETCH_USER, payload: res }))
//   }
// };

export const fetchUser = () => async dispatch => { // = async (dispatch)
  const res = await axios.get('/api/current_user'); // relative path to backend server
  dispatch({ type: FETCH_USER, payload: res.data }); // res is the output from axios, underlying request made to the backend server
}

export const handleToken = (token) => async dispatch => {
  const res = await axios.post('/api/stripe', token);
  dispatch({ type: FETCH_USER, payload: res.data });
}

export const selectIndustry = (selectedIndustry) => ({
  type: SELECT_INDUSTRY,
  selectedIndustry
});