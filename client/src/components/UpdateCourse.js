import React, { Component} from 'react';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';

class UpdateCourseClass extends Component {
  _isMounted = false;
  state = {
    errors: [],
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    courseOwner: {}
  }
  // Fetch data of the course that is being updated 
  componentDidMount(){
    this._isMounted= true;
    fetch(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
      .then(res => {
        if(res.status === 200){
          return res.json();
        }
        else if(res.status === 404){
          this.props.history.push('/notFound');
        } else if (res.status === 500){
          this.props.history.push('error');
        }
      })
      .then(course => {
        if(this._isMounted){
          this.setState({title: course.title});
          this.setState({description: course.description});
          this.setState({estimatedTime: course.estimatedTime});
          this.setState({materialsNeeded: course.materialsNeeded});
          this.setState({courseOwner: course.User});
          if(this.state.courseOwner.id !== this.props.context.authenticatedUser.id){
            this.props.history.push('/forbidden')
          }

        }
      })
      .catch(err => console.log('Oh noes!', err))

  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  
  /**
   * Submit event handler 
   * @param {event} e 
   * No errors will be returned if update course is successful
   * If HTTP status 500(internal server error), redirects user to error route
   * If validation errors(400), show the validation errros on the form
   * If HTTP status 403(No permission), redirect user to the forbidden route
   * If HTTP status 404(not found) , redirect user to the not found route
   */
  handleSubmit= (e)  => {
    e.preventDefault();
    const {context} = this.props;
    const {emailAddress, password,data, authenticatedUser} = context;
    const courseId = this.props.match.params.id;
    // Data that is going to be sent to the api 
    const course = {
      title: this.state.title,
      description: this.state.description,
      estimatedTime: this.state.estimatedTime,
      materialsNeeded: this.state.materialsNeeded,
      userId: authenticatedUser.id
    }
    e.preventDefault();
    data.updateCourse(courseId, course, {emailAddress, password})
      .then(errors => {
        if(errors.status === 500) {
          this.props.history.push('/error');
        }
        if(errors.status === 400){
          this.setState({errors: errors.errorsArr});
        }
        // If user is does not have permission to update course
        else if (errors.status ===403){
          this.props.history.push('/forbidden');
        }

        else if (errors.status ===404){
          this.props.history.push('/notfound');
        }
        else {
          this.props.history.push('/');
        }
      })
  }

  render() {
    const {title, description, estimatedTime, materialsNeeded} = this.state;
    let firstName = '';
    let lastName = '';
    const courseOwner = this.state.courseOwner;
    if(courseOwner){
      firstName = courseOwner.firstName;
      lastName = courseOwner.lastName;
    }
  

    return(
        <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          {this.props.context.actions.createErrors(this.state.errors)}
          <form onSubmit={this.handleSubmit}>
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
                      onChange ={ e => this.setState({title: e.target.value})}
                      /></div>
                <p>By {firstName} {lastName}</p>
              </div>
              <div className="course--description">
                <div><textarea 
                  id="description" 
                  name="description" 
                  className="" 
                  placeholder="Course description..." 
                  value={description}
                  onChange ={ e => this.setState({description: e.target.value})}
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
                            onChange ={ e => this.setState({estimatedTime: e.target.value})}
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
                      onChange ={ e => this.setState({materialsNeeded: e.target.value})}></textarea></div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom"><button className="button" type="submit">Update Course</button><Link to={`/courses/${this.props.match.params.id}`} className="button button-secondary">Cancel</Link></div>
          </form>
        </div>
      </div>
    )
}}

  
const UpdateCourse = withRouter(UpdateCourseClass);
export default UpdateCourse;