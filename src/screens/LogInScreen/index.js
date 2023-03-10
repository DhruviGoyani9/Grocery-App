import { Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { styles } from './styles'
import { ImagePaths } from '../../utils/ImagePaths'
import { Strings } from '../../utils/strings'
import { useState } from 'react'
import { TextInput } from '@react-native-material/core'
import Icons from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../style/color'
import { ReusableButton } from '../../component/Button'
import { heightPercentageToDP as hp, widthPercentageToDP } from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native'
import { AppScreens } from '../../navigation/AppScreens'
import { GlobalStyles } from '../../style/globalStyles'
import TextInputComponent from '../../component/TextInput'
import auth from "@react-native-firebase/auth";

const LogInScreen = () => {

    const [emailValue, onSetEmailValue] = useState();
    const [emailValidError, setEmailValidError] = useState('');
    const [passwordValue, onSetPasswordValue] = useState();
    const [isPasswordSecure, setIsPasswordSecure] = useState(true);
    const navigation = useNavigation();

    const isValidEmail = val => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

        if (val.length === 0) {
            setEmailValidError('Please Enter Valid Email Address');
        } else if (reg.test(val) === false) {
            setEmailValidError('enter valid email Address');
        } else if (reg.test(val) === true) {
            setEmailValidError('');
        }
    }
    const checkEmptyValidation = () => {

        if (!emailValue) {
            Alert.alert('Please Enter Email');
            return;
        }
        if (!passwordValue) {
            Alert.alert('Please Enter Password');
            return;
        }
        auth().signInWithEmailAndPassword(emailValue, passwordValue)
            .then((user) => {
                console.log(user);
                if (user)
                    navigation.navigate(AppScreens.BottomTab)

            })
            .catch((error) => {
                console.log({ error })
                if (error.code === "auth/invalid-email")
                    alert('invalid email')
                else if (error.code === 'auth/user-not-found')
                    alert("User Not Found")
                else
                    alert("Please Check Your Email Id and Password")
            })
    }

    // useEffect(() => {
    //     navigation.addListener('beforeRemove', (e) => {
    //         e.preventDefault();
    //     })
    // }, [navigation]

    // )

    return (


        <View style={styles.container}>
            <Image
                source={ImagePaths.red_carret}
                resizeMode={'contain'}
                style={GlobalStyles.redCarretImage} />
            <Text style={styles.logingtext}>{Strings.loginScreen.loging}</Text>
            <Text style={GlobalStyles.enterEmail}>{Strings.loginScreen.enter}</Text>
            <Text style={GlobalStyles.enterEmail}>{Strings.loginScreen.email}</Text>
            {/* <TextInput
                style={styles.textInput}
                value={emailValue}
                onChangeText={value => {
                    onSetEmailValue(value);
                    isValidEmail(value);
                }}
            /> */}
            <TextInputComponent
                placeholder={'Please Enter Email Address'}
                value={emailValue}
                width={widthPercentageToDP(85)}
                onChangeText={value => {
                    onSetEmailValue(value);
                    isValidEmail(value);
                }} />
            {emailValidError ? <Text style={styles.emailError}>{emailValidError}</Text> : null}
            <Text style={GlobalStyles.enterEmail}>{Strings.loginScreen.password}</Text>
            <TextInputComponent
                placeholder={'Please Enter Password'}
                value={passwordValue}
                width={widthPercentageToDP(85)}
                onChangeText={onSetPasswordValue}
                secureTextEntry={isPasswordSecure}
                name={isPasswordSecure ? 'eye-slash' : 'eye'}
                onPress={() => { isPasswordSecure ? setIsPasswordSecure(false) : setIsPasswordSecure(true) }}
                color={Colors.DarkGrey}

            />
            {/* <TextInput
                style={styles.textInput}
                value={passwordValue}
                onChangeText={onSetPasswordValue}
                secureTextEntry={isPasswordSecure}
                trailing={
                    <Icons
                        name={isPasswordSecure ? 'eye-slash' : 'eye'}
                        size={20}
                        color={Colors.DarkGrey}
                        onPress={() => { isPasswordSecure ? setIsPasswordSecure(false) : setIsPasswordSecure(true) }} />}
            /> */}
            <TouchableOpacity>
                <Text style={styles.forgotPassword}>{Strings.loginScreen.forgotPassword}</Text>
            </TouchableOpacity>
            <ReusableButton onPress={checkEmptyValidation} text={Strings.loginScreen.logIn} />
            <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: hp(2) }}>
                <Text style={[styles.signupText, { color: Colors.Black_18 }]}>{Strings.loginScreen.dontHaveAccount}</Text>
                <TouchableOpacity onPress={() => navigation.navigate(AppScreens.SignUpScreen)}>
                    <Text style={styles.signupText}>{Strings.loginScreen.singUp}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LogInScreen

