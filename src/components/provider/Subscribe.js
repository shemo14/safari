import React, { useState , useEffect, useRef } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ImageBackground,
    I18nManager,
    Dimensions,
    ScrollView,
    Platform,
    ActivityIndicator,
} from "react-native";
import {Container, Header, Right, Body, Left, Content } from 'native-base'
import styles from '../../../assets/styles'
import i18n from "../../../locale/i18n";
import COLORS from "../../consts/colors";
import {useSelector, useDispatch} from 'react-redux';
import {getSubscriptions , freeSubscripe } from '../../actions';
import * as Animatable from "react-native-animatable";
import subscriptions from "../../reducers/SubCategoriesReducer";

const width	 		= Dimensions.get('window').width;
const height 		= Dimensions.get('window').height;
const isIOS  		= Platform.OS === 'ios';
const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';


function Subscribe({navigation , route}) {

    const [activeId, setActiveId]       = useState(null);
    const [price, setPrice]             = useState('');
    const token 				        = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const lang                          = useSelector(state => state.lang.lang);
    const subscriptions 	            = useSelector(state => state.subscriptions.subscriptions);
    const subscriptionsLoader 	        = useSelector(state => state.subscriptionDetails.loader);
    const dispatch                      = useDispatch();

    function fetchData() {
       dispatch(getSubscriptions(token));
    }


    useEffect(() => {
       // fetchData();
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation , route.params]);

    function onSubscripe() {
        if(activeId == 4){
            dispatch(freeSubscripe(token, lang , activeId , navigation))
        } else{
            navigation.navigate('payment' , {price , subscription_id:activeId})
        }
    }

    return (
        <Container>

            <ImageBackground source={require('../../../assets/images/bg.png')} style={{ width, height: 200, alignSelf: 'center', flexGrow: 1 }} resizeMode={'cover'}>
                <Header style={{ backgroundColor: 'transparent',  borderBottomWidth: 0 }} noShadow>
                    <Right style={{ flex: 0}}>
                        {/*<TouchableOpacity onPress={() =>  navigation.navigate('drawer', {*/}
                        {/*    screen: 'home',*/}
                        {/*    // params: {pathName:'subscribe'}*/}
                        {/*})} style={{ width: 50, height: 50, justifyCenter: 'center', alignItems: 'center' }}>*/}
                        {/*    <Image source={require('../../../assets/images/white_back.png')} style={[ styles.transform , { width: 27, height: 27, marginTop: 10 }]} resizeMode={'contain'}/>*/}
                        {/*</TouchableOpacity>*/}
                        <Text style={{ textAlign:  I18nManager.isRTL ? 'right' : 'left', color: '#fff', fontSize: 20, fontFamily: 'ArbFONTSBold', marginBottom: 5, marginHorizontal: 15 }}>{ i18n.t('subscriptions') }</Text>
                    </Right>
                    <Body style={{ alignSelf: 'flex-start'}} />
                    <Left>
                        <TouchableOpacity onPress={() => navigation.navigate('drawer', {
                            screen: 'home',
                            params: {pathName:'subscribe'}
                        })}>
                            <Text style={[styles.textBold , { color: '#fff', fontSize: 18, marginBottom: 5 }]}>{ i18n.t('skip') }</Text>
                        </TouchableOpacity>
                    </Left>
                </Header>

                <View animation="zoomInDown" easing="ease-out" delay={700} style={[styles.tripHeaderShadow, { backgroundColor: '#fff', }]}>
                    <View style={[styles.tripHeaderImage, styles.textCenter, { alignItems: 'center', justifyCenter: 'center' }]}>
                        <Text style={{ textAlign: 'center', width: '100%', color: COLORS.blue, fontSize: 30, fontFamily: 'VIP_cartoon', marginTop: 5 }}>{ i18n.t('safari') }</Text>
                        <Text style={[styles.textSize_16, styles.text_black, styles.textBold, styles.textCenter, styles.Width_90]}>{ i18n.t('allSubInfo') }</Text>
                    </View>
                </View>

                <Content bounces={false} style={{ overflow: 'hidden', borderTopRightRadius: 50, marginTop: 40}}>
                    <View style={{ width: '100%', padding: 15, borderTopRightRadius: 50, backgroundColor: '#fff', minHeight: 110,paddingTop:85 }}>

                       <ScrollView>
                           {
                               subscriptions ?
                               subscriptions.map((sub, i) => {
                                   return (
                                       <TouchableOpacity key={i} onPress={() => {setActiveId(sub.id) ; setPrice(sub.price)}}
                                                         style={[activeId === sub.id ? styles.borderBlue : styles.borderGray, styles.Width_100, styles.marginBottom_15, styles.directionRowSpace, {
                                                             padding: 25,
                                                             borderRadius: 15,
                                                             borderStyle: activeId === sub.id ? 'solid' : 'dashed'
                                                         }]}>

                                           {
                                               activeId === sub.id ?
                                                   <Image source={require('../../../assets/images/check.png')}
                                                          style={[styles.transform, {
                                                              width: 30,
                                                              height: 30,
                                                              position: 'absolute',
                                                              right: 0,
                                                              top: -1
                                                          }]} resizeMode={'contain'}/>
                                                   :
                                                   null
                                           }

                                           <View>
                                               <Text
                                                   style={[styles.textSize_17, activeId === sub.id ? styles.text_blue : styles.text_green, styles.textBold]}>{sub.title}</Text>
                                               <Text style={[styles.textSize_12, styles.text_blue, styles.textBold]}>{sub.duration_word}</Text>
                                           </View>
                                           <View>
                                               <Text style={[styles.textSize_17, styles.text_blue, styles.textBold]}>{sub.price} { i18n.t('RS') }</Text>
                                           </View>
                                       </TouchableOpacity>
                                   )
                               })
                               :
                               null
                           }

                           {
                               activeId ?
                                   <TouchableOpacity onPress={() => onSubscripe()} style={[styles.blueBtn , styles.Width_100 , styles.marginBottom_25 , styles.marginTop_40]}>
                                       <Text style={[styles.textBold , styles.text_White , styles.textSize_16]}>{ i18n.t('subscription') }</Text>
                                   </TouchableOpacity>
                                   :
                                   <View style={[styles.blueBtn , styles.Width_100 , styles.marginBottom_25 , styles.marginTop_40 , {backgroundColor:'#999'}]}>
                                       <Text style={[styles.textBold , styles.text_White , styles.textSize_16]}>{ i18n.t('subscription') }</Text>
                                   </View>
                           }


                       </ScrollView>

                    </View>
                </Content>
            </ImageBackground>
        </Container>
    )
}

export default Subscribe;
