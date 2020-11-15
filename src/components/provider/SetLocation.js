import React, { useState , useEffect, useRef } from "react";
import { View, Text, Image, TouchableOpacity, ImageBackground, ScrollView, I18nManager, Dimensions, ActivityIndicator } from "react-native";
import {Container, Button, Form, Input, Toast, Header, Right, Left, Body, Icon} from 'native-base'
import styles from '../../../assets/styles'
import i18n from "../../../locale/i18n";
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import COLORS from "../../consts/colors";
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

const width		 = Dimensions.get('window').width;
const height	 = Dimensions.get('window').height;

function SetLocation({navigation, route}) {

    const lang   							= useSelector(state => state.lang.lang);
    const routeName                         = route.params.routeName
    let mapRef 								= useRef(null);
    const [userLocation, setUserLocation]   = useState([]);
    const [initMap, setInitMap]   			= useState(true);
    const [search, setSearch]   			= useState('');
    const [searchResult, setSearchResult]   = useState([]);
    const [selectedLocation, setLocation]   = useState(null);
    const [searchHeight, setSearchHeight]   = useState(70);


    function navigateToTripService() {
        let latitude = '', longitude = '';

        if (selectedLocation){
            latitude  = selectedLocation.latitude;
            longitude = selectedLocation.longitude;
        } else{
            latitude  = userLocation.latitude;
            longitude = userLocation.longitude;
        }

        const coords = { latitude, longitude, address: (search).substr(0, 30) };
        navigation.navigate(routeName, { coords })
    }


    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission to access location was denied');
            }

            const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
            const location = { latitude, longitude };

            let endPoint = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
            endPoint    += latitude + ',' + longitude;
            endPoint    += '&key=AIzaSyCJTSwkdcdRpIXp2yG7DfSRKFWxKhQdYhQ&language=' + lang;

            try {
                const { data } = await axios.get(endPoint);
                console.log(data.results)
            } catch (e) {
                console.log(e);
            }

            try {
                const { data } = await axios.get(endPoint);
                setSearch((data.results[0].formatted_address).substr(0, 30));

            } catch (e) {
                console.log(e);
            }

            setUserLocation(location);

            setInitMap(false)
        })();
    }, []);

    function renderMarkers() {

        if (!selectedLocation){
            const { latitude, longitude } = userLocation;
            return (
                <MapView.Marker
                    title={i18n.t('currentLocation')}
                    style={{ width: 20, height: 20 }}
                    image={require('../../../assets/images/marker.png')}
                    coordinate={{ latitude, longitude }}
                />
            );
        }

    }

    async function onSearch() {
        let endPoint = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=';
        endPoint    += search;
        endPoint    += '&key=AIzaSyCJTSwkdcdRpIXp2yG7DfSRKFWxKhQdYhQ&language=' + lang;


        try {
            const { data } = await axios.get(endPoint);
            setSearchResult(data.results);
            setSearchHeight(270);
            console.log(data.results)
        } catch (e) {
            console.log(e);
        }
    }

    function setSelectedLocation(item) {
        const { geometry: { location } } = item;

        const formattedItem = {
            name: item.formatted_address,
            address:  item.formatted_address,
            latitude: location.lat,
            longitude: location.lng
        };

        setSearchResult([]);
        setSearchHeight(60);
        setLocation(formattedItem);
        setSearch(item.formatted_address);

        mapRef.current.animateToRegion(
            {
                latitude: formattedItem.latitude,
                longitude: formattedItem.longitude,
                latitudeDelta: 0.422,
                longitudeDelta: 0.121,
            },
            350
        );
    }

    async function _handleMapRegionChange(e){
        let formattedItem = {
            name: '',
            address:  '',
            latitude: e.latitude,
            longitude: e.longitude
        };

        let getCity = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
        getCity    += e.latitude + ',' + e.longitude;
        getCity    += '&key=AIzaSyCJTSwkdcdRpIXp2yG7DfSRKFWxKhQdYhQ&language=ar&sensor=true';

        try {
            const { data } = await axios.get(getCity);
            formattedItem = {
                name:       data.results[0].formatted_address,
                address:    data.results[0].formatted_address,
                latitude:   e.latitude,
                longitude:  e.longitude
            };

            setSearch(data.results[0].formatted_address)

        } catch (e) {
            console.log(e);
        }

        setLocation(formattedItem)
    }


    return (
        <Container>
            <ImageBackground source={require('../../../assets/images/menu_bg.png')} style={{ width, height, alignSelf: 'center', flexGrow: 1 }} resizeMode={'cover'}>
                <Header style={{ backgroundColor: 'transparent', marginTop: 10, borderBottomWidth: 0 }} noShadow>
                    <Right style={{ flex: 0, marginLeft: 10 }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 50, height: 50, justifyCenter: 'center', alignItems: 'center' }}>
                            <Image source={require('../../../assets/images/white_back.png')} style={{ width: 27, height: 27, marginTop: 10 }} resizeMode={'contain'}/>
                        </TouchableOpacity>
                    </Right>
                    <Body style={{ alignSelf: 'center', flex: 1 }}>
                    <Text style={{ textAlign: 'center', width: '100%', color: '#fff', fontSize: 30, fontFamily: 'VIP_cartoon' }}>{ i18n.t('safari') }</Text>
                    </Body>
                    <Left style={{ flex: 0.2 }} />
                </Header>
                <View contentContainerStyle={[styles.bgFullWidth ]}>
                    <View style={{ zIndex: 2, alignItems: 'center', height: searchHeight, position: 'absolute', width: '100%' }}>
                        <View style={styles.searchBox}>
                            <Icon type={'AntDesign'} name={'search1'} style={{ color: '#fff', fontSize: 20 }} />
                            <Input value={search} placeholder={i18n.t('search')} style={styles.searchInput} onChangeText={(search) => setSearch(search)} onSubmitEditing={() => onSearch()}/>
                            <TouchableOpacity onPress={() => onSearch()}>
                                <Icon type={'AntDesign'} name={ I18nManager.isRTL ? 'arrowleft' : 'arrowright'} style={{ color: '#fff', fontSize: 20 }} />
                            </TouchableOpacity>
                        </View>
                        {
                            searchResult && searchResult.length > 0 ?
                                searchResult.map((item, i) => (
                                    <View key={i} style={{ alignSelf: 'center', width: '90%', maxHeight: 200, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, overflow: 'hidden', position: 'absolute', zIndex: 2, top: 52, left: 18, minHeight: 60 }}>
                                        <View style={{ alignSelf: 'center', width: '100%', height: 220, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingBottom: 20, backgroundColor: '#fff', borderRadius: 10}}>
                                            <ScrollView style={{ zIndex: 99999999 }}>
                                                <TouchableOpacity onPress={() => setSelectedLocation(item)} style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ddd', marginHorizontal: 10, width: '95%', height: 50, alignItems: 'center', alignSelf: 'center', overflow: 'hidden', zIndex: 9999 }}>
                                                    <Icon type={'Entypo'} name={'location'} style={{ marginHorizontal: 10, color: '#000', fontSize: 16 }}/>
                                                    <Text style={[ styles.text_gray, styles.textBold, styles._alignText, ]}>{ (item.formatted_address).substr(0, 40) + '...' }</Text>
                                                </TouchableOpacity>
                                            </ScrollView>
                                        </View>
                                    </View>
                                )) : null
                        }
                    </View>

                    <View style={[styles.mapView, { marginTop: 20, overflow: 'hidden', bottom: -40, height: height*80/100 }]}>
                        {
                            initMap ?
                                <View style={[styles.loading, styles.flexCenter, {height:'100%'}]}>
                                    <ActivityIndicator size="large" color={COLORS.blue} style={{ alignSelf: 'center' }} />
                                </View> :
                                <MapView
                                    onRegionChangeComplete={(e) =>  _handleMapRegionChange(e)}
                                    ref={mapRef}
                                    style={{ width: '100%', height: '100%', flex: 1 }}
                                    initialRegion={{
                                        latitude:  userLocation.latitude,
                                        longitude: userLocation.longitude,
                                        latitudeDelta: 0.422,
                                        longitudeDelta: 0.121,
                                    }}
                                >
                                    { renderMarkers() }
                                </MapView>
                        }

                        {
                            selectedLocation ?
                                <View style={{ left: '50%', marginLeft: -24, marginTop: -48, position: 'absolute', top: '50%', zIndex: 9999999, width: 25, height: 25 }}>
                                    <Image style={{width: 25, height: 25}} resizeMode={'contain'} source={require('../../../assets/images/location.png')} />
                                </View> : null
                        }
                    </View>

                    <Button onPress={() => navigateToTripService()} style={[styles.blueBtn, styles.Width_80, styles.textCenter, { bottom: 80, alignSelf: 'center' }]}>
                        <Text style={[styles.textRegular , styles.text_White , styles.textSize_16, styles.textCenter]}>{ i18n.t('continue') }</Text>
                    </Button>
                </View>

            </ImageBackground>

        </Container>
    )
}

export default SetLocation;
