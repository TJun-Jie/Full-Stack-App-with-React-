import React, {useState} from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

function UserSignUp(props) {
    // setting state
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [emailAddress,setEmailAddress] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const {context} = props

    // Data that is going to be sent to the api
    const user = {
      firstName,
      lastName,
      emailAddress,
      password
    }
    let history = useHistory();
    let location = useLocation();
    const { from } = location.state || { from: { pathname: '/' } };

    const handleSubmit =async (e) => {
      e.preventDefault();
      // Interacts with the api to create user in the database
      context.data.createUser(user)
      // Validation errors
      .then( errors => {
        if(errors.length > 0) {
          setErrors(errors);
        } 
        // Successfully created new user and sign in the user as well 
        else{
          console.log(`${emailAddress} is successfully signed up and authenticated`);
          context.actions.signIn(emailAddress, password)
            .then(() => {
              // Redirects to the home page 
              history.push(from);
            })
        }
      })

    }


    const createErrors = () => {
      if(errors.length> 0) {
        console.log('true')
        return (
          <div>
          <h2 className="validation--errors--label">Validation errors</h2>
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
    return(
        <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
            {createErrors()}
            <div>
            <form onSubmit={handleSubmit}>
              <div><input 
                id="firstName" 
                name="firstName" 
                type="text" 
                className="" 
                placeholder="First Name" 
                value={firstName}
                onChange = {e => setFirstName(e.target.value)}
                /></div>
              <div><input 
                id="lastName" 
                name="lastName"
                type="text" 
                className="" 
                placeholder="Last Name" 
                value={lastName}
                onChange = {e => setLastName(e.target.value)}
                /></div>
              <div><input 
                id="emailAddress" 
                name="emailAddress" 
                type="text" 
                className="" 
                placeholder="Email Address" 
                value={emailAddress}
                onChange = {e => setEmailAddress(e.target.value)}
                /></div>
              <div><input 
                id="password" 
                name="password" 
                type="password" 
                className="" 
                placeholder="Password" 
                value={password}
                onChange = {e => setPassword(e.target.value)}   
              /></div>
              <div><input 
                id="confirmPassword" 
                name="confirmPassword" 
                type="password" 
                className="" 
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange = {e => setConfirmPassword(e.target.value)}
                /></div>
              <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign Up</button><Link to='/' className="button button-secondary">Cancel</Link></div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Already have a user account? <a href="sign-in.html">Click here</a> to sign in!</p>
        </div>
      </div>
    )
}

export default UserSignUp;