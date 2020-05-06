import React, { Component } from 'react';
import { connect } from 'react-redux'
import { changeUserId, changeTitle, add, edit, clear } from '../../actions/taskActions'
import Spinner from '../General/Spinner'
import Fatal from '../General/Fatal'
import { Redirect } from 'react-router-dom'

class Save extends Component {
  componentDidMount(){
    const {
      match:{
        params: { user_id, task_id }
      },
      tasks,
      changeUserId,
      changeTitle
    } = this.props

    if(user_id && task_id){
      const task = tasks[user_id][task_id];
      changeUserId(task.userId)
      changeTitle(task.title)
    }else{
      this.props.clear()
    }
  }

  changeUser = (event) => {
    this.props.changeUserId(event.target.value)
  }

  changeTitle = (event) => {
    this.props.changeTitle(event.target.value)
  }

  submit = () =>{
    const { 
      user_id, 
      title,
      tasks
    } = this.props;
    const new_task = {
      userId: user_id,
      title,
      completed: false
    }

    if(this.props.match.params.userId && this.props.match.params.task_id){
      const task = tasks[this.props.match.params.userId][this.props.match.params.task_id]
      const task_edited = {
        ...new_task,
        completed: task.completed,
        id: task.id
      }
      this.props.edit(task_edited)
    }else{
      this.props.add(new_task)
    }

  }

  disable = () => {
    const { title, user_id, loading } = this.props
    if(loading){
      return true
    }

    if(!user_id || !title) {
      return true
    }

    return false
  } 

  showAction = () => {
    const { error, loading } = this.props
    if(loading)
      return <Spinner />
    
    if(error)
      return <Fatal message={error}/>
  }

  render() {
    return (
      <div>
        {
          this.props.goback? <Redirect to='/tasks' />: null
        }
        <h3>Guardar tarea</h3>
        Usuario id:
        <input 
          type='number' 
          value={this.props.user_id}
          onChange={this.changeUser}
        />
        <div></div>
        <div></div>
        Titulo:
        <input 
          type='text' 
          value={this.props.title}
          onChange={this.changeTitle}
        />
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <button 
          type='button'
          onClick={this.submit}
          disabled={this.disable()}
        >
            Guardar
        </button>

        {this.showAction()}
      </div>
    );
  }
}

const mapStateToProps = ({ taskReducer }) => taskReducer
const mapDispatchToProps = {
  changeUserId,
  changeTitle,
  add,
  edit,
  clear
};

export default connect(mapStateToProps, mapDispatchToProps)(Save);