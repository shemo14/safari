import axios from "axios";
import CONST from "../consts";


export const getFavorites = (lang , token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'favorites',
            method      : 'POST',
            data        : { lang },
            headers     : { Authorization: token },
        }).then(response => {
            dispatch({type: 'getFavorites', payload: response.data});
        });
    }
};
