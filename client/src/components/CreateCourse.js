import React , {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';

function CreateCourse(props) {
  // Setting state with hooks
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [materialsNeeded, setMaterialsNeeded]  = useState('');
  const [errors, setErrors] = useState([]);

  const {context} = props
  const {emailAddress, password,data, authenticatedUser} = context

  const history = useHistory();

  // Data that will be submitted to the api
  const course = {
    title,
    description,
    estimatedTime,
    materialsNeeded,
    userId: authenticatedUser.id
  }

  /**
   *Creates course when form is submitted by passing the data in the form
   * @param {event} event
   * redirects the user to home page if course creation is successful
   * If HTTP status (500), redirects the user to the error page
   * IF HTTP status (400) bad request, show the validation errros on the form
   */ 
  const handleSubmit = (e) => {
    e.preventDefault();
    data.createCourse(course, {emailAddress, password})
      .then(errors => {
        if(errors === 500){
          history.push('/error');
        }
        // If there are errors, show the errors.
        if(errors.length>0){
          setErrors(errors);
        }else {
          // If successful, redirect to the index page.
          history.push('/');
        }
      })
      
  }
  
  return(
      <div className="bounds course--detail">
      <h1>Create Course</h1>
      <div>
        {context.actions.createErrors(errors)}
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
                      className="" placeholder="Course description..."
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
                          onChange ={ e => setMaterialsNeeded(e.target.value)}>
                        </textarea></div>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid-100 pad-bottom"><button className="button" type="submit">Create Course</button><Link to="/" className="button button-secondary">Cancel</Link></div>
        </form>
      </div>
    </div>
  )
}


export default CreateCourse;