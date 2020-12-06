import axios from "axios";
import CONST from "../consts";


export const getSubCategoriesByCat = (lang ,category_id , token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'subCategoriesByCategory',
            method      : 'POST',
            data        : { lang , category_id},
            headers     : {Authorization: token}
        }).then(response => {
            dispatch({type: 'getSubCategoriesByCat', payload: response.data});
        });
    }
};
