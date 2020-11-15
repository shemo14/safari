const INITIAL_STATE = { about : '', terms: '', contacts: [], loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getAbout':
            return {
                about: action.payload.data,
                loader: action.payload.success
            };
		case 'getTerms':
			return {
				terms: action.payload.data,
				loader: action.payload.success
			};
		case 'getContacts':
			return {
				contacts: action.payload.data,
				loader: action.payload.success
			};
        default:
            return state;
    }
};
