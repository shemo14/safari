import React, { useState , useEffect, useRef } from "react";import { View, Text, Image, TouchableOpacity, ImageBackground, KeyboardAvoidingView, I18nManager, Dimensions, FlatList, Platform, ActivityIndicator, Linking, Share, } from "react-native";import {Container, Button, Form, Input, Toast, Header, Right, Left, Body, Icon, Content} from 'native-base'import styles from '../../../assets/styles'import Swiper from 'react-native-swiper';import i18n from "../../../locale/i18n";import StarRating from "react-native-star-rating";import COLORS from "../../consts/colors";import { useDispatch, useSelector } from 'react-redux'import axios from "axios";import CONST from "../../consts";import {DeleteService, DeleteAddition} from '../../actions';const width	 		= Dimensions.get('window').width;const height 		= Dimensions.get('window').height;const isIOS  		= Platform.OS === 'ios';const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';function ServiceDetails({navigation, route}) {	const service_id = route.params.service_id;	const lang 					= useSelector(state => state.lang.lang);	const token 				= useSelector(state => state.auth.user ? state.auth.user.data.token : null);	const serviceDetailes 		= useSelector(state => state.serviceDetailes.serviceDetailes);	const serviceDetailesLoader = useSelector(state => state.serviceDetailes.loader);	const [screenLoader , setScreenLoader ] = useState(true);	const dispatch = useDispatch();	function fetchData(){		axios({			url         : CONST.url + 'serviceDetailes',			method      : 'POST',			data        : {lang , service_id},			headers     : {Authorization: token}		}).then(response => {			dispatch({type: 'getServiceDetailes', payload: response.data});			if(response.data.success){				setScreenLoader(false)			}		});	}	useEffect(() => {		fetchData();		const unsubscribe = navigation.addListener('focus', () => {			fetchData();		});		return unsubscribe;	}, [navigation , serviceDetailesLoader]);	function confirmDelete (id) {		dispatch(DeleteService(lang , id , token , navigation))	};	function renderLoader(){		if (screenLoader){			return(				<View style={[styles.loading, styles.flexCenter, {height:'100%' , backgroundColor:'#fff'}]}>					<ActivityIndicator size="large" color={COLORS.blue} style={{ alignSelf: 'center' }} />				</View>			);		}	}	const onShare = async () => {		try {			const result = await Share.share({				message:					Platform.OS === 'ios' ? 'https://apps.apple.com/us/app/id1533160556' : 'https://play.google.com/store/apps/details?id=com.safari.client',			});			if (result.action === Share.sharedAction) {				if (result.activityType) {					// shared with activity type of result.activityType				} else {					// shared				}			} else if (result.action === Share.dismissedAction) {				// dismissed			}		} catch (error) {			alert(error.message);		}	};	function deleteItem(id) {		dispatch(DeleteAddition(lang, id, token)).then(() => fetchData())    }	return (		<Container>			{renderLoader()}			{				serviceDetailes ?					<Content style={{ marginTop: IS_IPHONE_X ? -50 : 0 }}>						<View style={[styles.directionRowSpace , styles.paddingHorizontal_10 , { position: 'absolute', width: '100%', height: 100, zIndex: 1, marginTop: IS_IPHONE_X ? 20 : 0 }]}>							<TouchableOpacity onPress={() => navigation.goBack()}>								<Image source={require('../../../assets/images/white_back.png')} style={[ styles.transform, { width: 25, height: 25}]} resizeMode={'contain'}/>							</TouchableOpacity>							<View style={[styles.directionRowSpace]}>								<TouchableOpacity onPress={() => onShare()} >									<Image source={require('../../../assets/images/share.png')} style={{ width: 25, height: 25}} resizeMode={'contain'}/>								</TouchableOpacity>								<TouchableOpacity style={[styles.marginHorizontal_10]} onPress={() => navigation.navigate('editService', { service: serviceDetailes })}>									<Icon type={'AntDesign'} name={'edit'} style={{fontSize:25 , color: '#fff' }} />								</TouchableOpacity>								<TouchableOpacity onPress={() => confirmDelete(serviceDetailes.id)} >									<Icon type={'AntDesign'} name={'delete'} style={{fontSize:25 , color: '#fff' }} />								</TouchableOpacity>							</View>						</View>						<View style={{ width: '100%', height: IS_IPHONE_X ? 400 : 330 }}>							<Swiper dotStyle={[styles.doteStyle2]}									activeDotStyle={[styles.activeDot2]}									key={3}									containerStyle={{ height: 300 }}									style={{ flexDirection: isIOS && I18nManager.isRTL  ? 'row' : 'row-reverse' }}									autoplay={true} loop={true}>								{									serviceDetailes.images.map((img, i) => (										<View key={i} style={{ }}>											<View style={[styles.overlay_black , styles.Width_100, { zIndex: 1, height: 400, position: 'absolute' }]} />											<Image source={{uri:img.image}} style={{ width: '100%', height: height*40/100, alignSelf: 'center' }} resizeMode={'cover'}/>										</View>									))								}							</Swiper>						</View>						<View style={{ width: '100%', height: 120, borderTopRightRadius: 40, backgroundColor: COLORS.blue, marginTop: -100, padding: 15 }}>							<View style={[styles.directionRowSpace]}>								<Text style={[styles.textBold, styles.textSize_18, styles.text_White, styles._alignText, styles.textRight]}>{serviceDetailes.name}</Text>								<Text style={[ styles.textSize_16, styles.text_White, styles.textRegular, styles._alignText]}>{serviceDetailes.price}</Text>							</View>						</View>						<View style={{ width: '100%', borderTopRightRadius: 50, backgroundColor: '#fff', marginTop: -45 , padding: 15, marginBottom: 50 }}>							<Text style={[ styles.textSize_14, styles.text_gray, styles.textRegular, styles.writngDir, styles.Width_100, { alignSelf: 'flex-start' } ]}>								{serviceDetailes.description}							</Text>							{								serviceDetailes.additions && serviceDetailes.additions.length > 0 ?									<View>										<Text style={[ styles.textSize_18, styles.text_black, styles.textBold, styles._alignText, { alignSelf: 'flex-start' } ]}> { i18n.t('additions') } </Text>										{											serviceDetailes.additions.map((adds, i) => (												<View key={i} style={{ backgroundColor: '#f7f7fa', flexDirection: 'row', borderRadius: 10, alignItems: 'center', padding: 5, marginVertical: 5 }}>													<View style={{ width: 60, height: 60, borderRadius: 10, overflow: 'hidden' }}>														<Image source={{uri:adds.image}} style={{ width: 60, height: 60}} resizeMode={'cover'}/>													</View>													<View style={{ marginHorizontal: 10 }}>														<Text style={[ styles.textSize_14, styles.text_black, styles.textBold, styles._alignText, { alignSelf: 'flex-start' } ]}> {adds.addition} </Text>														<Text style={[ styles.textSize_14, styles.text_orange, styles.textRegular, styles._alignText, { alignSelf: 'flex-start'} ]}> {adds.price}</Text>													</View>													<TouchableOpacity style={{position:'absolute' , right:5 , top:5}} onPress={() => deleteItem(adds.addition_id)}>														<Icon type={'AntDesign'} name={'close'} style={{fontSize: 18 , color:COLORS.gray}}/>													</TouchableOpacity>												</View>											))										}									</View> : null							}						</View>					</Content>					:					null			}		</Container>	)}export default ServiceDetails;