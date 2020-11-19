import { combineReducers } from 'redux';

import lang from './LangReducer';
import auth from './AuthReducer';
import intro from './IntroReducer';
import profile from './ProfileReducer';
import about from './AboutReducer';
import categories from './CategoriesReducer';
import providers from './ProvidersReducer';
import notifications from './NotificationsReducer';
import favorites from './FavoritesReducer';
import banners 			from './BannersReducer';
import providerDetails 	from './ProviderDetailsReducer';
import search 	from './SearchReducer';
import subCategoriesByCat from './SubCategoriesByCatReducer';
import myServices from './MyServicesReducer';
import serviceDetailes from './ServiceDetailesReducer';
import subCategories from './SubCategoriesReducer';
import subscriptionDetails from './SubscriptionDetailsReducer';



export default combineReducers({
    lang,
    auth,
	intro,
	profile,
	about,
	categories,
	providers,
	notifications,
	favorites,
	banners,
	providerDetails,
	search,
	subCategoriesByCat,
	myServices,
	serviceDetailes,
	subCategories,
	subscriptionDetails,
});
