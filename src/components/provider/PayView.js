import React from "react";
import {
    View,
    Image,
    TouchableOpacity, ImageBackground, Text, I18nManager, ScrollView, Dimensions
} from "react-native";
import {Body, Container, Content, Header, Right , Toast} from 'native-base'
import styles from '../../../assets/styles'
import { WebView } from 'react-native-webview';
import i18n from "../../../locale/i18n";
import COLORS from "../../consts/colors";
import {useSelector} from "react-redux";
import Consts from "../../consts";

const width	 		= Dimensions.get('window').width;
const height 		= Dimensions.get('window').height;


function PayView({navigation , route}) {

    const subscription_id = route.params.subscription_id;
    const activeId = route.params.activeId;
    const user      = useSelector(state => state.auth.user.data);

    function _onLoad(state, navigation) {
        console.log(state.url);
        if (state.url.indexOf('?status=') != -1) {
            let status      = state.url.split("status=")[1];
            if (status == 1){
                Toast.show({
                    text: i18n.t('successPayment'),
                    type: "success",
                    duration: 3000
                });
            }else{
                Toast.show({
                    text: i18n.t('error'),
                    type: "danger",
                    duration: 3000
                });
            }
            return navigation.navigate('home');
        }
    }

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
                    <View style={{ width: '100%' , height:'100%', padding: 15, borderTopRightRadius: 50, backgroundColor: '#fff', minHeight: 110,paddingTop:85 }}>

                        <WebView
                            source = {{uri: 'https://safari.aait-sa.com/api/payment/'+subscription_id+'/'+user.id+'/'+activeId}}
                            style  = {{flex:1 , width:'100%' , height:'100%'}}
                            domStorageEnabled={true}
                            startInLoadingState={true}
                            scalesPageToFit={false}
                            scrollEnabled={true}
                            javaScriptEnabled={true}
                            onNavigationStateChange={(state) => _onLoad(state, navigation)}
                        />

                    </View>
                </Content>
            </ImageBackground>
        </Container>


    );
}

export default PayView;