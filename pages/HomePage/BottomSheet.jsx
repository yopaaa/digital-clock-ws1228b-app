import { View, StyleSheet, Text } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { useEffect, useRef, useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Color from './Color'
import Customize from './Customize'
import Paho from 'paho-mqtt'
import publish from '../function/publish'

const clientMqtt = new Paho.Client('public.mqtthq.com', Number(1883), `Digital-clock-mqtt-async-${parseInt(Math.random() * 100)}`)

const BottomSheet = () => {
  const bottonSheetModalRef = useRef(null)
  const [isConnectedMqtt, setIsConnectedMqtt] = useState(false)
  const [selectedDevicesID, setselectedDevicesID] = useState('')
  const [subscribeMsg, setSubscribeMsg] = useState({})
  const snapPoints = ['10%', '80%']

  function showSheet() {
    bottonSheetModalRef.current?.present()
  }

  function connectMqtt() {
    clientMqtt.connect({
      onSuccess: () => {
        setIsConnectedMqtt(true)

        clientMqtt.onMessageArrived = (message) => {
          setSubscribeMsg(message)
          console.log(message.topic)
        }

        clientMqtt.onConnectionLost = (responseObject) => {
          if (responseObject.errorCode !== 0) {
            console.log('onConnectionLost:' + responseObject.errorMessage)
          }
        }
      },
      onFailure: () => {
        setIsConnectedMqtt(false)
        console.log('Failed to connect!')
        connectMqtt()
      }
    })
  }

  useEffect(() => {
    if (isConnectedMqtt) {
      console.log('Connected!')
      try {
        clientMqtt.subscribe(selectedDevicesID + '-info-color')
        clientMqtt.subscribe(selectedDevicesID + '-info-time')
        clientMqtt.subscribe(selectedDevicesID + '-info-alarms')
        clientMqtt.subscribe(selectedDevicesID + '-info-wifi')
        clientMqtt.subscribe(selectedDevicesID + '-info-mode')

        publish(clientMqtt, selectedDevicesID + '-ping', {})
        publish(clientMqtt, selectedDevicesID + '-color', {})
        publish(clientMqtt, selectedDevicesID + '-time', {})
        publish(clientMqtt, selectedDevicesID + '-wifi', {})
        publish(clientMqtt, selectedDevicesID + '-mode', {})
        publish(clientMqtt, selectedDevicesID + '-alarms', {})
      } catch (error) {
        console.log(error)
      }
    }
  }, [isConnectedMqtt])

  useEffect(() => {
    showSheet()
    connectMqtt()
    ;(async () => {
      try {
        const selectedDevices = await AsyncStorage.getItem('selectedDevices')

        if (selectedDevices != null) {
          setselectedDevicesID(selectedDevices)
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
          <Color
            isConnectedMqtt={isConnectedMqtt}
            clientMqtt={clientMqtt}
            selectedDevicesID={selectedDevicesID}
            subscribeMsg={subscribeMsg}
            onsetselectedDevicesID={(val) => setselectedDevicesID(val)}
          />
          <StatusBar style="auto" />
          <BottomSheetModal
            onDismiss={(x) => showSheet()}
            ref={bottonSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            backgroundStyle={{ borderRadius: 30, backgroundColor: '#333333' }}
          >
            <BottomSheetScrollView>
              <View style={styles.bottomSheetScrollViewContainer}>
                <Text style={styles.customizeText}>Customize</Text>
                <Text
                  style={[
                    styles.customizeText,
                    {
                      fontSize: 8,
                      letterSpacing: 0
                    }
                  ]}
                >
                  {selectedDevicesID}
                </Text>
              </View>

              <Customize clientMqtt={clientMqtt} selectedDevicesID={selectedDevicesID} subscribeMsg={subscribeMsg} />
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
  },
  bottomSheetScrollViewContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 },
  customizeText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 3
  }
})

export default BottomSheet
