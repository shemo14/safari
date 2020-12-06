import React, { useState , useEffect, useRef } from "react";
import { View, Text, Image, TouchableOpacity, ImageBackground, ScrollView, I18nManager, Dimensions, ActivityIndicator } from "react-native";
import { Container, Content, Form, Input, Textarea, Header, Right, Left, Body, CheckBox, Icon, Item, Label } from 'native-base'
import styles from '../../../assets/styles'
import i18n from "../../../locale/i18n";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import COLORS from "../../consts/colors";
import { useDispatch, useSelector } from 'react-redux'
import {DeleteImg, UpdateService} from "../../actions";
import * as Animatable from "react-native-animatable";
import axios from "axios";
import Modal from "react-native-modal";

const width		 	= Dimensions.get('window').width;
const height	 	= Dimensions.get('window').height;
let base64          = [];

function EditService({navigation, route}) {
    const service   = route.params.service;
    let coords      = route.params && route.params.coords ? route.params.coords : null;
    let addition    = route.params && route.params.addition ? route.params.addition : null;

    // const addition                      = service.additions;
    const category_id                   = service.category_id;
    const sub_category_id               = service.sub_category_id;
    const [photos, setPhotos]           = useState(service.images);
    const [additions, setAdditions]     = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showModal, setShowModal] 		= useState(false);

    const lang  = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);

    const [servName, setServName]                   = useState(service.name_ar);
    const [servNameStatus, setServNameStatus]       = useState(1);
    const [servNameEn, setServNameEn]               = useState(service.name_en);
    const [servNameEnStatus, setServNameEnStatus]   = useState(1);
    const [whatsNum, setWhatsNum]                   = useState(service.whatsapp);
    const [whatsNumStatus, setWhatsNumStatus]       = useState(1);
    const [price, setPrice]                         = useState(service.price2);
    const [priceStatus, setPriceStatus]             = useState(1);
    const [desc, setDesc]                           = useState(service.description_ar);
    const [descStatus, setDescStatus]               = useState(1);
    const [descEn, setDescEn]                       = useState(service.description_en);
    const [descEnStatus, setDescEnStatus]           = useState(1);
    const [address, setAddress]                     = useState(i18n.t('setLocation'));
    const location                                  = coords ? { latitude: coords.latitude, longitude: coords.longitude } : { latitude: service.latitude, longitude: service.longitude };

    function activeInput(type) {
        if (type === 'servName' || servName !== '') setServNameStatus(1);
        if (type === 'servNameEn' || servNameEn !== '') setServNameEnStatus(1);
        if (type === 'whatsNum' || whatsNum !== '') setWhatsNumStatus(1);
        if (type === 'price' || price !== '') setPriceStatus(1);
        if (type === 'desc' || desc !== '') setDescStatus(1);
        if (type === 'descEn' || descEn !== '') setDescEnStatus(1);
    }

    function unActiveInput(type) {
        if (type === 'servName' && servName === '') setServNameStatus(0);
        if (type === 'servNameEn' && servNameEn === '') setServNameEnStatus(0);
        if (type === 'whatsNum' && whatsNum === '') setWhatsNumStatus(0);
        if (type === 'price' && price === '') setPriceStatus(0);
        if (type === 'desc' && desc === '') setDescStatus(0);
        if (type === 'descEn' && descEn === '') setDescEnStatus(0);
    }
    const dispatch = useDispatch();
    const addServ = () =>{
        setIsSubmitted(true);
        dispatch(UpdateService(lang , service.id , servName , servNameEn , whatsNum , price , desc , descEn, location.latitude, location.longitude ,sub_category_id , base64 ,additions,category_id , token , navigation)).then()
    }

    useEffect(() => {
        setIsSubmitted(false)
    }, [isSubmitted]);

    async function getLocation(){
        let endPoint = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
        endPoint    += service.latitude + ',' + service.longitude;
        endPoint    += '&key=AIzaSyCJTSwkdcdRpIXp2yG7DfSRKFWxKhQdYhQ&language=' + lang;

        try {
            const { data } = await axios.get(endPoint);
            console.log(data.results)
        } catch (e) {
            console.log(e);
        }

        try {
            const { data } = await axios.get(endPoint);
            setAddress((data.results[0].formatted_address).substr(0, 30));
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getLocation()
        });
    }, [service])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {

            if (addition && additions.indexOf(addition) == -1){
                let additionsArr = additions;
                additionsArr.push(addition);
                setAdditions([...additionsArr]);
            }
        });

        return unsubscribe;
    }, [navigation, addition])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {

            if (route.params?.photo && route.params.pathName === 'cam') {
                let tempPhotos = photos;
                tempPhotos.push({ id: tempPhotos.length, image: route.params.photo.uri , new: true});
                base64.push(route.params.photo.base64);
                setPhotos([...tempPhotos]);
            }
        });

        return unsubscribe;
    }, [navigation, route.params]);

    function toggleModal() {
        setShowModal(!showModal)
    }



    function confirmDelete (i) {
        if (photos[i].new)
            base64.splice(i , 1);
        else
            dispatch(DeleteImg(lang, photos[i].id, token))

        photos.splice(i, 1);
        setPhotos([...photos]);
    };


    function renderUploadImgs() {
        let imgBlock = [];

        for (let i = 0; i < photos.length; i++) {
            imgBlock.push(
                <TouchableOpacity key={i} onPress={() => _pickImage(i)} style={[styles.bg_light_gray,styles.width_120 , styles.height_100 , styles.flexCenter
                    , styles.borderGray , styles.marginHorizontal_10,{borderStyle: 'dashed', borderRadius: 5, overflow: 'hidden'}]}>
                    {
                        photos[i]?
                            <TouchableOpacity onPress={() => confirmDelete(i)} style={[styles.bg_sky , styles.Radius_50 , {position:'absolute' , right:5 , top:5 , zIndex:1 , padding:5}]}>
                                <Icon type={'AntDesign'} name={'delete'} style={{fontSize: 18 , color:'#fff'}}/>
                            </TouchableOpacity>
                            :
                            null
                    }
                    <Image source= {{uri:photos[i].image}} style={[styles.Width_100, styles.heightFull]} resizeMode={'cover'} />
                </TouchableOpacity>
            )
        }
        return imgBlock
    }

    const askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
    };

    const _pickImage = async (i) => {
        askPermissionsAsync();

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64:true
        });

        if (!result.cancelled) {
            let tempPhotos = photos;
            if(photos[i]){
                tempPhotos[i] = { id: i, image: result.uri, new: true};
                base64[i]=result.base64;
            }else{
                tempPhotos.push({ id: photos.length, image: result.uri, new: true});
                base64.push(result.base64);
            }

            setPhotos([...tempPhotos]);
            setShowModal(false)

            console.log('tempPhotos', photos , 'PhotosNew' ,tempPhotos);
            console.log('base64',base64)
        }
    };

    function deleteItem(i){
        additions.splice(i, 1);
        setAdditions([...additions]);
    }

    return(
        <Container>
            <ImageBackground source={require('../../../assets/images/bg.png')} style={{ width, height:height*70/100, alignSelf: 'center', flexGrow: 1 }} resizeMode={'cover'}>
                <Header style={{ backgroundColor: 'transparent', marginTop: 10, borderBottomWidth: 0 }} noShadow>
                    <Right style={[styles.directionRowCenter , { flex: 0}]}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 50, height: 50, justifyCenter: 'center', alignItems: 'center' }}>
                            <Image source={require('../../../assets/images/white_back.png')} style={[ styles.transform , { width: 23, height: 23, marginTop: 10 }]} resizeMode={'contain'}/>
                        </TouchableOpacity>
                        <Text style={{ textAlign:  I18nManager.isRTL ? 'right' : 'left', color: '#fff', fontSize: 16, fontFamily: 'ArbFONTSBold', marginBottom: 5 }}>{ i18n.t('editService') }</Text>
                    </Right>
                    <Body style={{ alignSelf: 'flex-start'}} />
                </Header>

                <Content contentContainerStyle={[styles.bgFullWidth]}>
                    <View style={[styles.bg_White, styles.heightFull, styles.Width_100, {borderTopRightRadius:50 , marginTop:70 , paddingTop:50}]}>
                        <View animation="fadeIn" easing="ease-out" delay={700} style={[styles.tripHeaderShadow , styles.width_120 ,{marginTop:0 , top:-70 }]}>
                            <View style={[styles.tripHeaderImage, styles.height_120]}>
                                <View style={[styles.tripImage]}>
                                    <View style={[ styles.bg_White, styles.Width_100, styles.position_A, styles.height_120 , styles.borderGray, { zIndex: 0 ,
                                        borderRadius: 10} ]} />
                                    <TouchableOpacity onPress={toggleModal}  style={[styles.Width_100 , styles.heightFull , styles.flexCenter]}>
                                        <Icon type={'AntDesign'} name={'plus'} style={{ color: COLORS.gray, fontSize: 24 }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View>
                            <ScrollView style={[styles.scrollView, styles.marginTop_25]} horizontal={true} showsHorizontalScrollIndicator={false}>
                                {renderUploadImgs()}
                            </ScrollView>
                        </View>

                        <Form style={[styles.Width_100 , styles.flexCenter, styles.marginVertical_10, styles.Width_90, styles.marginTop_35,]}>

                            <View style={[styles.position_R, styles.height_70, styles.flexCenter, styles.marginBottom_10 ]}>
                                <Item floatingLabel style={[styles.item, styles.position_R ]}>
                                    <Label style={[styles.label, styles.textRegular ,{ color:servNameStatus === 1 ?  COLORS.blue :  COLORS.gray}]}>{ i18n.t('servName') }</Label>
                                    <Input style={[styles.input, styles.height_50, (servNameStatus === 1 ? styles.Active : styles.noActive)]}
                                           onChangeText={(servName) => setServName(servName)}
                                           onBlur={()  => unActiveInput('servName')}
                                           onFocus={() => activeInput('servName')}
                                           value={servName}
                                    />
                                </Item>
                            </View>

                            <View style={[styles.position_R, styles.height_70, styles.flexCenter, styles.marginBottom_10 ]}>
                                <Item floatingLabel style={[styles.item, styles.position_R ]}>
                                    <Label style={[styles.label, styles.textRegular ,{ color:servNameEnStatus === 1 ?  COLORS.blue :  COLORS.gray}]}>{ i18n.t('servNameEn') }</Label>
                                    <Input style={[styles.input, styles.height_50, (servNameEnStatus === 1 ? styles.Active : styles.noActive)]}
                                           onChangeText={(servNameEn) => setServNameEn(servNameEn)}
                                           onBlur={()  => unActiveInput('servNameEn')}
                                           onFocus={() => activeInput('servNameEn')}
                                           value={servNameEn}
                                    />
                                </Item>
                            </View>

                            <View style={[styles.position_R, styles.height_70, styles.flexCenter, styles.marginBottom_10 ]}>
                                <Item floatingLabel style={[styles.item, styles.position_R ]}>
                                    <Label style={[styles.label, styles.textRegular ,{ color:whatsNumStatus === 1 ?  COLORS.blue :  COLORS.gray}]}>{ i18n.t('whatsNum') }</Label>
                                    <Input style={[styles.input, styles.height_50, (whatsNumStatus === 1 ? styles.Active : styles.noActive)]}
                                           onChangeText={(whatsNum) => setWhatsNum(whatsNum)}
                                           onBlur={()  => unActiveInput('whatsNum')}
                                           onFocus={() => activeInput('whatsNum')}
                                           keyboardType={'number-pad'}
                                           value={whatsNum}
                                    />
                                </Item>
                            </View>

                            <View style={[styles.position_R, styles.height_70, styles.flexCenter, styles.marginBottom_10 ]}>
                                <Item floatingLabel style={[styles.item, styles.position_R ]}>
                                    <Label style={[styles.label, styles.textRegular ,{ color:priceStatus === 1 ?  COLORS.blue :  COLORS.gray}]}>{ i18n.t('price') }</Label>
                                    <Input style={[styles.input, styles.height_50, (priceStatus === 1 ? styles.Active : styles.noActive)]}
                                           onChangeText={(price) => setPrice(price)}
                                           onBlur={()  => unActiveInput('price')}
                                           onFocus={() => activeInput('price')}
                                           keyboardType={'number-pad'}
                                           value={price.toString()}
                                    />
                                </Item>
                            </View>

                            <TouchableOpacity onPress={() => navigation.navigate('setLocation', { routeName: 'editService'})} style={[styles.chooseLang , styles.marginBottom_25 , { borderColor: COLORS.gray , borderRadius: 5}]}>
                                <Text style={[ styles.textSize_16, styles.text_gray, styles.textRegular, { textAlign: 'left', width: '100%'} ]}>{ coords ? coords.address : address }</Text>
                                <Icon type={'Entypo'} name={'location'} style={{ position: 'absolute', right:0, marginHorizontal: 10 , color:COLORS.gray}}/>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate('additions', { routeName: 'editService'})} style={[styles.chooseLang , styles.marginBottom_25 , { borderColor: COLORS.gray , borderRadius: 5}]}>
                                <Text style={[ styles.textSize_16, styles.text_gray, styles.textRegular, { textAlign: 'left', width: '100%'} ]}>{ i18n.t('adds') }</Text>
                                <Icon type={'AntDesign'} name={'plus'} style={{ position: 'absolute', right:0, marginHorizontal: 10 , color:COLORS.gray}}/>
                            </TouchableOpacity>


                            {
                                additions ?
                                    additions.map((_add, i) => (
                                        <View key={i} style={{ width:'100%' ,backgroundColor: '#f7f7fa', flexDirection: 'row', borderRadius: 10, alignItems: 'center', padding: 5,marginBottom:20}}>
                                            <View style={{ width: 60, height: 60, borderRadius: 10, overflow: 'hidden' }}>
                                                <Image source={{ uri: _add.imageUrl }} style={{ width: 60, height: 60 }} resizeMode={'cover'}/>
                                            </View>
                                            <View style={{ marginHorizontal: 10  }}>
                                                <Text style={[ styles.textSize_14, styles.text_black, styles.textBold, styles._alignText, { alignSelf: 'flex-start' } ]}> { lang == 'ar' ? _add.addition_ar : _add.addition_en } </Text>
                                                <Text style={[ styles.textSize_14, styles.text_orange, styles.textRegular, styles._alignText, { alignSelf: 'flex-start'} ]}> { _add.price } { i18n.t('RS') } </Text>
                                            </View>
                                            <TouchableOpacity style={{position:'absolute' , right:5 , top:5}} onPress={() => deleteItem(i)}>
                                                <Icon type={'AntDesign'} name={'close'} style={{fontSize: 18 , color:COLORS.gray}}/>
                                            </TouchableOpacity>
                                        </View>
                                    )) : null
                            }

                            <View style={[styles.position_R,  styles.height_70, styles.flexCenter, { marginTop: 15, marginBottom: 20 }]}>
                                <Item style={[styles.item, styles.position_R ]}>
                                    <Textarea value={desc}
                                              placeholder={i18n.t('serviceDescAr')} bordered={false}
                                              style={[styles.textArea, styles.height_80, (descStatus === 1 ? styles.Active : styles.noActive)]}
                                              onChangeText={(desc) => setDesc(desc)}
                                              onBlur={()  => unActiveInput('desc')}
                                              onFocus={() => activeInput('desc')}
                                    />
                                </Item>
                            </View>

                            <View style={[styles.position_R,  styles.height_70, styles.flexCenter, { marginTop: 15, marginBottom: 20 }]}>
                                <Item style={[styles.item, styles.position_R ]}>
                                    <Textarea value={descEn}
                                              placeholder={i18n.t('serviceDescEn')} bordered={false}
                                              style={[styles.textArea, styles.height_80, (descEnStatus === 1 ? styles.Active : styles.noActive)]}
                                              onChangeText={(descEn) => setDescEn(descEn)}
                                              onBlur={()  => unActiveInput('descEn')}
                                              onFocus={() => activeInput('descEn')}
                                    />
                                </Item>
                            </View>

                            {
                                isSubmitted ?
                                    <View style={[{ justifyContent: 'center', alignItems: 'center' } , styles.marginBottom_25]}>
                                        <ActivityIndicator size="large" color={COLORS.blue} style={{ alignSelf: 'center' }} />
                                    </View>
                                    :
                                    servName &&  servNameEn &&  whatsNum &&  price &&  desc &&  descEn
                                     && additions && category_id ?
                                        <TouchableOpacity onPress={() => addServ()} style={[styles.blueBtn , styles.Width_100 , styles.marginBottom_25]}>
                                            <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('edit') }</Text>
                                        </TouchableOpacity>
                                        :
                                        <View style={[styles.blueBtn , styles.Width_100 , styles.marginBottom_25 , styles.bg_light_gray]}>
                                            <Text style={[styles.textRegular , styles.text_black , styles.textSize_16]}>{ i18n.t('edit') }</Text>
                                        </View>
                            }

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

                                <TouchableOpacity onPress={() => {navigation.navigate('cameraCapture' , {pathName:'editService'}) ; setShowModal(false)}} style={[styles.marginBottom_15]}>
                                    <Text style={[styles.text_black , styles.textBold , styles.textSize_16]}>{ i18n.t('camera') }</Text>
                                </TouchableOpacity>



                            </View>
                        </View>

                    </Modal>
                </Content>
            </ImageBackground>
        </Container>
    );
}

export default EditService;
