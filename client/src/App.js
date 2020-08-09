import React from 'react';
import './App.css';
import Header from './components/Header';
import Courses from './components/Courses';

function App() {
  // const [courses, setCourses] = useState()

  // useEffect(() => {
  //   fetch('http://localhost:5000/api/courses')
  //     .then(res =>res.json())
  //     .then(data => {
  //       setCourses(data)
  //     })
  //     .catch(err => console.log('Oh noes!', err))
  // }, []); 

  // const createCourse = () => {
  //   if(courses){
  //     const coursesArr = courses.map( course => (
  //       <li key={course.id}>{course.title}</li>
  //     ))
  //     return coursesArr;
  //   }
  // }
  // console.log(courses)
  return (
    <div>
      <Header></Header>
      <hr></hr>
      <Courses></Courses>
    </div>
    
  );
}

export default App;
