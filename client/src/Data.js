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
   * @returns null if HTTP status is 401 (unauthorized)
   * @returns HTTP status of 500 if there's other errros
   */
  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, 'GET', null, true, {emailAddress, password});

    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401)
    {
      return null;
    }
    else {
      return 500;
    }
  }

  /**
   * creates a user by making a post request to the api route '/users'
   * @param {object} user 
   * @returns empty array if successful
   * @returns Error object with respective status code if unsuccessful
   */
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    let error ={
      errorsArr: [],
      status: null
    }
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        error.errorsArr = data.errors;
        error.status = 400;
        return error;
      });
    }
    else {
      error.status= 500;
      return error;
    }
  }
  /**
   * creates a courseby making a post request to the api route '/courses'
   * @param {object} user 
   * @param {string} emailAddress
   * @param {string} password
   * @returns empty array if successful
   * @returns Error object with respective status code if unsuccessful
   */
  async createCourse(course, {emailAddress, password}){
    const response = await this.api('/courses', 'POST', course , true, {emailAddress, password} );
    let error ={
      errorsArr: [],
      status: null
    }
    // No errors are returned if successful
    if(response.status ===201){
      return [];
    }
    // returns the validation errors.
    else if(response.status === 400) {
      return response.json().then(data => {
        error.errorsArr = data.errors;
        error.status = 400;
        return error
      });
    }
    else{
      error.status = 500
      return error;
    }
  }

  /**
   * Updates course by  making a put request to the api with route '/courses/:id'
   * @param {integer} id 
   * @param {object} course 
   * @param {string} emailAddress
   * @param {string} password
   * @returns empty array if successful
   * @returns Error object with respective status code if unsuccessful
   */
  async updateCourse(id, course, {emailAddress, password}){
    const response = await this.api(`/courses/${id}`, 'PUT', course, true, {emailAddress, password});
    let error ={
      errorsArr: [],
      status: null
    }
    // Success
    if(response.status ===204){
      return [];
    }
    else if(response.status === 400) {
      return response.json().then(data => {
        error.errorsArr = data.errors;
        error.status = 400;
        return error
      });
    }
    // User does not have permission to update
    else if(response.status === 403) {
      error.status = 403
      return error;
    }
    // The course does not exist
    else if(response.status === 404) {
      error.status =404
      return error;
    }
    else{
      error.status = 500
      return error
    }
  }
  /**
   * Delete course by  making a delete request to the api with route '/courses/:id'
   * @param {integer} id 
   * @param {string} emailAddress
   * @param {string} password
   * @returns empty array if successful
   * @returns Error object with respective status code if unsuccessful
   */
  async deleteCourse(id,{emailAddress, password}){
    const response = await this.api(`/courses/${id}`, 'DELETE', null, true, {emailAddress, password});
    let error ={
      errorsArr: [],
      status: null
    }
    // No errors returned when deletion is successful
    if(response.status ===204){
      return [];
    }
    // User does not have permission to delete
    else if(response.status === 403) {
      error.status = 403;
      return error;
    }
    // The course that the user is trying to delete does not exists.
    else if(response.status === 404) {
      error.status = 404;
      return error;
    }
    else{
      error.status = 500;
      return error;
    }
  }
}
