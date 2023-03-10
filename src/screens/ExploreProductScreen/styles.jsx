import { StyleSheet } from "react-native";
import { Colors } from "../../style/color";
import { FontNames } from "../../style/fonts";
import { FontSize } from "../../style/fontSize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { GlobalStyles } from "../../style/globalStyles";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...GlobalStyles.marginLeft,
        marginRight: wp(5)
    },
    findproducts: {
        fontFamily: FontNames.PoppinsBold,
        fontSize: FontSize.fontsize_20,
        color: Colors.Black_18,
        textAlign: 'center'
    },
    products: {
        width: wp(42),
        height: hp(25),
        borderRadius: wp(4),
        margin: wp(2),
        alignItems: 'center',
        borderWidth: 1,

    },
    productImage: {
        height: hp(15),
        width: wp(30),
        marginLeft: wp(2),
    },
    productText: {
        fontFamily: FontNames.PoppinsBold,
        fontSize: FontSize.fontsize_16,
        textAlign: 'center'
    }
})