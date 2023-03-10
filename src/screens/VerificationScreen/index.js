import { Text, TouchableOpacity, View, TextInput, KeyboardAvoidingView, Image, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { styles } from './styles'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../style/color';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ImagePaths } from '../../utils/ImagePaths';
import { Strings } from '../../utils/strings';
import { AppScreens } from '../../navigation/AppScreens';
import TextInputComponent from '../../component/TextInput';

const VerificationScreen = () => {

    otpInput = useRef(null);
    const navigation = useNavigation();
    // const [verificationCode, setVerificationCode] = useState();
    const [verificationCode, setVerificationCode] = useState('');
    const [userId, setUserId] = useState('')
    const [confirm, setConfirm] = useState(null);
    const route = useRoute();

    const checkEmptyValidation = () => {
        if (!verificationCode) {
            Alert.alert('Please Enter Verification Code')
            return;
        }
        if (verificationCode.length !== 4) {
            Alert.alert('Please Enter code')
            return;
        }
        navigation.navigate(AppScreens.SelectLocationScreen)
    }

    useEffect(() => {
        const confirm = route.params.confirm;
        const number = route.params.number;

        setConfirm(confirm)
    })

    const handleVerifyCode = async () => {
        if (verificationCode.length == 6) {
            await confirm.confirm(verificationCode)
                .then(user => {
                    console.log({ user })
                    setUserId(user.uid)
                    alert(`Verified ${userId}`)
                    navigation.navigate(AppScreens.SelectLocationScreen)
                })
                .catch(error => {
                    alert(error.message)
                })
        } else {
            alert('please Enter 6 Digit OTP Code.')
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{Strings.verificationScreen.enterCode}</Text>
            <Text style={styles.codeText}>{Strings.verificationScreen.code}</Text>

            <TextInputComponent
                placeholder={'- - - - - -'}
                maxLength={6}
                value={verificationCode}
                onChangeText={value => {
                    setVerificationCode(value)
                }}
                width={wp(85)}
                keyboardType={'numeric'} />
            <KeyboardAvoidingView
                behavior='position'
                style={{ flex: 1 }}
                keyboardVerticalOffset={10}>
                <View style={{ flexDirection: 'row', top: hp(48), alignItems: 'center', justifyContent: 'space-between', }}>
                    <TouchableOpacity>
                        <Text style={styles.resendText}>{Strings.verificationScreen.resendCode}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.nextButton} onPress={() =>
                        // checkEmptyValidation
                        handleVerifyCode()
                    }>
                        <Image source={ImagePaths.next} resizeMode='contain' style={{ width: 20, height: 20 }} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default VerificationScreen

