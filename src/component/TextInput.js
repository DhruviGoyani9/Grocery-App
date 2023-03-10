import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { heightPercentageToDP, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Colors } from '../style/color'
import Icons from 'react-native-vector-icons/FontAwesome';
import { FontSize } from '../style/fontSize';
import { GlobalStyles } from '../style/globalStyles';

const TextInputComponent = ({ placeholder, maxLength, onChangeText, value, secureTextEntry, name, width, onPress, keyboardType, color, autoCapitalize }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput maxLength={maxLength}
                keyboardType={keyboardType}
                style={styles.textinput}
                placeholder={placeholder}
                placeholderTextColor={Colors.DarkGrey}
                onChangeText={onChangeText}
                value={value}
                secureTextEntry={secureTextEntry}
                width={width}
                autoCapitalize='none'
            />
            <Icons
                name={name}
                size={20}
                color={color}
                onPress={onPress}
                style={{ right: wp(10) }} />
        </View>
    )
}

export default TextInputComponent

const styles = StyleSheet.create({
    textinput: {
        margin: wp(5),
        marginTop: heightPercentageToDP(1),
        backgroundColor: Colors.White,
        borderBottomWidth: 1,
        borderBottomColor: Colors.Grey,
        padding: wp(2),
        fontSize: FontSize.fontsize_16
    },
})