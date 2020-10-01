import * as actionTypes from './actionTypes'
import axios from 'axios'

const config = {
    headers: {
        'x-auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json'
    }
}
export const adSubmit = (postdata) => {
    return dispatch => {
        axios.post('/adpost', postdata, config)
            .then(res => {
                console.log(res.data)
            })
            .catch(() => {
                console.log('error submibt')
            })
    }
}

export const getAds = dispatch => {
    return dispatch => {
        axios.get('http://localhost:5000/api/getAds')
            .then(res => dispatch({
                type: actionTypes.GET_ADS,
                payload: res.data
            }, console.log(res.data)))
            .catch(err => {
                dispatch({
                    type: actionTypes.GET_ERROR,
                    payload: err.data
                })
            })
    }
}