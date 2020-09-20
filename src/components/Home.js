import React, { useState , useEffect, useRef } from "react";import { View, Text, Image, TouchableOpacity, ImageBackground, KeyboardAvoidingView, I18nManager, Dimensions } from "react-native";import {Container, Button, Form, Input, Toast, Header, Right, Left, Body, Icon} from 'native-base'import styles from '../../assets/styles'import i18n from "../../locale/i18n";import MapView from 'react-native-maps';import  Modal  from "react-native-modal";import COLORS from "../consts/colors";import { useDispatch, useSelector } from 'react-redux'const width		 = Dimensions.get('window').width;const height	 = Dimensions.get('window').height;function Home({navigation, route}) {	const [showModal, setShowModal] = useState(false);	const [tripType, setTripType]   = useState('land');	function toggleModal() {		setShowModal(!showModal)	}	function selectType(type) {		setTripType(type)	}	function navigateToTripService() {		toggleModal();		navigation.navigate('tripServices', { tripType })	}	return (		<Container>			<ImageBackground source={require('../../assets/images/menu_bg.png')} style={{ width, height, alignSelf: 'center', flexGrow: 1 }} resizeMode={'cover'}>				<Header style={{ backgroundColor: 'transparent', marginTop: 10, borderBottomWidth: 0 }} noShadow>					<Right style={{ flex: 0, marginLeft: 10 }}>						<TouchableOpacity onPress={() => navigation.openDrawer()} style={{ width: 50, height: 50, justifyCenter: 'center', alignItems: 'center' }}>							<Image source={require('../../assets/images/menu.png')} style={{ width: 27, height: 27, marginTop: 10 }} resizeMode={'contain'}/>						</TouchableOpacity>					</Right>					<Body style={{ alignSelf: 'center', flex: 1 }}>						<Text style={{ textAlign: 'center', width: '100%', color: '#fff', fontSize: 30, fontFamily: 'VIP_cartoon' }}>{ i18n.t('safari') }</Text>					</Body>					<Left style={{ flex: 0 }}>						<TouchableOpacity onPress={() => navigation.navigate('notifications')} style={{ width: 50, height: 50, justifyCenter: 'center', alignItems: 'center' }}>							<Image source={require('../../assets/images/notification.png')} style={{ width: 27, height: 27, marginTop: 10 }} resizeMode={'contain'}/>						</TouchableOpacity>					</Left>				</Header>				<View contentContainerStyle={[styles.bgFullWidth ]}>					<View style={styles.searchBox}>						<Icon type={'AntDesign'} name={'search1'} style={{ color: '#fff', fontSize: 20 }} />						<Input placeholder={i18n.t('search')} style={styles.searchInput}/>						<TouchableOpacity>							<Icon type={'AntDesign'} name={ I18nManager.isRTL ? 'arrowleft' : 'arrowright'} style={{ color: '#fff', fontSize: 20 }} />						</TouchableOpacity>					</View>					<View style={{ position: 'absolute', width: '90%', height: 80, backgroundColor: '#fff', borderRadius: 10, zIndex: 1, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginTop: 60 }}>						<Text style={[styles.textSize_18, styles.text_black, styles.textBold, styles.textCenter, styles.Width_70]}>{ i18n.t('selectSafaryLocation') }</Text>					</View>					<View style={styles.mapView}>						<MapView style={{ width: '100%', height: '100%' }} />					</View>					<Button onPress={() => toggleModal()} style={[styles.blueBtn, styles.Width_80, styles.textCenter, { bottom: 60, alignSelf: 'center' }]}>						<Text style={[styles.textRegular , styles.text_White , styles.textSize_16, styles.textCenter]}>{ i18n.t('continue') }</Text>					</Button>				</View>			</ImageBackground>			<Modal				onBackdropPress     = {toggleModal}				onBackButtonPress   = {toggleModal}				isVisible           = {showModal}				style               = {styles.bgModel}				avoidKeyboard  		= {true}			>				<View style={[{borderTopLeftRadius:30,					borderTopRightRadius:30},styles.bg_White, styles.overHidden, styles.Width_100, styles.paddingVertical_10 , styles.paddingHorizontal_10]}>					<View style={[styles.overHidden, styles.Width_100 , styles.paddingHorizontal_25]}>						<Text style={[styles.text_black , styles.textBold , styles.textSize_24, styles.textCenter ]}>{ i18n.t('chooseTripType') }</Text>						<View style={{ width: '100%' }}>							<View style={{ marginTop: 30, alignItems: 'flex-start', }}>								<TouchableOpacity onPress={() => selectType('land')} style={[styles.chooseLang , styles.tripType]}>									<ImageBackground source={require('../../assets/images/button_one.png')} style={styles.tripImageBackground}>										<View style={[ styles.overlay_black, styles.Width_100, styles.position_A, styles.height_50, { zIndex: tripType === 'land' ? 0 : -1 } ]} />										<Text style={[ styles.textSize_16, styles.text_black, styles.textBold, styles.tripTypeText ]}>{ i18n.t('wild_kashta') }</Text>										{											tripType === 'land' ?												<Icon type={'AntDesign'} name={'check'} style={styles.tripTypeIcon}/> : null										}									</ImageBackground>								</TouchableOpacity>								<TouchableOpacity onPress={() => selectType('sea')} style={[styles.chooseLang, styles.tripType, styles.marginTop_20 ]}>									<ImageBackground source={require('../../assets/images/button_two.png')} style={styles.tripImageBackground}>										<View style={[ styles.overlay_black, styles.Width_100, styles.position_A, styles.height_50, { zIndex: tripType === 'sea' ? 0 : -1 } ]} />										<Text style={[ styles.textSize_16, styles.text_black, styles.textBold, styles.tripTypeText ]}>{ i18n.t('sea_trip') }</Text>										{											tripType === 'sea' ?												<Icon type={'AntDesign'} name={'check'} style={styles.tripTypeIcon}/> : null										}									</ImageBackground>								</TouchableOpacity>							</View>						</View>						<TouchableOpacity onPress={() => navigateToTripService()} style={[styles.blueBtn , styles.Width_100 , styles.marginBottom_35, styles.marginTop_20]}>							<Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('confirm') }</Text>						</TouchableOpacity>					</View>				</View>			</Modal>		</Container>	)}export default Home;