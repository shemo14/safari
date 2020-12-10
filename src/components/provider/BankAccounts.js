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
import {Container, Header, Right, Body, Icon, Content, Card} from 'native-base'
import styles from '../../../assets/styles'
import i18n from "../../../locale/i18n";
import COLORS from "../../consts/colors";
import {useSelector, useDispatch} from 'react-redux';
import {getBanks} from '../../actions';
import * as Animatable from "react-native-animatable";

const width	 		= Dimensions.get('window').width;
const height 		= Dimensions.get('window').height;
const isIOS  		= Platform.OS === 'ios';
const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';


function BankAccounts({navigation , route}) {

    const [activeId, setActiveId] = useState(0);
    const [bank, setBank] = useState(null);
    const price = route.params.price;
    const subscription_id = route.params.subscription_id;
    const lang   = useSelector(state => state.lang.lang);

    const token 				= useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const banks 	    = useSelector(state => state.subscriptionDetails.banks);
    const banksLoader 	    = useSelector(state => state.subscriptionDetails.loader);
    const dispatch = useDispatch();

    function fetchData() {
        dispatch(getBanks(token , lang))
    }
    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation , banksLoader]);

    return (
        <Container>

            <ImageBackground source={require('../../../assets/images/bg.png')} style={{ width, height: 200, alignSelf: 'center', flexGrow: 1 }} resizeMode={'cover'}>
                <Header style={{ backgroundColor: 'transparent',  borderBottomWidth: 0 }} noShadow>
                    <Right style={{ flex: 0, marginLeft: 10 }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 50, height: 50, justifyCenter: 'center', alignItems: 'center' }}>
                            <Image source={require('../../../assets/images/white_back.png')} style={[ styles.transform , { width: 27, height: 27, marginTop: 10 }]} resizeMode={'contain'}/>
                        </TouchableOpacity>
                        <Text style={{ textAlign:  I18nManager.isRTL ? 'right' : 'left', color: '#fff', fontSize: 20, fontFamily: 'ArbFONTSBold', marginBottom: 5 }}>{ i18n.t('bankAccounts') }</Text>
                    </Right>
                    <Body style={{ alignSelf: 'flex-start'}} />
                </Header>

                <View animation="zoomInDown" easing="ease-out" delay={700} style={[styles.tripHeaderShadow, { backgroundColor: '#fff', }]}>
                    <View style={[styles.tripHeaderImage, styles.textCenter, { alignItems: 'center', justifyCenter: 'center' }]}>
                        <Text style={{ textAlign: 'center', width: '100%', color: COLORS.blue, fontSize: 30, fontFamily: 'VIP_cartoon', marginTop: 5 }}>{ i18n.t('safari') }</Text>
                        <Text style={[styles.textSize_16, styles.text_black, styles.textBold, styles.textCenter, styles.Width_90]}>{ i18n.t('amountPayed') } {price} { i18n.t('RS') }</Text>
                    </View>
                </View>

                <Content bounces={false} style={{ overflow: 'hidden', borderTopRightRadius: 50, marginTop: 40}}>
                    <View style={{ width: '100%', padding: 15, borderTopRightRadius: 50, backgroundColor: '#fff', minHeight: 110,paddingTop:85 }}>

                        <ScrollView>

                            {
                                banks ?
                                    banks.map((bank, i) => {
                                        return (
                                            <TouchableOpacity key={i} onPress={() => {setActiveId(bank.id) ; setBank(bank)}} style={[styles.Radius_7, styles.Width_100, styles.marginBottom_5]}>
                                                <Card
                                                    style={[styles.directionRow, styles.Radius_7, styles.bgFullWidth , activeId === bank.id ? styles.borderBlue : null, {overflow: 'hidden'}]}>
                                                    <View style={[styles.paddingHorizontal_10]}>
                                                        <Image source={{uri:bank.image}}
                                                               style={[styles.icon100, styles.marginBottom_7]}
                                                               resizeMode={'contain'}/>
                                                    </View>
                                                    <View style={{flex: 1, marginLeft: 7, paddingRight: 7}}>
                                                        <View style={[styles.directionRow, {flexWrap: 'wrap'}]}>
                                                            <Text
                                                                style={[styles.textRegular, styles.text_black, styles.textSize_14]}>{i18n.t('bank')} :</Text>
                                                            <Text
                                                                style={[styles.textRegular, styles.text_blue, styles.textSize_14, {marginLeft: 5}]}>{bank.name}</Text>
                                                        </View>
                                                        <View style={[styles.directionRow, {flexWrap: 'wrap'}]}>
                                                            <Text
                                                                style={[styles.textRegular, styles.text_black, styles.textSize_14]}>{i18n.t('accNumb')} :</Text>
                                                            <Text
                                                                style={[styles.textRegular, styles.text_blue, styles.textSize_14, {marginLeft: 5}]}>{bank.account_number}</Text>
                                                        </View>
                                                    </View>
                                                </Card>
                                            </TouchableOpacity>
                                        )
                                    })
                                    :
                                    null
                            }

                            {
                                activeId ?
                                    <TouchableOpacity onPress={() => navigation.navigate('bankTransfer' , {subscription_id , bank , price})} style={[styles.blueBtn , styles.Width_100 , styles.marginBottom_25 , styles.marginTop_40]}>
                                        <Text style={[styles.textBold , styles.text_White , styles.textSize_16]}>{ i18n.t('continue') }</Text>
                                    </TouchableOpacity>
                                    :
                                    <View style={[styles.blueBtn , styles.Width_100 , styles.marginBottom_25 , styles.marginTop_40 , {backgroundColor:'#999'}]}>
                                        <Text style={[styles.textBold , styles.text_White , styles.textSize_16]}>{ i18n.t('continue') }</Text>
                                    </View>
                            }



                        </ScrollView>

                    </View>
                </Content>
            </ImageBackground>
        </Container>
    )
}

export default BankAccounts;
