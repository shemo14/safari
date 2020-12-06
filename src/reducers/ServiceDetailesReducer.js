const INITIAL_STATE = { serviceDetailes: null, loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getServiceDetailes':
            return {
                serviceDetailes: action.payload.data,
                loader: action.payload.success
            };
        default:
            return state;
    }
};
