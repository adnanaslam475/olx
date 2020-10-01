import * as actionTypes from './actionTypes'
import axios from 'axios'

export const getUser = () => dispatch => {
    const expirationTime = new Date(new Date().getTime() + 1000 * 60 * 60)
    axios.get('/api/user')
        .then(res => {
            if (res.data) {
                dispatch({ 
                    type: actionTypes.GET_USER,
                    payload: res.data
                },
                    localStorage.setItem('Id', res.data._id),
                    localStorage.setItem('token', res.data.jwtToken),
                    localStorage.setItem('expirationTime', expirationTime)
                )
            }
        })
}
export const logout = () => dispatch => {
    axios.get('/api/logout')
        .then(res => dispatch({
            type: actionTypes.LOGOUT
        })).catch(error => {
            console.log('error')
        })
}