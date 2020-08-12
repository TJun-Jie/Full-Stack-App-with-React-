import React, {Component} from 'react';
import { withRouter } from "react-router";
import {Link} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';


class CourseDetailClass extends Component {
    _isMounted = false;
    state = {
        course: {},
        errors: []
    }
    
    // Fetch data after components first renders
    componentDidMount(){
      this._isMounted= true;
      fetch(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
        .then(res => {
          // Data fetching successful
          if(res.status === 200){
            return res.json()
          }
          // Course does not exists
          else if(res.status === 404){
            this.props.history.push('/notFound')
            // server error
          }else if (res.status === 500){
            this.props.history.push('error');
          }
        })
        .then(course => {
          if(this._isMounted){
            this.setState({course})
          }
        })
        .catch(err => console.log('Oh noes!', err))
    }
    // does not set state when component is not mounted
    componentWillUnmount() {
      this._isMounted = false;
    }
    // delete event handler
    handleDelete= () => {
      const context = this.props.context;
      const {emailAddress, password,data} = context;
      const courseId = this.props.match.params.id;
      // Interacts with the api to delete the course from the data base
      data.deleteCourse(courseId, {emailAddress, password})
      .then(errors => {
        // Deletion is unsuccessful
        if(errors.length>0){
          this.setState( () => ({errors: errors}))
          console.log(errors)
          // Redirects user to home page if deletion is successful
        }else {
          this.props.history.push('/');
        }
      })
    }
    // Creates jsx tags to render errors if there are any
    createErrors = () => {
      if(this.state.errors.length> 0) {
        console.log('true')
        return (
          <div>
          <h2 className="validation--errors--label">Validation errors:</h2>
          <div className="validation-errors">
            <ul>
              {
                this.state.errors.map( (error, index) => (
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

    createButtons = () => {
      const userId = this.state.course.userId
      const authenticatedUser = this.props.context.authenticatedUser 
      if(authenticatedUser){
        if(userId === authenticatedUser.id){
          return(
            <div className="grid-100">
              <span>
                <Link 
                  to={{
                    pathname:`/courses/${this.props.match.params.id}/update`,
                    state:{
                      courseData: this.state.course
                    }
                  }}  
                  className="button">Update Course
                </Link>
                <button 
                  className="button" 
                  onClick={this.handleDelete}>Delete Course
                </button>
              </span>
              <Link
                className="button button-secondary"  
                to="/">
                Return to List
              </Link>
            </div>
          )
        }
        else{
          return (
            <div className="grid-100">
              <Link className="button button-secondary"  to="/">Return to List</Link>
            </div>
          )
        } 
      } else {
        return (
          <div className="grid-100">
            <Link className="button button-secondary"  to="/">Return to List</Link>
          </div>
        )
      }
    }


    render() {
        const {course} = this.state;
        let firstName = '';
        let lastName = '';
        const courseOwner = course.User;
        if(courseOwner){
          firstName = courseOwner.firstName;
          lastName = courseOwner.lastName;
        }

        return(
            <div>
            <div className="actions--bar">
              <div className="bounds">
                {this.createButtons()}
              </div>
            </div>
            <div className="bounds course--detail">
                {this.createErrors()}
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <h3 className="course--title">{course.title}</h3>
                  <p>By {firstName} {lastName}</p>
                </div>
                <div className="course--description">
                  <ReactMarkdown source={course.description} />
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
                        <ReactMarkdown source={course.materialsNeeded}></ReactMarkdown>
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