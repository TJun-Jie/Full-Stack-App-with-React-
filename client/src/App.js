import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
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
import Forbidden from './components/Forbidden'
import UnhandledError from './components/UnhandledError';
import NotFound from './components/NotFound';

// Adding context api to the components
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const HeaderWithContext = withContext(Header);
const UserSignOutWithContext = withContext(UserSignOut);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const CourseDetailWithContext = withContext(CourseDetail);
function App() {


  return (
    <Router>
      <div>
        <HeaderWithContext></HeaderWithContext>
        <hr></hr>
        <Switch>
          <PrivateRoute path="/courses/create" component={CreateCourseWithContext}/>  
          <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext}/>
          <Route path="/courses/:id" component={CourseDetailWithContext}/>
          <Route path="/signin" component={UserSignInWithContext}/>
          <Route path="/signup" component={UserSignUpWithContext}/>
          <Route path="/signout" component={UserSignOutWithContext}/>
          <Route exact path="/" component={Courses}/>
          <Route path="/forbidden" component={Forbidden} />
          <Route path="/error" component={UnhandledError} />
          <Route path="/notfound" component={NotFound} />
          <Redirect to="/notfound" />
        </Switch>
      </div>

    </Router>
    
  );
}

export default App;
