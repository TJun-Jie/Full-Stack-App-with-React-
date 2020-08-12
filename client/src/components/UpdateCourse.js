import React, { Component} from 'react';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';

class UpdateCourseClass extends Component {
  _isMounted = false;
  state = {
    course: {},
    errors: [],
  }

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
          this.setState({course});
        }
      })
      .catch(err => console.log('Oh noes!', err))
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  
  handleSubmit(e) {
    const context = this.props.context;
    const {emailAddress, password,data, authenticatedUser} = context;
    const courseId = this.props.match.params.id;
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
        if(errors.length>0){
          this.setState({errors})
        }
        // If user is does not have permission to update course
        else if (errors ===403){
          this.props.history.push('/forbidden')
        }

        else if (errors ===404){
          this.props.history.push('/notfound')
        }
        else {
          this.props.history.push('/');
        }
      })
  }
  createErrors = () => {
    if(this.state.errors.length> 0) {
      return (
        <div>
        <h2 className="validation--errors--label">Validation errors</h2>
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
  render() {
    const {title, description, estimatedTime, materialsNeeded} = this.state.course;
    let firstName = '';
    let lastName = '';
    const courseOwner = this.state.course.User;
    if(courseOwner){
      firstName = courseOwner.firstName;
      lastName = courseOwner.lastName;
    }

    return(
        <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          {this.createErrors()}
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