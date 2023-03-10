import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icons from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../style/color';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FontNames } from '../style/fonts';

const CheckBox = (props) => {

    const iconName = props.isChecked ?
        "square-o" : "check-square";

    const iconColor = props.isChecked ? Colors.Grey_B1 : Colors.LightGreen;
    const textColor = props.isChecked ? Colors.Black_18 : Colors.LightGreen
    return (
        <View style={styles.container}>
            <Pressable onPress={props.onPress}>
                <Icons
                    name={iconName}
                    size={30}
                    color={iconColor} />
            </Pressable>
            <Text style={[styles.title, { color: textColor }]}>{props.title}</Text>
        </View>
    )
}

export default CheckBox

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        //width: 150,
        marginTop: hp(2),
        marginHorizontal: wp(2)
    },
    title: {
        fontSize: 16,
        fontFamily: FontNames.PoppinsMedium,
        marginLeft: wp(4)
    },
})