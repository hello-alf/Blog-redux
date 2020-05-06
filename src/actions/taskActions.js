import axios from 'axios';
import { 
  GET_TASKS, 
  LOADING, ERROR, 
  CHANGE_USER_ID,
  CHANGE_TITLE,
  ADDED,
  UPDATE_CHECKBOX
} from '../types/taskTypes';

// devuleve una promsa para ser llamad por el reducer,
// modifica al reducer con el disptach
export const getTasks = () =>  async (dispatch) => {
  dispatch({
    type: LOADING,
  });
  try {
    const request = await axios.get("https://jsonplaceholder.typicode.com/todos");
    
    const tasks = {}
    request.data.map((task) => (
      tasks[task.userId] = {
        ...tasks[task.userId],
        [task.id]: {
          ...task
        }
      }
    ));

    // se comunica con el reducer
    dispatch({
      type: GET_TASKS,
      payload: tasks,
    });
  } catch (error) {
    console.log(error)
    dispatch({
      type: ERROR,
      payload: 'Algo salió mal, intenta más tarde'//error.message
    });
  }
}

export const changeUserId = (user_id) => (dispatch) => {
  dispatch({
    type: CHANGE_USER_ID,
    payload: user_id
  })
}

export const changeTitle = (title) => (dispatch) => {
  dispatch({
    type: CHANGE_TITLE,
    payload: title
  })
}

export const add = (task) => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
  
  try {
    const request = await axios.post("https://jsonplaceholder.typicode.com/todos", task)
    console.log(request)
    dispatch({
      type: ADDED
    });
  } catch (error) {
    console.log(error)
    dispatch({
      type: ERROR,
      payload: 'Algo salió mal, intenta más tarde'//error.message
    });
  }
}

export const edit = (task_edited) => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
  
  try {
    const request = await axios.put(`https://jsonplaceholder.typicode.com/todos/${task_edited.id}`, task_edited)
    console.log(request)
    dispatch({
      type: ADDED
    });
  } catch (error) {
    console.log(error)
    dispatch({
      type: ERROR,
      payload: 'Algo salió mal, intenta más tarde'//error.message
    });
  }
}

export const changeCheck = (user_id, task_id) => (dispatch, getState) => {
  const { tasks } = getState().taskReducer;
  const selected = tasks[user_id][task_id]

  const updated = {
    ...tasks
  }
  updated[user_id] = {
    ...tasks[user_id]
  }
  updated[user_id][task_id] = {
    ...tasks[user_id][task_id],
    completed: !selected.completed
  }

  dispatch({
    type: UPDATE_CHECKBOX,
    payload: updated
  })
}

export const deleted = (task_id) => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
  
  try {
    const request = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${task_id}`)
    console.log(request)
    dispatch({
      type: GET_TASKS,
      payload: {}
    });
  } catch (error) {
    console.log(error)
    dispatch({
      type: ERROR,
      payload: 'No se puede borrar'//error.message
    });
  }
}