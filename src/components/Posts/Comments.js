import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux'
import Spinner from '../General/Spinner'
import Fatal from '../General/Fatal'

const Comments = (props) => {
  const show = () => {
    if (props.comments_error){
      return <Fatal message={props.error} />
    }

    if (props.comments_loading && !props.comments.length){
      return <Spinner />
    }

    return (
      <ul>
        {props.comments.map((comment) => (
          <li>
            <div>{comment.email}</div>
            <div>{comment.body}</div>
          </li>
        ))}
      </ul>
    )
  }
  
  return (
    <>
      {show()}
    </>
  )
}

const mapStateToProps = ({ postReducer }) => {
  return postReducer
}
export default connect(mapStateToProps, null)(Comments);