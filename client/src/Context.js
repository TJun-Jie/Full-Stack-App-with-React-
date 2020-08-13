
import React, { Component } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';
const Context = React.createContext(); 

export class Provider extends Component {

  constructor() {
    super();
    this.data = new Data();
  }
  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
    emailAddress: Cookies.getJSON('emailAddress') || null,
    password: Cookies.getJSON('password') || null
  }


  render() {
    const {authenticatedUser, emailAddress, password} = this.state;
    
    const value = {
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
        createErrors: this.createErrors
      },
      authenticatedUser,
      emailAddress,
      password
    }
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  
  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    if(user !== null) {
      this.setState( () => {
        return{
          authenticatedUser: user,
          emailAddress,
          password
        }
      })
      Cookies.set('authenticatedUser',user, {expires: 1})
      Cookies.set('emailAddress' , emailAddress, {expires: 1})
      Cookies.set('password' , password, {expires: 1})
    }
    return user;
  }

  signOut = () => {
    this.setState({
      authenticatedUser: null
    })
    Cookies.remove('authenticatedUser')
    Cookies.remove('emailAddress')
    Cookies.remove('password')
  }
  
    createErrors = (errors) => {
      if(errors.length> 0) {
        console.log('true')
        return (
          <div>
        <h2 className="validation--errors--label">Validation errors:</h2>
        <div className="validation-errors">
          <ul>
            {
              errors.map( (error, index) => (
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
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}

