import axios from "axios";
import { FETCH_USER, FETCH_SURVEYS, SELECT_CATEGORY } from "./types";

// export const fetchUser = () => {
//   return function(dispatch) {
//     axios
//       .get('/api/current_user') // relative path to backend server
//       .then(res => dispatch({ type: FETCH_USER, payload: res }))
//   }
// };

export const fetchUser = () => async dispatch => {
  // = async (dispatch)
  const res = await axios.get("/api/current_user"); // relative path to backend server
  dispatch({ type: FETCH_USER, payload: res.data }); // res is the output from axios, underlying request made to the backend server
};

export const handleToken = token => async dispatch => {
  const res = await axios.post("/api/stripe", token);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post("/api/surveys", values); // post request to backend server, pass along the values object

  history.push("/surveys"); // after successfully made the post request, redirect user to /surveys
  dispatch({ type: FETCH_USER, payload: res.data }); // dispatch action after the post request is completed
};

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get("/api/surveys");

  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

export const selectCategory = selectedCategory => ({
  type: SELECT_CATEGORY,
  selectedCategory
});
