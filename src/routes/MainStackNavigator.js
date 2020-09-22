import React , {useState} from "react";import { Image, I18nManager, Dimensions} from 'react-native';import { createStackNavigator } 	from '@react-navigation/stack';import { createDrawerNavigator } 	from '@react-navigation/drawer';import { CustomDrawer }				from "./CustomDrawer";import i18n 						from "../../locale/i18n";import Home                     	from "../components/Home";import TripServices                 from "../components/TripServices";import Providers                    from "../components/Providers";import ProviderDetails              from "../components/ProviderDetails";import ServiceDetails               from "../components/ServiceDetails";import Favs 			            from "../components/Favs";import AboutApp 		            from "../components/AboutApp";import Roles	 		            from "../components/Roles";import ContactUs	                from "../components/ContactUs";import Settings	                    from "../components/Settings";import Profile	                    from "../components/Profile";import EditProfile                  from "../components/EditProfile";import Complaint                    from "../components/Complaint";import Language                     from "../components/Language";import ChangePass                   from "../components/ChangePass";import Notifications            	from "../components/Notifications";import RateService                 	from "../components/RateService";import ConfirmEvaluation         	from "../components/ConfirmEvaluation";import {useSelector} 				from "react-redux";const MainStack  = createStackNavigator();const Drawer 	 = createDrawerNavigator();const width		 = Dimensions.get('window').width;export function DrawerNavigator() {	const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);	return(		<Drawer.Navigator			hideStatusBar			statusBarAnimation			mode={'card'}			screenOptions={{headerShown: false}}			drawerPosition={I18nManager.isRTL ? 'right' : 'left'}			drawerContent={(props) => <CustomDrawer {...props} />}			drawerStyle={{ width }}			drawerContentOptions={{				labelStyle: { color: '#ffffff', fontFamily: 'ArbFONTS', fontSize: 17}			}}		>			<Drawer.Screen name='home'				options={{					drawerLabel: i18n.t('home'),					drawerIcon: () => (<Image source={require('../../assets/images/white_home.png')} style={{ width: 20, height: 20 }} resizeMode={'contain'}/>),				}}				component={Home}/>			{				token ?					<Drawer.Screen name='profile'						options={{							drawerLabel: i18n.t('profile'),							drawerIcon: () => (<Image source={require('../../assets/images/white_profile.png')} style={{ width: 20, height: 20 }} resizeMode={'contain'}/>),						}}						component={Profile}/> : null			}			{				token ?					<Drawer.Screen name='favs'						options={{							drawerLabel: i18n.t('favourite'),							drawerIcon: () => (<Image source={require('../../assets/images/white_fav.png')} style={{ width: 20, height: 20 }} resizeMode={'contain'}/>),						}}						component={Favs}/> : null			}			<Drawer.Screen name='aboutApp'				options={{					drawerLabel: i18n.t('aboutApp'),					drawerIcon: () => (<Image source={require('../../assets/images/info.png')} style={{ width: 20, height: 20 }} resizeMode={'contain'}/>),				}}				component={AboutApp}/>			<Drawer.Screen name='roles'				options={{					drawerLabel: i18n.t('roles'),					drawerIcon: () => (<Image source={require('../../assets/images/questions.png')} style={{ width: 20, height: 20 }} resizeMode={'contain'}/>),				}}				component={Roles}/>			<Drawer.Screen name='contactUs'				options={{					drawerLabel: i18n.t('contactUs'),					drawerIcon: () => (<Image source={require('../../assets/images/contacts.png')} style={{ width: 20, height: 20 }} resizeMode={'contain'}/>),				}}				component={ContactUs}/>			<Drawer.Screen name='settings'				options={{					drawerLabel: i18n.t('settings'),					drawerIcon: () => (<Image source={require('../../assets/images/settings.png')} style={{ width: 20, height: 20 }} resizeMode={'contain'}/>),				}}				component={Settings}/>		</Drawer.Navigator>	)}export function MainStackNavigator()  {	return(		<MainStack.Navigator mode={'card'} screenOptions={{headerShown: false}} >			<MainStack.Screen name="drawer" component={DrawerNavigator} />			<MainStack.Screen name="tripServices" component={TripServices} />			<MainStack.Screen name="providers" component={Providers} />			<MainStack.Screen name="providerDetails" component={ProviderDetails} />			<MainStack.Screen name="serviceDetails" component={ServiceDetails} />			<MainStack.Screen name="favs" component={Favs} />			<MainStack.Screen name="aboutApp" component={AboutApp} />			<MainStack.Screen name="roles" component={Roles} />			<MainStack.Screen name="contactUs" component={ContactUs} />			<MainStack.Screen name="settings" component={Settings} />			<MainStack.Screen name="profile" component={Profile} />			<MainStack.Screen name="editProfile" component={EditProfile} />			<MainStack.Screen name="complaint" component={Complaint} />			<MainStack.Screen name="language" component={Language} />			<MainStack.Screen name="changePass" component={ChangePass} />			<MainStack.Screen name="notifications" component={Notifications} />			<MainStack.Screen name="rateService" component={RateService} />			<MainStack.Screen name="confirmEvaluation" component={ConfirmEvaluation} />		</MainStack.Navigator>	);}