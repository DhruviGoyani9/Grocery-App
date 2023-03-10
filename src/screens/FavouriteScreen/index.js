import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import { ImagePaths } from '../../utils/ImagePaths'
import { Strings } from '../../utils/strings'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AsyncKeys } from '../../utils/AsyncKeys'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Colors } from '../../style/color'
import { ReusableButton } from '../../component/Button'
import Icons from 'react-native-vector-icons/FontAwesome';

const FavouriteScreen = () => {

    const [favourite, setFavourite] = useState([]);

    //const [cart, setCart] = useState([])

    useEffect(() => {
        AsyncStorage.getItem(AsyncKeys.FavouriteItem).then((cart) => {
            if (cart != null) {
                const cartProduct = JSON.parse(cart)
                setFavourite(cartProduct)
            }
        }).catch((error) => {
            alert(error)
        })
    })

    return (
        <View style={styles.container}>
            {/* <Text>{JSON.stringify(favourite)}</Text> */}
            <FlatList
                data={favourite}
                renderItem={({ item, index }) =>

                    <View style={styles.row}>
                        <Image
                            resizeMode='contain'
                            source={item.image}
                            style={styles.image}
                        />
                        <View>
                            <Text style={styles.itemName}>{item.itemName}</Text>
                            <Text style={styles.itemQuantity}>{item.itemQuantity}</Text>
                        </View>
                        <Text style={styles.item_price}>${item.itemPrice}</Text>
                        <Icons
                            name='chevron-right'
                            size={20}
                            style={{ right: wp(5), position: 'absolute', alignSelf: 'center' }} />
                    </View>
                }
                ItemSeparatorComponent={() => (
                    <View style={{ height: 0.5, width: wp(90), backgroundColor: Colors.Grey, alignSelf: 'center', marginVertical: hp(1) }} />
                )}
                showsVerticalScrollIndicator={false}
            />
            <View style={{ marginBottom: hp(2) }}>
                <ReusableButton text={Strings.favourite.add_all_to_cart} onPress={() => alert('Add all to cart')} />
            </View>
        </View>
    )
}

export default FavouriteScreen

