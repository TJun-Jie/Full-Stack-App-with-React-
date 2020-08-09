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

function App() {

  return (
    <Router>
      <div>
        <Header></Header>
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
            <UserSignIn></UserSignIn>
          </Route>
          <Route path="/signup">
            <UserSignUp></UserSignUp>
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
