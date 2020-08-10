import React, {Component} from 'react';
import { withRouter } from "react-router";
import {Link} from 'react-router-dom';
import Axios from 'axios';


class CourseDetailClass extends Component {
    state = {
        course: {},
    }
    

    componentDidMount(){
      Axios.get(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
        .then(course => this.setState({course: course.data}))
        .catch(err => console.log('Oh noes!', err))
    }


    render() {
        const {course} = this.state;
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
                <div className="grid-100"><span><Link to={{
                  pathname:`/courses/${this.props.match.params.id}/update`,
                  state:{
                    courseData: course
                  }
                }}  className="button">Update Course</Link><Link className="button" to="/">Delete Course</Link></span><Link
                    className="button button-secondary"  to="/">Return to List</Link></div>
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

const CourseDetail = withRouter(CourseDetailClass);

export default CourseDetail