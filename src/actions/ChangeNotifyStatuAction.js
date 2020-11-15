import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";


export const changeNoti = (lang , token ) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'changeNotifyStatu',
            method      : 'POST',
            data        : { lang },
            headers     : {Authorization: token}
        }).then(response => {
            dispatch({type: 'isNotify'});
            Toast.show({
                text        : response.data.message,
                type        : response.data.success ? "success" : "danger",
                duration    : 3000,
                textStyle   : {
                    color       : "white",
                    fontFamily  : 'ArbFONTSBold',
                    textAlign   : 'center'
                }
            });
        });
    }
};
