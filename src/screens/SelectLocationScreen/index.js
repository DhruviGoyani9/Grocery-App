import { Text, View, Image, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Dropdown } from 'react-native-element-dropdown'
import { ReusableButton } from '../../component/Button'
import { useNavigation } from '@react-navigation/native'
import { ImagePaths } from '../../utils/ImagePaths'
import { Strings } from '../../utils/strings'
import { AppScreens } from '../../navigation/AppScreens'



const Gujarat = [
    {
        label: "Surat",
        value: "Surat"
    },
    {
        label: "Ahmedabad",
        value: "Ahmedabad"
    },
    {
        label: "Gandhinagar",
        value: "Gandhinagar"
    }
];
const Maharashtra = [
    {
        label: "Mumbai",
        value: "Mumbai"
    },
    {
        label: "Agra",
        value: "Agra"
    },
    {
        label: "Goa",
        value: "Goa"
    }
];
const Madhyapradesh = [
    {
        label: "Bhopal",
        value: "Bhopal"
    },
    {
        label: "Nadiad",
        value: "Nadiad"
    },
    {
        label: "Kheda",
        value: "Kheda"
    }
];

const state = [
    {
        label: "Gujarat",
        value: "Gujarat",
        city: [...Gujarat]
    },
    {
        label: "Maharashtra",
        value: "Maharashtra",
        city: [...Maharashtra]
    },
    {
        label: "MadhyaPradesh",
        value: "MadhyaPradesh",
        city: [...Madhyapradesh]
    }
];

const SelectLocationScreen = () => {

    const [value, setValue] = useState(null);
    const [city, setCity] = useState(null);
    const [selected, setSelected] = useState([]);
    const navigation = useNavigation();

    // let type = [];
    // if (value === "Gujarat") {
    //     type = Gujarat;
    // } else if (value === "Maharashtra") {
    //     type = Maharashtra;
    // } else if (value === "Madhyapradesh") {
    //     type = Madhyapradesh;
    // }

    useEffect(() => {
        state.filter((state) => {
            if (state.label === value) {
                console.log("city", state.city);
                setSelected(state.city);
                return state.city;
            }
            return 0;
        });
    }, [value]);

    return (

        <View style={styles.container}>
            <Image source={ImagePaths.mapImage} />
            <Text style={styles.selectLocationText}>{Strings.selectLocationScreen.selectLocation}</Text>
            <Text style={styles.text}>{Strings.selectLocationScreen.text}
            </Text>
            <View style={{ bottom: wp(7), position: 'absolute', alignSelf: 'flex-start' }}>
                <Text style={styles.yourAreaText}>{Strings.selectLocationScreen.zone}</Text>
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={state}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="zone..."
                    searchPlaceholder="Search..."
                    value={value}
                    onChange={(item) => {
                        setValue(item.value);
                    }}
                    keyboardAvoiding
                />
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.selectedTextStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    data={selected}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Type of your Area"
                    searchPlaceholder="Search..."
                    value={city}
                    onChange={(item) => {
                        setCity(item.value);
                    }}
                    keyboardAvoiding
                />
                {/* <Dropdown
                    id='Dropdown1'
                    style={styles.dropdown}
                    selectedTextStyle={styles.selectedTextStyle}
                    placeholderStyle={styles.selectedTextStyle}
                    data={zone}
                    value={zoneValue}
                    labelField="label"
                    valueField='value'
                    onChange={item => {
                        setZoneValue(item.value)
                    }
                    }
                    placeholder='Zone...'
                    search
                    searchPlaceholder='Search..'
                    maxHeight={300}
                    keyboardAvoiding
                />
                <Text style={styles.yourAreaText}>{Strings.selectLocationScreen.area}</Text>
                {/* <Text>{[type]}</Text> */}
                {/* <Dropdown
                    id='Dropdown2'
                    style={styles.dropdown}
                    selectedTextStyle={styles.selectedTextStyle}
                    placeholderStyle={styles.placeholderTextStyle}
                    data={type}
                    value={areaValue}
                    labelField="label"
                    valueField='value'
                    onChange={item => {
                        setAreaValue(item.value)
                        console.log(item.label)
                    }}
                    placeholder='Types of Your Area'
                    search
                    searchPlaceholder='Search..'
                    maxHeight={300}
                    keyboardAvoiding /> */}
                <View style={{ marginBottom: hp(4) }}>
                    <ReusableButton onPress={() => navigation.navigate(AppScreens.logInScreen)} text={Strings.selectLocationScreen.submit} />
                </View>
            </View>

        </View>
    )
}

export default SelectLocationScreen

