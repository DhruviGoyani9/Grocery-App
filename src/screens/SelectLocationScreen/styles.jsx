import { StyleSheet } from "react-native";
import { Colors } from "../../style/color";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { FontNames } from "../../style/fonts";
import { FontSize } from "../../style/fontSize";
import { GlobalStyles } from "../../style/globalStyles";

const styles = StyleSheet.create({
    container: {
        ...GlobalStyles.backgroundColor,
        flex: 1,
        alignItems: 'center'
    },
    selectLocationText: {
        fontFamily: FontNames.PoppinsMedium,
        fontSize: FontSize.fontsize_23,
        marginTop: wp(7),
        color: Colors.Black_18,
    },
    text: {
        textAlign: 'center',
        fontSize: FontSize.fontsize_13,
        color: Colors.DarkGrey,
        fontFamily: FontNames.PoppinsMedium,
        marginVertical: wp(3)
    },
    yourAreaText: {
        color: Colors.DarkGrey,
        fontFamily: FontNames.PoppinsRegular,
        fontSize: FontSize.fontsize_14,
        marginLeft: wp(7),
        marginTop: hp(2)
    },
    dropdown: {
        ...GlobalStyles.marginLeft,
        marginVertical: wp(3),
        height: 50,
        backgroundColor: Colors.White,
        padding: 10,
        borderRadius: 12,
        borderBottomColor: Colors.Grey,
        borderBottomWidth: 2,
        width: wp(90)
    },
    selectedTextStyle: {
        fontFamily: FontNames.PoppinsRegular,
        color: Colors.Black
    },
    placeholderTextStyle: {
        fontFamily: FontNames.PoppinsRegular,
        color: Colors.DarkGrey
    }
});

export { styles }