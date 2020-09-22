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
import {Container, Header, Right, Body, Left, Content, Icon} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import COLORS from "../consts/colors";
import { useDispatch, useSelector } from 'react-redux'
import {ScrollView} from "react-native-web";
import * as Animatable from "react-native-animatable";

const width	 		= Dimensions.get('window').width;
const height 		= Dimensions.get('window').height;
const isIOS  		= Platform.OS === 'ios';
const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';

const notifications = [
    {id: 0, title: 'من الاداره', date:'9/7/2020' , body: 'لقد قمت برحله السفاري يرجي التقييم وذلك للتاكد من حصولك علي خدمه ممتازه'},
    {id: 1, title: 'من الاداره', date:'9/7/2020' , body: 'لقد قمت برحله السفاري يرجي التقييم وذلك للتاكد من حصولك علي خدمه ممتازه'},
    {id: 2, title: 'من الاداره', date:'9/7/2020' , body: 'لقد قمت برحله السفاري يرجي التقييم وذلك للتاكد من حصولك علي خدمه ممتازه'},
    {id: 3, title: 'من الاداره', date:'9/7/2020' , body: 'لقد قمت برحله السفاري يرجي التقييم وذلك للتاكد من حصولك علي خدمه ممتازه'},
    {id: 4, title: 'من الاداره', date:'9/7/2020' , body: 'لقد قمت برحله السفاري يرجي التقييم وذلك للتاكد من حصولك علي خدمه ممتازه'},
    {id: 5, title: 'من الاداره', date:'9/7/2020' , body: 'لقد قمت برحله السفاري يرجي التقييم وذلك للتاكد من حصولك علي خدمه ممتازه'},
    {id: 6, title: 'من الاداره', date:'9/7/2020' , body: 'لقد قمت برحله السفاري يرجي التقييم وذلك للتاكد من حصولك علي خدمه ممتازه'},
    {id: 7, title: 'من الاداره', date:'9/7/2020' , body: 'لقد قمت برحله السفاري يرجي التقييم وذلك للتاكد من حصولك علي خدمه ممتازه'},
];

function Notifications({navigation, route}) {

    function Item({ title , date , body , index}) {

        return (
            <TouchableOpacity key={'_' + index} style={{ borderRadius: 10,width: '100%',padding:15, height:140, justifyContent:'center',
                marginBottom:10, overflow: 'hidden',backgroundColor: index % 2 === 0 ? '#F1F0FE' : '#FEF0DF'}} onPress={() => navigation.navigate('rateService')}>
                <TouchableOpacity style={[styles.paddingVertical_5 , styles.paddingHorizontal_5, styles.Radius_50
                    , {backgroundColor: index % 2 === 0 ? COLORS.blue : COLORS.orange
                        , position:'absolute' , right:7 , bottom:10}]}>
                    <Icon type={'AntDesign'} name={'delete'} style={{fontSize: 18 , color:'#fff'}}/>
                </TouchableOpacity>
                <View style={{borderLeftWidth:4 , borderLeftColor:index % 2 === 0 ? COLORS.blue : COLORS.orange , paddingLeft:15}}>
                    <View style={[styles.directionRowSpace]}>
                        <Text style={[ styles.textBold, styles.text_black, styles.textSize_14]}>{ title.substr(0,30) }</Text>
                        <Text style={[ styles.textBold, styles.text_gray, styles.textSize_12]}>{ date }</Text>
                    </View>
                    <Text style={[ styles.textBold, styles.text_gray, styles.textSize_13]}>{ body }</Text>
                    <TouchableOpacity>
                        <Text style={[ styles.textBold, styles.text_orange , styles.textDecoration, styles.textSize_13]}>{ i18n.t('seeOffer') }</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <Container>
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

                <Content bounces={false} style={{ height: height*56/100, marginTop: 10, overflow: 'hidden', borderTopRightRadius: 50, }}>
                    <View style={{ width: '100%', padding: 15, borderTopRightRadius: 50, backgroundColor: '#fff' }}>
                        <FlatList
                            data={notifications}
                            renderItem={({ item , index}) => <Item
                                title={item.title}
                                index={index}
                                date={item.date}
                                body={item.body}
                                id={item.id}
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
