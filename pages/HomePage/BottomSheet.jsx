import { View, StyleSheet, Text } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { useEffect, useRef, useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Color from './Color'
import Customize from './Customize'
import Paho from 'paho-mqtt'

const clientMqtt = new Paho.Client('public.mqtthq.com', Number(1883), `mqtt-async-test-${parseInt(Math.random() * 100)}`)

const BottomSheet = () => {
  const bottonSheetModalRef = useRef(null)
  const [isConnectedMqtt, setIsConnectedMqtt] = useState(false)
  const [selectedDevices, setSelectedDevices] = useState('')
  const snapPoints = ['10%', '80%']

  function showSheet() {
    bottonSheetModalRef.current?.present()
  }

  function onMessage(message) {
    if (message.destinationName === 'mqtt-async-test/value') console.log(parseInt(message.payloadString))
  }

  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log('onConnectionLost:' + responseObject.errorMessage)
    }
  }

  function connectMqtt() {
    clientMqtt.connect({
      onSuccess: () => {
        setIsConnectedMqtt(true)
        console.log('Connected!')
        // client.subscribe('mqtt-async-test/value')
        clientMqtt.onMessageArrived = onMessage
        clientMqtt.onConnectionLost = onConnectionLost
      },
      onFailure: () => {
        setIsConnectedMqtt(false)
        console.log('Failed to connect!')
        connectMqtt()
      }
    })
  }

  useEffect(() => {
    showSheet()
    connectMqtt()
    ;(async () => {
      try {
        const selectedDevices = await AsyncStorage.getItem('selectedDevices')
        console.log({ selectedDevices })
        if (selectedDevices !== null) {
          setSelectedDevices(selectedDevices)
        }
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <View style={styles.container}>
          <Color isConnectedMqtt={isConnectedMqtt} clientMqtt={clientMqtt} selectedDevices={selectedDevices} />
          <StatusBar style="auto" />
          <BottomSheetModal
            onDismiss={(x) => showSheet()}
            ref={bottonSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            backgroundStyle={{ borderRadius: 30, backgroundColor: '#333333' }}
          >
            <BottomSheetScrollView>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 20,
                    fontWeight: '700',
                    letterSpacing: 3
                  }}
                >
                  Customize
                </Text>
              </View>
              <Customize clientMqtt={clientMqtt} selectedDevices={selectedDevices} />
            </BottomSheetScrollView>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default BottomSheet
