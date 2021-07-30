import 'react-native-gesture-handler';
// import { StatusBar } from 'expo-status-bar';
import { View, Platform, StatusBar } from "react-native";

import React, {useEffect} from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import VideoScreen from './screens/VideoScreen'
import SafeViewAndroid from './components/SafeViewAndroid';

import Amplify, {Auth, DataStore} from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react-native'

import config from './src/aws-exports'
import { User } from './src/models';
Amplify.configure(config)

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  useEffect(() => {
    const saveUserToDB = async () => {
      // get user  from cognito
      const userInfo = await Auth.currentAuthenticatedUser();

      if (!userInfo) {
        return;
      }
      const userId = userInfo.attributes.sub;

      // check if user exists in DB
      const user = (await DataStore.query(User)).find(user => user.sub === userId);
      if (!user) {
        // if not, save user to db.
        await DataStore.save(
          new User({
            sub: userId,
            name: userInfo.attributes.email,
            subscribers: 0,
          })
        );
      } else {
        console.warn("User already exists in DB");
      }
    };

    saveUserToDB();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      // <SafeAreaProvider>
      //   <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      //     <StatusBar />
      //     <Navigation colorScheme={"dark"} />
      //   </SafeAreaView>
      // </SafeAreaProvider>

      <View style={{flex:1}}>
        <StatusBar
          barStyle='light-content'
          backgroundColor='#141414'
        />
        <Navigation colorScheme={"dark"} />
      </View>
    );
  }
}

export default withAuthenticator(App)
