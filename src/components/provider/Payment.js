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
import {Container, Header, Right, Body, Icon, Content } from 'native-base'
import styles from '../../../assets/styles'
import i18n from "../../../locale/i18n";
import COLORS from "../../consts/colors";
import {useSelector, useDispatch} from 'react-redux';
import {getAbout} from '../../actions';
import * as Animatable from "react-native-animatable";

const width	 		= Dimensions.get('window').width;
const height 		= Dimensions.get('window').height;
const isIOS  		= Platform.OS === 'ios';
const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';


function Payment({navigation , route}) {

    const [activeId, setActiveId] = useState('master');
    const price = route.params.price
    const subscription_id = route.params.subscription_id

    return (
        <Container>

            <ImageBackground source={require('../../../assets/images/bg.png')} style={{ width, height: 200, alignSelf: 'center', flexGrow: 1 }} resizeMode={'cover'}>
                <Header style={{ backgroundColor: 'transparent',  borderBottomWidth: 0 }} noShadow>
                    <Right style={{ flex: 0, marginLeft: 10 }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 50, height: 50, justifyCenter: 'center', alignItems: 'center' }}>
                            <Image source={require('../../../assets/images/white_back.png')} style={[ styles.transform , { width: 27, height: 27, marginTop: 10 }]} resizeMode={'contain'}/>
                        </TouchableOpacity>
                        <Text style={{ textAlign:  I18nManager.isRTL ? 'right' : 'left', color: '#fff', fontSize: 20, fontFamily: 'ArbFONTSBold', marginBottom: 5 }}>{ i18n.t('payment') }</Text>
                    </Right>
                    <Body style={{ alignSelf: 'flex-start'}} />
                </Header>

                <View animation="zoomInDown" easing="ease-out" delay={700} style={[styles.tripHeaderShadow, { backgroundColor: '#fff', }]}>
                    <View style={[styles.tripHeaderImage, styles.textCenter, { alignItems: 'center', justifyCenter: 'center' }]}>
                        <Text style={{ textAlign: 'center', width: '100%', color: COLORS.blue, fontSize: 30, fontFamily: 'VIP_cartoon', marginTop: 5 }}>{ i18n.t('safari') }</Text>
                        <Text style={[styles.textSize_16, styles.text_black, styles.textBold, styles.textCenter, styles.Width_90]}>{ i18n.t('payPackage') }</Text>
                    </View>
                </View>

                <Content bounces={false} style={{ overflow: 'hidden', borderTopRightRadius: 50, marginTop: 40}}>
                    <View style={{ width: '100%', padding: 15, borderTopRightRadius: 50, backgroundColor: '#fff', minHeight: 110,paddingTop:85 }}>

                        <ScrollView>

                            <TouchableOpacity onPress={() => setActiveId('master')} style={[activeId === 'master' ? styles.borderBlue : styles.borderGray , styles.Width_100 , styles.marginBottom_15  , styles.directionRow , {padding:15 , borderRadius:15 , borderStyle: activeId === 'master' ?  'solid' : 'dashed'}]}>

                                {
                                    activeId === 'master' ?
                                        <Image source={require('../../../assets/images/check.png')} style={[ styles.transform , { width: 30, height: 30 , position:'absolute' , right:0 , top:-1}]} resizeMode={'contain'}/>
                                        :
                                        null
                                }

                                <Image source={require('../../../assets/images/MasterCard_Logo.svg.png')} style={[{ width: 25, height: 25 , marginRight:10}]} resizeMode={'contain'}/>
                                <Text style={[styles.textSize_13, activeId === 'master' ? styles.text_blue : styles.text_green, styles.textBold]}>{ i18n.t('visa') }</Text>

                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setActiveId('mada')} style={[activeId === 'mada' ? styles.borderBlue : styles.borderGray , styles.Width_100 , styles.marginBottom_15  , styles.directionRow , {padding:15 , borderRadius:15 , borderStyle: activeId === 'mada' ?  'solid' : 'dashed'}]}>

                                {
                                    activeId === 'mada' ?
                                        <Image source={require('../../../assets/images/check.png')} style={[ styles.transform , { width: 30, height: 30 , position:'absolute' , right:0 , top:-1}]} resizeMode={'contain'}/>
                                        :
                                        null
                                }

                                <Image source={require('../../../assets/images/mada.png')} style={[{ width: 25, height: 25 , marginRight:10}]} resizeMode={'contain'}/>
                                <Text style={[styles.textSize_13, activeId === 'mada' ? styles.text_blue : styles.text_green, styles.textBold]}>{ i18n.t('mada') }</Text>

                            </TouchableOpacity>

                            {/*<TouchableOpacity onPress={() => setActiveId(2)} style={[activeId === 2 ? styles.borderBlue : styles.borderGray , styles.Width_100 , styles.marginBottom_15  , styles.directionRow , {padding:15 , borderRadius:15 , borderStyle: activeId === 2 ?  'solid' : 'dashed'}]}>*/}

                            {/*    {*/}
                            {/*        activeId === 2 ?*/}
                            {/*            <Image source={require('../../../assets/images/check.png')} style={[ styles.transform , { width: 30, height: 30 , position:'absolute' , right:0 , top:-1}]} resizeMode={'contain'}/>*/}
                            {/*            :*/}
                            {/*            null*/}
                            {/*    }*/}

                            {/*    <Image source={require('../../../assets/images/stc.png')} style={[{ width: 25, height: 25 , marginRight:10}]} resizeMode={'contain'}/>*/}
                            {/*    <Text style={[styles.textSize_13, activeId === 2 ? styles.text_blue : styles.text_green, styles.textBold]}>{ i18n.t('stc') }</Text>*/}

                            {/*</TouchableOpacity>*/}

                            <TouchableOpacity onPress={() => setActiveId('bankTransfer')} style={[activeId === 'bankTransfer' ? styles.borderBlue : styles.borderGray , styles.Width_100 , styles.marginBottom_15  , styles.directionRow , {padding:15 , borderRadius:15 , borderStyle: activeId === 'bankTransfer' ?  'solid' : 'dashed'}]}>

                                {
                                    activeId === 'bankTransfer' ?
                                        <Image source={require('../../../assets/images/check.png')} style={[ styles.transform , { width: 30, height: 30 , position:'absolute' , right:0 , top:-1}]} resizeMode={'contain'}/>
                                        :
                                        null
                                }

                                <Image source={require('../../../assets/images/cib.png')} style={[{ width: 25, height: 25 , marginRight:10}]} resizeMode={'contain'}/>
                                <Text style={[styles.textSize_13, activeId === 'bankTransfer' ? styles.text_blue : styles.text_green, styles.textBold]}>{ i18n.t('bankTransfer') }</Text>

                            </TouchableOpacity>

                            {
                                activeId === 'bankTransfer' ?
                                    <TouchableOpacity onPress={() => navigation.navigate('bankAccounts' , {price , subscription_id})} style={[styles.blueBtn , styles.Width_100 , styles.marginBottom_25 , styles.marginTop_40]}>
                                        <Text style={[styles.textBold , styles.text_White , styles.textSize_16]}>{ i18n.t('pay') }</Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity onPress={() => navigation.navigate('payView', {activeId , subscription_id})} style={[styles.blueBtn , styles.Width_100 , styles.marginBottom_25 , styles.marginTop_40]}>
                                        <Text style={[styles.textBold , styles.text_White , styles.textSize_16]}>{ i18n.t('pay') }</Text>
                                    </TouchableOpacity>
                            }


                        </ScrollView>

                    </View>
                </Content>
            </ImageBackground>
        </Container>
    )
}

export default Payment;
