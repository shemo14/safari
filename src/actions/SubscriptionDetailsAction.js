import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";


export const getSubscriptionDetails = (token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'subscription-details',
            method      : 'POST',
            headers		: token ? { Authorization: token } : null
        }).then(response => {
            dispatch({type: 'getSubscriptionDetails', payload: response.data});
        });
    }
};

export const getSubscriptions = (token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'subscriptions',
            method      : 'POST',
            headers		: token ? { Authorization: token } : null
        }).then(response => {
            dispatch({type: 'getSubscriptions', payload: response.data});
        });
    }
};

export const getBanks = (token , lang) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'banks',
            method      : 'POST',
            headers		: token ? { Authorization: token } : null,
            data        : { lang }
        }).then(response => {
            dispatch({type: 'getBanks', payload: response.data});
        });
    }
};

export const uploadeTransfer = (token, lang  , image , bank_name , account_name , account_number , ammount , bank_id , subscription_id , navigation) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'uploade-transfer',
            method      : 'POST',
            headers		: token ? { Authorization: token } : null,
            data        : { image , bank_name , account_name , account_number , ammount , bank_id , subscription_id , lang }
        }).then(response => {

            if (response.data.success) {
                navigation.navigate('sendConfirmation')
            }

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
