import React, { useState , useEffect } from "react";import { View, Text, Image, TouchableOpacity, ImageBackground, ActivityIndicator, I18nManager, Dimensions, Platform } from "react-native";import {Body, Container, Content, Form, Header, Input, Item, Label, Right} from 'native-base'import * as ImagePicker from 'expo-image-picker';import * as Permissions from 'expo-permissions';import styles from '../../../assets/styles'import i18n from "../../../locale/i18n";import COLORS from "../../consts/colors";import {useDispatch, useSelector} from "react-redux";import {updateProfile} from '../../actions';import * as Animatable from "react-native-animatable";import Modal from "react-native-modal";const width	 		= Dimensions.get('window').width;const height 		= Dimensions.get('window').height;const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';function EditProfile({navigation , route}) {	const lang  = useSelector(state => state.lang.lang);	const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);	const user  = useSelector(state => state.auth.user ? state.auth.user.data : { avatar: '', name: null, phone: null });	const [isSubmitted, setIsSubmitted] = useState(false);	const [showModal, setShowModal] 		= useState(false);	const [username, setUsername] = useState(user.name);	const [phone, setPhone] = useState(user.phone);	const [whatsNum, setWhatsNum] = useState(user.whatsapp);	const [userImage, setUserImage] = useState(user.avatar);	const [base64, setBase64] = useState('');	const [usernameStatus, setUsernameStatus] = useState(1);	const [phoneStatus, setPhoneStatus] = useState(1);	const [whatsNumStatus, setWhatsNumStatus] = useState(1);	const dispatch = useDispatch();	useEffect(() => {		const unsubscribe = navigation.addListener('focus', () => {			setIsSubmitted(false);			if (route.params?.photo) {				setUserImage(route.params.photo.uri);				setBase64(route.params.photo.base64);			}		});		return unsubscribe;	}, [navigation , route.params?.photo]);	const askPermissionsAsync = async () => {		await Permissions.askAsync(Permissions.CAMERA);		await Permissions.askAsync(Permissions.CAMERA_ROLL);	};	function toggleModal() {		setShowModal(!showModal)	}	const _pickImage = async () => {		askPermissionsAsync();		let result = await ImagePicker.launchImageLibraryAsync({			mediaTypes: ImagePicker.MediaTypeOptions.Images,			allowsEditing: true,			aspect: [4, 3],			base64:true		});		if (!result.cancelled) {			setUserImage(result.uri);			setBase64(result.base64);		}	};	function activeInput(type) {		if (type === 'username' || username !== '') {			setUsernameStatus(1)		}		if (type === 'phone' || phone !== '') {			setPhoneStatus(1)		}		if (type === 'whatsNum' || whatsNum !== '') setWhatsNumStatus(1);	}	function unActiveInput(type) {		if (type === 'username' && username === '') {			setUsernameStatus(0)		}		if (type === 'phone' && phone === '') {			setPhoneStatus(0)		}		if (type === 'whatsNum' && whatsNum === '') setWhatsNumStatus(0);	}	function renderEdit(){		if (username == '' || phone == '' ){			return (				<View style={[styles.blueBtn , styles.Width_95 , {backgroundColor:'#999'}]}>					<Text style={[styles.textRegular , styles.text_blue , styles.textSize_16]}>{ i18n.t('confirm') }</Text>				</View>			);		}		if (isSubmitted){			return(				<View style={[{ justifyContent: 'center', alignItems: 'center' } , styles.marginTop_25]}>					<ActivityIndicator size="large" color={COLORS.blue} style={{ alignSelf: 'center' }} />				</View>			)		}		return (			<TouchableOpacity onPress={() => onEdit()} style={[styles.blueBtn , styles.Width_100 ]}>				<Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('confirm') }</Text>			</TouchableOpacity>		);	}	function onEdit(){		let uri = userImage;		const formData = new FormData();		let filename = uri.split('/').pop();		let match = /\.(\w+)$/.exec(filename);		console.log(match);		let type = `image/${match[1]}`;		formData.append('avatar', {			uri,			name: filename,			type,		});		console.log(formData._parts[0][1])		setIsSubmitted(true);		dispatch(updateProfile(lang , username , phone , whatsNum, formData._parts , token , navigation));	}	return (		<Container>			<ImageBackground source={require('../../../assets/images/bg.png')} style={{ width, height: 200, alignSelf: 'center', flexGrow: 1 }} resizeMode={'cover'}>				<Header style={{ backgroundColor: 'transparent',  borderBottomWidth: 0 }} noShadow>					<Right style={{ flex: 0, marginLeft: 10 }}>						<TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 50, height: 50, justifyCenter: 'center', alignItems: 'center' }}>							<Image source={require('../../../assets/images/white_back.png')} style={[ styles.transform , { width: 27, height: 27, marginTop: 10 }]} resizeMode={'contain'}/>						</TouchableOpacity>						<Text style={{ textAlign:  I18nManager.isRTL ? 'right' : 'left', color: '#fff', fontSize: 20, fontFamily: 'ArbFONTSBold', marginBottom: 5 }}>{ i18n.t('editData') }</Text>					</Right>					<Body style={{ alignSelf: 'flex-start'}} />				</Header>				<View animation="fadeInDown" easing="ease-out" delay={700}								 style={[styles.tripHeaderShadow, { backgroundColor: '#fff', width: 150, height: 150 }]}>					<TouchableOpacity onPress={() => toggleModal()} style={[styles.tripHeaderImage, styles.textCenter, { alignItems: 'center', justifyCenter: 'center', height: 150 }]}>						<ImageBackground source={ userImage ? { uri: userImage } : require('../../../assets/images/profile.png')} style={{ width: 150, height: 150 }} resizeMode={'cover'}>							<Image source={require('../../../assets/images/add.png')} style={{ width: 25, height: 25, margin: 10 , alignSelf:'flex-end' }}/>						</ImageBackground>					</TouchableOpacity>				</View>				<Content bounces={false} style={{ overflow: 'hidden', borderTopRightRadius: 50, marginTop: 50}}>					<View style={{ width: '100%', padding: 15, borderTopRightRadius: 50, backgroundColor: '#fff', minHeight: 110, }}>						<Form style={[styles.Width_100 , styles.flexCenter, styles.marginVertical_10, styles.Width_90, { marginTop: 150 }]}>							<View style={[styles.position_R, styles.height_70, styles.flexCenter, styles.marginBottom_10 ]}>								<Item floatingLabel style={[styles.item, styles.position_R ]}>									<Label style={[styles.label, styles.textRegular ,{ color:usernameStatus === 1 ?  COLORS.blue :  COLORS.gray}]}>{ i18n.t('username') }</Label>									<Input style={[styles.input, styles.height_50, (usernameStatus === 1 ? styles.Active : styles.noActive)]}										   onChangeText={(username) => setUsername(username)}										   onBlur={() => unActiveInput('username')}										   onFocus={() => activeInput('username')}										   value={username}									/>								</Item>							</View>							<View style={[styles.position_R, styles.height_70, styles.flexCenter, styles.marginBottom_10 ]}>								<Item floatingLabel style={[styles.item, styles.position_R ]}>									<Label style={[styles.label, styles.textRegular ,{ color:phoneStatus === 1 ?  COLORS.blue :  COLORS.gray}]}>{ i18n.t('phone') }</Label>									<Input style={[styles.input, styles.height_50, (phoneStatus === 1 ? styles.Active : styles.noActive)]}										   onChangeText={(phone) => setPhone(phone)}										   onBlur={() => unActiveInput('phone')}										   onFocus={() => activeInput('phone')}										   keyboardType={'number-pad'}										   value={phone}									/>								</Item>							</View>							<View style={[styles.position_R, styles.height_70, styles.flexCenter, styles.marginBottom_5 ]}>								<Item floatingLabel style={[styles.item, styles.position_R ]}>									<Label style={[styles.label, styles.textRegular ,{ color:whatsNumStatus === 1 ?  COLORS.blue :  COLORS.gray}]}>{ i18n.t('whatsNum') }</Label>									<Input style={[styles.input, styles.height_50, (whatsNumStatus === 1 ? styles.Active : styles.noActive)]}										   onChangeText={(whatsNum) => setWhatsNum(whatsNum)}										   onBlur={()  => unActiveInput('whatsNum')}										   onFocus={() => activeInput('whatsNum')}										   keyboardType={'number-pad'}										   value={whatsNum.toString()}									/>								</Item>							</View>							{ renderEdit() }						</Form>					</View>				</Content>			</ImageBackground>			<Modal				onBackdropPress     = {toggleModal}				onBackButtonPress   = {toggleModal}				isVisible           = {showModal}				style               = {styles.bgModel}				avoidKeyboard  		= {true}			>				<View style={[{borderTopLeftRadius:30,					borderTopRightRadius:30},styles.bg_White, styles.overHidden, styles.Width_100, styles.paddingVertical_10 , styles.paddingHorizontal_10]}>					<View style={[styles.overHidden, styles.Width_100 , styles.paddingHorizontal_25]}>						<TouchableOpacity onPress={() => {_pickImage() ; setShowModal(false)}} style={[styles.marginBottom_10]}>							<Text style={[styles.text_black , styles.textBold , styles.textSize_16]}>{ i18n.t('photos') }</Text>						</TouchableOpacity>						<View style={[styles.borderGray , styles.marginBottom_5]}/>						<TouchableOpacity onPress={() => {navigation.navigate('cameraCapture' , {pathName:'editProfile'}) ; setShowModal(false)}} style={[styles.marginBottom_15]}>							<Text style={[styles.text_black , styles.textBold , styles.textSize_16]}>{ i18n.t('camera') }</Text>						</TouchableOpacity>					</View>				</View>			</Modal>		</Container>	)}export default EditProfile;