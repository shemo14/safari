import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";


export const DeleteService = (lang , service_id , token , navigation) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'deleteService',
            method      : 'POST',
            data        : { lang , service_id },
            headers     : {Authorization: token}
        }).then(response => {
            if (response.data.success) {

                navigation.navigate('services')

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
