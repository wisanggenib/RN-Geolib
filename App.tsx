/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import useStore from './src/store';
// import type {PropsWithChildren} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/screen/Login';
import CheckInOutScreen from './src/screen/Checkin';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const {isLogin} = useStore();
  const [loading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (isLogin || !isLogin) {
      console.log('Called');
      setIsLoading(false);
    }
  }, [isLogin]);

  if (loading) {
    return (
      <SafeAreaView>
        <StatusBar />
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View>
            <Text style={styles.highlight}>Loading ....</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {!isLogin ? (
          <Stack.Screen name="Home" component={LoginScreen} />
        ) : (
          <Stack.Screen name="Checkin" component={CheckInOutScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
