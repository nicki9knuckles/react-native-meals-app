import 'react-native-gesture-handler'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { enableScreens } from 'react-native-screens'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'
import Navigation from './navigation/MealsNavigator'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import mealsReducer from './store/reducers/meals'

enableScreens() // this is suppose to make things more performant

const rootReducer = combineReducers({
  meals: mealsReducer,
})

const store = createStore(rootReducer)

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })
}
export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false)

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log('AppLoading error-----', err)}
      />
    )
  }

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
