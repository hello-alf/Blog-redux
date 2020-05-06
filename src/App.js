import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Users from './components/Users'
import Tasks from './components/Tasks'
import Save from './components/Tasks/Save'
import Posts from './components/Posts'
import Menu from './components/Menu'

const App = () => (
  <BrowserRouter>
    <Menu />
    <Switch>
      <Route exact path='/' component={Users} />
      <Route exact path='/tasks' component={Tasks} />
      <Route exact path='/posts/:key' component={Posts} />
      <Route exact path='/tasks/save' component={Save} />
      <Route exact path='/tasks/save/:user_id/:task_id' component={Save} />
    </Switch>
  </BrowserRouter>
);

export default App;
