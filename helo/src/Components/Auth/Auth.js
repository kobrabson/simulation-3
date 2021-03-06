import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'

export class Auth extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            password:'',

        }
    }

    toggle = () => {
        this.setState({
            newUser: !this.state.newUser
        })
    }

    changeHandle = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    login = () => {
        const { username, password } = this.state;
        axios.post('/auth/login', { username, password })
        .then(res => {
            this.props.loginUser(res.data);
            this.props.history.push('/dashboard')
        })
        .catch(err => {
            console.log(err);
        })
    }

    register = () => {
        const { username, password, profilePic } = this.state;
        axios.post('/auth/register', { username, password, profilePic })
        .then(res => {
            this.props.loginUser(res.data)
            this.props.history.push('dashboard')
        })
        .catch(err => {
            console.log(err)
        })
    }



    render() {
        const {username, password, profilePic} = this.state
        return (
            <div className='auth' >
                <div className='auth-container' >
                <h1>Auth</h1>
                {!this.state.newUser?
                <div>
                    <input 
                    onChange={e => this.changeHandle(e)} 
                    name='username'
                    type='text'
                    value={username}
                    placeholder='Username' />
                    <input 
                    onChange={e => this.changeHandle(e)}
                    name='password'
                    type='password'
                    value={password}
                    placeholder='Password' />
                    <div className='btn-container' >
                        <button 
                        onClick={ this.login} > Login </button>
                        <button 
                        onClick={ this.toggle } > Sign Up </button>
                    </div>
                </div>
                :
                <div>
                    <input onChange={e => this.changeHandle(e)}
                    name='username'
                    type='text'
                    value={username}
                    placeholder='Enter Username' ></input>
                    <input 
                    onChange={e => this.changeHandle(e)}
                    name='profilePic'
                    type='text'
                    value={profilePic}
                    placeholder='Add a Picture' ></input>
                    <input 
                    onChange={e => this.changeHandle(e)}
                    name='password'
                    type='password'
                    value={password}
                    password = 'Password' ></input>
                    <div className='btn-container' >
                        <button onClick={ this.register } > Register </button>
                        <button onClick={ this.toggle } > Already have an account </button>
                    </div>
                </div>
                }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {loginUser}) (Auth)
