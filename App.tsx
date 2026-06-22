import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import IntroSequenceScreen from './app/intro'
import MainMenuScreen from './app/main-menu'
import BeginBoredomScreen from './app/begin'
import WhyBoredomScreen from './app/why'
import ProgressScreen from './app/progress'
import CountdownScreen from './app/countdown'
import BoredomModeScreen from './app/boredom'
import SessionEndScreen from './app/session-end'
import ShareBoredomScreen from './app/share'

export type RootStackParamList = {
  Intro: undefined
  MainMenu: undefined
  Begin: undefined
  Why: undefined
  Progress: undefined
  Countdown: undefined
  Boredom: undefined
  SessionEnd: { duration: string }
  Share: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Intro">
        <Stack.Screen name="Intro" component={IntroSequenceScreen} />
        <Stack.Screen name="MainMenu" component={MainMenuScreen} />
        <Stack.Screen name="Begin" component={BeginBoredomScreen} />
        <Stack.Screen name="Why" component={WhyBoredomScreen} />
        <Stack.Screen name="Progress" component={ProgressScreen} />
        <Stack.Screen name="Countdown" component={CountdownScreen} />
        <Stack.Screen name="Boredom" component={BoredomModeScreen} />
        <Stack.Screen name="SessionEnd" component={SessionEndScreen} />
        <Stack.Screen name="Share" component={ShareBoredomScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
