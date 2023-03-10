import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { styles } from './styles'
import PhoneInput from 'react-native-phone-number-input'
import { Divider } from "@react-native-material/core";
import Icons from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { Strings } from '../../utils/strings';
import { ImagePaths } from '../../utils/ImagePaths';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from '../../style/color';
import { AppScreens } from '../../navigation/AppScreens';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth, { firebase } from '@react-native-firebase/auth';

import {
    LoginManager,
    AccessToken,
} from 'react-native-fbsdk';


const SignInScreen = () => {

    const navigation = useNavigation();
    const [phoneNumber, setPhoneNumber] = useState(" ");
    const phoneInput = useRef(null);
    const [loggedIn, setloggedIn] = useState(false);
    // const [userInfo, setuserInfo] = useState([]);

    const SignInWithGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const { accessToken, idToken } = await GoogleSignin.signIn();
            // setloggedIn(true);
            const credential = auth.GoogleAuthProvider.credential(idToken, accessToken)
            await auth().signInWithCredential(credential)

            // setuserInfo(userInfo)
            // console.log({ firebaseUserCredential })
            // setloggedIn(true);
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                alert('Cancel');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                alert('Sign In Progress')
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                alert('Play Services not Available')
            }
            else {

            }
        }
        alert('Sign in Successfully')
        navigation.navigate(AppScreens.BottomTab)
    }

    useEffect(() => {
        GoogleSignin.configure({
            scopes: [],
            webClientId: '669604741129-bskj2v2bjninuua8ujanpnnsjcarh7o9.apps.googleusercontent.com',
            offlineAccess: true,
            hostedDomain: '',
            loginHint: '',
            forceConsentPrompt: true,
            accountName: '',
        })
        // getUserInfo()
    }, [])

    const LoginWithFacebook = () => {
        LoginManager.logInWithPermissions(['public_profile']).then(
            login => {
                if (login.isCancelled) {
                    alert('Login Canceleed')
                } else {
                    AccessToken.getCurrentAccessToken().then(data => {
                        const accessToken = data.accessToken.toString();
                        alert('login Successfully')
                        //getInfoFromToken(accessToken)
                        navigation.navigate(AppScreens.BottomTab)
                    })
                }
            },
            error => {
                console.log('log fai; with error ' + error)
            }
        )
    }

    const handleSendCode = async () => {
        console.log({ phoneInput })
        console.log({ phoneNumber })
        await firebase.auth().signInWithPhoneNumber(phoneNumber)
            .then(confirmResult => {

                // setConfirm(confirmResult)
                console.log({ confirmResult })
                navigation.navigate(AppScreens.VerificationScreen, { 'confirm': confirmResult, 'number': phoneNumber })
            })
            .catch(error => {
                alert(error)
            })
    }

    return (
        <View style={styles.container}>
            <Image
                source={ImagePaths.signInScreenImage}
                style={styles.image}
                resizeMode='cover' />
            <Text style={styles.getGroceryText}>{Strings.signInScreen.getGrocery}</Text>
            <View style={{ flexDirection: "row" }}>
                <PhoneInput
                    ref={phoneInput}
                    defaultValue={phoneNumber}
                    defaultCode="IN"
                    layout='first'
                    onChangeFormattedText={(text) => {
                        setPhoneNumber(text)
                    }}
                    withDarkTheme={false}
                    containerStyle={{ marginLeft: wp(2), }}
                    textContainerStyle={styles.phoneNumberView} />
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() =>
                        //phoneNumber.length === 10 ?
                        handleSendCode()
                        //  :
                        //Alert.alert('Please Enter Valid Mobile Number')
                    }
                >
                    <Text>Next</Text>
                </TouchableOpacity>
            </View>
            <Divider style={styles.divider}
                leadingInset={30}
                trailingInset={30}
            />
            <Text style={styles.socialMediaText}>{Strings.signInScreen.socialMedia}</Text>
            <View style={{ margin: wp(5), }}>
                <Icons.Button
                    style={styles.iconButton}
                    name='google'
                    backgroundColor={Colors.light_blue}
                    borderRadius={15}
                    iconStyle={{ marginRight: wp(7), marginVertical: wp(2), marginLeft: wp(7), }}
                    size={27}
                    onPress={SignInWithGoogle}>
                    <Text style={styles.btnText}>{Strings.signInScreen.countinueWithGoogle}</Text>
                </Icons.Button>
            </View>
            <View style={{ marginHorizontal: wp(5) }}>
                <Icons.Button
                    style={styles.iconButton}
                    name="facebook"
                    backgroundColor={Colors.dark_blue}
                    borderRadius={15}
                    onPress={LoginWithFacebook}
                    iconStyle={{ marginRight: wp(7), marginVertical: wp(2), marginLeft: wp(7), }}
                    size={27}>
                    <Text style={styles.btnText}>{Strings.signInScreen.continueWithFacebook}</Text>
                </Icons.Button>
            </View>
        </View>
    )
}

export default SignInScreen