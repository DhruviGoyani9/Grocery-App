import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Colors } from "../../style/color";
import { FontNames } from "../../style/fonts";
import { FontSize } from "../../style/fontSize";
import { GlobalStyles } from "../../style/globalStyles";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...GlobalStyles.backgroundColor
    },
    image: {
        width: wp(20),
        height: hp(10)
    },
    row: {
        flexDirection: 'row',
        marginTop: hp(3),
        ...GlobalStyles.marginLeft
    },
    itemName: {
        fontFamily: FontNames.PoppinsBold,
        fontSize: FontSize.fontsize_16,
        marginLeft: wp(2),
        marginTop: hp(1),
        //height: hp(5),
        color: Colors.Black_18
    },
    itemQuantity: {
        color: Colors.DarkGrey,
        fontSize: FontSize.fontsize_14,
        fontFamily: FontNames.PoppinsMedium,
        marginLeft: wp(2),
        marginTop: hp(0.5)
    },
    item_price: {
        fontFamily: FontNames.PoppinsBold,
        fontSize: FontSize.fontsize_18,
        color: Colors.Black_18,
        marginBottom: hp(3),
        // marginLeft: wp(35),
        alignSelf: 'center',
        right: wp(13),
        position: 'absolute'
        //right: wp(20)

    },
})