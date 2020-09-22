import React, { useState , useEffect, useRef } from "react";import {	View,	Text,	Image,	TouchableOpacity,	ImageBackground,	I18nManager,	Dimensions,	Platform,	ActivityIndicator,} from "react-native";import {Container, Header, Right, Body, Content, Item, Label, Input, Form, Toast} from 'native-base'import styles from '../../assets/styles'import i18n from "../../locale/i18n";import COLORS from "../consts/colors";import {useDispatch, useSelector} from "react-redux";import {changePass} from '../actions';const width	 		= Dimensions.get('window').width;const height 		= Dimensions.get('window').height;const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';function ChangePass({navigation}) {	const lang = useSelector(state => state.lang.lang);	const token = useSelector(state => state.auth.user.data.token);	const [isSubmitted, setIsSubmitted] = useState(false);	const [repeatPass, setRepeatPass] = useState('');	const [password, setPassword] = useState('');	const [confirmPass, setConfirmPass] = useState('');	const [repeatPassStatus, setRepeatPassStatus] = useState(0);	const [passwordStatus, setPasswordStatus] = useState(0);	const [confirmPassStatus, setConfirmPassStatus] = useState(0);	const dispatch = useDispatch();	useEffect(() => {		setIsSubmitted(false)	}, [isSubmitted]);	function renderConfirm(){		if (password == '' || repeatPass == '' || confirmPass == ''){			return (				<View style={[styles.blueBtn , styles.Width_95 , {backgroundColor:'#ccc'}]}>					<Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('confirm') }</Text>				</View>			);		}		if (isSubmitted){			return(				<View style={[{ justifyContent: 'center', alignItems: 'center' } , styles.marginTop_25]}>					<ActivityIndicator size="large" color={COLORS.blue} style={{ alignSelf: 'center' }} />				</View>			)		}		return (			<TouchableOpacity onPress={() => onConfirm()} style={[styles.blueBtn , styles.Width_95]}>				<Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('confirm') }</Text>			</TouchableOpacity>		);	}	function onConfirm(){		if (confirmPass.length < 6){			Toast.show({				text        : i18n.t('passreq'),				type        : "danger",				duration    : 3000,				textStyle   : {					color       : "white",					fontFamily  : 'ArbFONTS',					textAlign   : 'center'				}			});			return false		}else if(repeatPass !== confirmPass){			Toast.show({				text        : i18n.t('passError'),				type        : "danger",				duration    : 3000,				textStyle   : {					color       : "white",					fontFamily  : 'ArbFONTS',					textAlign   : 'center'				}			});			return false		} else {			setIsSubmitted(true);			dispatch(changePass(lang , password , confirmPass , token , navigation));		}	}	function activeInput(type) {		if (type === 'repeatPass' || repeatPass !== '') {			setRepeatPassStatus(1)		}		if (type === 'password' || password !== '') {			setPasswordStatus(1)		}		if (type === 'confirmPass' || confirmPass !== '') {			setConfirmPassStatus(1)		}	}	function unActiveInput(type) {		if (type === 'repeatPass' && repeatPass === '') {			setRepeatPassStatus(0)		}		if (type === 'password' && password === '') {			setPasswordStatus(0)		}		if (type === 'confirmPass' && confirmPass === '') {			setConfirmPassStatus(0)		}	}	return (		<Container>			<ImageBackground source={require('../../assets/images/menu_bg.png')} style={{ width, height: 200, alignSelf: 'center', flexGrow: 1 }} resizeMode={'cover'}>				<Header style={{ backgroundColor: 'transparent',  borderBottomWidth: 0 }} noShadow>					<Right style={{ flex: 0, marginLeft: 10 }}>						<TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 50, height: 50, justifyCenter: 'center', alignItems: 'center' }}>							<Image source={require('../../assets/images/white_back.png')} style={[ styles.transform , { width: 27, height: 27, marginTop: 10 }]} resizeMode={'contain'}/>						</TouchableOpacity>						<Text style={{ textAlign:  I18nManager.isRTL ? 'right' : 'left', color: '#fff', fontSize: 20, fontFamily: 'ArbFONTSBold', marginBottom: 5 }}>{ i18n.t('changePass') }</Text>					</Right>					<Body style={{ alignSelf: 'flex-start'}} />				</Header>				<View style={[styles.tripHeaderShadow, { backgroundColor: '#fff', marginTop: IS_IPHONE_X ? 100 : 60 }]}>					<View style={[styles.tripHeaderImage, styles.textCenter, { alignItems: 'center', justifyCenter: 'center' }]}>						<Text style={{ textAlign: 'center', width: '100%', color: COLORS.blue, fontSize: 30, fontFamily: 'VIP_cartoon', marginTop: 5 }}>{ i18n.t('safari') }</Text>						<Text style={[styles.textSize_16, styles.text_black, styles.textBold, styles.textCenter, styles.Width_90]}>{ i18n.t('changePassIntro') }</Text>					</View>				</View>				<Content bounces={false} style={{ overflow: 'hidden', borderTopRightRadius: 50, marginTop: 40}}>					<View style={{ width: '100%', padding: 15, borderTopRightRadius: 50, backgroundColor: '#fff', minHeight: 110, }}>						<Form style={[styles.Width_90 , styles.flexCenter, { marginTop: 70 }]}>							<View style={[styles.position_R,  styles.height_70, styles.flexCenter, styles.marginBottom_5]}>								<Item floatingLabel style={[styles.item, styles.position_R, { right: 5 }]}>									<Label style={[styles.label ,{ color:passwordStatus === 1 ?  COLORS.blue :  COLORS.gray}]}>{ i18n.t('oldPassword') }</Label>									<Input										style={[styles.input, styles.height_50, (passwordStatus === 1 ? styles.Active : styles.noActive)]}										onChangeText={(password) => setPassword(password)}										onBlur={() => unActiveInput('password')}										onFocus={() => activeInput('password')}										secureTextEntry									/>								</Item>							</View>							<View style={[styles.position_R, styles.height_70, styles.flexCenter, styles.marginBottom_5 ]}>								<Item floatingLabel style={[styles.item, styles.position_R, { right: 5 }]}>									<Label style={[styles.label, styles.textRegular ,{ color:repeatPassStatus === 1 ?  COLORS.blue :  COLORS.gray}]}>{ i18n.t('password') }</Label>									<Input style={[styles.input, styles.height_50, (repeatPassStatus === 1 ? styles.Active : styles.noActive)]}										onChangeText={(repeatPass) => setRepeatPass(repeatPass)}										onBlur={() => unActiveInput('repeatPass')}										onFocus={() => activeInput('repeatPass')}										secureTextEntry									/>								</Item>							</View>							<View style={[styles.position_R,  styles.height_70, styles.flexCenter, styles.marginBottom_5]}>								<Item floatingLabel style={[styles.item, styles.position_R, { right: 5 }]}>									<Label style={[styles.label ,{ color:confirmPassStatus === 1 ?  COLORS.blue :  COLORS.gray}]}>{ i18n.t('confirmPass') }</Label>									<Input										style={[styles.input, styles.height_50, (confirmPassStatus === 1 ? styles.Active : styles.noActive)]}										onChangeText={(confirmPass) => setConfirmPass(confirmPass)}										onBlur={() => unActiveInput('confirmPass')}										onFocus={() => activeInput('confirmPass')}										secureTextEntry									/>								</Item>							</View>							{renderConfirm()}						</Form>					</View>				</Content>			</ImageBackground>		</Container>	)}export default ChangePass;