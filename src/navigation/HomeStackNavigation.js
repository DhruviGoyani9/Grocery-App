import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppScreens } from './AppScreens';
import HomeScreen from '../screens/HomeScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import { Colors } from '../style/color';
import { ImagePaths } from '../utils/ImagePaths';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getFocusedRouteNameFromRoute, useNavigation } from '@react-navigation/native';
import Icons from 'react-native-vector-icons/FontAwesome';
import ApiCallUsingFetch from '../screens/ApiCallUsingFetch';
import Pagination from '../screens/Pagination';
import ReduxDemo from '../screens/ReduxDemo';
import ApiCallUsingRedux from '../screens/ApiCallUsingRedux';
import ReduxToolkit from '../screens/ReduxToolkit';
import ApiCallUsingReduxToolkit from '../screens/ApiCallUsingReduxToolkit';
import FirebaseDemo from '../screens/FirebaseDemo';
import CloudFireStore from '../screens/CloudFireStore';
import CloudStorage from '../screens/CloudStorage';

const HomeStack = createNativeStackNavigator();

const HomeStackNavigation = ({ navigation, route }) => {
    useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === AppScreens.ProductDetailScreen) {
            navigation.setOptions({ tabBarStyle: { display: 'none', } })
        } else {
            navigation.setOptions({
                tabBarStyle: {
                    display: 'flex', height: hp(11),
                    backgroundColor: Colors.White,
                    shadowColor: Colors.Grey,
                    shadowOpacity: 0.5,
                    shadowRadius: 3,
                    padding: wp(3),
                    borderTopLeftRadius: hp(3),
                    borderTopRightRadius: hp(3),
                    //drawerLockMode: "locked-closed",

                }
            })
        }
    }, [navigation, route])

    //const navigation = useNavigation();

    return (

        <HomeStack.Navigator initialRouteName={AppScreens.HomeScreen}
            screenOptions={{ headerShown: false }}>
            <HomeStack.Screen
                name={AppScreens.HomeScreen}
                component={HomeScreen}
            />
            <HomeStack.Screen
                name={AppScreens.ProductDetailScreen}
                component={ProductDetailScreen}
                options={{
                    headerShown: true,
                    headerBackTitleVisible: false,
                    title: '',
                    headerShadowVisible: false,
                    headerTintColor: Colors.Black,
                    headerLeft: () => (
                        <Icons
                            name='angle-left'
                            size={35}
                            onPress={() => navigation.navigate(AppScreens.HomeScreen)} />
                    ),
                    headerRight: () => (
                        <TouchableOpacity>
                            <Image
                                source={ImagePaths.share_icon}
                                style={{ width: wp(6), height: hp(3) }}
                                resizeMode='contain' />
                        </TouchableOpacity>
                    ),
                }} />
            <HomeStack.Screen
                name={AppScreens.ApiCallUsingFetch}
                component={ApiCallUsingFetch}
                options={{
                    headerShown: true,
                    headerBackTitleVisible: false,
                    title: '',
                    headerShadowVisible: false,
                    headerTintColor: Colors.Black,
                    headerLeft: () => (
                        <Icons
                            name='angle-left'
                            size={35}
                            onPress={() => navigation.navigate(AppScreens.HomeScreen)} />
                    ),
                }}
            />
            <HomeStack.Screen
                name={AppScreens.Pagination}
                component={Pagination}
                options={{
                    headerShown: true,
                    headerBackTitleVisible: false,
                    //title: '',
                    headerShadowVisible: false,
                    headerTintColor: Colors.Black,
                    headerLeft: () => (
                        <Icons
                            name='angle-left'
                            size={35}
                            onPress={() => navigation.navigate(AppScreens.ApiCallUsingFetch)} />
                    ),
                }}
            />
            <HomeStack.Screen
                name={AppScreens.ReduxDemo}
                component={ReduxDemo}
                options={{
                    headerShown: true,
                    headerBackTitleVisible: false,
                    //title: '',
                    headerShadowVisible: false,
                    headerTintColor: Colors.Black,
                    headerLeft: () => (
                        <Icons
                            name='angle-left'
                            size={35}
                            onPress={() => navigation.navigate(AppScreens.HomeScreen)} />
                    ),
                }}
            />
            <HomeStack.Screen
                name={AppScreens.ApiCallUsingRedux}
                component={ApiCallUsingRedux}
            />
            <HomeStack.Screen
                name={AppScreens.ReduxToolkit}
                component={ReduxToolkit}
            />
            <HomeStack.Screen
                name={AppScreens.ApiCallUsingReduxToolkit}
                component={ApiCallUsingReduxToolkit}
            />
            <HomeStack.Screen
                name={AppScreens.FirebaseDemo}
                component={FirebaseDemo}
            />
            <HomeStack.Screen
                name={AppScreens.CloudFireStore}
                component={CloudFireStore}
            />
            <HomeStack.Screen
                name={AppScreens.CloudStorage}
                component={CloudStorage}
            />
        </HomeStack.Navigator>

    )
}

export default HomeStackNavigation

const styles = StyleSheet.create({})