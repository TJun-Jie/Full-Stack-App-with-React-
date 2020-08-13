import config from './config';

export default class Data {

  /**
   * helper method to easily deal with the data with crud methods 
   * sets up all the headers and methods of the request
   * @param {string} path 
   * @param {string} method 
   * @param {object} body 
   * @param {boolean} requiresAuth 
   * @param {object} credentials 
   * @returns {function} fetch api to make request
   */
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

  /**
   *  get user data from the api, for sign in purposes
   * @param {string} emailAddress 
   * @param {string} password 
   * @returns user if successful
   * If HTTP response of 401 is returned , null is returned as no user is found
   * If HTTP response of 500 is returned, the status code 500 is returned
   */
  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, 'GET', null, true, {emailAddress, password});
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      return 500;
    }
  }

  /**
   * creates a user by making a post request to the api route '/users'
   * @param {object} user 
   * Does not return anything if successful.
   * returns the validation errors.
   * If HTTP response of 500 is returned, the status code 500 is returned
   */
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      return 500;
    }
  }
  /**
   * creates a courseby making a post request to the api route '/courses'
   * @param {object} user 
   * @param {string} emailAddress
   * @param {string} password
   * Does not return anything if successful.
   * returns the validation errors.
   * If HTTP response of 500 is returned, the status code 500 is returned
   */
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
      return 500;
    }
  }

  /**
   * Updates course by  making a put request to the api with route '/courses/:id'
   * @param {integer} id 
   * @param {object} course 
   * @param {string} emailAddress
   * @param {string} password
   * Does not return anything if successful.
   * If HTTP response is 400 (bad request) returns the validation errors.
   * If HTTP response is 403 (no permissions) returns status code of 403
   * If HTTP response is 404 (not found) returns the status code of 404.
   * If HTTP response of 500 is returned, the status code 500 is returned
   */
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
      return 500;
    }
  }
  /**
   * Delete course by  making a delete request to the api with route '/courses/:id'
   * @param {integer} id 
   * @param {string} emailAddress
   * @param {string} password
   * Does not return anything if successful.
   * If HTTP response is 403 (no permissions) returns status code of 403
   * If HTTP response is 404 (not found) returns the status code of 404.
   * If HTTP response of 500 is returned, the status code 500 is returned
   */
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
      return 500;
    }
  }
}
