import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

import './Nav.css'

function Nav() {
    return (
        <div>
            <button  > Home </button>
            <button  > New Post </button>
            <button  > Dashboard </button>
        </div>
    )
}

export default Nav
