import axios from "axios";
import CONST from "../consts";


export const getMyServices = (lang ,category_id , token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'myServices',
            method      : 'POST',
            data        : { lang , category_id},
            headers     : {Authorization: token}
        }).then(response => {
            dispatch({type: 'getMyServices', payload: response.data});
        });
    }
};
