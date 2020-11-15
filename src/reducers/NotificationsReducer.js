const INITIAL_STATE = { notifications : [], counter: 0, loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getNotifications':
            return { notifications: action.payload.data, loader: action.payload.success };
        case 'getNotificationCounter':
            return { counter: action.payload.data.count, loader: action.payload.success};
        default:
            return state;
    }
};