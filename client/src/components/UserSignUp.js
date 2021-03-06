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


    /**
     * Submit handler
     * Creates user with the user data provided by the form
     * If successful, sign in the user and redirect user to his previous page or the main page
     * If it is a validation error, show the errors. 
     * If it is a internal server error (500), redirect user to the error route.
     * @param {event} event 
     */
    const handleSubmit =async (e) => {
      e.preventDefault();
      if(password === confirmPassword){
        // Interacts with the api to create user in the database
        context.data.createUser(user)
        // Validation errors
        .then( error => {
          if(error.status === 500){
            history.push('/error');
          }
          else if(error.status ===400) {
            setErrors(error.errorsArr);
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
        .catch( err => {
          console.log(err);
          history.push('/error');
        })
      } else {
        setErrors(['Sorry, your password is different from confirm password'])
      }

    }

    return(
        <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
            {context.actions.createErrors(errors)}
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
          <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
        </div>
      </div>
    )
}

export default UserSignUp;