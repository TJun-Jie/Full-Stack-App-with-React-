import config from './config';

export default class Data {
  // Function that sets the url and all the options such as header and method and calls the fetch function with the url and options
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if(requiresAuth) {
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      options.headers['Authorization'] =  `Basic ${encodedCredentials}`; 
    }

    return fetch(url, options);
  }

  // get user data from the api, for sign in purposes
  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, 'GET', null, true, {emailAddress, password});
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }
  // Interacts with the api to createUser, for sign up purposes
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    // No errors are returned if successful
    if (response.status === 201) {
      return [];
    }
    // returns the validation errors.
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }
  // Interacts with the api to create course
  async createCourse(course, {emailAddress, password}){
    const response = await this.api('/courses', 'POST', course , true, {emailAddress, password} );
    // No errors are returned if successful
    if(response.status ===201){
      return [];
    }
    // returns the validation errors.
    else if(response.status === 400) {
      return response.json().then(data => data.errors);
    }
    else{
      throw new Error();
    }
  }

  // Interacts with the api to update course.
  async updateCourse(id, course, {emailAddress, password}){
    const response = await this.api(`/courses/${id}`, 'PUT', course, true, {emailAddress, password});
    // Success
    if(response.status ===204){
      return [];
    }
    else if(response.status === 400) {
      return response.json().then(data => data.errors);
    }
    // User does not have permission to update
    else if(response.status === 403) {
      return 403;
    }
    // The course does not exist
    else if(response.status === 404) {
      return 404;
    }
    else{
      throw new Error();
    }
  }
  // Interacts with the api to delete course.
  async deleteCourse(id,{emailAddress, password}){
    const response = await this.api(`/courses/${id}`, 'DELETE', null, true, {emailAddress, password});
    // No errors returned when deletion is successful
    if(response.status ===204){
      return [];
    }
    // User does not have permission to delete
    else if(response.status === 403) {
      return 403;
    }
    // The course that the user is trying to delete does not exists.
    else if(response.status === 404) {
      return 404;
    }
    else{
      throw new Error();
    }
  }
}
