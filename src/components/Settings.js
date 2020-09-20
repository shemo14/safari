import React, { useState , useEffect, useRef } from "react";import {	View,	Text,	Image,	TouchableOpacity,	ImageBackground,	I18nManager,	Dimensions,	FlatList,	Platform,	Share,	Switch,	ScrollView} from "react-native";import {Container, Header, Right, Body, Icon, Content, Card } from 'native-base'import styles from '../../assets/styles'import i18n from "../../locale/i18n";import COLORS from "../consts/colors";import { useDispatch, useSelector } from 'react-redux'import * as Animatable from "react-native-animatable";const width	 		= Dimensions.get('window').width;const height 		= Dimensions.get('window').height;const isIOS  		= Platform.OS === 'ios';const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';function Settings({navigation, route}) {	const [switchValue, setSwitchValue] = useState(false);	function toggleSwitch(value) {		setSwitchValue(value);	}	const onShare = async () => {		try {			const result = await Share.share({				message:					'Safari App',			});			if (result.action === Share.sharedAction) {				if (result.activityType) {					// shared with activity type of result.activityType				} else {					// shared				}			} else if (result.action === Share.dismissedAction) {				// dismissed			}		} catch (error) {			alert(error.message);		}	};	return (		<Container>			<ImageBackground source={require('../../assets/images/menu_bg.png')} style={{ width, height: 200, alignSelf: 'center', flexGrow: 1 }} resizeMode={'cover'}>				<Header style={{ backgroundColor: 'transparent',  borderBottomWidth: 0 }} noShadow>					<Right style={{ flex: 0, marginLeft: 10 }}>						<TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 50, height: 50, justifyCenter: 'center', alignItems: 'center' }}>							<Image source={require('../../assets/images/white_back.png')} style={[ styles.transform , { width: 27, height: 27, marginTop: 10 }]} resizeMode={'contain'}/>						</TouchableOpacity>						<Text style={{ textAlign:  I18nManager.isRTL ? 'right' : 'left', color: '#fff', fontSize: 20, fontFamily: 'ArbFONTSBold', marginBottom: 5 }}>{ i18n.t('contactUs') }</Text>					</Right>					<Body style={{ alignSelf: 'flex-start'}} />				</Header>				<View style={[styles.tripHeaderShadow, { backgroundColor: '#fff', marginTop: IS_IPHONE_X ? 100 : 60 }]}>					<View style={[styles.tripHeaderImage, styles.textCenter, { alignItems: 'center', justifyCenter: 'center' }]}>						<Text style={{ textAlign: 'center', width: '100%', color: COLORS.blue, fontSize: 30, fontFamily: 'VIP_cartoon', marginTop: 5 }}>{ i18n.t('safari') }</Text>						<Text style={[styles.textSize_16, styles.text_black, styles.textBold, styles.textCenter, styles.Width_100]}>{ i18n.t('contactsIntro') }</Text>					</View>				</View>				<Content scrollEnabled={false} bounces={false} style={{ overflow: 'hidden', borderTopRightRadius: 50, marginTop: 40}}>					<View style={{ width: '100%', padding: 15, borderTopRightRadius: 50, backgroundColor: '#fff', minHeight: 110, overflow: 'hidden' }}>						<ScrollView>							<Text style={[styles.textBold , styles.text_blue , styles.textSize_15 , styles.marginBottom_10, styles.alignStart, { marginTop: 40 }]}>{ i18n.t('account')}</Text>							<Card style={[{padding:15} , styles.Radius_10 , styles.marginBottom_15]}>								<TouchableOpacity onPress={() => navigation.push('editProfile')} style={[styles.Width_100 , styles.directionRowSpace]}>									<Text style={[styles.textRegular , styles.text_gray , styles.textSize_15 ]}>{ i18n.t('editData')}</Text>									<Image source={require('../../assets/images/left_arrow.png')} style={[styles.footerIcon, styles.transform]} resizeMode={'contain'} />								</TouchableOpacity>								<View style={[styles.Width_90 , styles.flexCenter , styles.marginVertical_15 , {borderWidth:.5 , borderColor:'#ddd'}]}/>								<TouchableOpacity onPress={() => navigation.push('changePass')} style={[styles.Width_100 , styles.directionRowSpace]}>									<Text style={[styles.textRegular , styles.text_gray , styles.textSize_15 ]}>{ i18n.t('changePass')}</Text>									<Image source={require('../../assets/images/left_arrow.png')} style={[styles.footerIcon, styles.transform]} resizeMode={'contain'} />								</TouchableOpacity>							</Card>							<Text style={[styles.textBold , styles.text_blue , styles.textSize_15 , styles.marginBottom_10 , styles.marginTop_5, styles.alignStart]}>{ i18n.t('notifications')}</Text>							<Card style={[{padding:15} , styles.Radius_10, styles.marginBottom_15]}>								<View style={[styles.Width_100 , styles.directionRowSpace]}>									<Text style={[styles.textRegular , styles.text_gray , styles.textSize_15 ]}>{ i18n.t('appNoti')}</Text>									<Switch										style={{}}										onValueChange={() => toggleSwitch(!switchValue)}										value={switchValue}										trackColor={COLORS.blue}										thumbColor={'#F1F1F1'}									/>								</View>							</Card>							<Text style={[styles.textBold , styles.text_blue , styles.textSize_15 , styles.marginBottom_10 , styles.marginTop_5, styles.alignStart]}>{ i18n.t('more')}</Text>							<Card style={[{padding:15} , styles.Radius_10 , styles.marginBottom_15]}>								<TouchableOpacity onPress={() => navigation.navigate('language')} style={[styles.Width_100 , styles.directionRowSpace]}>									<Text style={[styles.textRegular , styles.text_gray , styles.textSize_15 ]}>{ i18n.t('language')}</Text>									<Image source={require('../../assets/images/left_arrow.png')} style={[styles.footerIcon, styles.transform]} resizeMode={'contain'} />								</TouchableOpacity>								<View style={[styles.Width_90 , styles.flexCenter , styles.marginVertical_15 , {borderWidth:.5 , borderColor:'#ddd'}]}/>								<TouchableOpacity onPress={() => navigation.navigate('complaint')} style={[styles.Width_100 , styles.directionRowSpace]}>									<Text style={[styles.textRegular , styles.text_gray , styles.textSize_15 ]}>{ i18n.t('complaint')}</Text>									<Image source={require('../../assets/images/left_arrow.png')} style={[styles.footerIcon, styles.transform]} resizeMode={'contain'} />								</TouchableOpacity>								<View style={[styles.Width_90 , styles.flexCenter , styles.marginVertical_15 , {borderWidth:.5 , borderColor:'#ddd'}]}/>								<TouchableOpacity onPress={() => onShare()} style={[styles.Width_100 , styles.directionRowSpace]}>									<Text style={[styles.textRegular , styles.text_gray , styles.textSize_15 ]}>{ i18n.t('share')}</Text>									<Image source={require('../../assets/images/left_arrow.png')} style={[styles.footerIcon, styles.transform]} resizeMode={'contain'} />								</TouchableOpacity>							</Card>						</ScrollView>					</View>				</Content>			</ImageBackground>		</Container>	)}export default Settings;