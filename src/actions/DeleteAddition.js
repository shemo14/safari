import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";


export const DeleteAddition = (lang , addition_id , token ) => {
    return async (dispatch) => {
        await axios({
            url         : CONST.url + 'deleteAddition',
            method      : 'POST',
            data        : { lang , addition_id },
            headers     : {Authorization: token}
        }).then(response => {

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
