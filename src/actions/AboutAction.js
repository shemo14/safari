import axios from "axios";
import CONST from "../consts";


export const getAbout = lang => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'about',
            method      : 'POST',
            data        : { lang }
        }).then(response => {
            dispatch({type: 'getAbout', payload: response.data});
        });
    }
};

export const getTerms = lang => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'terms',
            method      : 'POST',
            data        : { lang }
        }).then(response => {
            dispatch({type: 'getTerms', payload: response.data});
        });
    }
};


export const getContacts = lang => {
	return (dispatch) => {
		axios({
			url         : CONST.url + 'contactUs',
			method      : 'POST',
			data        : { lang }
		}).then(response => {
			dispatch({type: 'getContacts', payload: response.data});
		});
	}
};

export const banners = () => {
	return (dispatch) => {
		axios({
			url         : CONST.url + 'banners',
			method      : 'GET'
		}).then(response => {
			dispatch({type: 'banners', payload: response.data});
		});
	}
};
