import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

import './Nav.css'

function Nav() {
    return (
        <div>
            <button  >  <Link to='/dashboard'> Home </Link></button>
            <button  > <Link to='/new'> New Post </Link> </button>
            <button  > <Link to='/'> Dashboard </Link> </button>
        </div>
    )
}

export default Nav
