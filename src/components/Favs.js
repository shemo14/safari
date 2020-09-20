import React, { useState , useEffect, useRef } from "react";import {	View,	Text,	Image,	TouchableOpacity,	ImageBackground,	I18nManager,	Dimensions,	FlatList,	Platform,	Share,} from "react-native";import {Container, Header, Right, Body, Icon, Content } from 'native-base'import styles from '../../assets/styles'import i18n from "../../locale/i18n";import COLORS from "../consts/colors";import { useDispatch, useSelector } from 'react-redux'import {ScrollView} from "react-native-web";import * as Animatable from "react-native-animatable";const width	 		= Dimensions.get('window').width;const height 		= Dimensions.get('window').height;const isIOS  		= Platform.OS === 'ios';const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';const images = [	require('../../assets/images/slider_1.png'),	require('../../assets/images/slider_2.png'),	require('../../assets/images/slider_3.png'),	require('../../assets/images/slider_4.png'),];const providers = [	{id: 0, name: 'مؤسسة كشتة', category: 'سفاري', image: require('../../assets/images/prov_1.jpg'), rate: 3, price: 500},	{id: 0, name: 'مؤسسة كشتة', category: 'سفاري', image: require('../../assets/images/prov_2.jpg'), rate: 5, price: 500},	{id: 0, name: 'مؤسسة كشتة', category: 'سفاري', image: require('../../assets/images/prov_3.jpg'), rate: 2, price: 500},	{id: 0, name: 'مؤسسة كشتة', category: 'سفاري', image: require('../../assets/images/prov_4.jpg'), rate: 4, price: 500},	{id: 0, name: 'مؤسسة كشتة', category: 'سفاري', image: require('../../assets/images/prov_3.jpg'), rate: 2, price: 500},	{id: 0, name: 'مؤسسة كشتة', category: 'سفاري', image: require('../../assets/images/prov_4.jpg'), rate: 4, price: 500},	{id: 0, name: 'مؤسسة كشتة', category: 'سفاري', image: require('../../assets/images/prov_3.jpg'), rate: 2, price: 500},	{id: 0, name: 'مؤسسة كشتة', category: 'سفاري', image: require('../../assets/images/prov_4.jpg'), rate: 4, price: 500},];function Favs({navigation, route}) {	const [showModal, setShowModal] = useState(false);	const [tripType, setTripType]   = useState('land');	function toggleModal() {		setShowModal(!showModal)	}	function selectType(type) {		setTripType(type)	}	function navigateToTripService() {		toggleModal();		navigation.navigate('tripServices', { tripType })	}	function _renderItem(item) {		return(			<View key={item.index} style={{ borderRadius: 10, overflow: 'hidden', height: 150, width: width*85/100}}>				<Image source={images[item.index]} resizeMode={'cover'} style={[ { height: 160, width: '100%', borderRadius: 10 }]}/>			</View>		)	}	const onShare = async () => {		try {			const result = await Share.share({				message:					'Safari App',			});			if (result.action === Share.sharedAction) {				if (result.activityType) {					// shared with activity type of result.activityType				} else {					// shared				}			} else if (result.action === Share.dismissedAction) {				// dismissed			}		} catch (error) {			alert(error.message);		}	};	function Item({ name , image , rate , index, category , price }) {		return (			<TouchableOpacity key={'_' + index} style={{ borderRadius: 10, height: 170, width: '47%', margin: 5, overflow: 'hidden',}} onPress={() => navigation.navigate('serviceDetails')}>				<ImageBackground source={image} resizeMode={'cover'} style={{ height: 170, width: '100%', borderRadius: 10 }}>					<View style={[styles.overlay_black , styles.Width_100, { zIndex: 0, height: 200, position: 'absolute' }]} />					<TouchableOpacity style={{ alignSelf: "flex-end", padding: 10 }} >						<Icon type={'AntDesign'} name={'heart'} style={{ color: COLORS.orange, fontSize: 20 }} />					</TouchableOpacity>					<View style={{ bottom: 0, position: 'absolute', height: 60, paddingHorizontal: 10 }}>						<Text style={[ styles.textBold, styles.text_White, styles.textSize_16, styles._alignText, styles.Width_100 ]}>{ name }</Text>						<Text style={[ styles.textBold, styles.text_orange, styles._alignText, styles.textRight ]}>{ price } { i18n.t('RS') } </Text>					</View>				</ImageBackground>			</TouchableOpacity>		);	}	return (		<Container>			<ImageBackground source={require('../../assets/images/menu_bg.png')} style={{ width, height: height-100, alignSelf: 'center', flexGrow: 1 }} resizeMode={'cover'}>				<Header style={{ backgroundColor: 'transparent',  borderBottomWidth: 0 }} noShadow>					<Right style={{ flex: 0, marginLeft: 10 }}>						<TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 50, height: 50, justifyCenter: 'center', alignItems: 'center' }}>							<Image source={require('../../assets/images/white_back.png')} style={[ styles.transform , { width: 27, height: 27, marginTop: 10 }]} resizeMode={'contain'}/>						</TouchableOpacity>						<Text style={{ textAlign:  I18nManager.isRTL ? 'right' : 'left', color: '#fff', fontSize: 22, fontFamily: 'ArbFONTSBold', marginBottom: 5 }}>{ i18n.t('favourite') }</Text>					</Right>					<Body style={{ alignSelf: 'flex-start'}} />				</Header>				<Content bounces={false} style={{ height: height*56/100, marginTop: 10, overflow: 'hidden', borderTopRightRadius: 50, }}>					<View style={{ width: '100%', padding: 15, borderTopRightRadius: 50, backgroundColor: '#fff' }}>						<FlatList							data={providers}							renderItem={({ item , index}) => <Item								name={item.name}								index={index}								image={item.image}								category={item.category}								rate={item.rate}								price={item.price}								id={item.id}							/>}							keyExtractor={item => item.id}							numColumns={2}							horizontal={false}							columnWrapperStyle={[styles.directionRowCenter]}							// extraData={isFav}						/>					</View>				</Content>			</ImageBackground>		</Container>	)}export default Favs;