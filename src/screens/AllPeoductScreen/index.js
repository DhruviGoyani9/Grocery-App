import { Image, SafeAreaView, Text, View, TextInput, TouchableOpacity, Modal, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Card from '../../component/Card'
import { GlobalStyles } from '../../style/globalStyles'
import { styles } from './styles'
import { useNavigation, useRoute } from '@react-navigation/native'
import Icons from 'react-native-vector-icons/FontAwesome';
import { ImagePaths } from '../../utils/ImagePaths'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import SearchTextInput from '../../component/SearchTextInput'
import { AppScreens } from '../../navigation/AppScreens'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Strings } from '../../utils/strings'
import CheckBox1 from '@react-native-community/checkbox';
import CheckBox from '../../component/CheckBox';
import { ReusableButton } from '../../component/Button'
import { EggItems, FruitsItems } from '../../component/data';
import { color } from 'react-native-reanimated'
import { Colors } from '../../style/color'

const CATEGORIES = [
    {
        id: 1,
        categories: 'All',
        isChecked: false,
    },
    {
        id: 2,
        categories: 'Eggs',
        isChecked: false
    },
    {
        id: 3,
        categories: 'Noodles & Pasta',
        isChecked: false
    },
    {
        id: 4,
        categories: 'Chips & Crisps',
        isChecked: false
    },
    {
        id: 5,
        categories: 'Fast Food',
        isChecked: false
    }
];

const Brand = [
    {
        id: 1,
        brand: 'All'
    },
    {
        id: 1,
        brand: 'Individual Collection'
    },
    {
        id: 2,
        brand: 'Cocola'
    },
    {
        id: 3,
        brand: 'Ifrad'
    },
    {
        id: 4,
        brand: 'kazi Farmas'
    }
]

