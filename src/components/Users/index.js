import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getUsers } from '../../actions/userActions'

import Spinner from '../General/Spinner'
import Fatal from '../General/Fatal'
import Table from './Table'

class Users extends Component{

  componentDidMount(){
    if(!this.props.users.length){
      this.props.getUsers();
    }
  }

  setContent = () => {
    if(this.props.loading){
      return (
        <Spinner />
      )
    }

    if(this.props.error){
      return (
        <Fatal message={this.props.error} />
      )
    }
    
    return <Table />
  }

  render(){
    return (
      <>
        <h1>Usuarios</h1>
        {this.setContent()}
      </>
    )
  }
}

const mapStateToProps = (reducers) => {
  return reducers.userReducer
}

const mapDispatchToProps = {
  getUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
