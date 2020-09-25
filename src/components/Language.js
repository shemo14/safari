import React, { useState , useEffect, useRef } from "react";import {	View,	Text,	Image,	TouchableOpacity,	ImageBackground,	I18nManager,	Dimensions,	FlatList,	Platform,	Share,} from "react-native";import {Container, Header, Right, Body, Icon, Content, Button} from 'native-base'import styles from '../../assets/styles'import i18n from "../../locale/i18n";import COLORS from "../consts/colors";import { useDispatch, useSelector } from 'react-redux'import {chooseLang} from "../actions";const width	 		= Dimensions.get('window').width;const height 		= Dimensions.get('window').height;const isIOS  		= Platform.OS === 'ios';const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';function Language({navigation, route}) {	const language = useSelector(state => state.lang);	const [lang, setLang] = useState(language.lang);	console.log("language" , language.lang);	const dispatch = useDispatch();	function selectLang(lang) {		setLang(lang)	}	function onChooseLang(){		dispatch(chooseLang(lang))	}	return (		<Container>			<ImageBackground source={require('../../assets/images/bg.png')} style={{ width, height: 200, alignSelf: 'center', flexGrow: 1 }} resizeMode={'cover'}>				<Header style={{ backgroundColor: 'transparent',  borderBottomWidth: 0 }} noShadow>					<Right style={{ flex: 0, marginLeft: 10 }}>						<TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 50, height: 50, justifyCenter: 'center', alignItems: 'center' }}>							<Image source={require('../../assets/images/white_back.png')} style={[ styles.transform , { width: 27, height: 27, marginTop: 10 }]} resizeMode={'contain'}/>						</TouchableOpacity>						<Text style={{ textAlign:  I18nManager.isRTL ? 'right' : 'left', color: '#fff', fontSize: 20, fontFamily: 'ArbFONTSBold', marginBottom: 5 }}>{ i18n.t('language') }</Text>					</Right>					<Body style={{ alignSelf: 'flex-start'}} />				</Header>				<View style={[styles.tripHeaderShadow, { backgroundColor: '#fff', marginTop: IS_IPHONE_X ? 100 : 60 }]}>					<View style={[styles.tripHeaderImage, styles.textCenter, { alignItems: 'center', justifyCenter: 'center' }]}>						<Text style={{ textAlign: 'center', width: '100%', color: COLORS.blue, fontSize: 30, fontFamily: 'VIP_cartoon', marginTop: 5 }}>{ i18n.t('safari') }</Text>						<Text style={[styles.textSize_16, styles.text_black, styles.textBold, styles.textCenter, styles.Width_90]}>{ i18n.t('langIntro') }</Text>					</View>				</View>				<Content bounces={false} style={{ overflow: 'hidden', borderTopRightRadius: 50, marginTop: 40}}>					<View style={{ width: '100%', padding: 15, borderTopRightRadius: 50, backgroundColor: '#fff', minHeight: 110, }}>						<View style={{ padding: 20, marginTop: 50, alignItems: 'flex-start', }}>							<TouchableOpacity onPress={() => selectLang('ar')} style={[styles.chooseLang , { borderColor: lang === 'ar' ? COLORS.blue : COLORS.gray}]}>								<Text style={[ styles.textSize_16, styles.text_black, styles.textRegular, { textAlign: 'right', width: '100%', color: lang === 'ar' ? COLORS.black_gray : COLORS.light_gray } ]}>عربي</Text>								{									lang === 'ar' ?										<Icon type={'AntDesign'} name={'check'} style={{ position: 'absolute', marginHorizontal: 10 }}/> : null								}							</TouchableOpacity>							<TouchableOpacity onPress={() => selectLang('en')} style={[styles.chooseLang, { marginTop: 20, borderColor: lang === 'en' ? COLORS.blue : COLORS.gray } ]}>								<Text style={[ styles.textSize_16, styles.text_black, styles.textRegular, { textAlign: 'right', width: '100%', color: lang === 'en' ? COLORS.black_gray : COLORS.light_gray } ]}>English</Text>								{									lang === 'en' ?										<Icon type={'AntDesign'} name={'check'} style={{ position: 'absolute', marginHorizontal: 10 }}/> : null								}							</TouchableOpacity>							<Button onPress={() => onChooseLang()} style={{ backgroundColor: COLORS.blue, width: '100%', marginTop: 20, borderRadius: 10 }}>								<Text style={[ styles.textSize_16, styles.textRegular, { textAlign: 'center', width: '100%', color: '#fff', } ]}>تأكيد</Text>							</Button>						</View>					</View>				</Content>			</ImageBackground>		</Container>	)}export default Language;