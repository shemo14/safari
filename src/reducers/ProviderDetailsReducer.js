const INITIAL_STATE = { details : [], loader : false };export default (state = INITIAL_STATE, action) => {	switch (action.type) {		case 'getProviderDetails':			return {				details: action.payload.data,				loader: action.payload.success			};		default:			return state;	}};