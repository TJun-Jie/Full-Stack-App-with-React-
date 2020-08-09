import React from 'react';
import './App.css';
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail'

function App() {

  return (
    <div>
      <Header></Header>
      <hr></hr>
      {/* <Courses></Courses> */}
      <CourseDetail></CourseDetail>
    </div>
    
  );
}

export default App;
