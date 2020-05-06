import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../../actions/userActions'
import { getByUser, openClose, getComments } from '../../actions/postActions'
import Comments from './Comments'
import Spinner from '../General/Spinner'
import Fatal from '../General/Fatal'
import '../../assets/css/index.css'

class Posts extends Component {
  async componentDidMount(){
    // no se destructura reducers
    const { getUsers, getByUser, match: { params: { key } } } = this.props
    if(!this.props.userReducer.users.length){
      await getUsers();
    }
    if(this.props.userReducer.error){
      return
    }
    if(!('posts_key' in this.props.userReducer.users[key])){
      getByUser(key);
    }
  }

  setUser = () => {
    const { userReducer, match: { params: { key } } } = this.props

    if(userReducer.error)
      return <Fatal mensaje={userReducer.error} />

    if (!userReducer.users.length || userReducer.loading){
      return <Spinner />
    }

    const name = userReducer.users[key].name

    return(
      <h2>Publicaciones de {name} </h2>
    )
  }

  setPosts = () => {
    // se destructura reducers por el render
    const { 
      userReducer,
      userReducer: { users },
      postReducer,
      postReducer: { posts },
      match: { params: { key } }
    } = this.props
    if(!users.length) return
    if(userReducer.error) return
    if(postReducer.loading) {
      return <Spinner />
    }
    if(postReducer.error){
      return <Fatal message={postReducer.error} />
    }
    if(!posts.length) return
    if(!('posts_key' in userReducer.users[key])) return
    const { posts_key } = users[key]
    return this.showInfo(
      posts[posts_key],
      posts_key
    )
  }

  showComments = (pub_key, com_key, comments) => {
    this.props.openClose(pub_key, com_key);
    if(!comments.length){
      this.props.getComments(pub_key, com_key);
    }
  }

  showInfo = (posts, posts_key) => (
    posts.map((data, com_key) => (
      <div 
        className='title' 
        key={com_key} 
        onClick={() => this.showComments(posts_key, com_key, data.comments) }>
        <h2>{data.title}</h2>
        <h3>{ data.body }</h3>
        {
          data.open? <Comments comments={data.comments} />: null
        }
      </div>  
    ))
  );

  render() {
    console.log(this.props)
    return(
      <div>
        {this.setUser()}
        {this.setPosts()}
      </div>
    )
  }
}

const mapStateToProps = ({userReducer, postReducer}) => {
  return {
    userReducer, 
    postReducer
  }
}

const mapDispatchToProps = {
  getUsers,
  getByUser,
  openClose,
  getComments
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);