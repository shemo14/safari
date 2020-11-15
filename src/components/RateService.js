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
    Share,
} from "react-native";
import {Container, Header, Right, Body, Icon, Content } from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import COLORS from "../consts/colors";
import { useDispatch, useSelector } from 'react-redux'
import {ScrollView} from "react-native-web";
import * as Animatable from "react-native-animatable";
import StarRating from "react-native-star-rating";

const width	 		= Dimensions.get('window').width;
const height 		= Dimensions.get('window').height;
const isIOS  		= Platform.OS === 'ios';
const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';


function RateService({navigation, route}) {

    const [starCount, setStarCount] = useState(0);

    function onStarRatingPress(rating) {
        setStarCount(rating);
    }
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setStarCount(0);
        });

        return unsubscribe;
    }, [navigation ]);
    return (
        <Container>
            <ImageBackground source={require('../../assets/images/bg.png')} style={{ width, height: 200, alignSelf: 'center', flexGrow: 1 }} resizeMode={'cover'}>
                <Header style={{ backgroundColor: 'transparent',  borderBottomWidth: 0 }} noShadow>
                    <Right style={[styles.directionRowCenter , { flex: 0}]}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 50, height: 50, justifyCenter: 'center', alignItems: 'center' }}>
                            <Image source={require('../../assets/images/white_back.png')} style={[ styles.transform , { width: 23, height: 23, marginTop: 10 }]} resizeMode={'contain'}/>
                        </TouchableOpacity>
                        <Text style={{ textAlign:  I18nManager.isRTL ? 'right' : 'left', color: '#fff', fontSize: 16, fontFamily: 'ArbFONTSBold', marginBottom: 5 }}>{ i18n.t('rateServTitle') }</Text>
                    </Right>
                    <Body style={{ alignSelf: 'flex-start'}} />
                </Header>

                <View style={[styles.tripHeaderShadow, { backgroundColor: '#fff', marginTop: IS_IPHONE_X ? 100 : 60 }]}>
                    <View style={[styles.tripHeaderImage, styles.textCenter, { alignItems: 'center', justifyCenter: 'center' }]}>
                        <Text style={{ textAlign: 'center', width: '100%', color: COLORS.blue, fontSize: 24, fontFamily: 'VIP_cartoon', marginTop: 5 }}>{ i18n.t('safari') }</Text>
                        <Text style={[styles.textSize_14, styles.text_black, styles.textBold, styles.textCenter, styles.Width_90]}>{ i18n.t('rateServ') }</Text>
                    </View>
                </View>

                <Content bounces={false} style={{ overflow: 'hidden', borderTopRightRadius: 50, marginTop: 40}}>
                    <View style={{ width: '100%', padding: 15, borderTopRightRadius: 50, backgroundColor: '#fff', minHeight: 110, }}>
                        <View style={[styles.flexCenter , styles.Width_100 , styles.marginTop_55]}>
                            <Text style={[styles.textBold , styles.text_gray , styles.textSize_14 , styles.Width_70
                                , styles.marginBottom_5 , styles.textCenter , styles.marginVertical_25]}>
                                { i18n.t('rateText') }
                            </Text>
                            <StarRating
                                disabled={false}
                                maxStars={5}
                                rating={starCount}
                                selectedStar={(rating) => onStarRatingPress(rating)}
                                fullStarColor={COLORS.orange}
                                starSize={22}
                                starStyle={{marginHorizontal:3 , marginBottom:20 , marginTop:10}}
                            />
                            <TouchableOpacity onPress={() => navigation.navigate('confirmEvaluation')} style={[styles.blueBtn , styles.Width_80]}>
                                <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('rate') }</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Content>
            </ImageBackground>
        </Container>
    )
}

export default RateService;
