import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { BarCodeScanner } from 'expo-barcode-scanner'
import MyButton from '../components/MyButton'
import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Table from './Table'

export default function App() {
  const [hasPermission, setHasPermission] = useState(false)
  const [scanData, setScanData] = useState()
  const Navigation = useNavigation()

  const [devicesList, setdevicesList] = useState([])

  useEffect(() => {
    ;(async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

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

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text>Please grant camera permissions to app.</Text>
      </View>
    )
  }

  return (
    <ScrollView style={[styles.container, { height: '100%' }]}>
      <TouchableOpacity
        style={styles.backBottom}
        onPress={() => {
          Navigation.navigate('Home')
        }}
      >
        <Image
          style={{ width: 30, height: 30, transform: [{ rotate: '180deg' }] }}
          source={require('../../assets/icon/back-arrow.png')}
        />
      </TouchableOpacity>

      <View style={styles.center}>
        <View style={[styles.qrScanContainer, styles.center]}>
          <BarCodeScanner
            style={{ height: 500, width: 250, flexDirection: 'column' }}
            onBarCodeScanned={({ data }) => (!scanData ? setScanData(data) : null)}
          />

          <View style={[{ position: 'absolute' }, styles.center]}>
            <Image
              style={{ width: 200, height: 200, position: 'absolute' }}
              source={require('../../assets/icon/qr-scan-border.png')}
            />
            {scanData && (
              <MyButton
                title="rescan"
                onPress={() => setScanData(null)}
                btnStyle={{ marginTop: 20, borderWidth: 1, borderColor: 'red', margin: 20 }}
                textStyle={{ color: 'red' }}
              />
            )}
          </View>
        </View>

        <TextInput
          style={styles.resultTextScan}
          placeholderTextColor={'white'}
          value={scanData}
          onChangeText={(text) => setScanData(text)}
          keyboardType={'default'}
        />

        <MyButton
          title="save "
          onPress={() => {
            const index = devicesList.findIndex((item) => item.value === scanData)
            const data = [...devicesList]
            if (index !== -1) {
              data.splice(index, 1, { value: scanData })
            } else {
              data.push({ value: scanData })
            }
            AsyncStorage.setItem('devicesList', JSON.stringify(data), (err) => console.log({ err }))
            setdevicesList(data)
          }}
          btnStyle={{ marginTop: 20, borderWidth: 1, borderColor: '#CFCFFC', borderRadius: 20, margin: 20 }}
        />
      </View>

      <Table data={devicesList} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#1C1C23' },
  qrScanContainer: {
    height: 250,
    width: 250,
    marginTop: 50,
    backgroundColor: 'red',
    overflow: 'hidden',
    padding: 0,
    borderRadius: 20
  },
  resultTextScan: {
    borderBottomWidth: 1,
    marginBottom: 10,
    width: 200,
    color: 'white',
    borderColor: 'white',
    textAlign: 'center',
    padding: 5,
    fontSize: 18,
    marginTop: 10
  },
  navigationContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 20,
    padding: 10,
    gap: 10,
    marginBottom: 50,
    alignSelf: 'center'
  },
  inputIpContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputIp: {
    padding: 10,
    borderWidth: 0,
    fontSize: 40,
    textAlign: 'center',
    color: 'white',
    marginTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: 'white'
  },
  inputIpBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#83839C',
    borderWidth: 1,
    borderColor: '#CFCFFC',
    marginTop: 40
  },
  backBottom: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
