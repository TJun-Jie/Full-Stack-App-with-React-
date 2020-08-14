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

      /**
       * fetch data of a single course with id
       * @returns data of course if HTTP response is 200 (success)
       * If HTTP response is 404(Not Found) , redirect user to the notfound route.
       * If HTTP response is 500(Internal server error), redirect user to error route.
       */
      fetch(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
        .then(res => {
          if(res.status === 200){
            return res.json()
          }
          else if(res.status === 404){
            this.props.history.push('/notfound')
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
    /**
     * Delete event handler. 
     * Deletes course when the delete button is clicked
     * Only the user who created the course will have permission to delete the course
     * If Deletion is successful, redirects the user to home page.
     * If status code is 500(internal server error), redirects user to the error page
     */
    handleDelete= () => {
      const {context, history} = this.props;
      const {emailAddress, password,data} = context;
      const courseId = this.props.match.params.id;
      // Interacts with the api to delete the course from the data base
      data.deleteCourse(courseId, {emailAddress, password})
      .then(error => {
        if(error.status === 500){
          history.push('/error');
        }
        // Deletion is unsuccessful
        else if(error.status === 403){
          history.push('/forbidden');
        } else if(error.status === 404){
          history.push('/notfound');
        }
        // Redirects user to home page if deletion is successful
        else {
          history.push('/');
        }
      })
    }

    /**
     * Creates buttons of the course detail component according to the state of the app
     * If the user owns the course, the update course and delete course will be shown
     * If the user does not own the course, the user will only be able to see return to list.
     */
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