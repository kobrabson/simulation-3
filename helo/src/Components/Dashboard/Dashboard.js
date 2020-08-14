import React, { Component } from 'react'
import Post from '../Post/Post'

export class Dashboard extends Component {
    constructor(){
        super()
        this.state = {
            post:[],
            search:'',
            userPosts: true
        }
    }





    render() {
        const postArr = this.state.post.map((post) => {
            <li  key={post}> { post } </li>
        })
        return (
            <div>
                <Post  />
                <h1>Dashboard</h1>
                <input type='checkbox' value={userPosts} />
        <p>{postArr}</p>
            </div>
        )
    }
}

export default Dashboard
