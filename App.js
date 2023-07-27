import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Setting from './pages/SettingPage/Setting'
import BottomSheet from './pages/HomePage/BottomSheet'
import ScanQR from './pages/QRPage/ScanQR'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={BottomSheet} options={{ headerShown: false }} />

        <Stack.Screen
          name="Setting"
          component={Setting}
          options={{
            headerShown: false,
            animation: 'slide_from_right'
          }}
        />

        <Stack.Screen
          name="ScanQR"
          component={ScanQR}
          options={{
            headerShown: false,
            animation: 'slide_from_left'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
