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
    Share, ActivityIndicator,
} from "react-native";
import {Container, Header, Right, Body, Icon, Content } from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import COLORS from "../consts/colors";
import {useDispatch, useSelector} from "react-redux";
import {getSearch} from '../actions';
import * as Animatable from "react-native-animatable";
import Item from './Item'

const width	 		= Dimensions.get('window').width;
const height 		= Dimensions.get('window').height;
const isIOS  		= Platform.OS === 'ios';
const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';


function SearchResults({navigation, route}) {
    const keyword = route.params.keyword;

    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const search = useSelector(state => state.search.search);
    const searchLoader = useSelector(state => state.search.loader);
    const [screenLoader , setScreenLoader ] = useState(true);

    const dispatch = useDispatch();

    function fetchData(){
        setScreenLoader(true)
        dispatch(getSearch(lang , keyword, token))
    }

    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation , searchLoader]);

    useEffect(() => {
        setScreenLoader(false)
    }, [search]);

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


    return (
        <Container>
            {renderLoader()}
            <ImageBackground source={require('../../assets/images/bg.png')} style={{ width, height: height-100, alignSelf: 'center', flexGrow: 1 }} resizeMode={'cover'}>
                <Header style={{ backgroundColor: 'transparent',  borderBottomWidth: 0 }} noShadow>
                    <Right style={{ flex: 0, marginLeft: 10 }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 50, height: 50, justifyCenter: 'center', alignItems: 'center' }}>
                            <Image source={require('../../assets/images/white_back.png')} style={[ styles.transform , { width: 27, height: 27, marginTop: 10 }]} resizeMode={'contain'}/>
                        </TouchableOpacity>
                        <Text style={{ textAlign:  I18nManager.isRTL ? 'right' : 'left', color: '#fff', fontSize: 22, fontFamily: 'ArbFONTSBold', marginBottom: 5 }}>{ i18n.t('services') }</Text>
                    </Right>
                    <Body style={{ alignSelf: 'flex-start'}} />
                </Header>

                <Content contentContainerStyle={[styles.bgFullWidth]} bounces={false} style={{height:'100%', marginTop: 10, overflow: 'hidden', borderTopRightRadius: 50, }}>
                    <View style={{ width: '100%' , height:'100%', padding: 15, borderTopRightRadius: 50, backgroundColor: '#fff' }}>
                        <FlatList
                            data={search}
                            renderItem={({ item , index}) => <Item
                                name={item.name}
                                index={index}
                                image={item.image}
                                price={item.price}
                                id={item.id}
                                isFav={item.isFav}
                                navigation={navigation}
                                item={item}
                            />}
                            keyExtractor={item => item.id}
                            numColumns={2}
                            horizontal={false}
                            columnWrapperStyle={[styles.directionRowCenter]}
                            // extraData={isFav}
                        />
                    </View>
                </Content>
            </ImageBackground>
        </Container>
    )
}

export default SearchResults;
