import axios from "axios";
import CONST from "../consts";


export const getSubCategories = (lang , token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'subCategories',
            method      : 'POST',
            data        : { lang },
            headers     : {Authorization: token}
        }).then(response => {
            dispatch({type: 'getSubCategories', payload: response.data});
        });
    }
};
