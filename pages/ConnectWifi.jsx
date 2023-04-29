import { useState } from 'react'
import { View, Text, Modal, Button, Linking } from 'react-native'
import vars from './components/Vars'
// import AsyncStorage from '@react-native-async-storage/async-storage'

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleConnectPress = () => {
    Linking.openSettings()
  }

  const handleModalClose = () => {
    setIsModalVisible(false)
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Show Modal" onPress={() => setIsModalVisible(true)} />

      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View
            style={{
              justifyContent: 'space-around',
              alignItems: 'center',
              padding: 20,
              backgroundColor: 'red',
              height: 200,
              borderRadius: 20
              //   opacity: 0.5,
            }}
          >
            <View>
              <Text style={{ fontSize: 20, color: vars.color.four }}>You are not connected to any</Text>
              <Text style={{ fontSize: 20, color: vars.color.four }}>access point at the moment</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '80%'
              }}
            >
              <Button title="Close" onPress={handleModalClose} />
              <Button title="Connect now" onPress={handleConnectPress} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}
