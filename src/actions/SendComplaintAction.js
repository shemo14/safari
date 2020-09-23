import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";


export const SendComp = (lang , email , subject , message , token  , navigation) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'sendComplaint',
            method      : 'POST',
            data        : { lang , email , subject , message },
            headers     : {Authorization: token}
        }).then(response => {

            if (response.data.success) {
                navigation.navigate('settings')
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
