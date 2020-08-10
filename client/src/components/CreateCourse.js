import React , {useState} from 'react';

function CreateCourse() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [materialsNeeded, setMaterialsNeeded]  = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submitted')

  }
  return(
      <div className="bounds course--detail">
      <h1>Create Course</h1>
      <div>
        {/* <div>
          <h2 className="validation--errors--label">Validation errors</h2>
          <div className="validation-errors">
            <ul>
              <li>Please provide a value for "Title"</li>
              <li>Please provide a value for "Description"</li>
            </ul>
          </div>
        </div> */}
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
          <div className="grid-100 pad-bottom"><button className="button" type="submit">Create Course</button><button className="button button-secondary">Cancel</button></div>
        </form>
      </div>
    </div>
  )
}


export default CreateCourse;