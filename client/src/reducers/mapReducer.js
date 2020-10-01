import * as actionTypes from '../actions/actionTypes'

const initialState = {
    location: []
}
const mapReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_LOCATION:
            return {
                ...state,
                location: action.payload,
                longitude: action.longitude,
                latitude: action.latitude
            }
        default:
            return {
                ...state
            }
    }
}

export default mapReducer