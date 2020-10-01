import * as actionTypes from '../actions/actionTypes'

const initialState = {
    user: null,
    picture: null,
    username: null,
    token: null,
    isAuthenticated: false
}
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_USER:
            return {
                ...state,
                user: action.payload,
                picture: action.payload.picture,
                username: action.payload.username,
                isAuthenticated: true
            }
        case actionTypes.LOGOUT:
            localStorage.clear()
            return {
                ...state,
                isAuthenticated: false
            }
        default:
            return {
                ...state
            }
    }
}

export default authReducer