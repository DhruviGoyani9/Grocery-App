import { Alert, FlatList, Image, Modal, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { GlobalStyles } from '../../style/globalStyles';
import { styles } from './styles';
import { Strings } from '../../utils/strings';
import { ImagePaths } from '../../utils/ImagePaths';
import { useFocusEffect, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import CheckBox from '../../component/CheckBox';
import { ReusableButton } from '../../component/Button';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { EggItems, FruitsItems } from '../../component/data';
import { AppScreens } from '../../navigation/AppScreens';
import CheckBox1 from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icons from 'react-native-vector-icons/FontAwesome';


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

const FilterScreen = () => {

    const navigation = useNavigation();
    const route = useRoute();
    // const [checked, setChecked] = useState([EggItems]);
    const [individualChecked, setIndividualChecked] = useState(true);
    const [cocolaChecked, setCocolaChecked] = useState(false);
    const [ifadChecked, setIfadChecked] = useState(true);
    const [kaziChecked, setKaziChecked] = useState(true);

    const [filteredData, setFilteredData] = useState(CATEGORIES);
    const [isSelected, setIsSelected] = useState(true);

    const [products, setProducts] = useState(CATEGORIES);
    const [category, setCategory] = useState("All");
    const [categoryList, setCategoryList] = useState([]);


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

    console.log({ products });

    // const onFilterChange = (filter) => {
    //     if (filter === 'All') {
    //         if (categoryList.length === CATEGORIES.length) {
    //             setCategoryList({ categoryList: [] })
    //         } else {
    //             setCategoryList({ categoryList: CATEGORIES.map(filter => filter.categories) })
    //         }
    //     } else {
    //         if (categoryList.includes(filter)) {
    //             const filterIndex = categoryList.indexOf(filter)
    //             const newFilter = [...categoryList];
    //             newFilter.splice(filterIndex, 1);
    //             setCategoryList({ categoryList: newFilter })
    //         } else {
    //             setCategoryList({ categoryList: [...categoryList, filter] })
    //         }
    //     }
    // }

    return (
        <SafeAreaView style={{ flex: 1, ...GlobalStyles.backgroundColor }}>

            <View style={styles.container}>
                <View style={{ flexDirection: 'row', ...GlobalStyles.marginLeft, alignItems: 'center', }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                    >
                        <Image source={ImagePaths.close_icon} />
                    </TouchableOpacity>
                    <Text style={styles.filterText}>{Strings.filterScreen.filters}</Text>
                </View>
                <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: hp(20), }}>
                    <View style={styles.filter_view}>
                        <View style={{ ...GlobalStyles.marginLeft, }}>

                            <Text style={styles.categories}>{Strings.filterScreen.categories}</Text>
                            {CATEGORIES.map((item, index) => (
                                <View key={index} style={{ margin: wp(1), flexDirection: 'row' }}>
                                    <CheckBox1
                                        boxType='square'
                                        onChange={() =>
                                            setCategoryFilter(item.categories)
                                        }
                                        onValueChange={(newValue) =>
                                            setIsSelected(newValue)
                                        }
                                        style={{}}
                                    />
                                    <Text style={{ marginLeft: wp(5) }}>{item.categories}</Text>
                                </View>
                            ))}

                            <Text style={styles.categories}>{Strings.filterScreen.brand}</Text>

                            <CheckBox
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
                            />
                        </View>
                        <View style={{ marginTop: hp(0) }}>
                            <ReusableButton onPress={() => Alert.alert('Button Pressed')} text={Strings.filterScreen.apply_filter}
                                onPress={() => navigation.navigate(AppScreens.FilteredDataScreen, { item: categoryList })}
                            />
                        </View>

                    </View>
                </ScrollView>


            </View>


        </SafeAreaView>
    )
}

export default FilterScreen
