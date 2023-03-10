import { StyleSheet, TouchableOpacity, View, Text } from "react-native"
import { Colors } from "../style/color"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"
import { RFValue } from "react-native-responsive-fontsize"
import { FontSize } from "../style/fontSize"
import { FontNames } from "../style/fonts"

export const ReusableButton = ({ onPress, text, }) => {
    return (
        <View style={styles.button}>
            <TouchableOpacity
                onPress={onPress}
            >
                <Text style={styles.btntext}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create(
    {
        button: {
            backgroundColor: Colors.LightGreen,
            borderRadius: wp(4),
            width: wp(88),
            height: hp(7),
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: hp(2),
            //marginLeft: wp(5)
        },
        btntext: {
            fontFamily: FontNames.PoppinsRegular,
            color: Colors.btnTextColor,
            fontSize: FontSize.fontsize_16
        }
    }
)