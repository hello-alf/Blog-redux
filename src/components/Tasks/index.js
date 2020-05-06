import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import { getTasks, changeCheck, deleted } from '../../actions/taskActions'
import Spinner from '../General/Spinner'
import Fatal from '../General/Fatal'

class Tasks extends Component{
  componentDidMount(){
    if(!Object.keys(this.props.tasks).length){
      console.log("INGRESO")
      this.props.getTasks()
    }else{
      console.log("NO INGRESO")
    } 
  }

  componentDidUpdate() {
    const {
      loading
    } = this.props
		if(!Object.keys(this.props.tasks).length && !loading){
      this.props.getTasks()
    } 
	}

  showContent = () => {
    console.log("******showContent******")
    const { tasks, loading, error } = this.props

    if(loading)
      return <Spinner />
    
    if(error)
      return <Fatal message={error}/>

    return Object.keys(tasks).map((user_id) => (
      <div key={user_id}>
        <h3>Usuario {user_id}</h3>
        <div className='container_tasks'>
          {this.setTasks(user_id)}
        </div>
      </div>
    ))
  }

  setTasks = (user_id) => {
    console.log("******setTasks******")
    const {tasks} = this.props
    const per_user = {
      ...tasks[user_id]
    }
    return Object.keys(per_user).map((task_id) => (
      <div>
        <input 
          type="checkbox" 
          defaultChecked={per_user[task_id].completed} 
          onChange={() => this.props.changeCheck(user_id, task_id)}
        />
        { per_user[task_id].title }
        <div>
          <Link to={`/tasks/save/${user_id}/${task_id}`}>
            <button>Editar</button>
          </Link>
          <button onClick={ () => this.props.deleted(task_id)}>Eliminar</button>
          
        </div>
      </div>
    ))
  }

  render(){
    return (
      <div>
        <Link to='/tasks/save'>
          <button type="button">Agregar</button>
        </Link>
        {this.showContent()}
      </div>
    )
  }
}

const mapStateToProps = ({ taskReducer }) => {
  return taskReducer
}

const mapDispatchToProps = {
  getTasks,
  changeCheck,
  deleted
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);