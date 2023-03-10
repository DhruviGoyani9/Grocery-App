import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { styles } from './styles';
import Icons from 'react-native-vector-icons/FontAwesome';
import { GlobalStyles } from '../../style/globalStyles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from '../../style/color';
import { ScrollView } from 'react-native-gesture-handler';
import SwiperComponent from '../../component/Swiper';
import { Divider } from '@react-native-material/core';
import { Strings } from '../../utils/strings';
import { ReusableButton } from '../../component/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncKeys } from '../../utils/AsyncKeys';

const ProductDetailScreen = () => {

    const route = useRoute();
    const [quantity, setQuantity] = useState(1);
    const [isLiked, setIsLiked] = useState(false);
    const [showProductDescription, hideProductDescription] = useState(false);
    const [showNutritionDescription, hideNutritionDescription] = useState(false);
    const [defaultRating, setDefaultRating] = useState(0);
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
    const [showReview, HideReview] = useState(false);
    const [listOfFavourite, setListOfFavourite] = useState([]);

    console.log("Product Details", route.params)
    const price = route.params.item.itemPrice * quantity;

    const AddToCartItem = async (data) => {

        const productToBeSaved = {
            id: data.id,
            image: data.image,
            itemName: data.itemName,
            itemQuantity: data.itemQuantity,
            itemCountQuantity: quantity,
            itemPrice: price,
        }
        let existingItem = await AsyncStorage.getItem(AsyncKeys.AddCart);

        console.log({ existingItem })
        if (existingItem !== null) {
            let newProduct = JSON.parse(existingItem);
            console.log('item array save data --> ', newProduct)

            const index = newProduct.findIndex((product) => data.id === product.id);

            if (index === -1) {
                newProduct.push(productToBeSaved)
                try {
                    alert("Item added Successfully")
                } catch (error) {
                    alert(`${error} error`)
                }
            }
            else {
                const pr = newProduct[index];
                newProduct[index] = { ...pr, itemCountQuantity: pr.itemCountQuantity + pr.itemCountQuantity };
            }

            await AsyncStorage.setItem(AsyncKeys.AddCart, JSON.stringify(newProduct))
        }
        else {
            let newProduct = [];
            newProduct.push(productToBeSaved);
            try {
                await AsyncStorage.setItem(AsyncKeys.AddCart, JSON.stringify(newProduct));
                alert("First Item Added Successfully");
            }
            catch (error) {
                return error;
            }
        }
    }

    useEffect(async () => {

        let itemList = await AsyncStorage.getItem(AsyncKeys.FavouriteItem)
        let list = JSON.parse(itemList);
        console.log(list, route.params.item)

        const index = list.findIndex((product) => route.params.item.id === product.id)
        console.log({ index })

        if (index == -1) {
            setIsLiked(false)
        } else {
            setIsLiked(true)
        }
        console.log({ isLiked })
        console.log({ list })
    }, [])

    const AddToFavourite = async (data) => {

        console.log({ listOfFavourite });

        const productToBeFavoutite = {
            id: data.id,
            image: data.image,
            itemName: data.itemName,
            itemQuantity: data.itemQuantity,
            itemPrice: price,
        }

        let existingItem = await AsyncStorage.getItem(AsyncKeys.FavouriteItem);
        console.log({ existingItem });

        if (existingItem !== null) {
            let newProduct = JSON.parse(existingItem);
            console.log('item array favourite data --> ', newProduct)
            const index = newProduct.findIndex((product) => data.id === product.id);
            if (index === -1) {
                newProduct.push(productToBeFavoutite)
                try {
                    alert("Item added in favourite Successfully")
                }
                catch (error) {
                    alert(error)
                }
            }
            else {
                alert("duplicate item")
            }
            await AsyncStorage.setItem(AsyncKeys.FavouriteItem, JSON.stringify(newProduct))
        }
        else {
            let newProduct = [];
            newProduct.push(productToBeFavoutite);
            await AsyncStorage.setItem(AsyncKeys.FavouriteItem, JSON.stringify(newProduct));
            alert("First Item Added in favourite Successfully");
        }
        setIsLiked(true)
        console.log('is liked', isLiked)
    }
    console.log('like', isLiked)

    const removeItem = async (item) => {
        console.log("remove")
        setIsLiked(false)
        const favouriteItem = await AsyncStorage.getItem(AsyncKeys.FavouriteItem)
        const parsed = JSON.parse(favouriteItem)
        console.log({ parsed });

        const index = parsed.findIndex((data) => data.id === item.id)
        console.log({ index })

        if (index === -1) {
            console.log('not matcg')
        }
        else {
            console.log("match")
            const remove = [...parsed.slice(0, index), ...parsed.splice(index + 1, 1)]
            console.log({ remove })
            await AsyncStorage.setItem(AsyncKeys.FavouriteItem, JSON.stringify(remove))
        }
        alert('item removed')
    }

    const CustomRatingBar = () => {
        {
            return (
                <View style={styles.customRatingBarStyle}>
                    {maxRating.map((item, key) => {
                        return (
                            <TouchableOpacity
                                activeOpacity={0.7}
                                key={item}
                                onPress={() => setDefaultRating(item)}>
                                <Icons name={item <= defaultRating ? 'star' : 'star-o'} size={20} color={'red'} />
                            </TouchableOpacity>
                        )
                    })}
                </View>
            )
        }
    }
    return (
        <SafeAreaView style={{ flex: 1, ...GlobalStyles.backgroundColor }}>

            <View style={styles.container}>
                <View style={styles.image_background}>
                    <SwiperComponent
                        height={hp(30)}
                        image1={route.params.item.image}
                        image2={route.params.item.second_image}
                        image3={route.params.item.third_image}
                        imageHeight={hp(28)}
                        resizeMode={'contain'} />
                </View>
                <ScrollView
                    bounces={true}
                    showsVerticalScrollIndicator={false}
                    style={{ marginTop: hp(2) }}
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: hp(40), }}>
                    <View style={[styles.row_view, { marginTop: hp(1), }]}>
                        <Text style={styles.itemName}>{route.params.item.itemName}</Text>
                        <Icons
                            name={isLiked ? 'heart' : 'heart-o'}
                            onPress={() =>
                                isLiked ?
                                    removeItem(route.params.item) :
                                    AddToFavourite(route.params.item)}
                            size={25} />
                    </View>
                    <Text style={styles.item_quantity}>{route.params.item.itemQuantity}</Text>
                    <View style={styles.row_view}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icons name='minus' color={Colors.Grey_B3} size={wp(6)} onPress={() => quantity > 0 ? setQuantity(quantity - 1) : 0} />
                            <View style={styles.itemCount}>
                                <Text style={styles.count}>{quantity}</Text>
                            </View>
                            <Icons name='plus' color={Colors.LightGreen} size={wp(6)} onPress={() => setQuantity(quantity + 1)} />
                        </View>
                        <Text style={styles.item_price}>${price}</Text>
                    </View>
                    <Divider style={styles.divider}
                        leadingInset={20}
                        trailingInset={20}
                    />
                    <View style={styles.row_view} >
                        <Text style={styles.product_detail}>{Strings.ProductDetailScreen.product_detail}</Text>
                        {showProductDescription ?
                            <Icons
                                name='chevron-down'
                                size={20}
                                color={Colors.Black_18}
                                onPress={() =>
                                    hideProductDescription(!showProductDescription)
                                } /> :
                            <Icons
                                name='chevron-right'
                                size={20}
                                color={Colors.Black_18}
                                onPress={() => hideProductDescription(!showProductDescription)} />}
                    </View>
                    {showProductDescription ? <Text style={styles.item_description}>{route.params.item.item_description}</Text> : null}
                    <Divider style={styles.divider}
                        leadingInset={20}
                        trailingInset={20}
                    />
                    <View style={styles.row_view}>
                        <Text style={styles.product_detail}>{Strings.ProductDetailScreen.nutritions}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.nutrition_gr_view}>
                                <Text style={styles.nutrition_gr}>100gr</Text>
                            </View>
                            {showNutritionDescription ? <Icons
                                name='chevron-down'
                                size={20}
                                color={Colors.Black_18}
                                style={{ marginLeft: wp(5) }}
                                onPress={() => hideNutritionDescription(!showNutritionDescription)} /> :
                                <Icons
                                    name='chevron-right'
                                    size={20}
                                    color={Colors.Black_18}
                                    style={{ marginLeft: wp(5) }}
                                    onPress={() =>
                                        hideNutritionDescription(!showNutritionDescription)
                                    } />}
                        </View>
                    </View>
                    {showNutritionDescription ? <Text style={styles.item_description}>{route.params.item.nutrition_description}</Text> : null}
                    <Divider style={styles.divider}
                        leadingInset={20}
                        trailingInset={20}
                    />
                    <View style={styles.row_view}>
                        <Text style={styles.product_detail}>{Strings.ProductDetailScreen.review}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <CustomRatingBar />
                            {showReview ? <Icons
                                name='chevron-down'
                                size={20}
                                color={Colors.Black_18}
                                style={{ marginLeft: wp(5) }}
                                onPress={() => HideReview(!showReview)}
                            /> :
                                <Icons
                                    name='chevron-right'
                                    size={20}
                                    color={Colors.Black_18}
                                    style={{ marginLeft: wp(5) }}
                                    onPress={() => HideReview(!showReview)}
                                />}
                        </View>
                    </View>
                    {showReview ? <Text style={styles.item_description}>{route.params.item.item_description}</Text> : null}
                    <ReusableButton
                        onPress={() => AddToCartItem(route.params.item)}
                        text={Strings.ProductDetailScreen.Add_to_basket} />
                </ScrollView>
                {/* <ReusableButton onPress={null} text={Strings.ProductDetailScreen.Add_to_basket} /> */}
            </View>
        </SafeAreaView>
    )
}

export default ProductDetailScreen

