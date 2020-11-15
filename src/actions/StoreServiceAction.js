import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";


export const StoreService = (lang , name_ar , name_en , whatsapp , price , description_ar , description_en, latitude, longitude
                                ,subCategories , images ,additions,category_id , token , navigation) => {
    return async (dispatch) => {
        await axios({
            url         : CONST.url + 'storeService',
            method      : 'POST',
            data        : { lang , name_ar , name_en , whatsapp , price , description_ar , description_en, latitude, longitude
                ,subCategories , images ,additions,category_id},
            headers     : {Authorization: token}
        }).then(response => {

            if (response.data.success)
                navigation.navigate('services')

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


export const UpdateService = (lang, service_id , name_ar , name_en , whatsapp , price , description_ar , description_en, latitude, longitude
    ,sub_category_id , images ,additions,category_id , token , navigation) => {
    return async (dispatch) => {
        await axios({
            url         : CONST.url + 'updateService',
            method      : 'POST',
            data        : { lang , name_ar , name_en , whatsapp , price , description_ar , description_en, latitude, longitude
                            ,sub_category_id , images ,additions,category_id, service_id},
            headers     : {Authorization: token}
        }).then(response => {
            if (response.data.success)
                navigation.navigate('services')

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
