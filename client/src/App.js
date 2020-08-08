import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [courses, setCourses] = useState()

  useEffect(() => {
    fetch('http://localhost:5000/api/courses')
      .then(res =>res.json())
      .then(data => {
        setCourses(data)
      })
      .catch(err => console.log('Oh noes!', err))
  }, []); 

  const createCourse = () => {
    if(courses){
      const coursesArr = courses.map( course => (
        <li key={course.id}>{course.title}</li>
      ))
      return coursesArr;
    }
  }
  console.log(courses)
  return (
    <div className="App">
      <ul>
        {createCourse()} 
      </ul>
    </div>
  );
}

export default App;
