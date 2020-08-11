import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail'
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import withContext from './Context';
import PrivateRoute from './PrivateRoute';

const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const HeaderWithContext = withContext(Header);
const UserSignOutWithContext = withContext(UserSignOut);
function App() {


  return (
    <Router>
      <div>
        <HeaderWithContext></HeaderWithContext>
        <hr></hr>
        <Switch>
          <PrivateRoute path="/courses/create" component={CreateCourse}/>  
          <PrivateRoute path="/courses/:id/update" component={UpdateCourse}/>
          <Route path="/courses/:id" component={CourseDetail}/>
          <Route path="/signin" component={UserSignInWithContext}/>
          <Route path="/signup" component={UserSignUpWithContext}/>
          <Route path="/signout" component={UserSignOutWithContext}/>
          <Route path="/">
            <Courses></Courses>
          </Route>
        </Switch>
        

      </div>

    </Router>
    
  );
}

export default App;
