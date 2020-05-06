import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

const Tabla = (props) => {
  const setRows = () => (
    props.users.map((user, key) => {
      return(
        <tr key={user.id}>
          <td>
            {user.name}</td>
          <td>{user.email}</td>
          <td>{user.website}</td>
          <td>
            <Link to={`/posts/${key}`}><div>#</div></Link>
          </td>
        </tr>
      )
    })
  );

  return (
    <div>
      <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Enlace</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {setRows()}
          </tbody>
        </table>
    </div>
  )
}

const mapStateToProps = (reducers) => {
  return reducers.userReducer
}

export default connect(mapStateToProps, null)(Tabla)