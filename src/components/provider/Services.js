import React, { useState , useEffect, useRef } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ImageBackground,
    I18nManager,
    Dimensions,
    FlatList,
    Platform,
    ActivityIndicator,
} from "react-native";
import {Container, Header, Right, Body, Left, Content } from 'native-base'
import styles from '../../../assets/styles'
import i18n from "../../../locale/i18n";
import COLORS from "../../consts/colors";
import {useSelector, useDispatch} from 'react-redux';
import {getMyServices} from '../../actions';
import * as Animatable from "react-native-animatable";

const width	 		= Dimensions.get('window').width;
const height 		= Dimensions.get('window').height;
const isIOS  		= Platform.OS === 'ios';
const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';


function Services({navigation, route}) {

    const category_id = route.params.category_id;
    const image = route.params.image;
    const name = route.params.name;

    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const myServices = useSelector(state => state.myServices.myServices);
    const myServicesLoader = useSelector(state => state.myServices.loader);

    const dispatch = useDispatch();

    function fetchData() {
        dispatch(getMyServices(lang , category_id, token))
    }

    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation , myServicesLoader]);



    function renderLoader(){
        if (myServicesLoader === false){
            return(
                <View style={[styles.loading, styles.flexCenter, {height:'100%'}]}>
                    <ActivityIndicator size="large" color={COLORS.blue} style={{ alignSelf: 'center' }} />
                </View>
            );
        }
    }

    function renderNoData() {
        if (myServices && (myServices).length <= 0) {
            return (
                <View style={[styles.directionColumnCenter , styles.Width_100, styles.heightFull ]}>
                    <Image source={require('../../../assets/images/no_data.png')} resizeMode={'contain'}
                           style={{alignSelf: 'center', width: 120, height: 120}}/>
                    <Text style={[ styles.textBold, styles.text_gray, styles.textSize_16]}>{ i18n.t('noData') }</Text>
                </View>
            );
        }

        return null
    }

    function Item({ name , image  , index , id, price }) {

        return (
            <View style={{width: '47%', margin: 5}} animation="fadeInUp" easing="ease-out" delay={500}>
                <TouchableOpacity style={{ borderRadius: 10, height: 170, width: '100%', overflow: 'hidden',}} onPress={() => navigation.navigate('serviceDetails' , {service_id:id})}>
                    <ImageBackground source={{uri:image}} resizeMode={'cover'} style={{ height: 170, width: '100%', borderRadius: 10 }}>
                        <View style={[styles.overlay_black , styles.Width_100, { zIndex: 0, height: 200, position: 'absolute' }]} />
                        <View style={{ bottom: 0, position: 'absolute', height: 60, paddingHorizontal: 10 }}>
                            <Text style={[ styles.textBold, styles.text_White, styles.textSize_14, styles.writngDir, styles.Width_100 ]}>{ name }</Text>
                            <Text style={[ styles.textBold, styles.text_orange, styles._alignText, styles.textRight ]}>{ price }  </Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <Container>
            {renderLoader()}
            <ImageBackground source={require('../../../assets/images/bg.png')} style={{ width, height: 200, alignSelf: 'center', flexGrow: 1 }} resizeMode={'cover'}>
                <Header style={{ backgroundColor: 'transparent',  borderBottomWidth: 0 , paddingTop:10}} noShadow>
                    <Right style={[styles.directionRowCenter , { flex: 0}]}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 50, height: 50, justifyCenter: 'center', alignItems: 'center' }}>
                            <Image source={require('../../../assets/images/white_back.png')} style={[ styles.transform , { width: 23, height: 23, marginTop: 10 }]} resizeMode={'contain'}/>
                        </TouchableOpacity>
                        <Text style={{ textAlign:  I18nManager.isRTL ? 'right' : 'left', color: '#fff', fontSize: 16, fontFamily: 'ArbFONTSBold', marginBottom: 5 }}>{ i18n.t('services') }</Text>
                    </Right>
                    <Body style={{ alignSelf: 'flex-start'}} />
                    <Left style={[styles.directionRowCenter , { flex: 0}]}>
                        <TouchableOpacity onPress={() => navigation.navigate('tripServices' , {image , category_id , name})} style={{ width: 50, height: 50, justifyCenter: 'center', alignItems: 'center' }}>
                            <Image source={require('../../../assets/images/add.png')} style={[{ width: 22, height: 22, marginTop: 10 }]} resizeMode={'contain'}/>
                        </TouchableOpacity>
                    </Left>
                </Header>

                <Content contentContainerStyle={[styles.bgFullWidth]} bounces={false} style={{height:'100%', marginTop: 10, overflow: 'hidden', borderTopRightRadius: 50, }}>
                    <View style={{ width: '100%' , height:'100%', padding: 15, borderTopRightRadius: 50, backgroundColor: '#fff' }}>

                        {renderNoData()}

                        <FlatList
                            data={myServices}
                            renderItem={({ item , index}) => <Item
                                name={item.name}
                                index={index}
                                image={item.image}
                                price={item.price}
                                id={item.id}
                            />}
                            keyExtractor={item => item.id}
                            numColumns={2}
                            horizontal={false}
                            columnWrapperStyle={[styles.directionRowCenter]}
                        />
                    </View>
                </Content>
            </ImageBackground>
        </Container>
    )
}

export default Services;
