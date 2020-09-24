import React, { useState , useEffect, useRef } from "react";import { View, Text, Image, TouchableOpacity, ImageBackground, I18nManager, Dimensions, FlatList, ActivityIndicator } from "react-native";import {Container, Input, Header, Right, Left, Body, Icon} from 'native-base'import styles from '../../assets/styles'import i18n from "../../locale/i18n";import Carousel from 'react-native-snap-carousel';import {useSelector, useDispatch} from 'react-redux';import {getProviders, getBanners} from '../actions';import COLORS from "../consts/colors";import * as Animatable from "react-native-animatable";const width		 = Dimensions.get('window').width;const height	 = Dimensions.get('window').height;function Providers({navigation, route}) {	let { data } 		= route.params;	const lang   		= useSelector(state => state.lang.lang);	const providers  	= useSelector(state => state.providers.providers);	const banners    	= useSelector(state => state.banners.banners);	const loader 		= useSelector(state => state.providers.loader);	const [search, setSearch] = useState('');	const dispatch = useDispatch();	function fetchData(){		const subCategories = data.subCategories;		dispatch(getProviders(lang, subCategories))		dispatch(getBanners(lang))	}	useEffect(() => {		fetchData();		const unsubscribe = navigation.addListener('focus', () => {			fetchData();		});		return unsubscribe;	}, [navigation , loader]);	function renderLoader(){		if (loader === false){			return(				<View style={[styles.loading, styles.flexCenter, {height:'100%'}]}>					<ActivityIndicator size="large" color={COLORS.blue} style={{ alignSelf: 'center' }} />				</View>			);		}	}	function renderNoData() {		if (providers && (providers).length <= 0) {			return (				<View style={[styles.directionColumnCenter , styles.Width_100, {height:350} ]}>					<Image source={require('../../assets/images/no_data.png')} resizeMode={'contain'}						   style={{alignSelf: 'center', width: 120, height: 120}}/>					<Text style={[ styles.textBold, styles.text_gray, styles.textSize_16]}>{ i18n.t('noData') }</Text>				</View>			);		}		return null	}	function _renderItem(item) {		return(			<View key={item.index} style={{ borderRadius: 10, overflow: 'hidden', height: 150, width: width*85/100}}>				<ImageBackground source={{ uri: banners[item.index].image }} resizeMode={'cover'} style={[ { height: 160, width: '100%', borderRadius: 10 }]}>					<View style={[styles.overlay_black, { height: 150, width: width*85/100 }]}/>					<View style={{ bottom: 0, position: 'absolute', width: '100%', height: 70, paddingHorizontal: 10 }}>						<Text style={[ styles.textBold, styles.text_White, styles.textSize_16 , styles.writingDir]}>{ banners[item.index].title }</Text>						<Text style={[ styles.textRegular, styles.text_White , styles.writingDir]}>{ banners[item.index].description }</Text>					</View>				</ImageBackground>			</View>		)	}	function Item({ name , image , rate , index, category , id }) {		return (			<Animatable.View animation="fadeInUp" easing="ease-out" delay={700} style={{width: '47%', marginBottom: 5}}>				<TouchableOpacity onPress={() => navigation.navigate('providerDetails', { id })} style={{ borderRadius: 10, height: 200, overflow: 'hidden' , width:'100%' }}>					<ImageBackground source={{ uri: image }} resizeMode={'cover'} style={{ height: 200, width: '100%'}}>						<View style={[styles.overlay_black , styles.Width_100, { zIndex: 0, height: 200, position: 'absolute' }]} />						<View style={{ bottom: 0, position: 'absolute', width: '100%', height: 60, flexDirection: 'row', paddingHorizontal: 10 }}>							<View>								<Text style={[ styles.textBold, styles.text_White, styles.textSize_16 ]}>{ name }</Text>								<Text style={[ styles.textRegular, styles.text_White, styles._alignText, styles.textRight ]}>{ category }</Text>							</View>							<View style={{ position: 'absolute', right: 10, alignItems: 'center', marginTop: 10 }}>								<Icon type={'AntDesign'} name={'star'} style={{ color: 'yellow', fontSize: 16 }} />								<Text style={[ styles.textRegular, styles.text_White, styles._alignText , {color: 'yellow'} ]}>{ rate }</Text>							</View>						</View>					</ImageBackground>				</TouchableOpacity>			</Animatable.View>		);	}	return (		<Container>			{ renderLoader() }			<ImageBackground source={require('../../assets/images/bg.png')} style={{ width, height, alignSelf: 'center', flexGrow: 1 }} resizeMode={'cover'}>				<Header style={{ backgroundColor: 'transparent', marginTop: 10, borderBottomWidth: 0 }} noShadow>					<Right style={{ flex: 0, marginLeft: 10 }}>						<TouchableOpacity onPress={() => navigation.navigate('home')} style={[ styles.transform, { width: 50, height: 50, justifyCenter: 'center', alignItems: 'center' }]}>							<Image source={require('../../assets/images/white_back.png')} style={{ width: 27, height: 27, marginTop: 10 }} resizeMode={'contain'}/>						</TouchableOpacity>					</Right>					<Body style={{ alignSelf: 'center', flex: 1 }}>					<Text style={{ textAlign: 'center', width: '100%', color: '#fff', fontSize: 24, fontFamily: 'ArbFONTSBold' }}>سفاري</Text>					</Body>					<Left style={{ flex: 0.2 }} />				</Header>				<View contentContainerStyle={[styles.bgFullWidth ]}>					<View style={styles.searchBox}>						<Icon type={'AntDesign'} name={'search1'} style={{ color: '#fff', fontSize: 20 }} />						<Input placeholder={i18n.t('search')} style={styles.searchInput}							   onChangeText={(search) => setSearch(search)}							   onSubmitEditing={() => navigation.push('searchResults' , {keyword:search})}/>						<TouchableOpacity onPress={() => navigation.push('searchResults' , {keyword:search})}>							<Icon type={'AntDesign'} name={ I18nManager.isRTL ? 'arrowleft' : 'arrowright'} style={{ color: '#fff', fontSize: 20 }} />						</TouchableOpacity>					</View>					{						banners ?							<Animatable.View animation="fadeInRight" easing="ease-out" delay={700}											 style={[ styles.boxShadow, { position: 'absolute', width: '80%', height: 150, borderRadius: 10, zIndex: 1, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginTop: 70 }]}>								<Carousel									data={banners}									layout={'default'}									renderItem={_renderItem}									sliderWidth={width}									itemWidth={width*83/100}									autoplay={true}								/>							</Animatable.View> : null					}					<View style={[styles.mapView, styles.Width_100, { bottom: -80, paddingTop: 95, paddingHorizontal: 15, paddingBottom: 70 }]}>						<Text style={[ styles.textBold, styles.textSize_20, styles._alignText, styles.marginVertical_15, { alignSelf: 'flex-start' } ]}>{ i18n.t('providers') }</Text>						{renderNoData()}						{							providers ?								<FlatList									data={providers}									renderItem={({ item , index}) => <Item										name={item.name}										index={index}										image={item.avatar}										category={item.category}										rate={item.rate}										id={item.id}									/>}									keyExtractor={item => item.id}									numColumns={2}									horizontal={false}									columnWrapperStyle={[styles.Width_100 , styles.directionRowSpace]}									// extraData={isFav}								/> : null						}					</View>				</View>			</ImageBackground>		</Container>	)}export default Providers;