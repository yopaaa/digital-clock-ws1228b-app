import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Navigation from './pages/components/Navigation'
import Setting from './pages/Setting'
import Color from './pages/Color'
import Customize from './pages/Custom'

const Stack = createNativeStackNavigator()

export default function App() {
  const pageList = ['Color', 'Customize', 'Setting']

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Color" component={Color} options={{ headerShown: false }} />

        <Stack.Screen name="Customize" component={Customize} options={{ headerShown: false }} />

        <Stack.Screen name="Setting" component={Setting} options={{ headerShown: false }} />
      </Stack.Navigator>

      <View style={{ backgroundColor: '#353542' }}>
        <Navigation pageList={pageList} defaultPage={'Color'} />
      </View>
    </NavigationContainer>
  )
}
