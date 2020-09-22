import axios from 'axios';
import CONST from '../consts'
import {Toast} from "native-base";
import {AsyncStorage} from "react-native";


export const profile = (token) => {
    return (dispatch) => {
        axios({
            method      : 'POST',
            url         : CONST.url + 'profile',
            headers     : {Authorization: token}
        }).then(response => {
            const data = response.data;
            dispatch({type: 'profile_data', data})
        })
    }
};

export const updateProfile = (lang , name , phone , avatar , token , navigation) => {
    return (dispatch) => {
        axios({
            url: CONST.url + 'UpdateProfile',
            method      : 'POST',
            headers     : {Authorization: token },
            data        : { lang ,name , phone , avatar }
        }).then(response => {

            if (response.data.success) {
                navigation.navigate('profile');
                dispatch({type: 'update_profile', data:response.data});
            }

            Toast.show({
                text        : response.data.message,
                type        : response.data.success ? "success" : "danger",
                duration    : 3000,
                textStyle       : {
                    color           : "white",
                    fontFamily      : 'ArbFONTS',
                    textAlign       : 'center'
                }
            });

        })
    }
}

export const logout = (lang , token) => {
    return (dispatch) => {
		AsyncStorage.multiRemove(['token', 'auth', 'profile']);

        AsyncStorage.getItem('deviceID').then(device_id => {
            axios({
                url         : CONST.url + 'logout',
                method      : 'POST',
                headers     : { Authorization: token },
                data        : { lang ,device_id }
            }).then(response => { });
        });

		dispatch({type: 'logout'})
    }
};

