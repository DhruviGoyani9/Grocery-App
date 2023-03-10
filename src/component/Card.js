import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontSize } from '../style/fontSize'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Icons from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../style/color';
import { FontNames } from '../style/fonts';
import { useNavigation } from '@react-navigation/native';
import { AppScreens } from '../navigation/AppScreens';

const Card = ({ Items, isHorizontal, width, buttonLeftPosition }) => {


    const getProductDetails = (item) => {
        console.log(item)
        navigation.navigate(AppScreens.ProductDetailScreen, { item: item })
    }
    const navigation = useNavigation();

    return (
        <View>
            <FlatList
                data={Items}
                renderItem={({ item }) =>
                    <TouchableOpacity
                        onPress={() => getProductDetails(item)}
                    >
                        <View style={[styles.FruitsCard, { width: width }]}>
                            <Image
                                style={styles.fruitImage}
                                source={item.image}
                                resizeMode={'contain'}
                            />
                            <Text style={styles.fruitName}>{item.itemName}</Text>
                            <Text style={styles.fruitPCS}>{item.itemQuantity}</Text>
                            <View style={{ position: 'absolute', top: hp(22) }}>
                                <Text style={[styles.fruitName, { fontSize: FontSize.fontsize_14, position: 'absolute', top: hp(1) }]}>${item.itemPrice}</Text>
                                <TouchableOpacity
                                >
                                    <View style={[styles.addButton, { left: buttonLeftPosition }]}>
                                        <Icons name='plus' color={Colors.White} size={22} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>

                }
                horizontal={isHorizontal}
                numColumns={isHorizontal ? 0 : 2}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}

            />
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    FruitsCard: {
        //width: wp(40),
        height: hp(30),
        backgroundColor: Colors.White,
        borderColor: Colors.Grey,
        borderWidth: 2,
        borderRadius: wp(4),
        margin: wp(2),
    },
    fruitImage: {
        width: wp(20),
        height: hp(11),
        alignSelf: 'center',
        marginTop: hp(1)
    },
    fruitName: {
        fontFamily: FontNames.PoppinsBold,
        fontSize: FontSize.fontsize_12,
        marginLeft: wp(2),
        marginTop: hp(1),
        //height: hp(5),
        color: Colors.Black_18
    },
    fruitPCS: {
        color: Colors.DarkGrey,
        fontSize: FontSize.fontsize_11,
        fontFamily: FontNames.PoppinsMedium,
        marginLeft: wp(2),
        marginTop: hp(1)
    },
    addButton: {
        width: wp(14),
        height: hp(6.5),
        backgroundColor: Colors.LightGreen,
        borderRadius: wp(5),
        marginRight: wp(2),
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        //left: wp(23)
    }
})