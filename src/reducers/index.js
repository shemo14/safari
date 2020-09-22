import { combineReducers } from 'redux';
import lang from './LangReducer';
import auth from './AuthReducer';
import intro from './IntroReducer';
import profile from './ProfileReducer';
import about from './AboutReducer';
import categories from './CategoriesReducer';
import providers from './ProvidersReducer';


export default combineReducers({
    lang,
    auth,
	intro,
	profile,
	about,
	categories,
	providers,
});
