import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";

export const getNotifications = (lang , token) => {
    return (dispatch) => {
        Notifications(lang, token, dispatch)
    }
};

export const deleteNoti = (lang , id , token ) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'deleteNotification',
            method      : 'POST',
            headers     : { Authorization: token },
            data        : {lang ,id }
        }).then(response => {
            Notifications(lang , token , dispatch);
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

export const getNotificationCounter = (lang , token ) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'countNotification',
            method      : 'POST',
            headers     : { Authorization: token },
            data        : { lang }
        }).then(response => {
            dispatch({type: 'getNotificationCounter', payload: response.data});
        });
    }
};

const Notifications = (lang , token , dispatch ) => {
    axios({
        url         : CONST.url + 'notifications',
        method      : 'POST',
        data        : {lang},
        headers     : {Authorization: token}
    }).then(response => {
        dispatch({type: 'getNotifications', payload: response.data});
    });
};
