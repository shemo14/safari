import React, { useState , useEffect } from "react";
import {Text} from "react-native";
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import { Root } from 'native-base';
import MainRoot from './src/routes';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistedStore } from './src/store';
import './ReactotronConfig';
import images from './src/consts/images'
import { Notifications } from 'expo'

export default function App() {
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		if (Platform.OS === 'android') {
			Notifications.createChannelAndroidAsync('orders', {
				name: 'Chat messages',
				sound: true,
			});
		}

		if (Text.defaultProps == null) Text.defaultProps = {};
		Text.defaultProps.allowFontScaling = false;
		loadFont()
	}, []);

	async function loadFont() {
		await Font.loadAsync({
			Roboto			: require('native-base/Fonts/Roboto.ttf'),
			Roboto_medium	: require('native-base/Fonts/Roboto_medium.ttf'),
			VIP_cartoon     : require('./assets/fonts/VIP-cartoon-.otf'),
			ArbFONTS     	: require('./assets/fonts/ArbFONTS-Fairuz-Normal.otf'),
			ArbFONTSBold 	: require('./assets/fonts/ArbFONTS-Fairuz-Bold.otf'),
			...Ionicons.font,
		});

		await Asset.loadAsync(images);
		setIsReady(true);
	}

	if (!isReady) {
		return <AppLoading />;
	}

	return (
		<Provider store={store}>
			<PersistGate persistor={persistedStore}>
				<Root>
					<MainRoot />
				</Root>
			</PersistGate>
		</Provider>
  	);
}




// Keystore password: 0b5134d0129243eaa1e562e87574e327
// Key alias:         QG1fc2hhbXMvc2FmYXJ5
// Key password:      3ade4d7cff0a4bcf8b3d515953a3487c
