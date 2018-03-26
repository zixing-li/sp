import axios from 'axios';
import {
  FETCH_USER
} from './types';

// export const fetchUser = () => {
//   return function(dispatch) {
//     axios
//       .get('/api/current_user') // relative path to backend server
//       .then(res => dispatch({ type: FETCH_USER, payload: res }))
//   }
// };

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user') // relative path to backend server
  dispatch({ type: FETCH_USER, payload: res });
}

export const selectIndustry = (selectedIndustry) => ({
  type: 'SELECT_INDUSTRY',
  selectedIndustry
});