import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';
import { AsyncKeys } from '../../utils/AsyncKeys';
import { ImagePaths } from '../../utils/ImagePaths';
import Icons from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../style/color';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ReusableButton } from '../../component/Button';
import { Strings } from '../../utils/strings';

const MyCartScreen = () => {

    const [cart, setCart] = useState([])

    useEffect(() => {
        AsyncStorage.getItem(AsyncKeys.AddCart).then((cart) => {
            if (cart != null) {
                const cartProduct = JSON.parse(cart)
                setCart(cartProduct)
            }
        }).catch((error) => {
            alert(error)
        })
    })

    const removeItem = async (id) => {
        try {
            const value = await AsyncStorage.getItem(AsyncKeys.AddCart);
            let parsed = JSON.parse(value)
            console.log({ parsed })
            console.log({ id })
            const items = parsed.filter((e) => {
                return e.id !== id
            })
            console.log({ items })
            await AsyncStorage.setItem(AsyncKeys.AddCart, JSON.stringify(items));
            alert("Item removed")
            console.log({ items })
        } catch (error) {
            return false;
        }
    }

    const decrementCount = async (item) => {
        const index = cart.findIndex((product) => item.id === product.id);
        let pr = cart[index];
        console.log({ pr })
        cart[index] = { ...pr, itemCountQuantity: pr.itemCountQuantity - 1 };
        console.log('cartcopy - ', cart[index])
        await AsyncStorage.setItem(AsyncKeys.AddCart, JSON.stringify(cart));
    }

    const incrementCount = async (item) => {

        const index = cart.findIndex((product) => item.id === product.id);

        let pr = cart[index];
        console.log({ pr })
        cart[index] = { ...pr, itemCountQuantity: pr.itemCountQuantity + 1 };
        console.log('cartcopy - ', cart[index])
        await AsyncStorage.setItem(AsyncKeys.AddCart, JSON.stringify(cart));
    }

    const getCartTotal = () => {
        return cart.reduce(
            (total, product) => total + product.itemPrice * product.itemCountQuantity,
            0
        ).toFixed(2);
    };
    return (
        <View style={styles.container}>
            <FlatList
                data={cart}
                renderItem={({ item, index }) =>
                    <View style={styles.cartItems} key={index}>
                        <Image
                            style={styles.image}
                            source={item.image}
                            resizeMode='contain' />
                        <View>
                            <Text style={styles.itemName}>{item.itemName}</Text>
                            <Text style={styles.itemQuantity}>{item.itemQuantity}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={styles.itemCount}>
                                    <Icons
                                        name='minus'
                                        color={Colors.Grey_B3}
                                        size={wp(6)}
                                        onPress={() => { item.itemCountQuantity > 0 ? decrementCount(item) : removeItem(item.id) }}
                                    />
                                </View>

                                <Text style={styles.count}>{item.itemCountQuantity}</Text>

                                <View style={styles.itemCount}>
                                    <Icons
                                        name='plus'
                                        color={Colors.LightGreen}
                                        size={wp(6)}
                                        onPress={() => incrementCount(item)}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{ marginRight: wp(5), justifyContent: 'space-between', alignItems: 'center' }}>
                            <TouchableOpacity
                                style={{ marginTop: hp(1) }}
                                onPress={() => removeItem(item.id)}>
                                <Image
                                    source={ImagePaths.close_icon}
                                />

                            </TouchableOpacity>
                            <Text style={styles.item_price}>
                                ${item.itemPrice * item.itemCountQuantity}
                            </Text>
                        </View>

                    </View>
                }
                ItemSeparatorComponent={() => (
                    <View style={{ height: 0.5, width: wp(90), backgroundColor: Colors.Grey, alignSelf: 'center', marginVertical: hp(1) }} />
                )}
                showsVerticalScrollIndicator={false}
            />


            <ReusableButton text={Strings.addCart.go_to_checkout} onPress={() => alert("Checkout Button is Pressed")} />
            <View style={styles.total}>
                <Text style={styles.totalText}>${getCartTotal()}</Text>
            </View>
        </View>
    )
}

export default MyCartScreen

