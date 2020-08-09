import React, {useState} from 'react';
import { Link } from 'react-router-dom';

function UserSignIn() {
  const [emailAddress,setEmailAddress] = useState('');
  const [password,setPassword] = useState('');
  return (
      <div className="bounds">
      <div className="grid-33 centered signin">
        <h1>Sign In</h1>
        <div>
          <form>
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
            <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign In</button><Link to="/" className="button button-secondary">Cancel</Link></div>
          </form>
        </div>
        <p>&nbsp;</p>
        <p>Don't have a user account? <a href="sign-up.html">Click here</a> to sign up!</p>
      </div>
    </div>
  )
}

export default UserSignIn;