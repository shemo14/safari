import axios from "axios";
import CONST from "../consts";


export const getSearch = (lang , keyword ,token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'search',
            method      : 'POST',
            data        : {lang , keyword},
            headers     : token ? {Authorization: token} : null
        }).then(response => {
            dispatch({type: 'getSearch', payload: response.data});
        });
    }
};