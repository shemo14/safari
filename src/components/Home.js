import React, { useState , useEffect, useRef } from "react";import { View, Text, Image, TouchableOpacity, ImageBackground, ScrollView, I18nManager, Dimensions, ActivityIndicator } from "react-native";import {Container, Button, Form, Input, Toast, Header, Right, Left, Body, Icon} from 'native-base'import styles from '../../assets/styles'import i18n from "../../locale/i18n";import MapView from 'react-native-maps';import  Modal  from "react-native-modal";import * as Location from 'expo-location';import COLORS from "../consts/colors";import axios from 'axios'import { useDispatch, useSelector } from 'react-redux'import {getCategories} from '../actions';import { Notifications } from 'expo'import * as Animatable from 'react-native-animatable';const width		 = Dimensions.get('window').width;const height	 = Dimensions.get('window').height;function Home({navigation}) {	const lang   							= useSelector(state => state.lang.lang);	const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);	const categories  	   					= useSelector(state => state.categories.categories);	let mapRef 								= useRef(null);	const [showModal, setShowModal] 		= useState(false);	const [tripType, setTripType]   		= useState(null);	const [category, setCategory]           = useState([]);	const [userLocation, setUserLocation]   = useState([]);	const [initMap, setInitMap]   			= useState(true);	const [search, setSearch]   			= useState('');	const [searchResult, setSearchResult]   = useState([]);	const [selectedLocation, setLocation]   = useState(null);	const [searchHeight, setSearchHeight]   = useState(70);	useEffect(() => {		Notifications.addListener(handleNotification);	}, []);	function handleNotification(notification) {		if (notification && notification.origin !== 'received') {			navigation.navigate('notification');		}		if (notification.remote) {			Vibration.vibrate();			const notificationId = Notifications.presentLocalNotificationAsync({				title: notification.data.title  ? notification.data.title : i18n.t('newNotification'),				body: notification.data.body ? notification.data.body : i18n.t('_newNotification'),				ios: { _displayInForeground: true }			});		}	}	const dispatch = useDispatch()	function toggleModal() {		setShowModal(!showModal)	}	function selectType(type, category) {		setTripType(type)		setCategory(category)	}	function navigateToTripService() {		toggleModal();		let latitude = '', longitude = '';		if (selectedLocation){			let { latitude, longitude } = selectedLocation;		}		else{			let { latitude, longitude } = userLocation;		}		const data = {			categoryId: tripType,			categoryName: category.name,			categoryImage: category.image,			subCategories: category.subCategories,			latitude,			longitude		};		navigation.navigate('tripServices', { data })	}	function fetchData(){		dispatch(getCategories(lang))	}	useEffect(() => {		(async () => {			fetchData();			let { status } = await Location.requestPermissionsAsync();			if (status !== 'granted') {				alert('Permission to access location was denied');			}			const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});			const location = { latitude, longitude };			setUserLocation(location);			setInitMap(false)		})();	}, []);	function renderMarkers() {		if (!selectedLocation){			const { latitude, longitude } = userLocation;			return (				<MapView.Marker					title={i18n.t('currentLocation')}					// style={{ width: 15, height: 15 }}					// image={require('../../assets/images/marker.png')}					coordinate={{ latitude, longitude }}				>					<Image source={require('../../assets/images/marker.png')} resizeMode={'contain'} style={[styles.icon35]}/>				</MapView.Marker>			);		}		if (selectedLocation){			const { latitude, longitude, name } = selectedLocation;			return (				<MapView.Marker					title={name}					image={require('../../assets/images/location.png')}					coordinate={{ latitude, longitude }}				/>			);		}	}	async function onSearch() {		let endPoint = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=';		endPoint    += search;		endPoint    += '&key=AIzaSyCJTSwkdcdRpIXp2yG7DfSRKFWxKhQdYhQ&language=' + lang;		console.log('city url', endPoint);		try {			const { data } = await axios.get(endPoint);			setSearchResult(data.results);			setSearchHeight(270);			console.log(data.results)		} catch (e) {			console.log(e);		}	}	function setSelectedLocation(item) {		const { geometry: { location } } = item;		const formattedItem = {			name: item.formatted_address,			address:  item.formatted_address,			latitude: location.lat,			longitude: location.lng		};		setSearchResult([]);		setSearchHeight(60);		setLocation(formattedItem);		mapRef.current.animateToRegion(			{				latitude: formattedItem.latitude,				longitude: formattedItem.longitude,				latitudeDelta: 0.422,				longitudeDelta: 0.121,			},			350		);	}	console.log(categories);	return (		<Container>			<ImageBackground source={require('../../assets/images/bg.png')} style={{ width, height, alignSelf: 'center', flexGrow: 1 }} resizeMode={'cover'}>				<Header style={{ backgroundColor: 'transparent', marginTop: 10, borderBottomWidth: 0 }} noShadow>					<Right style={{ flex: 0, marginLeft: 10 }}>						<TouchableOpacity onPress={() => navigation.openDrawer()} style={{ width: 50, height: 50, justifyCenter: 'center', alignItems: 'center' }}>							<Image source={require('../../assets/images/menu.png')} style={{ width: 23, height: 23, marginTop: 10 }} resizeMode={'contain'}/>						</TouchableOpacity>					</Right>					<Body style={{ alignSelf: 'center', flex: 1 }}>						<Text style={{ textAlign: 'center', width: '100%', color: '#fff', fontSize: 30, fontFamily: 'VIP_cartoon' }}>{ i18n.t('safari') }</Text>					</Body>					{						token?							<Left style={{ flex: 0 }}>								<TouchableOpacity onPress={() => navigation.navigate('notifications')} style={{ width: 50, height: 50, justifyCenter: 'center', alignItems: 'center' }}>									<Image source={require('../../assets/images/notification.png')} style={{ width: 27, height: 27, marginTop: 10 }} resizeMode={'contain'}/>								</TouchableOpacity>							</Left>							:							null					}				</Header>				<View contentContainerStyle={[styles.bgFullWidth ]}>					<View style={{ zIndex: 2, alignItems: 'center', height: searchHeight, position: 'absolute', width: '100%' }}>						<View style={styles.searchBox}>							<Icon type={'AntDesign'} name={'search1'} style={{ color: '#fff', fontSize: 20 }} />							<Input placeholder={i18n.t('search')} style={styles.searchInput} onChangeText={(search) => setSearch(search)} onSubmitEditing={() => onSearch()}/>							<TouchableOpacity onPress={() => onSearch()}>								<Icon type={'AntDesign'} name={ I18nManager.isRTL ? 'arrowleft' : 'arrowright'} style={{ color: '#fff', fontSize: 20 }} />							</TouchableOpacity>						</View>						{							searchResult && searchResult.length > 0 ?								searchResult.map((item, i) => (									<View key={i} style={{ alignSelf: 'center', width: '90%', maxHeight: 200, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, overflow: 'hidden', position: 'absolute', zIndex: 2, top: 52, left: 18, minHeight: 60 }}>										<View style={{ alignSelf: 'center', width: '100%', height: 220, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingBottom: 20, backgroundColor: '#fff', borderRadius: 10}}>											<ScrollView style={{ zIndex: 99999999 }}>												<TouchableOpacity onPress={() => setSelectedLocation(item)} style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ddd', marginHorizontal: 10, width: '95%', height: 50, alignItems: 'center', alignSelf: 'center', overflow: 'hidden', zIndex: 9999 }}>													<Icon type={'Entypo'} name={'location'} style={{ marginHorizontal: 10, color: '#000', fontSize: 16 }}/>													<Text style={[ styles.text_gray, styles.textBold, styles._alignText, ]}>{ (item.formatted_address).substr(0, 40) + '...' }</Text>												</TouchableOpacity>											</ScrollView>										</View>									</View>								)) : null						}					</View>					<Animatable.View animation="zoomInDown" easing="ease-out" delay={700} style={{ position: 'absolute', width: '90%', height: 80, backgroundColor: '#fff', borderRadius: 10, zIndex: 1, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginTop: 60 }}>						<Text style={[styles.textSize_18, styles.text_black, styles.textBold, styles.textCenter, styles.Width_70]}>{ i18n.t('selectSafaryLocation') }</Text>					</Animatable.View>					<View style={[styles.mapView, { marginTop: 55 }]}>						{							initMap ?								<View style={[styles.loading, styles.flexCenter, {height:'100%'}]}>									<ActivityIndicator size="large" color={COLORS.blue} style={{ alignSelf: 'center' }} />								</View> :								<MapView									ref={mapRef}									style={{ width: '100%', height: '100%' }}									initialRegion={{										latitude:  userLocation.latitude,										longitude: userLocation.longitude,										latitudeDelta: 0.422,										longitudeDelta: 0.121,									}}								>									{ renderMarkers() }								</MapView>						}					</View>					<Button onPress={() => toggleModal()} style={[styles.blueBtn, styles.Width_80, styles.textCenter, { bottom: 80, alignSelf: 'center' }]}>						<Text style={[styles.textRegular , styles.text_White , styles.textSize_16, styles.textCenter]}>{ i18n.t('continue') }</Text>					</Button>				</View>			</ImageBackground>			<Modal				onBackdropPress     = {toggleModal}				onBackButtonPress   = {toggleModal}				isVisible           = {showModal}				style               = {styles.bgModel}				avoidKeyboard  		= {true}			>				<View style={[{borderTopLeftRadius:30,					borderTopRightRadius:30},styles.bg_White, styles.overHidden, styles.Width_100, styles.paddingVertical_10 , styles.paddingHorizontal_10]}>					<View style={[styles.overHidden, styles.Width_100 , styles.paddingHorizontal_25]}>						<Text style={[styles.text_black , styles.textBold , styles.textSize_24, styles.textCenter ]}>{ i18n.t('chooseTripType') }</Text>						<View style={{ width: '100%' }}>							<View style={{ marginTop: 30, alignItems: 'flex-start', }}>								{									categories ?										categories.map(( category, i ) => (											<TouchableOpacity  key={i} onPress={() => selectType(category.id, category)} style={[styles.chooseLang , styles.tripType, styles.marginVertical_5]}>												<ImageBackground source={{ uri: category.image }} style={styles.tripImageBackground}>													<View style={[ styles.overlay_black, styles.Width_100, styles.position_A, styles.height_50, { zIndex: tripType === category.id ? 0 : -1 } ]} />													<Text style={[ styles.textSize_16, styles.text_black, styles.textBold, styles.tripTypeText ]}>{ category.name }</Text>													{														tripType === category.id ?															<Icon type={'AntDesign'} name={'check'} style={styles.tripTypeIcon}/> : null													}												</ImageBackground>											</TouchableOpacity>										)) : null								}							</View>						</View>						<TouchableOpacity disabled={tripType ? false : true} onPress={() => navigateToTripService()} style={[tripType ? styles.blueBtn : styles.grayBtn , styles.Width_100 , styles.marginBottom_35, styles.marginTop_20]}>							<Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('confirm') }</Text>						</TouchableOpacity>					</View>				</View>			</Modal>		</Container>	)}export default Home;