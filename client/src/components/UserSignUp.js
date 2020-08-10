import React, {useState} from 'react';
import { Link } from 'react-router-dom';

function UserSignUp() {
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [emailAddress,setEmailAddress] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const user = {
      firstName,
      lastName,
      emailAddress,
      password
    }


    const handleSubmit =async (e) => {
      e.preventDefault();
      if(password !== confirmPassword){
        console.log('not good')
      }
      const userJSON = JSON.stringify(user)
      const response = await fetch('http://localhost:5000/api/users', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body:  userJSON,
      })
      if (response.status === 201) {
        setErrors([]);
      }
      else if (response.status === 400) {
        return response.json().then(data => {
          setErrors(data.errors);
        });
      }
      else {
        throw new Error();
      }

    }

    const createErrors = () => {
      console.log(errors)
      if(errors.length> 0) {
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