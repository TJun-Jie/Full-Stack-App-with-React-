import React from 'react';
import {Link} from 'react-router-dom';


function Header(props){
    const {context} = props;
    const authenticatedUser = context.authenticatedUser
    console.log(authenticatedUser)
    return(
        <div className="header">
            <div className="bounds">
                <h1 className="header--logo">Courses</h1>
                {authenticatedUser
                ?  (<nav><span>Welcome {authenticatedUser.firstName} {authenticatedUser.lastName}!</span><Link className="signout" to="/signout">Sign Out</Link></nav>)
                : (<nav><Link className="signup" to="/signup" >Sign Up</Link><Link className="signin" to="/signin">Sign In</Link></nav>)
                }
            </div>
        </div>
    )
}

export default Header;
