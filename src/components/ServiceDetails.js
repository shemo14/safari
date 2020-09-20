import React, { useState , useEffect, useRef } from "react";import {	View,	Text,	Image,	TouchableOpacity,	ImageBackground,	KeyboardAvoidingView,	I18nManager,	Dimensions,	FlatList,	Platform,	Share,	Linking,} from "react-native";import {Container, Button, Form, Input, Toast, Header, Right, Left, Body, Icon, Content} from 'native-base'import styles from '../../assets/styles'import Swiper from 'react-native-swiper';import i18n from "../../locale/i18n";import StarRating from "react-native-star-rating";import COLORS from "../consts/colors";import { useDispatch, useSelector } from 'react-redux'import {ScrollView} from "react-native-web";import * as Animatable from "react-native-animatable";const width	 		= Dimensions.get('window').width;const height 		= Dimensions.get('window').height;const isIOS  		= Platform.OS === 'ios';const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';const images = [	require('../../assets/images/slider_1.png'),	require('../../assets/images/slider_2.png'),	require('../../assets/images/slider_3.png'),	require('../../assets/images/slider_4.png'),];const providers = [	{id: 0, name: 'مؤسسة كشتة', category: 'سفاري', image: require('../../assets/images/prov_1.jpg'), rate: 3, price: 500},	{id: 0, name: 'مؤسسة كشتة', category: 'سفاري', image: require('../../assets/images/prov_2.jpg'), rate: 5, price: 500},	{id: 0, name: 'مؤسسة كشتة', category: 'سفاري', image: require('../../assets/images/prov_3.jpg'), rate: 2, price: 500},	{id: 0, name: 'مؤسسة كشتة', category: 'سفاري', image: require('../../assets/images/prov_4.jpg'), rate: 4, price: 500},	{id: 0, name: 'مؤسسة كشتة', category: 'سفاري', image: require('../../assets/images/prov_3.jpg'), rate: 2, price: 500},	{id: 0, name: 'مؤسسة كشتة', category: 'سفاري', image: require('../../assets/images/prov_4.jpg'), rate: 4, price: 500},	{id: 0, name: 'مؤسسة كشتة', category: 'سفاري', image: require('../../assets/images/prov_3.jpg'), rate: 2, price: 500},	{id: 0, name: 'مؤسسة كشتة', category: 'سفاري', image: require('../../assets/images/prov_4.jpg'), rate: 4, price: 500},];function ServiceDetails({navigation, route}) {	const [showModal, setShowModal] = useState(false);	const [tripType, setTripType]   = useState('land');	function toggleModal() {		setShowModal(!showModal)	}	function selectType(type) {		setTripType(type)	}	function navigateToTripService() {		toggleModal();		navigation.navigate('tripServices', { tripType })	}	function _renderItem(item) {		return(			<View key={item.index} style={{ borderRadius: 10, overflow: 'hidden', height: 150, width: width*85/100}}>				<Image source={images[item.index]} resizeMode={'cover'} style={[ { height: 160, width: '100%', borderRadius: 10 }]}/>			</View>		)	}	const onShare = async () => {		try {			const result = await Share.share({				message:					'Safari App',			});			if (result.action === Share.sharedAction) {				if (result.activityType) {					// shared with activity type of result.activityType				} else {					// shared				}			} else if (result.action === Share.dismissedAction) {				// dismissed			}		} catch (error) {			alert(error.message);		}	};	function Item({ name , image , rate , index, category , price }) {		return (			<TouchableOpacity key={'_' + index} style={{ borderRadius: 10, height: 170, width: '47%', margin: 5, overflow: 'hidden',   }}>				<ImageBackground source={image} resizeMode={'cover'} style={{ height: 170, width: '100%', borderRadius: 10 }}>					<View style={[styles.overlay_black , styles.Width_100, { zIndex: 0, height: 200, position: 'absolute' }]} />					<TouchableOpacity style={{ alignSelf: "flex-end", padding: 10 }} >						<Icon type={'AntDesign'} name={'heart'} style={{ color: COLORS.orange, fontSize: 20 }} />					</TouchableOpacity>					<View style={{ bottom: 0, position: 'absolute', height: 60, paddingHorizontal: 10 }}>						<Text style={[ styles.textBold, styles.text_White, styles.textSize_16, styles._alignText, styles.Width_100 ]}>{ name }</Text>						<Text style={[ styles.textBold, styles.text_orange, styles._alignText, styles.textRight ]}>{ price } { i18n.t('RS') } </Text>					</View>				</ImageBackground>			</TouchableOpacity>		);	}	return (		<Container>			<Content style={{ marginTop: IS_IPHONE_X ? -50 : 0 }}>				<View style={{ flexDirection: 'row', justifyCenter: 'space-between', position: 'absolute', width: '100%', height: 100, zIndex: 1, marginTop: IS_IPHONE_X ? 50 : 30 }}>					<TouchableOpacity style={{ left: 20 }} onPress={() => navigation.goBack()}>						<Image source={require('../../assets/images/white_back.png')} style={[ styles.transform, { width: 25, height: 25, marginTop: 10 }]} resizeMode={'contain'}/>					</TouchableOpacity>					<TouchableOpacity onPress={() => onShare()} style={{ position: 'absolute', right: 60}}>						<Image source={require('../../assets/images/share.png')} style={{ width: 25, height: 25, marginTop: 10 }} resizeMode={'contain'}/>					</TouchableOpacity>					<TouchableOpacity style={{ position: 'absolute', right: 20, marginTop: 5 }} >						<Icon type={'AntDesign'} name={'heart'} style={{ color: COLORS.orange }} />					</TouchableOpacity>				</View>				<View style={{ width: '100%', height: IS_IPHONE_X ? 400 : 330 }}>					<Swiper dotStyle={[styles.doteStyle2]}						activeDotStyle={[styles.activeDot2]}						key={3}						containerStyle={{ height: 300 }}						style={{ flexDirection: isIOS && I18nManager.isRTL  ? 'row' : 'row-reverse' }}						autoplay={true} loop={true}>						{							providers.map((provider, i) => (								<View key={i} style={{ }}>									<View style={[styles.overlay_black , styles.Width_100, { zIndex: 1, height: 400, position: 'absolute' }]} />									<Image source={provider.image} style={{ width: '100%', height: height*40/100, alignSelf: 'center' }} resizeMode={'cover'}/>								</View>							))						}					</Swiper>				</View>				<View style={{ width: '100%', height: 135, borderTopRightRadius: 40, backgroundColor: COLORS.blue, marginTop: -100, flexDirection: 'row', padding: 15 }}>					<View style={{ flex: 3, alignItems: 'flex-start' }}>						<Text style={[styles.textBold, styles.textSize_22, styles.text_White, styles._alignText, styles.Width_100, styles.textRight, { alignSelf: 'flex-start', marginTop: -5 }]}>{ i18n.t('providerInfo') }</Text>						<Text style={[ styles.textSize_16, styles.text_White, styles.textRegular, styles._alignText, { alignSelf: 'flex-start', marginTop: -5 } ]}> 500 { i18n.t('RS') } </Text>					</View>					<View style={{ flex: 1, justifyCenter: 'center', alignItems: 'center',  }}>						<TouchableOpacity onPress={() => Linking.openURL('https://api.whatsapp.com/send?phone=01094985095')} style={{ flexDirection: 'row', position: 'absolute', right: 2, top: 35 }}>							<Image source={require('../../assets/images/whatsapp.png')} style={{ width: 30, height: 30, marginHorizontal: 10 }}/>							<Text style={[styles.textRegular, styles.textSize_16, styles.text_White]}>{ i18n.t('contactUs') }</Text>						</TouchableOpacity>						<View style={{ width: 120, marginTop: 7, paddingRight: 20 }}>							<StarRating								disabled={false}								maxStars={5}								rating={4}								// selectedStar={(rating) => onStarRatingPress(rating)}								fullStarColor={COLORS.orange}								emptyStarColor={COLORS.light_gray}								starSize={18}							/>						</View>					</View>				</View>				<View style={{ width: '100%', borderTopRightRadius: 50, backgroundColor: '#fff', marginTop: -45 , padding: 15, marginBottom: 50 }}>					<Text style={[ styles.textSize_15, styles.text_gray, styles.textRegular, styles._alignText, styles.Width_100, { alignSelf: 'flex-start' } ]}>						هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.					</Text>					<View>						<Text style={[ styles.textSize_20, styles.text_black, styles.textBold, styles._alignText, { alignSelf: 'flex-start' } ]}> { i18n.t('additions') } </Text>						<View style={{ backgroundColor: '#f7f7fa', flexDirection: 'row', borderRadius: 10, alignItems: 'center', padding: 5, marginVertical: 5 }}>							<View style={{ width: 60, height: 60, borderRadius: 10, overflow: 'hidden' }}>								<Image source={require('../../assets/images/fire.png')} style={{ width: 60, height: 60 }} resizeMode={'contain'}/>							</View>							<View style={{ marginHorizontal: 10  }}>								<Text style={[ styles.textSize_18, styles.text_black, styles.textBold, styles._alignText, { alignSelf: 'flex-start' } ]}> { i18n.t('additions') } </Text>								<Text style={[ styles.textSize_16, styles.text_orange, styles.textRegular, styles._alignText, { alignSelf: 'flex-start', marginTop: -10 } ]}> 500 { i18n.t('RS') } </Text>							</View>						</View>						<View style={{ backgroundColor: '#f7f7fa', flexDirection: 'row', borderRadius: 10, alignItems: 'center', padding: 5, marginVertical: 5 }}>							<View style={{ width: 60, height: 60, borderRadius: 10, overflow: 'hidden' }}>								<Image source={require('../../assets/images/fire.png')} style={{ width: 60, height: 60 }} resizeMode={'contain'}/>							</View>							<View style={{ marginHorizontal: 10  }}>								<Text style={[ styles.textSize_18, styles.text_black, styles.textBold, styles._alignText, { alignSelf: 'flex-start' } ]}> { i18n.t('additions') } </Text>								<Text style={[ styles.textSize_16, styles.text_orange, styles.textRegular, styles._alignText, { alignSelf: 'flex-start', marginTop: -10 } ]}> 500 { i18n.t('RS') } </Text>							</View>						</View>						<View style={{ backgroundColor: '#f7f7fa', flexDirection: 'row', borderRadius: 10, alignItems: 'center', padding: 5, marginVertical: 5 }}>							<View style={{ width: 60, height: 60, borderRadius: 10, overflow: 'hidden' }}>								<Image source={require('../../assets/images/fire.png')} style={{ width: 60, height: 60 }} resizeMode={'contain'}/>							</View>							<View style={{ marginHorizontal: 10  }}>								<Text style={[ styles.textSize_18, styles.text_black, styles.textBold, styles._alignText, { alignSelf: 'flex-start' } ]}> { i18n.t('additions') } </Text>								<Text style={[ styles.textSize_16, styles.text_orange, styles.textRegular, styles._alignText, { alignSelf: 'flex-start', marginTop: -10 } ]}> 500 { i18n.t('RS') } </Text>							</View>						</View>						<View style={{ backgroundColor: '#f7f7fa', flexDirection: 'row', borderRadius: 10, alignItems: 'center', padding: 5, marginVertical: 5 }}>							<View style={{ width: 60, height: 60, borderRadius: 10, overflow: 'hidden' }}>								<Image source={require('../../assets/images/fire.png')} style={{ width: 60, height: 60 }} resizeMode={'contain'}/>							</View>							<View style={{ marginHorizontal: 10  }}>								<Text style={[ styles.textSize_18, styles.text_black, styles.textBold, styles._alignText, { alignSelf: 'flex-start' } ]}> { i18n.t('additions') } </Text>								<Text style={[ styles.textSize_16, styles.text_orange, styles.textRegular, styles._alignText, { alignSelf: 'flex-start', marginTop: -10 } ]}> 500 { i18n.t('RS') } </Text>							</View>						</View>						<View style={{ backgroundColor: '#f7f7fa', flexDirection: 'row', borderRadius: 10, alignItems: 'center', padding: 5, marginVertical: 5 }}>							<View style={{ width: 60, height: 60, borderRadius: 10, overflow: 'hidden' }}>								<Image source={require('../../assets/images/fire.png')} style={{ width: 60, height: 60 }} resizeMode={'contain'}/>							</View>							<View style={{ marginHorizontal: 10  }}>								<Text style={[ styles.textSize_18, styles.text_black, styles.textBold, styles._alignText, { alignSelf: 'flex-start' } ]}> { i18n.t('additions') } </Text>								<Text style={[ styles.textSize_16, styles.text_orange, styles.textRegular, styles._alignText, { alignSelf: 'flex-start', marginTop: -10 } ]}> 500 { i18n.t('RS') } </Text>							</View>						</View>						<View style={{ backgroundColor: '#f7f7fa', flexDirection: 'row', borderRadius: 10, alignItems: 'center', padding: 5, marginVertical: 5 }}>							<View style={{ width: 60, height: 60, borderRadius: 10, overflow: 'hidden' }}>								<Image source={require('../../assets/images/fire.png')} style={{ width: 60, height: 60 }} resizeMode={'contain'}/>							</View>							<View style={{ marginHorizontal: 10  }}>								<Text style={[ styles.textSize_18, styles.text_black, styles.textBold, styles._alignText, { alignSelf: 'flex-start' } ]}> { i18n.t('additions') } </Text>								<Text style={[ styles.textSize_16, styles.text_orange, styles.textRegular, styles._alignText, { alignSelf: 'flex-start', marginTop: -10 } ]}> 500 { i18n.t('RS') } </Text>							</View>						</View>						<View style={{ backgroundColor: '#f7f7fa', flexDirection: 'row', borderRadius: 10, alignItems: 'center', padding: 5, marginVertical: 5 }}>							<View style={{ width: 60, height: 60, borderRadius: 10, overflow: 'hidden' }}>								<Image source={require('../../assets/images/fire.png')} style={{ width: 60, height: 60 }} resizeMode={'contain'}/>							</View>							<View style={{ marginHorizontal: 10  }}>								<Text style={[ styles.textSize_18, styles.text_black, styles.textBold, styles._alignText, { alignSelf: 'flex-start' } ]}> { i18n.t('additions') } </Text>								<Text style={[ styles.textSize_16, styles.text_orange, styles.textRegular, styles._alignText, { alignSelf: 'flex-start', marginTop: -10 } ]}> 500 { i18n.t('RS') } </Text>							</View>						</View>						<View style={{ backgroundColor: '#f7f7fa', flexDirection: 'row', borderRadius: 10, alignItems: 'center', padding: 5, marginVertical: 5 }}>							<View style={{ width: 60, height: 60, borderRadius: 10, overflow: 'hidden' }}>								<Image source={require('../../assets/images/fire.png')} style={{ width: 60, height: 60 }} resizeMode={'contain'}/>							</View>							<View style={{ marginHorizontal: 10  }}>								<Text style={[ styles.textSize_18, styles.text_black, styles.textBold, styles._alignText, { alignSelf: 'flex-start' } ]}> { i18n.t('additions') } </Text>								<Text style={[ styles.textSize_16, styles.text_orange, styles.textRegular, styles._alignText, { alignSelf: 'flex-start', marginTop: -10 } ]}> 500 { i18n.t('RS') } </Text>							</View>						</View>						<View style={{ backgroundColor: '#f7f7fa', flexDirection: 'row', borderRadius: 10, alignItems: 'center', padding: 5, marginVertical: 5 }}>							<View style={{ width: 60, height: 60, borderRadius: 10, overflow: 'hidden' }}>								<Image source={require('../../assets/images/fire.png')} style={{ width: 60, height: 60 }} resizeMode={'contain'}/>							</View>							<View style={{ marginHorizontal: 10  }}>								<Text style={[ styles.textSize_18, styles.text_black, styles.textBold, styles._alignText, { alignSelf: 'flex-start' } ]}> { i18n.t('additions') } </Text>								<Text style={[ styles.textSize_16, styles.text_orange, styles.textRegular, styles._alignText, { alignSelf: 'flex-start', marginTop: -10 } ]}> 500 { i18n.t('RS') } </Text>							</View>						</View>					</View>				</View>			</Content>		</Container>	)}export default ServiceDetails;