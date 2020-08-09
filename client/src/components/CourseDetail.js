import React, {Component} from 'react';

export default class CourseDetail extends Component {
    state = {
        course: {
        }
    }

    componentDidMount(){
        fetch('http://localhost:5000/api/courses/2')
      .then(res =>res.json())
      .then(course => this.setState({course}))
      .catch(err => console.log('Oh noes!', err))
    }


    render() {
        const {course} = this.state;
        // const materialsNeeded = course.materialsNeeded.split('*');
        const materialsNeeded =course.materialsNeeded;
        let arr = [];
        if(materialsNeeded){
            arr =materialsNeeded.split('*');
            arr.splice(0,1);
            
        }
        return(
            <div>
            <div className="actions--bar">
              <div className="bounds">
                <div className="grid-100"><span><a className="button" href="update-course.html">Update Course</a><a className="button" href="#">Delete Course</a></span><a
                    className="button button-secondary" href="index.html">Return to List</a></div>
              </div>
            </div>
            <div className="bounds course--detail">
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <h3 className="course--title">{course.title}</h3>
                  <p>By Joe Smith</p>
                </div>
                <div className="course--description">
                    <p>{course.description}</p>
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <h3>{course.estimatedTime}</h3>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <ul>
                        {
                            arr.map( (material, index) => (
                                <li key={index}>{material}</li>
                            ))
                        }
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
    }
}