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
    ActivityIndicator,
} from "react-native";
import {Container, Header, Right, Body, Left, Content, Icon} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import COLORS from "../consts/colors";
import {useDispatch, useSelector} from "react-redux";
import {getNotifications , deleteNoti} from '../actions';
import {ScrollView} from "react-native-web";
import * as Animatable from "react-native-animatable";

const width	 		= Dimensions.get('window').width;
const height 		= Dimensions.get('window').height;
const isIOS  		= Platform.OS === 'ios';
const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';


function Notifications({navigation, route}) {
    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const notifications = useSelector(state => state.notifications.notifications);
    const notificationsLoader = useSelector(state => state.notifications.loader);
    const [screenLoader , setScreenLoader ] = useState(true);

    const dispatch = useDispatch();

    function fetchData(){
        setScreenLoader(true)
        dispatch(getNotifications(lang, token))
    }
    function deleteNotify(id){
        dispatch(deleteNoti(lang , id, token))
    }

    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation , notificationsLoader]);

    useEffect(() => {
        setScreenLoader(false)
    }, [notifications]);

    function renderLoader(){
        if (screenLoader){
            return(
                <View style={[styles.loading, styles.flexCenter, {backgroundColor:'#fff'}]}>
                    <ActivityIndicator size="large" color={COLORS.blue} style={{ alignSelf: 'center' }} />
                </View>
            );
        }
    }

    // function renderNoData() {
    //     if (notifications && (notifications).length <= 0) {
    //         return (
    //             <View style={[styles.directionColumnCenter , styles.Width_100, styles.marginTop_25]}>
    //                 <Image source={require('../../assets/images/note.png')} resizeMode={'contain'}
    //                        style={{alignSelf: 'center', width: 200, height: 200}}/>
    //             </View>
    //         );
    //     }
    //
    //     return null
    // }



    function Item({ title , date , body , id , type , service_id, index}) {

        return (
            <Animatable.View style={{width: '100%', marginBottom: 10}} animation="fadeInUp" easing="ease-out" delay={500}>
                <TouchableOpacity style={{ borderRadius: 10,width: '100%',padding:15, height:140, justifyContent:'center',
                    overflow: 'hidden',backgroundColor: index % 2 === 0 ? '#F1F0FE' : '#FEF0DF'}} onPress={type=== 1 ?() => navigation.navigate('serviceDetails' , {service_id}) : null}>
                    <TouchableOpacity onPress={() => deleteNotify(id)} style={[styles.paddingVertical_5 , styles.paddingHorizontal_5, styles.Radius_50
                        , {backgroundColor: index % 2 === 0 ? COLORS.blue : COLORS.orange
                            , position:'absolute' , right:7 , bottom:10}]}>
                        <Icon type={'AntDesign'} name={'delete'} style={{fontSize: 18 , color:'#fff'}}/>
                    </TouchableOpacity>
                    <View style={{borderLeftWidth:4 , borderLeftColor:index % 2 === 0 ? COLORS.blue : COLORS.orange , paddingLeft:15}}>
                        <View style={[styles.directionRowSpace]}>
                            <Text style={[ styles.textBold, styles.text_black, styles.textSize_14]}>{ title.substr(0,30) }</Text>
                            <Text style={[ styles.textBold, styles.text_gray, styles.textSize_12]}>{ date }</Text>
                        </View>
                        <Text style={[ styles.textBold, styles.text_gray, styles.textSize_13, styles.alignStart]}>{ body }</Text>
                        <Text style={[ styles.textBold, styles.text_orange , styles.textDecoration, styles.textSize_13 , styles.alignStart]}>{ i18n.t('seeOffer') }</Text>
                    </View>
                </TouchableOpacity>
            </Animatable.View>
        );
    }

    return (
        <Container>
            {renderLoader()}
            <ImageBackground source={require('../../assets/images/bg.png')} style={{ width, height: height-100, alignSelf: 'center', flexGrow: 1 }} resizeMode={'cover'}>
                <Header style={{ backgroundColor: 'transparent',  borderBottomWidth: 0 , paddingTop:10}} noShadow>
                    <Right style={[styles.directionRowCenter , { flex: 0}]}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 50, height: 50, justifyCenter: 'center', alignItems: 'center' }}>
                            <Image source={require('../../assets/images/white_back.png')} style={[ styles.transform , { width: 23, height: 23, marginTop: 10 }]} resizeMode={'contain'}/>
                        </TouchableOpacity>
                        <Text style={{ textAlign:  I18nManager.isRTL ? 'right' : 'left', color: '#fff', fontSize: 16, fontFamily: 'ArbFONTSBold', marginBottom: 5 }}>{ i18n.t('notifications') }</Text>
                    </Right>
                    <Body style={{ alignSelf: 'flex-start'}} />
                </Header>

                <Content contentContainerStyle={[styles.bgFullWidth]} bounces={false} style={{height:'100%', marginTop: 10, overflow: 'hidden', borderTopRightRadius: 50, }}>
                    <View style={{ width: '100%', height:'100%', padding: 15, borderTopRightRadius: 50, backgroundColor: '#fff' }}>
                        <FlatList
                            data={notifications}
                            renderItem={({ item , index}) => <Item
                                title={item.title}
                                index={index}
                                date={item.date}
                                body={item.body}
                                id={item.id}
                                service_id={item.service_id}
                                type={item.type}
                            />}
                            keyExtractor={item => item.id}
                            numColumns={1}
                            horizontal={false}
                            // extraData={isFav}
                        />
                    </View>
                </Content>
            </ImageBackground>
        </Container>
    )
}

export default Notifications;
