import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    ImageBackground,
    Image,
    I18nManager, ScrollView, Dimensions
} from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
import {ImageBrowser} from 'expo-image-picker-multiple';
import COLORS from "../../consts/colors";
import i18n from "../../../locale/i18n";
import {Body, Container, Content, Header, Right, Left } from "native-base";
import styles from '../../../assets/styles'

const {width, height}	= Dimensions.get('window');


export default function ImageBrowserScreen({ navigation, route }) {

    const [photos, setPhotos]   = useState([])
    const { routeName }         = route.params;

    const imagesCallback = (callback) => {
        // navigation.setParams({ loading: true });
        callback.then(async (photos) => {
            const cPhotos = [];
            for(let photo of photos) {
                const pPhoto = await _processImageAsync(photo.uri);
                cPhotos.push({
                    uri: pPhoto.uri,
                    name: photo.filename,
                    type: 'image/jpg'
                })
            }
            setPhotos(cPhotos)
        }).catch((e) => console.log(e));
    };

    function navigateWithPhotos(){
        return navigation.navigate(routeName, {photos, pathName: 'imageBrowser'});
    }

    async function _processImageAsync(uri) {
        const file = await ImageManipulator.manipulateAsync(
            uri,
            [{resize: { width: 1000 }}],
            { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
        );
        return file;
    }

    function updateHandler (count, onSubmit) {
        navigation.setParams({
            headerTitle: `Selected ${count} files`,
            headerRight: onSubmit,
        });
    }

    const renderSelectedComponent = (number) => (
        <View style={{ backgroundColor: COLORS.blue, width: 25, height: 25, borderRadius: 13, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#fff', textAlign: 'center' }}>{number}</Text>
        </View>
    );

    const emptyStayComponent = <Text style={styles.emptyStay}>Empty =(</Text>;

    return (

        <Container>
            <ImageBackground source={require('../../../assets/images/bg.png')} style={{ width, height, alignSelf: 'center', flexGrow: 1 }} resizeMode={'cover'}>
                <Header style={{ backgroundColor: 'transparent', marginTop: 10, borderBottomWidth: 0 }} noShadow>
                    <Right style={[styles.directionRowCenter , { flex: 0}]}>
                        <TouchableOpacity onPress={() => navigation.navigate(routeName, {photos: [], pathName: 'imageBrowser'})} style={{ width: 50, height: 50, justifyCenter: 'center', alignItems: 'center' }}>
                            <Image source={require('../../../assets/images/white_back.png')} style={[ styles.transform , { width: 23, height: 23, marginTop: 10 }]} resizeMode={'contain'}/>
                        </TouchableOpacity>
                        <Text style={{ textAlign:  I18nManager.isRTL ? 'right' : 'left', color: '#fff', fontSize: 16, fontFamily: 'ArbFONTSBold', marginBottom: 5 }}>{ i18n.t('back') }</Text>
                    </Right>
                    <Body style={{ alignSelf: 'flex-start'}} />
                    <Left style={[styles.directionRowCenter , { flex: 0, marginHorizontal: 20}]}>
                        <TouchableOpacity title={'Done'} onPress={() => navigateWithPhotos()}>
                            <Text  style={{textAlign:  I18nManager.isRTL ? 'right' : 'left', color: '#fff', fontSize: 16, fontFamily: 'ArbFONTSBold', marginBottom: 5}}>{i18n.t('done')}</Text>
                        </TouchableOpacity>
                    </Left>
                </Header>

                <View contentContainerStyle={[styles.bgFullWidth]}>
                    <View style={{ width: '100%', height:'100%', padding: 15, borderTopRightRadius: 50, backgroundColor: '#fff' }}>
                        <ScrollView>
                            <ImageBrowser
                                max={4}
                                onChange={updateHandler}
                                callback={imagesCallback}
                                renderSelectedComponent={renderSelectedComponent}
                                emptyStayComponent={emptyStayComponent}
                            />
                        </ScrollView>
                    </View>
                </View>
            </ImageBackground>
        </Container>


        // <View style={[styles.flex, styles.container]}>
        //     <View style={{ backgroundColor: COLORS.blue, width: '100%', height: 60, top: 0, flexDirection: 'row', justifyContent: 'space-between', padding: 15, paddingTop: 20, alignItems: 'center' }}>
        //         <TouchableOpacity onPress={() => navigation.goBack()}>
        //             <Text style={[styles_.textRegular , styles_.text_White , styles_.textSize_16]}>{ i18n.t('back') }</Text>
        //         </TouchableOpacity>
        //         <TouchableOpacity title={'Done'} onPress={() => navigateWithPhotos()}>
        //             <Text style={[styles_.textRegular , styles_.text_White , styles_.textSize_16]}>{ i18n.t('done') }</Text>
        //         </TouchableOpacity>
        //     </View>
        //
        // </View>
    );
}

//
// const styles = StyleSheet.create({
//     flex: {
//         flex: 1
//     },
//     container: {
//         position: 'relative'
//     },
//     emptyStay:{
//         textAlign: 'center',
//     },
//     countBadge: {
//         paddingHorizontal: 8.6,
//         paddingVertical: 5,
//         borderRadius: 50,
//         position: 'absolute',
//         right: 3,
//         bottom: 3,
//         justifyContent: 'center',
//         backgroundColor: COLORS.blue
//     },
//     countBadgeText: {
//         fontWeight: 'bold',
//         alignSelf: 'center',
//         padding: 'auto',
//         color: '#ffffff'
//     }
// });