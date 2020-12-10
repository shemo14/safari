import React, { useState , useEffect } from "react";import { View, Text, Image, TouchableOpacity, ImageBackground, I18nManager, Dimensions, Platform } from "react-native";import {Body, Container, Content, Form, Header, Input, Item, Label, Right} from 'native-base'import styles from '../../../assets/styles'import i18n from "../../../locale/i18n";import COLORS from "../../consts/colors";import {useDispatch, useSelector} from "react-redux";import * as Animatable from "react-native-animatable";import {getSubscriptionDetails} from "../../actions";const width	 		= Dimensions.get('window').width;const height 		= Dimensions.get('window').height;const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';function Profile({navigation}) {	const user  = useSelector(state => state.auth.user ? state.auth.user.data : { avatar: '', name: null, phone: null , whatsapp:null});	const token 							= useSelector(state => state.auth.user ? state.auth.user.data.token : null);	const subscriptionDetails 				= useSelector(state => state.subscriptionDetails.subscriptionDetails);	const dispatch = useDispatch();	function fetchData() {		// alert('pathName' + pathName);		dispatch(getSubscriptionDetails(token, navigation, 'subscribe'));	}	return (		<Container>			<ImageBackground source={require('../../../assets/images/bg.png')} style={{ width, height: 200, alignSelf: 'center', flexGrow: 1 }} resizeMode={'cover'}>				<Header style={{ backgroundColor: 'transparent',  borderBottomWidth: 0 }} noShadow>					<Right style={{ flex: 0, marginLeft: 10 }}>						<TouchableOpacity onPress={() => navigation.navigate('home')} style={{ width: 50, height: 50, justifyCenter: 'center', alignItems: 'center' }}>							<Image source={require('../../../assets/images/white_back.png')} style={[ styles.transform , { width: 27, height: 27, marginTop: 10 }]} resizeMode={'contain'}/>						</TouchableOpacity>						<Text style={{ textAlign:  I18nManager.isRTL ? 'right' : 'left', color: '#fff', fontSize: 20, fontFamily: 'ArbFONTSBold', marginBottom: 5 }}>{ i18n.t('profile') }</Text>					</Right>					<Body style={{ alignSelf: 'flex-start'}} />				</Header>				<View animation="fadeInDown" easing="ease-out" delay={700}								 style={[styles.tripHeaderShadow, { backgroundColor: '#fff', width: 150, height: 150 }]}>					<TouchableOpacity onPress={() => navigation.navigate('editProfile')} style={[styles.tripHeaderImage , styles.borderBlue, styles.textCenter, { alignItems: 'center', justifyCenter: 'center', height: 150 }]}>						<ImageBackground source={{ uri: user.avatar }} style={{ width: 150, height: 150 }} resizeMode={'cover'}>							<Image source={require('../../../assets/images/editing.png')} style={{ width: 25, height: 25, margin: 10  , alignSelf:'flex-end'}}/>						</ImageBackground>					</TouchableOpacity>				</View>				<Content bounces={false} style={{ overflow: 'hidden', borderTopRightRadius: 50, marginTop: 50}}>					<View style={{ width: '100%', padding: 15, borderTopRightRadius: 50, backgroundColor: '#fff', minHeight: 110, }}>						<Form style={[styles.Width_100 , styles.flexCenter, styles.marginVertical_10, styles.Width_90, { marginTop: 150 }]}>							<View style={[styles.position_R, styles.height_70, styles.flexCenter, styles.marginBottom_10 ]}>								<Item floatingLabel style={[styles.item, styles.position_R ]}>									<Label style={[styles.label, styles.textRegular ,{ color:COLORS.blue }]}>{ i18n.t('username') }</Label>									<Input style={[styles.input, styles.height_50, (styles.Active)]}										   value={user.name}										   disabled={true}									/>								</Item>							</View>							<View style={[styles.position_R, styles.height_70, styles.flexCenter, styles.marginBottom_5 ]}>								<Item floatingLabel style={[styles.item, styles.position_R ]}>									<Label style={[styles.label, styles.textRegular ,{ color:COLORS.blue }]}>{ i18n.t('phone') }</Label>									<Input style={[styles.input, styles.height_50, styles.Active ]}										   value={user.phone}										   disabled={true}									/>								</Item>							</View>							<View style={[styles.position_R, styles.height_70, styles.flexCenter, styles.marginBottom_5 ]}>								<Item floatingLabel style={[styles.item, styles.position_R ]}>									<Label style={[styles.label, styles.textRegular ,{ color:COLORS.blue }]}>{ i18n.t('whatsNum') }</Label>									<Input style={[styles.input, styles.height_50, styles.Active ]}										   value={user.whatsapp.toString()}										   disabled={true}									/>								</Item>							</View>							{								subscriptionDetails && subscriptionDetails.subscription_expire ?									<View style={[styles.position_R, styles.height_70, styles.flexCenter, styles.marginBottom_5 ]}>										<Item floatingLabel style={[styles.item, styles.position_R ]}>											<Label style={[styles.label, styles.textRegular ,{ color:COLORS.blue }]}>{ i18n.t('subscribeExpire') }</Label>											<Input style={[styles.input, styles.height_50, styles.Active ]}												   value={subscriptionDetails.subscription_expire}												   disabled={true}											/>										</Item>									</View>									:									null							}						</Form>					</View>				</Content>			</ImageBackground>		</Container>	)}export default Profile;