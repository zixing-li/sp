import axios from "axios";

import {
  ADD_POST,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_POSTS,
  GET_POST,
  POST_LOADING,
  DELETE_POST
} from "./types";

// Add Post
// export const addPost = (postData, file, history) => dispatch => {

//   dispatch(clearErrors());
//   axios
//     .post("/api/posts", postData)
//     .then(res =>
//       dispatch({
//         type: ADD_POST,
//         payload: res.data
//       })
//     )
//     .then(history.push("/feed"))
//     // .then(res => history.push(`/post/${res.data._id}`))
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };

export const addPost = (postData, file, history) => async dispatch => {
  // const uploadConfig = await axios.get("/api/upload");

  // await axios.put(uploadConfig.data.url, file, {
  //   headers: {
  //     "Content-Type": file.type
  //   }
  // });
  console.log("file", file);

  let uploadConfig = null;
  if (file) {
    uploadConfig = await axios.get("/api/upload");
    console.log("uploadConfig", uploadConfig.data.url);

    console.log("content-type", file.type);

    await axios.put(uploadConfig.data.url, file, {
      headers: {
        "Content-Type": file.type
      }
    });
  }

  const res = await axios.post("/api/posts", {
    ...postData,
    imageUrl: file ? uploadConfig.data.key : null
  });

  // const res = await axios.post("/api/posts", postData);

  history.push("/feed");
  // .then(res => history.push(`/post/${res.data._id}`))

  dispatch(clearErrors());
  dispatch({
    type: ADD_POST,
    payload: res.data
  });
};

// Get Posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get("/api/posts")
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};

// Get Post
export const getPost = id => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POST,
        payload: null
      })
    );
};

// Delete Post
export const deletePost = id => dispatch => {
  axios
    .delete(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Like Post
export const addLikePost = id => dispatch => {
  axios
    .post(`/api/posts/like/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Remove Like Post
export const removeLikePost = id => dispatch => {
  axios
    .post(`/api/posts/unlike/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Comment
export const addComment = (postId, commentData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/posts/comment/${postId}`, commentData)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Comment
export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Like Comment
export const addLikeComment = (postId, commentId) => dispatch => {
  axios
    .post(`/api/posts/comment/like/${postId}/${commentId}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Remove Like Comment
export const removeLikeComment = (postId, commentId) => dispatch => {
  axios
    .post(`/api/posts/comment/unlike/${postId}/${commentId}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
