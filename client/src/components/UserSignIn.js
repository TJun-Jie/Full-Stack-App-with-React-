import React, {useState} from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

function UserSignIn(props) {
  const [emailAddress,setEmailAddress] = useState('');
  const [password,setPassword] = useState('');
  const [errors, setErrors] = useState('');

  let history = useHistory();
  let location  = useLocation();

  const { from } = location.state || { from: { pathname: '/' } };
  const {context} = props;

  const handleSubmit =(e) => {
    e.preventDefault()
    context.actions.signIn(emailAddress, password)
    .then( user => {
      if(user === null){
        setErrors('Sorry, Sign in was unsuccessful.')
      }
      else if(user === 500){
        history.push('/error');
      }
       else  {
        history.push(from)
        console.log(`SUCCESS! ${emailAddress} is now signed in!`);
      }
    })
    .catch( err => {
      console.log(err);
      history.push('/error');
    })
  }

  const createErrors = () => {
    if(errors.length> 0) {
      return (
        <div>
          <h2 className="validation--errors">{errors}</h2>
        </div>
      )
    } else {
      return ''
    }
  }
  return (
      <div className="bounds">
      <div className="grid-33 centered signin">
        <h1>Sign In</h1>
        {createErrors()}
        <div>
          <form onSubmit={handleSubmit}>
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
        <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
      </div>
    </div>
  )
}

export default UserSignIn;