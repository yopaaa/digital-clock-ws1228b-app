import { useNavigation } from '@react-navigation/native'
import { StyleSheet, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import Dropdown from 'react-native-select-dropdown'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'

const windowWidth = Dimensions.get('window').width
// const windowHeight = Dimensions.get('window').height

const Nav = ({ isConnected }) => {
  const [devicesList, setdevicesList] = useState([])
  const navigation = useNavigation()

  function onDevicesSelect(selected, index) {
    AsyncStorage.setItem('selectedDevices', selected, (err) => console.log({ err }))
    console.log({ selected })
  }

  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
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
    })

    if (devicesList[devicesList.length - 1]?.type === 'ip') {
      AsyncStorage.setItem('ipAddress', devicesList[devicesList.length - 1]?.value)
    }

    return focusHandler
  }, [navigation])

  return (
    <View style={styles.container}>
      <View style={styles.containerRound}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ScanQR')
          }}
        >
          <Image style={{ width: 30, height: 30 }} source={require('../../assets/icon/scan-qr.png')} />
        </TouchableOpacity>

        <Dropdown
          defaultValue={devicesList[devicesList.length - 1]?.value}
          renderDropdownIcon={(isOpened) => {
            if (isOpened) {
              return (
                <Image
                  style={{ width: 16, height: 12, transform: [{ rotate: '90deg' }] }}
                  source={require('../../assets/icon/triangle-icon.png')}
                />
              )
            }
            return <Image style={{ width: 16, height: 12 }} source={require('../../assets/icon/triangle-icon.png')} />
          }}
          dropdownIconPosition={'right'}
          defaultButtonText={devicesList[devicesList.length - 1]?.value}
          buttonStyle={[styles.devicesSelectedContainer, { backgroundColor: isConnected === true ? '#29e810' : '#ff0000' }]}
          buttonTextStyle={{ fontSize: 15, fontWeight: 'bold' }}
          data={devicesList.map((value) => value?.value)}
          onSelect={onDevicesSelect}
          dropdownStyle={{ backgroundColor: 'white', borderRadius: 10, marginTop: -30 }}
          selectedRowStyle={{ backgroundColor: '#d9d9d9' }}
          rowTextStyle={{ fontSize: 14 }}
        />

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Setting')
          }}
        >
          <Image style={{ width: 30, height: 30 }} source={require('../../assets/icon/settings.png')} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Nav

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    marginTop: 30,
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
    alignItems: 'center'
    // backgroundColor: 'blue'
  },
  containerRound: {
    flex: 1,
    width: 320,
    height: 50,
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 8,
    paddingBottom: 8,
    gap: 23
  },
  devicesSelectedContainer: {
    width: 187,
    height: 40,
    paddingLeft: 27,
    paddingRight: 27,
    paddingTop: 7,
    paddingBottom: 7,
    backgroundColor: '#5D646F',
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 1
  },
  devicesId: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
    fontWeight: '700'
  }
})
