/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
// import firebase from '@react-native-firebase/app';

import {SafeAreaView, Text} from 'react-native';

import {
  notificationListener,
  requestUserPermission,
} from './src/utils/pushnotification_helper';

function App(): JSX.Element {
  useEffect(() => {
    requestUserPermission();
    notificationListener();
  }, []);

  return (
    <SafeAreaView>
      <Text>App.tsx</Text>
    </SafeAreaView>
  );
}

export default App;
