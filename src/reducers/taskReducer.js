import { 
  GET_TASKS, 
  LOADING, 
  ERROR, 
  CHANGE_USER_ID,
  CHANGE_TITLE,
  ADDED,
  UPDATE_CHECKBOX,
  CLEAR
} from '../types/taskTypes';

const INITIAL_STATE = {
  tasks: {},
  loading: false,
  error: '',
  user_id: '',
  title: '',
  goback: false
};

// es llamado por los actions
export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case GET_TASKS:
      return { 
        ...state, 
        tasks: action.payload,
        loading: false,
        error: '',
        goback: false
      }
    case LOADING:
      return { ...state, loading: true}
    case ERROR:
      return { 
        ...state, 
        error: action.payload, 
        loading: false
      }
    case CHANGE_USER_ID:
      return {
        ...state, user_id: action.payload
      }
    case CHANGE_TITLE:
      return {
        ...state, title: action.payload
      }
    case ADDED:
      return {
        ...state, 
        tasks: {}, 
        loading: false, 
        error: '',
        goback: true,
        user_id: '',
        title: '',
      }
    case UPDATE_CHECKBOX:
      return {
        ...state,
        tasks: action.payload
      }
    case CLEAR:
      return{
        ...state,
        user_id: '',
        title: '',
      }
    default:
      return state
  }
}