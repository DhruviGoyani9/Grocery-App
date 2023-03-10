import { Platform, StyleSheet } from "react-native";
import { Colors } from "../../style/color";
import { FontNames } from "../../style/fonts";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FontSize } from "../../style/fontSize";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundimage: {
        flex: 1,
    },
    image: {
        width: wp(13),
        height: hp(8),
        top: Platform.OS === 'ios' ? hp(54) : hp(58),
        alignSelf: 'center'
    },
    welcometext: {
        top: Platform.OS === 'ios' ? hp(53) : hp(58),
        fontSize: FontSize.fontsize_40,
        fontFamily: FontNames.PoppinsRegular,
        fontWeight: '600',
        textAlign: "center",
        color: Colors.White,
    },
    text: {
        textAlign: 'center',
        top: Platform.OS === 'ios' ? hp(53) : hp(58),
        fontSize: FontSize.fontsize_13,
        fontFamily: FontNames.PoppinsMedium,
        color: Colors.LightGrey
    },
})

export { styles }