import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";


export const DeleteImg = (lang , image_id , token ) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'deleteImage',
            method      : 'POST',
            data        : { lang , image_id },
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
