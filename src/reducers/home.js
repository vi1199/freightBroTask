import { 
    FETCHING_RATES,
    FETCH_RATES_SUCCESS,
    FETCH_RATES_FAILURE
} from '../actions/actionTypes';

const initialState= {
    home: [],
    isFetching: false,
    error : false
}

export default function homeReducer (state= initialState, action) {
    switch (action.type) {
        case FETCHING_RATES : 
            return {
                ...state,
                isFetching: true
            }
        case FETCH_RATES_SUCCESS: 
            return {
                ...state,
                isFetching: false,
                home: action.data
            }
        case FETCH_RATES_FAILURE: 
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default: return state
    }
}