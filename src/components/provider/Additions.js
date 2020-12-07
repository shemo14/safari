import React, { useState , useEffect, useRef } from "react";
import { View, Text, Image, TouchableOpacity, ImageBackground, I18nManager, Dimensions, KeyboardAvoidingView } from "react-native";
import { Container, Content, Form, Input, Header, Right, Body, Icon, Item, Label } from 'native-base'
import styles from '../../../assets/styles'
import i18n from "../../../locale/i18n";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import COLORS from "../../consts/colors";
import Modal from "react-native-modal";

const width		 	= Dimensions.get('window').width;
const height	 	= Dimensions.get('window').height;

function Additions({navigation, route}) {
    const [userImage, setUserImage]                         = useState(null);
    const [base64, setBase64]                               = useState('');
    const { routeName }                                     = route.params;
    const [additionName, setAdditionName]                   = useState('');
    const [additionNameStatus, setAdditionNameStatus]       = useState(0);
    const [additionNameEn, setAdditionNameEn]               = useState('');
    const [additionNameEnStatus, setAdditionNameEnStatus]   = useState(0);
    const [price, setPrice]                                 = useState('');
    const [priceStatus, setPriceStatus]                     = useState(0);
    const [showModal, setShowModal] 		= useState(false);

    function activeInput(type) {
        if (type === 'additionName' || additionName !== '') setAdditionNameStatus(1);
        if (type === 'additionNameEn' || additionNameEn !== '') setAdditionNameEnStatus(1);
        if (type === 'price' || price !== '') setPriceStatus(1);
    }

    function unActiveInput(type) {
        if (type === 'additionName' && additionName === '') setAdditionNameStatus(0);
        if (type === 'additionNameEn' && additionNameEn === '') setAdditionNameEnStatus(0);
        if (type === 'price' && price === '') setPriceStatus(0);
    }

    const askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);

    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {

            if (route.params?.photo) {
                setUserImage(route.params.photo.uri);
                setBase64(route.params.photo.base64);
            }
        });

        return unsubscribe;
    }, [navigation , route.params?.photo])

    function toggleModal() {
        setShowModal(!showModal)
    }

    const _pickImage = async () => {

        askPermissionsAsync();

        let result = await ImagePicker.launchImageLibraryAsync({
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

    let image = userImage;

    return(
        <Container>
            <ImageBackground source={require('../../../assets/images/bg.png')} style={{ width, height:height*70/100, alignSelf: 'center', flexGrow: 1 }} resizeMode={'cover'}>
                <Header style={{ backgroundColor: 'transparent', marginTop: 10, borderBottomWidth: 0 }} noShadow>
                    <Right style={[styles.directionRowCenter , { flex: 0}]}>
                        <TouchableOpacity onPress={() => routeName === 'addService' ? navigation.navigate(routeName,{pathName :'addition'}) : navigation.goBack()} style={{ width: 50, height: 50, justifyCenter: 'center', alignItems: 'center' }}>
                            <Image source={require('../../../assets/images/white_back.png')} style={[ styles.transform , { width: 23, height: 23, marginTop: 10 }]} resizeMode={'contain'}/>
                        </TouchableOpacity>
                        <Text style={{ textAlign:  I18nManager.isRTL ? 'right' : 'left', color: '#fff', fontSize: 16, fontFamily: 'ArbFONTSBold', marginBottom: 5 }}>{ i18n.t('adds') }</Text>
                    </Right>
                    <Body style={{ alignSelf: 'flex-start'}} />
                </Header>

                <Content contentContainerStyle={[styles.bgFullWidth]}>
                    <View style={[styles.bg_White, styles.heightFull, styles.Width_100, {borderTopRightRadius:50 , marginTop:70 , paddingTop:50}]}>

                        <View animation="fadeIn" easing="ease-out" delay={700} style={[styles.tripHeaderShadow , styles.width_120 ,{marginTop:0 , top:-70 }]}>
                            <View style={[styles.tripHeaderImage, styles.height_120]}>
                                <View style={[styles.tripImage]}>
                                    <View style={[ styles.bg_White, styles.Width_100, styles.position_A, styles.height_120 , styles.borderGray, { zIndex: -1 ,
                                        borderRadius: 10} ]} />
                                    <TouchableOpacity onPress={toggleModal}  style={[styles.Width_100 , styles.heightFull , styles.flexCenter]}>
                                        {
                                            image != null?
                                                <Image source= {{uri:image}} style={[styles.Width_100 , styles.heightFull , styles.SelfCenter ]} resizeMode={'cover'} />
                                                :
                                                <Icon type={'AntDesign'} name={'plus'} style={{ color: COLORS.gray, fontSize: 24 }} />
                                        }
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <KeyboardAvoidingView behavior={'padding'} style={[styles.keyboardAvoid]}>
                            <Form style={[styles.Width_100 , styles.flexCenter, styles.marginVertical_10, styles.Width_90, styles.marginTop_35 ]}>

                                <View style={[styles.position_R, styles.height_70, styles.flexCenter, styles.marginBottom_5 ]}>
                                    <Item floatingLabel style={[styles.item, styles.position_R ]}>
                                        <Label style={[styles.label, styles.textRegular ,{ color:additionNameStatus === 1 ?  COLORS.blue :  COLORS.gray}]}>{ i18n.t('additionName') }</Label>
                                        <Input style={[styles.input, styles.height_50, (additionNameStatus === 1 ? styles.Active : styles.noActive)]}
                                               onChangeText={(additionName) => setAdditionName(additionName)}
                                               onBlur={()  => unActiveInput('additionName')}
                                               onFocus={() => activeInput('additionName')}
                                        />
                                    </Item>
                                </View>

                                <View style={[styles.position_R, styles.height_70, styles.flexCenter, styles.marginBottom_5 ]}>
                                    <Item floatingLabel style={[styles.item, styles.position_R ]}>
                                        <Label style={[styles.label, styles.textRegular ,{ color:additionNameEnStatus === 1 ?  COLORS.blue :  COLORS.gray}]}>{ i18n.t('additionNameEn') }</Label>
                                        <Input style={[styles.input, styles.height_50, (additionNameEnStatus === 1 ? styles.Active : styles.noActive)]}
                                               onChangeText={(additionNameEn) => setAdditionNameEn(additionNameEn)}
                                               onBlur={()  => unActiveInput('additionNameEn')}
                                               onFocus={() => activeInput('additionNameEn')}
                                        />
                                    </Item>
                                </View>

                                <View style={[styles.position_R, styles.height_70, styles.flexCenter, styles.marginBottom_5 ]}>
                                    <Item floatingLabel style={[styles.item, styles.position_R ]}>
                                        <Label style={[styles.label, styles.textRegular ,{ color:priceStatus === 1 ?  COLORS.blue :  COLORS.gray}]}>{ i18n.t('additionPrice') }</Label>
                                        <Input style={[styles.input, styles.height_50, (priceStatus === 1 ? styles.Active : styles.noActive)]}
                                               onChangeText={(price) => setPrice(price)}
                                               onBlur={()  => unActiveInput('price')}
                                               onFocus={() => activeInput('price')}
                                               keyboardType={'number-pad'}
                                        />
                                    </Item>
                                </View>

                                {
                                    additionName && additionNameEn && price && userImage ?
                                        <TouchableOpacity onPress={() => navigation.navigate(routeName ,{pathName :'addition' , addition:{addition_ar:additionName , addition_en:additionNameEn , price , imageUrl:userImage , image:base64}})} style={[styles.blueBtn , styles.Width_100 , styles.marginBottom_25]}>
                                            <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('confirm') }</Text>
                                        </TouchableOpacity>
                                    :
                                        <View style={[styles.blueBtn , styles.Width_100 , styles.marginBottom_25 , styles.bg_light_gray]}>
                                            <Text style={[styles.textRegular , styles.text_black , styles.textSize_16]}>{ i18n.t('confirm') }</Text>
                                        </View>
                                }

                            </Form>
                        </KeyboardAvoidingView>
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
                                    <Text style={[styles.text_black , styles.textBold , styles.textSize_16, styles.alignStart]}>{ i18n.t('photos') }</Text>
                                </TouchableOpacity>

                                <View style={[styles.borderGray , styles.marginBottom_5]}/>

                                <TouchableOpacity onPress={() => {navigation.navigate('cameraCapture' , {pathName:'additions'}) ; setShowModal(false)}} style={[styles.marginBottom_15]}>
                                    <Text style={[styles.text_black , styles.textBold , styles.textSize_16, styles.alignStart]}>{ i18n.t('camera') }</Text>
                                </TouchableOpacity>



                            </View>
                        </View>

                    </Modal>
                </Content>
            </ImageBackground>
        </Container>
    );
}

export default Additions;
