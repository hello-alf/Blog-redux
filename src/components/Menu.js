import React from 'react';
import { Link } from 'react-router-dom';

const Menu = (props) => (
  <nav>
    <Link to='/'>
      Usuarios
    </Link>
    <Link to = '/tasks'>
      Tareas
    </Link>
  </nav>
)

export default Menu;