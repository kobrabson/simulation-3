// import axios from 'axios';

const initialState = {
    user: {
        id: '',
        username: '',
        profilePic: ''
    },
    LoggedIn: false
}

const LOGIN_USER = 'LOGIN_USER';

export function loginUser(user) {
    return {
        type: LOGIN_USER,
        payload: user
    }
}



export default function reducer(state = initialState, action) {
    switch(action.type) {
        case LOGIN_USER:
            return {...state, user:action.payload, LoggedIn: true}



        default: return state

    }
}