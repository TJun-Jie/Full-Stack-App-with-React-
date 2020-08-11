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
          <Route path="/courses/create">
            <CreateCourse></CreateCourse>
          </Route>
          <Route path="/courses/:id/update">
            <UpdateCourse></UpdateCourse>
          </Route>
          <Route path="/courses/:id">
            <CourseDetail></CourseDetail>
          </Route>
          <Route path="/signin">
            <UserSignInWithContext></UserSignInWithContext>
          </Route>
          <Route path="/signup">
            <UserSignUpWithContext></UserSignUpWithContext>
          </Route>
          <Route path="/signout">
            <UserSignOutWithContext></UserSignOutWithContext>
          </Route>
          <Route path="/">
            <Courses></Courses>
          </Route>
        </Switch>
        

      </div>

    </Router>
    
  );
}

export default App;
