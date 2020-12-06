import React, { useState , useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ImageBackground, ScrollView, I18nManager, Dimensions, ActivityIndicator } from "react-native";
import { Container, Content, Form, Input, Textarea, Header, Right, Body, Icon, Item, Label } from 'native-base'
import styles from '../../../assets/styles'
import i18n from "../../../locale/i18n";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import COLORS from "../../consts/colors";
import { useDispatch, useSelector } from 'react-redux'
import {StoreService} from "../../actions";
import * as Animatable from "react-native-animatable";
import Modal from "react-native-modal";
import * as FileSystem from 'expo-file-system';
import { ImageBrowser } from 'expo-image-picker-multiple';


const width		 	= Dimensions.get('window').width;
const height	 	= Dimensions.get('window').height;

let base64   = [];

function AddService({navigation, route}) {

    let addition = route.params && route.params.addition ? route.params.addition : null;
    let coords   = route.params && route.params.coords ? route.params.coords : null;

    const category_id                   = route.params.category_id;
    const sub_category_id               = route.params.subCategories;
    const [photos, setPhotos]           = useState([]);
    const [additions, setAdditions]     = useState([]);
    const [showModal, setShowModal] 	= useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const lang  = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);

    const [servName, setServName]                   = useState('');
    const [servNameStatus, setServNameStatus]       = useState(0);
    const [servNameEn, setServNameEn]               = useState('');
    const [servNameEnStatus, setServNameEnStatus]   = useState(0);
    const [whatsNum, setWhatsNum]                   = useState('');
    const [whatsNumStatus, setWhatsNumStatus]       = useState(0);
    const [price, setPrice]                         = useState('');
    const [priceStatus, setPriceStatus]             = useState(0);
    const [desc, setDesc]                           = useState('');
    const [descStatus, setDescStatus]               = useState(0);
    const [descEn, setDescEn]                       = useState('');
    const [descEnStatus, setDescEnStatus]           = useState(0);

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
        convertToBase64().then(() => {
            dispatch(StoreService(lang ,
                                  servName ,
                                  servNameEn ,
                                  whatsNum ,
                                  price ,
                                  desc ,
                                  descEn,
                                  coords.latitude,
                                  coords.longitude,
                                  sub_category_id,
                                  base64,
                                  additions,
                                  category_id,
                                  token,
                                  navigation
            )).then(() => setIsSubmitted(false))
        })
    }

    useEffect(() => {
        setIsSubmitted(false)
    }, [isSubmitted]);

    async function convertToBase64(){
        for (let i=0; i < photos.length; i++){
            let imageURL = photos[i].image;
            await FileSystem.readAsStringAsync(imageURL, { encoding: 'base64' }).then((base) => {
                base64.push(base);
            })
        }
    }

    function navigateToImageBrowse(){
        setShowModal(false)
        navigation.navigate('imageBrowser', {routeName: 'addService'})
    }

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


    function testConvert(){

        console.log('damn array of photos', photos)

        // convertToBase64().then(() => {
        //     console.log('ddamn 3', base64)
        // })
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (route.params?.photo && route.params.pathName === 'cam') {
                let tempPhotos = photos;
                tempPhotos.push({ id: tempPhotos.length, image: route.params.photo.uri});
                setPhotos([...tempPhotos]);
            }else if(route.params?.photos && route.params.pathName === 'imageBrowser'){
                let callBackPhotos = route.params.photos ?? null;

                if (callBackPhotos){
                    let tempPhotos = photos;
                    for (let i=0; i < callBackPhotos.length; i++){
                        tempPhotos.push({ id: callBackPhotos.length+i+1, image: callBackPhotos[i].uri})
                    }

                    setPhotos([...tempPhotos])
                }

                console.log('callBackPhotos', callBackPhotos)
            }
        });

        return unsubscribe;
    }, [navigation, route.params]);

    function toggleModal() {
        setShowModal(!showModal)
    }

    function confirmDelete (i) {
        photos.splice(i, 1);
        setPhotos([...photos]);
        base64.splice(i , 1);
        console.log('base64',base64)
        console.log('photos',photos)
    };

    function renderUploadImgs() {
        let imgBlock = [];
        for (let i = 0; i < photos.length; i++) {
            imgBlock.push(
                <TouchableOpacity key={i} onPress={() => _pickImage(i)} style={[styles.bg_light_gray,styles.width_120 , styles.height_100 , styles.flexCenter
                    , styles.borderGray , styles.marginHorizontal_10,{borderStyle: 'dashed', borderRadius: 1}]}>
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
                tempPhotos[i] = { id: i, image: result.uri};
                base64[i]     = result.base64;
            }else{
                tempPhotos.push({ id: i, image: result.uri});
                base64.push(result.base64);
            }

            setPhotos([...tempPhotos]);
            setShowModal(false)
        }
    };

    function deleteItem(i){
        additions.splice(i, 1)
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
                        <Text style={{ textAlign:  I18nManager.isRTL ? 'right' : 'left', color: '#fff', fontSize: 16, fontFamily: 'ArbFONTSBold', marginBottom: 5 }}>{ i18n.t('addService') }</Text>
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

                            <View style={[styles.position_R, styles.height_70, styles.flexCenter, styles.marginBottom_5 ]}>
                                <Item floatingLabel style={[styles.item, styles.position_R ]}>
                                    <Label style={[styles.label, styles.textRegular ,{ color:servNameStatus === 1 ?  COLORS.blue :  COLORS.gray}]}>{ i18n.t('servName') }</Label>
                                    <Input style={[styles.input, styles.height_50, (servNameStatus === 1 ? styles.Active : styles.noActive)]}
                                           onChangeText={(servName) => setServName(servName)}
                                           onBlur={()  => unActiveInput('servName')}
                                           onFocus={() => activeInput('servName')}
                                    />
                                </Item>
                            </View>

                            <View style={[styles.position_R, styles.height_70, styles.flexCenter, styles.marginBottom_5 ]}>
                                <Item floatingLabel style={[styles.item, styles.position_R ]}>
                                    <Label style={[styles.label, styles.textRegular ,{ color:servNameEnStatus === 1 ?  COLORS.blue :  COLORS.gray}]}>{ i18n.t('servNameEn') }</Label>
                                    <Input style={[styles.input, styles.height_50, (servNameEnStatus === 1 ? styles.Active : styles.noActive)]}
                                           onChangeText={(servNameEn) => setServNameEn(servNameEn)}
                                           onBlur={()  => unActiveInput('servNameEn')}
                                           onFocus={() => activeInput('servNameEn')}
                                    />
                                </Item>
                            </View>
                            <View style={[styles.position_R, styles.height_70, styles.flexCenter, styles.marginBottom_5 ]}>
                                <Item floatingLabel style={[styles.item, styles.position_R ]}>
                                    <Label style={[styles.label, styles.textRegular ,{ color:whatsNumStatus === 1 ?  COLORS.blue :  COLORS.gray}]}>{ i18n.t('whatsNum') }</Label>
                                    <Input style={[styles.input, styles.height_50, (whatsNumStatus === 1 ? styles.Active : styles.noActive)]}
                                           onChangeText={(whatsNum) => setWhatsNum(whatsNum)}
                                           onBlur={()  => unActiveInput('whatsNum')}
                                           onFocus={() => activeInput('whatsNum')}
                                           keyboardType={'number-pad'}
                                    />
                                </Item>
                            </View>
                            <View style={[styles.position_R, styles.height_70, styles.flexCenter, styles.marginBottom_5 ]}>
                                <Item floatingLabel style={[styles.item, styles.position_R ]}>
                                    <Label style={[styles.label, styles.textRegular ,{ color:priceStatus === 1 ?  COLORS.blue :  COLORS.gray}]}>{ i18n.t('price') }</Label>
                                    <Input style={[styles.input, styles.height_50, (priceStatus === 1 ? styles.Active : styles.noActive)]}
                                           onChangeText={(price) => setPrice(price)}
                                           onBlur={()  => unActiveInput('price')}
                                           onFocus={() => activeInput('price')}
                                           keyboardType={'number-pad'}
                                    />
                                </Item>
                            </View>

                            <TouchableOpacity onPress={() => navigation.navigate('setLocation', { routeName: 'addService'})} style={[styles.chooseLang , styles.marginBottom_25 , { borderColor: COLORS.gray , borderRadius: 5}]}>
                                <Text style={[ styles.textSize_14, styles.text_gray, styles.textRegular, { textAlign: 'left', width: '100%'} ]}>{ coords ? (coords.address).substr(0, 50) : i18n.t('setLocation') }</Text>
                                <Icon type={'Entypo'} name={'location'} style={{ position: 'absolute', right:0, marginHorizontal: 10 , color:COLORS.gray , fontSize:20}}/>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate('additions', { routeName: 'addService'})} style={[styles.chooseLang , styles.marginBottom_25 , { borderColor: COLORS.gray , borderRadius: 5}]}>
                                <Text style={[ styles.textSize_14, styles.text_gray, styles.textRegular, { textAlign: 'left', width: '100%'} ]}>{ i18n.t('adds') }</Text>
                                <Icon type={'AntDesign'} name={'plus'} style={{ position: 'absolute', right:0, marginHorizontal: 10 , color:COLORS.gray , fontSize:20}}/>
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
                                        && sub_category_id &&  base64 && additions&& category_id ?
                                            <TouchableOpacity onPress={() => addServ()} style={[styles.blueBtn , styles.Width_100 , styles.marginBottom_25]}>
                                                <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('add') }</Text>
                                            </TouchableOpacity>
                                        :
                                            <View style={[styles.blueBtn , styles.Width_100 , styles.marginBottom_25 , styles.bg_light_gray]}>
                                                <Text style={[styles.textRegular , styles.text_black , styles.textSize_16]}>{ i18n.t('add') }</Text>
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

                                <TouchableOpacity onPress={() => navigateToImageBrowse()} style={[styles.marginBottom_10]}>
                                    <Text style={[styles.text_black , styles.textBold , styles.textSize_16, { alignSelf: 'flex-start' }]}>{ i18n.t('photos') }</Text>
                                </TouchableOpacity>

                                <View style={[styles.borderGray , styles.marginBottom_5]}/>

                                <TouchableOpacity onPress={() => {navigation.navigate('cameraCapture' , {pathName:'addService'}) ; setShowModal(false)}} style={[styles.marginBottom_15]}>
                                    <Text style={[styles.text_black , styles.textBold , styles.textSize_16, { alignSelf: 'flex-start' }]}>{ i18n.t('camera') }</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </Modal>
                </Content>
            </ImageBackground>
        </Container>
    );
}

export default AddService;
