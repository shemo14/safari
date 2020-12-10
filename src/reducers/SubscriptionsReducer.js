const INITIAL_STATE = {  subscriptions : [], loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
       case 'getSubscriptions':
            return {
                subscriptions: action.payload.data,
                loader: action.payload.success
            };
        default:
            return state;
    }

};
