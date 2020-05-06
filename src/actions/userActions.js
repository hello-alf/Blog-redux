import axios from 'axios';
import { GET_USERS, LOADING, ERROR } from '../types/userTypes';

// devuleve una promsa para ser llamad por el reducer,
// modifica al reducer con el disptach
export const getUsers = () =>  async (dispatch) => {
  dispatch({
    type: LOADING,
  });
  try {
    const request = await axios.get("https://jsonplaceholder.typicode.com/users");
    // se comunica con el reducer
    dispatch({
      type: GET_USERS,
      payload: request.data,
      error: ''
    });
  } catch (error) {
    console.log(error)
    dispatch({
      type: ERROR,
      payload: 'Algo salió mal, intenta más tarde'//error.message
    });
  }
}