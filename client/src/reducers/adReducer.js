import * as actionTypes from '../actions/actionTypes'

const initialState = {
    ads: {}
}
const adsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ADS:
            return {
                ...state,
                ads: action.payload
            }
        default:
            return {
                ...state
            }
    }
}

export default adsReducer