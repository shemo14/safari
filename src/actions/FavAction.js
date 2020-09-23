import axios from "axios";import CONST from "../consts";import {Toast} from "native-base";export const setFav = (lang, service_id, token) => {	return (dispatch) => {		axios({			url         : CONST.url + 'favAndUnFav',			method      : 'POST',			data        : { lang, service_id},			headers		: token ? { Authorization: token } : null		}).then(response => {			getFavorites(lang , token , dispatch);			Toast.show({				text        	: response.data.message,				type			: response.data.success ? "success" : "danger",				duration    	: 3000,				textStyle   	: {					color       	: "white",					fontFamily  	: 'ArbFONTS',					textAlign   	: 'center'				}			});		});	}};const getFavorites = (lang , token , dispatch) => {	axios({		url         : CONST.url + 'favorites',		method      : 'POST',		data        : { lang },		headers     : { Authorization: token },	}).then(response => {		dispatch({type: 'getFavorites', payload: response.data});	});};