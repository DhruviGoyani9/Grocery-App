import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Colors } from "../../style/color";
import { FontNames } from "../../style/fonts";
import { FontSize } from "../../style/fontSize";
import { GlobalStyles } from "../../style/globalStyles";

export const styles = StyleSheet.create({
    container: {
        //flex: 1,
        //...GlobalStyles.backgroundColor,

    },
    filterText: {
        fontFamily: FontNames.PoppinsBold,
        fontSize: FontSize.fontsize_20,
        marginLeft: wp(32),
        color: Colors.Black_18
    },
    filter_view: {
        backgroundColor: Colors.Grey_42,
        borderTopLeftRadius: wp(10),
        borderTopRightRadius: wp(10),
        width: wp(100),
        height: hp(90),
        marginTop: hp(4),

    },
    categories: {
        fontFamily: FontNames.PoppinsRegular,
        fontSize: FontSize.fontsize_24,
        marginLeft: wp(1),
        marginTop: hp(4),

        color: Colors.Black_18
    }
})