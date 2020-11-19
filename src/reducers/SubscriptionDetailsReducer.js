const INITIAL_STATE = { subscriptionDetails : null, subscriptions : [], banks : [], loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getSubscriptionDetails':
            return {
                subscriptionDetails: action.payload.data,
                loader: action.payload.success
            };
        case 'getSubscriptions':
            return {
                subscriptions: action.payload.data,
                loader: action.payload.success
            };
        case 'getBanks':
            return {
                banks: action.payload.data,
                loader: action.payload.success
            };
        default:
            return state;
    }
};
