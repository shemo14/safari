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
import {Container, Header, Right, Body, Icon, Content, Card, Item, Label, Input, Form} from 'native-base'
import styles from '../../../assets/styles'
import i18n from "../../../locale/i18n";
import COLORS from "../../consts/colors";
import {useSelector, useDispatch} from 'react-redux';
import {uploadeTransfer} from '../../actions';
import * as Animatable from "react-native-animatable";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Modal from "react-native-modal";

const width	 		= Dimensions.get('window').width;
const height 		= Dimensions.get('window').height;
const isIOS  		= Platform.OS === 'ios';
const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';


function BankTransfer({navigation , route}) {

    const {subscription_id , bank} = route.params;
    const lang   = useSelector(state => state.lang.lang);
    const token 				= useSelector(state => state.auth.user ? state.auth.user.data.token : null);

    const [showModal, setShowModal] 		= useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [userImage, setUserImage] = useState('');
    const [base64, setBase64] = useState('');

    const [bankName, setBankName] = useState('');
    const [accName, setAccName] = useState('');
    const [accNumb, setAccNumb] = useState('');
    const [amountPaid, setAmountPaid] = useState('');

    const [bankNameStatus, setBankNameStatus] = useState(0);
    const [accNameStatus, setAccNameStatus] = useState(0);
    const [accNumbStatus, setAccNumbStatus] = useState(0);
    const [amountPaidStatus, setAmountPaidStatus] = useState(0);

    const dispatch = useDispatch();

    function activeInput(type) {

        if (type === 'bankName' || bankName !== '') {
            setBankNameStatus(1)
        }

        if (type === 'accName' || accName !== '') {
            setAccNameStatus(1)
        }

        if (type === 'accNumb' || accNumb !== '') {
            setAccNumbStatus(1)
        }

        if (type === 'amountPaid' || amountPaid !== '') {
            setAmountPaidStatus(1)
        }

    }

    function unActiveInput(type) {

        if (type === 'bankName' && bankName === '') {
            setBankNameStatus(0)
        }

        if (type === 'accName' && accName === '') {
            setAccNameStatus(0)
        }

        if (type === 'accNumb' && accNumb === '') {
            setAccNumbStatus(0)
        }

        if (type === 'amountPaid' && amountPaid === '') {
            setAmountPaidStatus(0)
        }

    }

    function renderConfirm(){
        if (bankName == '' || accName == ''  || accNumb == ''   || amountPaid == '' || base64 == '' ){
            return (
                <View style={[styles.blueBtn , styles.Width_100 , {backgroundColor:'#999'}]}>
                    <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('send') }</Text>
                </View>
            );
        }
        if (isSubmitted){
            return(
                <View style={[{ justifyContent: 'center', alignItems: 'center' } , styles.marginTop_25]}>
                    <ActivityIndicator size="large" color={COLORS.blue} style={{ alignSelf: 'center' }} />
                </View>
            )
        }

        return (
            <TouchableOpacity onPress={() => onConfirm()} style={[styles.blueBtn , styles.Width_100 ]}>
                <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('send') }</Text>
            </TouchableOpacity>
        );
    }

    function onConfirm(){
        setIsSubmitted(false);
        dispatch(uploadeTransfer(token ,lang , base64 , bankName , accName, accNumb , amountPaid , bank.id , subscription_id , navigation));
    }

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

            setShowModal(false)
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

                        <TouchableOpacity onPress={() => toggleModal()} style={[styles.textCenter , styles.marginBottom_5, styles.flexCenter , { width: 80, height: 80 }]}>
                            <Image source={ userImage ? { uri: userImage } : require('../../../assets/images/photo.png')} style={{ width: 80, height: 80 }} resizeMode={userImage ? 'cover' : 'contain'}/>
                        </TouchableOpacity>
                        <Text style={[styles.textSize_16, styles.text_gray, styles.textBold, styles.textCenter]}>{ i18n.t('transImage') }</Text>

                        <Form style={[styles.Width_100 , styles.flexCenter, styles.marginVertical_25, styles.Width_95]}>

                            <View style={[styles.position_R, styles.height_70, styles.flexCenter, styles.marginBottom_10 ]}>
                                <Item floatingLabel style={[styles.item, styles.position_R ]}>
                                    <Label style={[styles.label, styles.textRegular ,{ color:bankNameStatus === 1 ?  COLORS.blue :  COLORS.gray}]}>{ i18n.t('bankName') }</Label>
                                    <Input style={[styles.input, styles.height_50, (bankNameStatus === 1 ? styles.Active : styles.noActive)]}
                                           onChangeText={(bankName) => setBankName(bankName)}
                                           onBlur={() => unActiveInput('bankName')}
                                           onFocus={() => activeInput('bankName')}
                                           value={bankName}
                                    />
                                </Item>
                            </View>

                            <View style={[styles.position_R, styles.height_70, styles.flexCenter, styles.marginBottom_10 ]}>
                                <Item floatingLabel style={[styles.item, styles.position_R ]}>
                                    <Label style={[styles.label, styles.textRegular ,{ color:accNameStatus === 1 ?  COLORS.blue :  COLORS.gray}]}>{ i18n.t('accName') }</Label>
                                    <Input style={[styles.input, styles.height_50, (accNameStatus === 1 ? styles.Active : styles.noActive)]}
                                           onChangeText={(accName) => setAccName(accName)}
                                           onBlur={() => unActiveInput('accName')}
                                           onFocus={() => activeInput('accName')}
                                           value={accName}
                                    />
                                </Item>
                            </View>

                            <View style={[styles.position_R, styles.height_70, styles.flexCenter, styles.marginBottom_10 ]}>
                                <Item floatingLabel style={[styles.item, styles.position_R ]}>
                                    <Label style={[styles.label, styles.textRegular ,{ color:accNumbStatus === 1 ?  COLORS.blue :  COLORS.gray}]}>{ i18n.t('accNumb') }</Label>
                                    <Input style={[styles.input, styles.height_50, (accNumbStatus === 1 ? styles.Active : styles.noActive)]}
                                           onChangeText={(accNumb) => setAccNumb(accNumb)}
                                           onBlur={() => unActiveInput('accNumb')}
                                           onFocus={() => activeInput('accNumb')}
                                           keyboardType={'number-pad'}
                                           value={accNumb}
                                    />
                                </Item>
                            </View>

                            <View style={[styles.position_R, styles.height_70, styles.flexCenter, styles.marginBottom_10 ]}>
                                <Item floatingLabel style={[styles.item, styles.position_R ]}>
                                    <Label style={[styles.label, styles.textRegular ,{ color:amountPaidStatus === 1 ?  COLORS.blue :  COLORS.gray}]}>{ i18n.t('amountPaid') }</Label>
                                    <Input style={[styles.input, styles.height_50, (amountPaidStatus === 1 ? styles.Active : styles.noActive)]}
                                           onChangeText={(amountPaid) => setAmountPaid(amountPaid)}
                                           onBlur={() => unActiveInput('amountPaid')}
                                           onFocus={() => activeInput('amountPaid')}
                                           keyboardType={'number-pad'}
                                           value={amountPaid}
                                    />
                                </Item>
                            </View>
                            { renderConfirm() }
                        </Form>

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

                                <TouchableOpacity onPress={_pickImage} style={[styles.marginBottom_10]}>
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
