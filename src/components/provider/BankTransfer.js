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
import {getAbout} from '../../actions';
import * as Animatable from "react-native-animatable";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Modal from "react-native-modal";

const width	 		= Dimensions.get('window').width;
const height 		= Dimensions.get('window').height;
const isIOS  		= Platform.OS === 'ios';
const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';


function BankTransfer({navigation , route}) {

    const [showModal, setShowModal] 		= useState(false);
    const [userImage, setUserImage] = useState('');
    const [base64, setBase64] = useState('');

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (route.params?.photo) {
                setUserImage(route.params.photo.uri);
                setBase64(route.params.photo.base64);
            }
        });

        return unsubscribe;
    }, [navigation , route.params?.photo]);

    const askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
    };

    function toggleModal() {
        setShowModal(!showModal)
    }

    const _pickImage = async () => {

        askPermissionsAsync();

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            base64:true
        });

        if (!result.cancelled) {
            setUserImage(result.uri);
            setBase64(result.base64);
        }
    };

    return (
        <Container>

            <ImageBackground source={require('../../../assets/images/bg.png')} style={{ width, height: 200, alignSelf: 'center', flexGrow: 1 }} resizeMode={'cover'}>
                <Header style={{ backgroundColor: 'transparent',  borderBottomWidth: 0 }} noShadow>
                    <Right style={{ flex: 0, marginLeft: 10 }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 50, height: 50, justifyCenter: 'center', alignItems: 'center' }}>
                            <Image source={require('../../../assets/images/white_back.png')} style={[ styles.transform , { width: 27, height: 27, marginTop: 10 }]} resizeMode={'contain'}/>
                        </TouchableOpacity>
                        <Text style={{ textAlign:  I18nManager.isRTL ? 'right' : 'left', color: '#fff', fontSize: 20, fontFamily: 'ArbFONTSBold', marginBottom: 5 }}>{ i18n.t('bankTransfer') }</Text>
                    </Right>
                    <Body style={{ alignSelf: 'flex-start'}} />
                </Header>

                <View animation="zoomInDown" easing="ease-out" delay={700} style={[styles.tripHeaderShadow, { backgroundColor: '#fff', }]}>
                    <View style={[styles.tripHeaderImage, styles.textCenter, { alignItems: 'center', justifyCenter: 'center' }]}>
                        <Text style={{ textAlign: 'center', width: '100%', color: COLORS.blue, fontSize: 30, fontFamily: 'VIP_cartoon', marginTop: 5 }}>{ i18n.t('safari') }</Text>
                        <Text style={[styles.textSize_16, styles.text_black, styles.textBold, styles.textCenter, styles.Width_90]}>{ i18n.t('bankTransferInfo') }</Text>
                    </View>
                </View>

                <Content bounces={false} style={{ overflow: 'hidden', borderTopRightRadius: 50, marginTop: 40}}>
                    <View style={{ width: '100%', padding: 15, borderTopRightRadius: 50, backgroundColor: '#fff', minHeight: 110,paddingTop:85 }}>

                        <TouchableOpacity onPress={() => toggleModal()} style={[styles.textCenter , styles.marginBottom_5, styles.centerContext]}>
                            <Image source={ userImage ? { uri: userImage } : require('../../../assets/images/photo.png')} style={{ width: 80, height: 80 }} resizeMode={userImage ? 'cover' : 'contain'}/>
                        </TouchableOpacity>
                        <Text style={[styles.textSize_16, styles.text_gray, styles.textBold, styles.textCenter]}>{ i18n.t('transImage') }</Text>

                    </View>

                    <Modal
                        onBackdropPress     = {toggleModal}
                        onBackButtonPress   = {toggleModal}
                        isVisible           = {showModal}
                        style               = {styles.bgModel}
                        avoidKeyboard  		= {true}
                    >
                        <View style={[{borderTopLeftRadius:30,
                            borderTopRightRadius:30},styles.bg_White, styles.overHidden, styles.Width_100, styles.paddingVertical_10 , styles.paddingHorizontal_10]}>
                            <View style={[styles.overHidden, styles.Width_100 , styles.paddingHorizontal_25]}>

                                <TouchableOpacity onPress={() => {_pickImage() ; setShowModal(false)}} style={[styles.marginBottom_10]}>
                                    <Text style={[styles.text_black , styles.textBold , styles.textSize_16]}>{ i18n.t('photos') }</Text>
                                </TouchableOpacity>

                                <View style={[styles.borderGray , styles.marginBottom_5]}/>

                                <TouchableOpacity onPress={() => {navigation.navigate('cameraCapture' , {pathName:'bankTransfer'}) ; setShowModal(false)}} style={[styles.marginBottom_15]}>
                                    <Text style={[styles.text_black , styles.textBold , styles.textSize_16]}>{ i18n.t('camera') }</Text>
                                </TouchableOpacity>



                            </View>
                        </View>

                    </Modal>
                </Content>
            </ImageBackground>
        </Container>
    )
}

export default BankTransfer;
