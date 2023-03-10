import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icons from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../style/color';
import { Strings } from '../utils/strings';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FontNames } from '../style/fonts';
import { FontSize } from '../style/fontSize';
import { ImagePaths } from '../utils/ImagePaths';



const SearchTextInput = ({ onChangeText, onPress }) => {

    const [textInputFocused, setTextInputFocused] = useState(false);
    return (
        <View style={styles.searchview} onPress={onPress}>
            <Icons
                name='search'
                size={20}
                color={Colors.Black_1B}
                style={styles.searchIcon} />
            <TextInput
                placeholder={Strings.HomeScreen.searchStore}
                onChangeText={onChangeText}
                style={styles.searchStore}
                clearButtonMode='always'
                onFocus={() => {
                    setTextInputFocused(true);
                }}
            />
        </View>
    )
}

export default SearchTextInput

const styles = StyleSheet.create({
    searchview: {
        marginTop: wp(5),
        backgroundColor: Colors.Grey_42,
        width: wp(90),
        //height: hp(8),
        borderRadius: wp(5),
        flexDirection: 'row',
        alignItems: 'center',
        // ...GlobalStyles.marginLeft
    },
    searchIcon: {
        margin: wp(5)
    },
    searchStore: {
        color: Colors.DarkGrey,
        fontFamily: FontNames.PoppinsRegular,
        fontWeight: '600',
        fontSize: FontSize.fontsize_14,
        width: wp(72)
    },
    searchBar__unclicked: {
        padding: 10,
        flexDirection: "row",
        width: "95%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
    },
    searchBar__clicked: {
        padding: 10,
        flexDirection: "row",
        width: "80%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "space-evenly",
    },
})