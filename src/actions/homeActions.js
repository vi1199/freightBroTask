import { 
    FETCHING_RATES,
    FETCH_RATES_SUCCESS,
    FETCH_RATES_FAILURE
} from './actionTypes';

export function homeActions () {
    return (dispatch) =>{
        dispatch(getRates())
        return ( fetch ('https://api.myjson.com/bins/k84yq'))
        .then(res => res.json())
        .then(json => {
            return (dispatch(getApiSuccessData(json.result_data.rates)))
        })
        .catch(err => {
            dispatch(getApiFailureData(err))
        })
    }
}

function getRates() {
    return {
        type: FETCHING_RATES
    }
}

function getApiSuccessData (data) {
    return {
        type: FETCH_RATES_SUCCESS,
        data
    }
}

function getApiFailureData () {
    return {
        type: FETCH_RATES_FAILURE
    }
}