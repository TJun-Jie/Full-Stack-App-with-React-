import React from 'react';
import './App.css';
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail'
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';

function App() {

  return (
    <div>
      <Header></Header>
      <hr></hr>
      {/* <Courses></Courses> */}
      {/* <CourseDetail></CourseDetail> */}
      {/* <CreateCourse></CreateCourse> */}
      <UpdateCourse></UpdateCourse>
    </div>
    
  );
}

export default App;
