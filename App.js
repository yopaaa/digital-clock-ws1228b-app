import { View, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { useEffect, useRef } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import Setting from './pages/Setting'
import Color from './pages/Color'
import Customize from './pages/Custom'

const Stack = createNativeStackNavigator()

function Home() {
  const bottonSheetModalRef = useRef(null)

  const snapPoints = ['10%', '80%']

  function showSheet() {
    bottonSheetModalRef.current?.present()
  }
  useEffect(() => {
    showSheet()
  }, [])
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <View style={styles.container}>
          <Color />
          <StatusBar style="auto" />
          <BottomSheetModal
            onDismiss={(x) => showSheet()}
            ref={bottonSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            backgroundStyle={{ borderRadius: 30, borderWidth: 1, borderColor: 'black' }}
          >
            <BottomSheetScrollView>
              <View>
                <Customize />
              </View>
            </BottomSheetScrollView>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />

        <Stack.Screen name="Customize" component={Customize} options={{ headerShown: false }} />

        <Stack.Screen name="Setting" component={Setting} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
