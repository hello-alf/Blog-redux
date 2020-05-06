import { 
  GET_BY_USER, 
  LOADING, 
  ERROR, 
  COM_LOADING, 
  COM_ERROR,
  GET_COMMENTS
} from '../types/postTypes';

const INITIAL_STATE = {
  posts: [],
  loading: false,
  error: '',
  comments_loading: false,
  comments_error: ''
};

// es llamado por los actions
export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case GET_BY_USER:
      return { 
        ...state, 
        posts: action.payload,
        loading: false,
      }
    case GET_COMMENTS:
      return { 
        ...state, 
        posts: action.payload,
        comments_loading: false,
        comments_error: false
      }
    case LOADING:
      return { ...state, loading: true}
    case ERROR:
      return { 
        ...state, 
        error: action.payload, 
        loading: false
      }
    case COM_LOADING:
      return { ...state, comments_loading: true}
    case COM_ERROR:
      console.log("match")
      return { 
        ...state, 
        comments_error: action.payload, 
        comments_loading: false
      }
    default:
      return state
  }
}