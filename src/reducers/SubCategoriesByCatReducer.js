const INITIAL_STATE = { subCategoriesByCat: [], loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getCategories':
            return {
                subCategoriesByCat: action.payload.data,
                loader: action.payload.success
            };
        default:
            return state;
    }
};
