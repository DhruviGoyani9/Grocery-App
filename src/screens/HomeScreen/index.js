import { Alert, FlatList, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ImagePaths } from '../../utils/ImagePaths'
import { styles } from './styles'
import { Strings } from '../../utils/strings'
import { GlobalStyles } from '../../style/globalStyles'
import { Colors } from '../../style/color'
import SwiperComponent from '../../component/Swiper'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Card from '../../component/Card'
import { BestSellingItems, FruitsItems, Groceries, NonVegItems } from '../../component/data'
import SearchTextInput from '../../component/SearchTextInput'
import { useNavigation, } from '@react-navigation/native'
import { AppScreens } from '../../navigation/AppScreens'
import { FontSize } from '../../style/fontSize'
import { ReusableButton } from '../../component/Button'
import messaging from '@react-native-firebase/messaging'
import PushNotification from 'react-native-push-notification'
import NotificationController from '../NotificationController'
import { LocalNotification } from '../LocalPushController'
import RemotePushController from '../RemotePushController'
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const Header = ({ title }) => {
    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: wp(95), marginVertical: hp(1) }}>
                <Text style={styles.exclusiveOffer}>{title}</Text>
                <TouchableOpacity>
                    <Text style={[styles.exclusiveOffer, { color: Colors.LightGreen, }]}>{Strings.HomeScreen.seeAll}</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const CardComponent = ({ Items }) => {
    return (
        <Card Items={Items} isHorizontal={true} width={wp(40)} buttonLeftPosition={wp(23)} />
    )
}

const HomeScreen = () => {
    console.log(FruitsItems)
    const navigation = useNavigation();

    // useEffect(() => {
    //     navigation.addListener('beforeRemove', (e) => {
    //         e.preventDefault();
    //     })
    // }, [navigation]

    // )

    // navigation.dispatch(AppScreens.SignUpScreen)

    useEffect(() => {
        messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log('Message handled in the background! ', remoteMessage)
        })
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            console.log(remoteMessage)
            PushNotification.localNotification({
                message: remoteMessage.notification.body,
                title: remoteMessage.notification.title,
                channelId: 'channel-id-1'
            })
        })
        return unsubscribe
    })

    const checkToken = async () => {

        const fcmToken = await messaging().getToken()
        console.log("kcv ", fcmToken)
        if (!fcmToken) {
            console.log({ fcmToken })
            alert({ fcmToken })
        }
    }
    const handleButtonPress = () => {
        LocalNotification();
    }

    return (

        <SafeAreaView style={{ ...GlobalStyles.backgroundColor, flex: 1 }}>
            <RemotePushController />
            {/* <NotificationController /> */}
            <View style={styles.container}>
                <Image
                    style={styles.red_carret_image}
                    source={ImagePaths.red_carret}
                    resizeMode={'contain'}
                />

                <View style={{ flexDirection: 'row' }}>
                    <Image
                        style={styles.location_symbol}
                        source={ImagePaths.location_symbol}
                        resizeMode={'contain'}
                    />
                    <Text style={styles.city}>{Strings.HomeScreen.city}</Text>
                </View>
                <SearchTextInput />
                <ScrollView
                    bounces={true}
                    showsVerticalScrollIndicator={false}
                    style={{ marginTop: hp(2) }}
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: hp(20), }}>

                    <SwiperComponent
                        height={hp(15)}
                        image1={ImagePaths.image1_pagecontroller}
                        image2={ImagePaths.image2_pagecontroller}
                        image3={ImagePaths.image3_pagecontroller}
                        imageHeight={hp(14)}
                        resizeMode={'stretch'} />

                    <Header title={Strings.HomeScreen.exclusiveOffer} />
                    <CardComponent Items={FruitsItems} />
                    <Header title={Strings.HomeScreen.best_selling} />
                    <CardComponent Items={BestSellingItems} />
                    <Header title={Strings.HomeScreen.groceries} />
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        data={Groceries}
                        renderItem={({ item }) =>
                            <TouchableOpacity onPress={() => navigation.navigate(AppScreens.ApiCallUsingFetch)}>
                                <View style={[styles.groceries, { backgroundColor: item.color, }]}>
                                    <Image
                                        resizeMode='contain'
                                        style={styles.groceryImage}
                                        source={item.image}
                                    />
                                    <Text style={styles.groceryText}>{item.itemText}</Text>
                                </View>
                            </TouchableOpacity>
                        }
                    />
                    <CardComponent Items={NonVegItems} />
                    <TouchableOpacity
                        onPress={() => { navigation.navigate(AppScreens.ReduxDemo) }}>
                        <Text style={{ textAlign: 'center', fontSize: FontSize.fontsize_14, color: Colors.LightGreen }}>Redux Demo</Text>
                    </TouchableOpacity>

                    <ReusableButton
                        onPress={() => navigation.navigate(AppScreens.ApiCallUsingRedux)}
                        text={'Get Data'}
                    />

                    <ReusableButton
                        onPress={() => navigation.navigate(AppScreens.ReduxToolkit)}
                        text={'Redux Toolkit Demo'}
                    />
                    <ReusableButton
                        onPress={() => navigation.navigate(AppScreens.ApiCallUsingReduxToolkit)}
                        text={'Api Call Using toolkit'}
                    />
                    <ReusableButton
                        onPress={() => navigation.navigate(AppScreens.FirebaseDemo)}
                        text={'FireBase RealTime Database'}
                    />
                    <ReusableButton
                        onPress={() => navigation.navigate(AppScreens.CloudFireStore)}
                        text={'FireStore Demo'}
                    />
                    <ReusableButton
                        onPress={() => navigation.navigate(AppScreens.CloudStorage)}
                        text={'Cloud Storage'}
                    />
                    <ReusableButton
                        onPress={() => navigation.navigate('Notification')}
                        text={'Push Notification'}
                    />
                    <ReusableButton
                        onPress={handleButtonPress}
                        text={'Local Notification'}
                    />
                </ScrollView>
            </View>
            {/* <PushController /> */}
        </SafeAreaView >
    )
}

export default HomeScreen
