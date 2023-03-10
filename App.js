import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen';
import AppNavigator from './src/navigation/AppNavigator';
import BottomTab from './src/component/BottomTab';
import DrawerStack from './src/navigation/DrawerStack';
import HomeStackNavigation from './src/navigation/HomeStackNavigation';
import { firebase } from '@react-native-firebase/database';
// import { enableLatestRenderer } from 'react-native-maps';


const firebaseConfig = {
  datbaseURL: 'https://onliceryapp-93ddb-default-rtdb.firebaseio.com',
  projectId: 'onliceryapp-93ddb'
}

firebase.initializeApp(firebaseConfig)

// enableLatestRenderer();

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    // <BottomTab />

    <AppNavigator />
    //<BottomTab />
    // <HomeStackNavigation />
  )
}

export default App

const styles = StyleSheet.create({})