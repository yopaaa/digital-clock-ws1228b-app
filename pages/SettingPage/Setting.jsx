import { StyleSheet, View, Image, TextInput, TouchableOpacity, ScrollView, Text, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MyButton from '../components/MyButton'
import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'

export default function App() {
  const Navigation = useNavigation()

  const [SSID, setSSID] = useState('')
  const [Password, setPassword] = useState('')

  const [devicesList, setdevicesList] = useState([])
  useEffect(() => {
    ;(async () => {
      try {
        const devicesList = await AsyncStorage.getItem('devicesList')
        console.log({ devicesList })
        if (devicesList !== null) {
          setdevicesList(JSON.parse(devicesList))
        }
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])

  useEffect(() => {
    axios
      .post('http://192.168.15.1:3000/wifi', {})
      .then((data) => {
        const datas = data.data.payload
        setSSID(datas.STAssid)
        setPassword(datas.STApassword)
      })
      .catch((er) => {
        Alert.alert(
          'Error',
          `Failed with errors: ${er.message}`,
          [
            {
              text: 'Close',
              style: 'cancel'
            }
          ],
          {
            cancelable: true,
            onDismiss: () => {}
          }
        )
      })
  }, [])
  return (
    <ScrollView style={[styles.container, { height: '100%' }]}>
      <TouchableOpacity
        style={styles.backBottom}
        onPress={() => {
          Navigation.navigate('Home')
        }}
      >
        <Image style={{ width: 30, height: 30 }} source={require('../../assets/icon/back-arrow.png')} />
      </TouchableOpacity>

      <View style={{ padding: 15 }}>
        <View style={{ margin: 10, borderWidth: 1, borderColor: '#CFCFFC', padding: 15, borderRadius: 10, gap: 10 }}>
          <Text style={{ color: 'white', fontSize: 15, alignSelf: 'center', marginBottom: 10 }}>
            WIFI STATION CREDENTIAL SETTINGS
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
            <Text style={{ color: 'white', fontSize: 18 }}>SSID</Text>
            <Text style={{ color: 'white', fontSize: 18 }}>:</Text>
            <TextInput
              style={{ borderBottomWidth: 1, marginBottom: 10, width: 150, color: 'white', borderColor: 'white' }}
              placeholderTextColor={'white'}
              // placeholder={placeholder}
              value={SSID}
              onChangeText={(val) => setSSID(val)}
              keyboardType={'default'}
            />
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
            <Text style={{ color: 'white', fontSize: 18 }}>Password</Text>
            <Text style={{ color: 'white', fontSize: 18 }}>:</Text>
            <TextInput
              style={{ borderBottomWidth: 1, marginBottom: 10, width: 150, color: 'white', borderColor: 'white' }}
              placeholderTextColor={'white'}
              value={Password}
              onChangeText={(val) => setPassword(val)}
              keyboardType={'default'}
            />
          </View>

          <MyButton
            title="Set WiFi"
            btnStyle={{ margin: 10, borderWidth: 1, borderColor: '#CFCFFC' }}
            textStyle={{ fontWeight: 'bold', color: 'white' }}
            onPress={() => {
              const data = { STAssid: SSID, STApassword: Password }
              axios
                .post('http://192.168.15.1:3000/wifi', data)
                .then((data) => {
                  Alert.alert('Success', JSON.stringify(data.data, ' ', '  '))
                  // alert()
                })
                .catch((er) => {
                  // Alert.alert('Success', 'failed with erroe' + er)
                  Alert.alert(
                    'Error',
                    `Failed with errors: ${er.message}`,
                    [
                      {
                        text: 'Close',
                        style: 'cancel'
                      }
                    ],
                    {
                      cancelable: true,
                      onDismiss: () => {}
                    }
                  )
                })

              console.log({ SSID, Password })
            }}
          />
        </View>

        <MyButton
          title="Scan devices ID"
          btnStyle={{ margin: 10, borderWidth: 1, borderColor: '#CFCFFC' }}
          textStyle={{ fontWeight: 'bold', color: 'white' }}
          onPress={() => {
            axios
              .get('http://192.168.15.1:3000/')
              .then((data) => {
                Alert.alert('Success', data, [
                  // {
                  //   text: 'Save',
                  //   style: 'default',
                  //   onPress: () => {
                  //     const index = devicesList.findIndex((item) => item.value === data)
                  //     const data = [...devicesList]
                  //     if (index !== -1) {
                  //       data.splice(index, 1, { value: data })
                  //     } else {
                  //       data.push({ value: data })
                  //     }
                  //     AsyncStorage.setItem('devicesList', JSON.stringify(data), (err) => console.log({ err }))
                  //     setdevicesList(data)
                  //   }
                  // }
                ])
              })
              .catch((er) => {
                Alert.alert(
                  'Error',
                  `Failed with errors: ${er.message}`,
                  [
                    {
                      text: 'Close',
                      style: 'cancel'
                    }
                  ],
                  {
                    cancelable: true,
                    onDismiss: () => {}
                  }
                )
              })
          }}
        />

        <MyButton
          title="Ping"
          btnStyle={{ margin: 10, borderWidth: 1, borderColor: '#CFCFFC' }}
          textStyle={{ fontWeight: 'bold', color: 'white' }}
          onPress={() => {
            axios
              .get('http://192.168.15.1:3000/ping')
              .then((data) => {
                Alert.alert('Success', data)
              })
              .catch((er) => {
                Alert.alert(
                  'Error',
                  `Failed with errors: ${er.message}`,
                  [
                    {
                      text: 'Close',
                      style: 'cancel'
                    }
                  ],
                  {
                    cancelable: true,
                    onDismiss: () => {}
                  }
                )
              })
          }}
        />

        <MyButton
          title="WiFi info"
          btnStyle={{ margin: 10, borderWidth: 1, borderColor: '#CFCFFC' }}
          textStyle={{ fontWeight: 'bold', color: 'white' }}
          onPress={() => {
            axios
              .post('http://192.168.15.1:3000/wifi', {})
              .then((data) => {
                Alert.alert('Success', JSON.stringify(data.data.payload, ' ', '\n'))
              })
              .catch((er) => {
                Alert.alert(
                  'Error',
                  `Failed with errors: ${er.message}`,
                  [
                    {
                      text: 'Close',
                      style: 'cancel'
                    }
                  ],
                  {
                    cancelable: true,
                    onDismiss: () => {}
                  }
                )
              })
          }}
        />

        {/* <MyButton
          title="Net info"
          btnStyle={{ margin: 10, borderWidth: 1, borderColor: '#CFCFFC' }}
          textStyle={{ fontWeight: 'bold', color: 'white' }}
          // onPress={() => alertJson('Network information', netinfo)}
        /> */}

        <MyButton
          title="Restart"
          btnStyle={{ margin: 15, backgroundColor: 'red' }}
          textStyle={{ fontWeight: 'bold', color: 'black' }}
          onPress={() => {
            axios
              .delete('http://192.168.15.1:3000/restart', {})
              .then((data) => {
                console.log(data.data)
              })
              .catch((er) => {
                console.log(`Failed with errors: ${er.message}`)
              })
          }}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#1C1C23' },
  backBottom: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    backgroundColor: 'transparent',
    marginTop: 30,
    marginBottom: 10,
    padding: 10
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})
