import React, {useState} from 'react';
import {  useHistory, useRouteMatch, useLocation } from "react-router";
import { Link } from 'react-router-dom';

function UpdateCourse(props) {
  const history = useHistory();
  const match = useRouteMatch();
  const location = useLocation();
  const { courseData } = location.state


  const [title, setTitle] = useState(courseData.title);
  const [description, setDescription] = useState(courseData.description);
  const [estimatedTime, setEstimatedTime] = useState(courseData.estimatedTime ? courseData.estimatedTime : '');
  const [materialsNeeded, setMaterialsNeeded]  = useState(courseData.materialsNeeded ? courseData.materialsNeeded : '');
  const [errors, setErrors] = useState([]);
  const {context} = props;
  const {emailAddress, password,data, authenticatedUser} = context;

  const courseId = match.params.id;

  const course = {
    title,
    description,
    estimatedTime,
    materialsNeeded,
    userId: authenticatedUser.id
  }

  function handleSubmit(e) {
    e.preventDefault();
    data.updateCourse(courseId, course, {emailAddress, password})
      .then(errors => {
        if(errors.length>0){
          setErrors(errors)
        }else {
          history.push('/');
        }
      })
  }
  const createErrors = () => {
    if(errors.length> 0) {
      console.log('true')
      return (
        <div>
        <h2 className="validation--errors--label">Validation errors</h2>
        <div className="validation-errors">
          <ul>
            {
              errors.map( (error, index) => (
                <li key={index}>{error}</li>
              ))
            }
          </ul>
        </div>
      </div>
      )
    } else {
      return ''
    }
  }
  
    return(
        <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          {createErrors()}
          <form onSubmit={handleSubmit}>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div><input 
                      id="title" 
                      name="title" 
                      type="text" 
                      className="input-title course--title--input" 
                      placeholder="Course title..."
                      value={title} 
                      onChange ={ e => setTitle(e.target.value)}
                      /></div>
                <p>By Joe Smith</p>
              </div>
              <div className="course--description">
                <div><textarea 
                  id="description" 
                  name="description" 
                  className="" 
                  placeholder="Course description..." 
                  value={description}
                  onChange ={ e => setDescription(e.target.value)}
                  ></textarea></div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div><input 
                            id="estimatedTime" 
                            name="estimatedTime" 
                            type="text"
                            className="course--time--input"
                            placeholder="Hours" 
                            value={estimatedTime}
                            onChange ={ e => setEstimatedTime(e.target.value)}
                            /></div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div><textarea 
                      id="materialsNeeded" 
                      name="materialsNeeded" 
                      className="" 
                      placeholder="List materials..." 
                      value={materialsNeeded}
                      onChange ={ e => setMaterialsNeeded(e.target.value)}></textarea></div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom"><button className="button" type="submit">Update Course</button><Link to={`/courses/${courseData.id}`} className="button button-secondary">Cancel</Link></div>
          </form>
        </div>
      </div>
    )
}

  

export default UpdateCourse;