const AllProductScreen = () => {

    const route = useRoute();
    const navigation = useNavigation();
    const [searchText, onChangeSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    // const [individualChecked, setIndividualChecked] = useState(true);
    // const [cocolaChecked, setCocolaChecked] = useState(false);
    // const [ifadChecked, setIfadChecked] = useState(true);
    // const [kaziChecked, setKaziChecked] = useState(true);

    //const [isSelected, setIsSelected] = useState(true);
    const [products, setProducts] = useState(CATEGORIES);
    const [category, setCategory] = useState("All");
    const [categoryList, setCategoryList] = useState([]);

    const [brand, setBrand] = useState('');
    const [brandList, setBrandList] = useState([]);



    const DATA = route.params.item.products;

    useEffect(() => {
        const filtered = DATA.filter(
            items => items.itemName.toLowerCase().includes(searchText.toLocaleLowerCase()),
        );
        if (searchText === '') {
            return setFilteredData(DATA)
        }
        setFilteredData(filtered);
    }, [searchText]);

    const handleChange = (id) => {
        let temp = products.map((product) => {
            if (id === product.id) {
                return { ...product, isChecked: !product.isChecked };
            }
            return product;
        });
        setProducts(temp);
    };

    const setCategoryFilter = (selectedcategory) => {
        if (selectedcategory !== "All") {
            setCategoryList([
                ...EggItems.filter((e) => e.categories === selectedcategory)
            ]);
        } else {
            setCategoryList(EggItems);
        }
        setCategory(category);
    };

    console.log({ products })
    const setBrandFilter = (selectedBrand) => {
        if (selectedBrand !== "All") {
            setBrandList([
                ...EggItems.filter((e) => e.brand === selectedBrand),
            ]);
        } else {
            setBrandList(EggItems);
        }
        setBrand(brand);
    };
    console.log("All Product --> ", route.params)

    const CloseModel = () => {
        setModalVisible(!modalVisible)
        navigation.navigate(AppScreens.FilteredDataScreen, { item: categoryList, brand: brandList })
    }

    return (
        <SafeAreaView style={{ ...GlobalStyles.backgroundColor, flex: 1 }}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}  >
                <SafeAreaView style={{ flex: 1, ...GlobalStyles.backgroundColor }}>
                    <View style={styles.container}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <TouchableOpacity
                                style={{ ...GlobalStyles.marginLeft }}
                                onPress={() => setModalVisible(!modalVisible)}
                            //onPress={() => navigation.goBack()}
                            >
                                <Image source={ImagePaths.close_icon} />
                            </TouchableOpacity>
                            <Text style={styles.filterText}>{Strings.filterScreen.filters}</Text>
                        </View>
                        <View style={styles.filter_view}>
                            <View style={{ ...GlobalStyles.marginLeft, }}>


                                <Text style={styles.categories}>{Strings.filterScreen.categories}</Text>
                                {CATEGORIES.map((item, index) => (

                                    <View key={index} style={{ margin: wp(1), flexDirection: 'row', alignItems: 'center' }}>
                                        <CheckBox1
                                            value={item.isChecked}
                                            boxType='square'
                                            onChange={() =>
                                                setCategoryFilter(item.categories)
                                            }
                                            onValueChange={() =>
                                                handleChange(item.id)
                                            }
                                            onFillColor={Colors.LightGreen}
                                            onCheckColor={Colors.White}
                                            tintColor={Colors.DarkGrey}
                                            //hideBox={true}
                                            animationDuration={0}
                                            tintColors={{ true: Colors.LightGreen, false: Colors.DarkGrey }}
                                            style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                                            onTintColor={Colors.LightGreen}
                                        />
                                        <Text style={styles.filterTitle}>{item.categories}</Text>
                                    </View>
                                ))}

                                <Text style={styles.categories}>{Strings.filterScreen.brand}</Text>

                                {Brand.map((item, index) => (
                                    <View key={index} style={{ flexDirection: 'row', margin: wp(1), alignItems: 'center' }}>

                                        <CheckBox1
                                            boxType='square'
                                            onChange={() => setBrandFilter(item.brand)}
                                            onFillColor={Colors.LightGreen}
                                            onCheckColor={Colors.White}
                                            tintColor={Colors.DarkGrey}
                                            //hideBox={true}
                                            animationDuration={0}
                                            tintColors={{ true: Colors.LightGreen, false: Colors.DarkGrey }}
                                            style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                                            onTintColor={Colors.LightGreen}
                                        />

                                        <Text style={styles.filterTitle}>{item.brand}</Text>
                                    </View>
                                ))}

                                {/* <CheckBox
                                    onPress={() => setIndividualChecked(!individualChecked)}
                                    title={Strings.filterScreen.individual_collection}
                                    isChecked={individualChecked}
                                />
                                <CheckBox
                                    onPress={() => setCocolaChecked(!cocolaChecked)}
                                    title={Strings.filterScreen.cocola}
                                    isChecked={cocolaChecked}
                                />
                                <CheckBox
                                    onPress={() => setIfadChecked(!ifadChecked)}
                                    title={Strings.filterScreen.ifad}
                                    isChecked={ifadChecked}
                                />
                                <CheckBox
                                    onPress={() => setKaziChecked(!kaziChecked)}
                                    title={Strings.filterScreen.kazi_farmas}
                                    isChecked={kaziChecked}
                                /> */}
                            </View>
                            <View style={{ bottom: hp(7), position: 'absolute', alignSelf: 'center' }}>
                                <ReusableButton onPress={() => Alert.alert('Button Pressed')} text={Strings.filterScreen.apply_filter}
                                    onPress={CloseModel}
                                />
                            </View>

                        </View>

                    </View>
                </SafeAreaView>
            </Modal>

            <View style={styles.header}>
                <Icons
                    name='angle-left'
                    size={35}
                    onPress={() => navigation.goBack()} />
                <Text
                    style={styles.product_title}>
                    {route.params.item.title}
                </Text>
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                >
                    <Image
                        source={ImagePaths.filter_icon}
                        style={styles.filter_icon}
                        resizeMode='contain' />
                </TouchableOpacity>
            </View>

            <View style={{ ...GlobalStyles.marginLeft }}>
                <SearchTextInput onChangeText={newText => onChangeSearch(newText)} />
            </View>
            <View
                style={{
                    marginTop: hp(2),
                    marginLeft: wp(3),
                    marginRight: wp(3)
                }}>
                <Card
                    Items={filteredData}
                    width={wp(42)}
                    buttonLeftPosition={wp(25)} />

            </View>
        </SafeAreaView>
    )
}

export default AllProductScreen

