import * as actionTypes from '../actions/actionTypes'
import axios from 'axios'
const access_token = 'pk.eyJ1IjoiYWRuYW5hc2xhbSIsImEiOiJja2JsNzZ0c2YxNTF2MnNteTN4amc1ZmE2In0.crBJBsWxfO06ED71wt-Yvw'

export const generateLocation = (longitude, latitude) => dispatch => {
    axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude}%2C%20${latitude}.json?&access_token=${access_token}`)
        .then(res => dispatch({
            type: actionTypes.GET_LOCATION,
            payload: res.data.features,
            longitude: longitude,
            latitude: latitude
        })
        )
        .catch(err => {
            console.log(err.data)
        })
}