import React, { useState , useEffect, useRef } from "react";import {	View,	Text,	Image,	TouchableOpacity,	ImageBackground,	I18nManager,	Dimensions,	ActivityIndicator,	Platform,	Share,} from "react-native";import {Container, Header, Right, Body, Icon, Content, Item, Label, Input, Form, Textarea} from 'native-base'import styles from '../../../assets/styles'import i18n from "../../../locale/i18n";import COLORS from "../../consts/colors";import { useDispatch, useSelector } from 'react-redux'import {SendComp} from '../../actions';import {ScrollView} from "react-native-web";import * as Animatable from "react-native-animatable";const width	 		= Dimensions.get('window').width;const height 		= Dimensions.get('window').height;const isIOS  		= Platform.OS === 'ios';const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';function Complaint({navigation, route}) {	const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);	const lang = useSelector(state => state.lang.lang);	const [complaintTitle, setComplaintTitle] 	  = useState('');	const [email, setEmail]       = useState('');	const [msg, setMsg]       	  = useState('');	const [isSubmitted, setIsSubmitted] = useState(false);	const [complaintTitleStatus, setComplaintTitleStatus] = useState(0);	const [emailStatus, setEmailStatus] = useState(0);	const [msgStatus, setMsgStatus] = useState(0);	const dispatch = useDispatch();	function activeInput(type) {		if (type === 'complaintTitle' || complaintTitle !== '') {			setComplaintTitleStatus(1)		}		if (type === 'email' || email !== '') {			setEmailStatus(1)		}		if (type === 'msg' || msg!== '') {			setMsgStatus(1)		}	}	useEffect(() => {		const unsubscribe = navigation.addListener('focus', () => {			setIsSubmitted(false);			setEmail('')			setMsg('')			setComplaintTitle('')		});		return unsubscribe;	}, [navigation]);	function unActiveInput(type) {		if (type === 'complaintTitle' && complaintTitle === '') {			setComplaintTitleStatus(0)		}		if (type === 'email' && email === '') {			setEmailStatus(0)		}		if (type === 'msg' || msg!== '') {			setMsgStatus(0)		}	}	function renderConfirm(){		if (email == '' || complaintTitle == ''  || msg == '' ){			return (				<View style={[styles.blueBtn , styles.Width_100 , {backgroundColor:'#ddd'}]}>					<Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('confirm') }</Text>				</View>			);		}		if (isSubmitted){			return(				<View style={[{ justifyContent: 'center', alignItems: 'center' } , styles.marginTop_25]}>					<ActivityIndicator size="large" color={COLORS.blue} style={{ alignSelf: 'center' }} />				</View>			)		}		return (			<TouchableOpacity onPress={() => onConfirm()} style={[styles.blueBtn , styles.Width_100 ]}>				<Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('confirm') }</Text>			</TouchableOpacity>		);	}	function onConfirm(){		setIsSubmitted(true)		dispatch(SendComp(lang , email , complaintTitle , msg ,token , navigation)).then(() => setIsSubmitted(false));	}	return (		<Container>			<ImageBackground source={require('../../../assets/images/bg.png')} style={{ width, height: 200, alignSelf: 'center', flexGrow: 1 }} resizeMode={'cover'}>				<Header style={{ backgroundColor: 'transparent',  borderBottomWidth: 0 }} noShadow>					<Right style={{ flex: 0, marginLeft: 10 }}>						<TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 50, height: 50, justifyCenter: 'center', alignItems: 'center' }}>							<Image source={require('../../../assets/images/white_back.png')} style={[ styles.transform , { width: 27, height: 27, marginTop: 10 }]} resizeMode={'contain'}/>						</TouchableOpacity>						<Text style={{ textAlign:  I18nManager.isRTL ? 'right' : 'left', color: '#fff', fontSize: 20, fontFamily: 'ArbFONTSBold', marginBottom: 5 }}>{ i18n.t('complaint') }</Text>					</Right>					<Body style={{ alignSelf: 'flex-start'}} />				</Header>				<View style={[styles.tripHeaderShadow, { backgroundColor: '#fff', }]}>					<View style={[styles.tripHeaderImage, styles.textCenter, { alignItems: 'center', justifyCenter: 'center' }]}>						<Text style={{ textAlign: 'center', width: '100%', color: COLORS.blue, fontSize: 30, fontFamily: 'VIP_cartoon', marginTop: 5 }}>{ i18n.t('safari') }</Text>						<Text style={[styles.textSize_16, styles.text_black, styles.textBold, styles.textCenter, styles.Width_90]}>{ i18n.t('complaintIntro') }</Text>					</View>				</View>				<Content bounces={false} style={{ overflow: 'hidden', borderTopRightRadius: 50, marginTop: 50}}>					<View style={{ width: '100%', padding: 15, borderTopRightRadius: 50, backgroundColor: '#fff', minHeight: 110, }}>						<Form style={[styles.Width_100 , styles.flexCenter, styles.marginVertical_10, styles.Width_90, { marginTop: 70 }]}>							<View style={[styles.position_R, styles.height_70, styles.flexCenter, styles.marginBottom_10 ]}>								<Item floatingLabel style={[styles.item, styles.position_R ]}>									<Label style={[styles.label, styles.textRegular ,{ color:emailStatus === 1 ?  COLORS.blue :  COLORS.gray}]}>{ i18n.t('email') }</Label>									<Input style={[styles.input, styles.height_50, (emailStatus === 1 ? styles.Active : styles.noActive)]}										onChangeText={(email) => setEmail(email)}										onBlur={() => unActiveInput('email')}										onFocus={() => activeInput('email')}									   	keyboardType={'email-address'}										value={email}									/>								</Item>							</View>							<View style={[styles.position_R, styles.height_70, styles.flexCenter, styles.marginBottom_5 ]}>								<Item floatingLabel style={[styles.item, styles.position_R ]}>									<Label style={[styles.label, styles.textRegular ,{ color:complaintTitleStatus === 1 ?  COLORS.blue :  COLORS.gray}]}>{ i18n.t('complaintTitle') }</Label>									<Input style={[styles.input, styles.height_50, (complaintTitleStatus === 1 ? styles.Active : styles.noActive)]}										onChangeText={(complaintTitle) => setComplaintTitle(complaintTitle)}										onBlur={() => unActiveInput('complaintTitle')}										onFocus={() => activeInput('complaintTitle')}										value={complaintTitle}									/>								</Item>							</View>							<View style={[styles.position_R,  styles.height_70, styles.flexCenter, { marginTop: 15, marginBottom: 20 }]}>								<Item style={[styles.item, styles.position_R ]}>									<Textarea value={msg}										placeholder={i18n.t('complaintMsg')} bordered={false}										style={[styles.textArea, styles.height_80, (msgStatus === 1 ? styles.Active : styles.noActive)]}										onChangeText={(msg) => setMsg(msg)}										onBlur={()  => unActiveInput('msg')}										onFocus={() => activeInput('msg')}									/>								</Item>							</View>							{ renderConfirm() }						</Form>					</View>				</Content>			</ImageBackground>		</Container>	)}export default Complaint;