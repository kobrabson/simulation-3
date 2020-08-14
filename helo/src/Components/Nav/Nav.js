import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

import './Nav.css'

function Nav() {
    return (
        <div>
            {/* <h1>Welcome, {this.props.users.username} </h1> */}
            <button  >  <Link to='/dashboard'> Home </Link></button>
            <button  > <Link to='/new'> New Post </Link> </button>
            <button  > <Link to='/'> Dashboard </Link> </button>
        </div>
    )
}

// console.log(props)

const mapStateToProps = state => state;

export default connect(mapStateToProps) (Nav)
