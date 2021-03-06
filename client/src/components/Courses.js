import React, {Component} from 'react';
import {Link} from 'react-router-dom';
export default class Courses extends Component {
    state = {
        data: []
    }
    componentDidMount(){     
        /**
       * fetch data of all the courses
       * @returns data of course if HTTP response is 200 (success)
       * If HTTP response is 500(Internal server error), redirect user to error route.
       * Sets the data that is fetched to the state.
       */
        fetch('https://school-database-react.herokuapp.com/api/courses')
            .then(res => {
                if(res.status===200){
                    return res.json();
                }
                else if (res.status ===500){
                    return this.props.history.push('/error');
                }
            })
            .then(data => this.setState({data}))
            .catch(err => console.log('Oh noes!', err))
    }

    // function to create jsx for all the courses by mapping over the data
    createCourses = () => {
        return this.state.data.map(course => (
            <div key={course.id} className="grid-33"><Link to={`/courses/${course.id}`} className="course--module course--link" >
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{course.title}</h3>
            </Link></div>
        ))
    }

    render() {
        return(
            <div className="bounds">
                {this.createCourses()}
                <div className="grid-33"><Link to="/courses/create" className="course--module course--add--module" >
                    <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    viewBox="0 0 13 13" className="add">
                    <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                    </svg>New Course</h3>
                </Link></div>
            </div>
        )
    }
}