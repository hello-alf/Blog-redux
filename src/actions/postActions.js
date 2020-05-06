import axios from 'axios';
import { GET_BY_USER, 
  LOADING, 
  ERROR, 
  COM_LOADING, 
  COM_ERROR,
  GET_COMMENTS
} from '../types/postTypes';
import { GET_USERS } from '../types/userTypes'

// export const getPosts = () =>  async (dispatch) => {

//   try {
//     const request = await axios.get("https://jsonplaceholder.typicode.com/posts");
//     // se comunica con el reducer
//     dispatch({
//       type: GET_BY_USER,
//       payload: request.data,
//       error: ''
//     });
//   } catch (error) {
//     console.log(error)
//     dispatch({
//       type: ERROR,
//       payload: 'Algo salió mal, intenta más tarde'//error.message
//     });
//   }
// }


export const getByUser = (key) => async(dispatch, getState) => {
  dispatch({
    type: LOADING,
  });
  //get State obtiene el estado actual
  const {users} = getState().userReducer;
  const {posts} = getState().postReducer;
  const user_id = users[key].id;
  console.log("user_id", user_id)

  try {
    const request = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${user_id}`);
    const news = request.data.map((post) => ({
      ...post,
      comments: [],
      open: false
    }));
    const posts_updated = [
      ...posts,
      news
    ];

    dispatch({
      type: GET_BY_USER,
      payload: posts_updated
    });

    const posts_key = posts_updated.length -1
    const users_updated = [...users];
    users_updated[key] = {
      ...users[key],
      posts_key
    }

    dispatch({
      type: GET_USERS,
      payload: users_updated
    });

  } catch (error) {
    console.log(error)
    dispatch({
      type: ERROR,
      payload: 'Publicaciones no disponibles'//error.message
    });
  }
}

export const openClose = (posts_key, com_key) => (dispatch, getState) => {
  const { posts } = getState().postReducer
  const selected = posts[posts_key][com_key];

  const updated = {
    ...selected,
    open: !selected.open
  }

  // Inmutabilidad?
  const posts_updated = [...posts];
  // posts_updated[posts_key] = [
  //   ...posts[posts_key]
  // ]

  posts_updated[posts_key][com_key] = updated;
  dispatch({
    type: GET_BY_USER,
    payload: posts_updated
  });
}

export const getComments = (posts_key, com_key) => async(dispatch, getState) => {
  dispatch({
    type: COM_LOADING,
  });
  const { posts } = getState().postReducer
  const selected = posts[posts_key][com_key];
  try {
    const request = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${selected.id}`)
    const updated = {
      ...selected,
     comments: request.data
    }
    const posts_updated = [...posts];
    posts_updated[posts_key][com_key] = updated;
    dispatch({
      type: GET_COMMENTS,
      payload: posts_updated
    });
  } catch (error) {
    console.log(error)
    console.log('llamando a COM_ERROR')
    dispatch({
      type: COM_ERROR,
      payload: 'Comentarios no disponibles'//error.message
    });
  }
}