import React from 'react';
import { NavLink, withRouter  } from 'react-router-dom';

const Nav = (props) => {
    
    const logOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('messages')
        props.history.push('/')
    }
    
    return(
        localStorage.getItem('token')
        ?
            <NavLink  onClick={logOut} to='/'>logOut</NavLink>
        :
            <NavLink to='/' >SignIn</NavLink>

    )
}

export default withRouter(Nav);