import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import vars from './components/Vars'
import ColorPicker from '../lib/react-native-wheel-color-picker/ColorPicker'
import MyButton from './components/MyButton'
import axios from 'axios'
import Slider from '@react-native-community/slider'
import HorizontalColorPicker from './components/HorizontalColorPicker'

const Color = () => {
  const [ipAddress, setIpAddress] = useState('')
  const [brightness, setbrightness] = useState(130)
  const [palette, setpalette] = useState(['#f26522'])
  const [existColor, setexistColor] = useState(palette[0])

  const loadIpAddress = async () => {
    try {
      const ipAddress = await AsyncStorage.getItem('ipAddress')
      if (ipAddress !== null) setIpAddress(ipAddress)
    } catch (error) {
      console.error(error)
    }
  }

  const loadPalette = async () => {
    try {
      const getPalette = await AsyncStorage.getItem('palette')
      if (getPalette !== null) setpalette(JSON.parse(getPalette))
    } catch (error) {
      console.error(error)
    }
  }

  const handleChangeColor = async () => {
    await loadIpAddress()

    let hex = existColor
    hex = hex.replace('#', '')

    const data = {
      red: `${parseInt(hex.substring(0, 2), 16)}\0\0\0`,
      green: `${parseInt(hex.substring(2, 4), 16)}\0\0\0`,
      blue: `${parseInt(hex.substring(4, 6), 16)}\0\0\0`,
      brightness: `${brightness}\0\0\0`
    }

    axios
      .post(`http://${ipAddress}:3000/color/change`, data)
      .then(async (val) => {
        if (!palette.includes(existColor)) {
          palette.unshift(existColor)
          if (palette.length > 20) setpalette(() => palette.slice(0, 20))

          try {
            await AsyncStorage.setItem('palette', JSON.stringify(palette))
            alert(JSON.stringify(val.data.payload))
            loadPalette()
          } catch (error) {
            console.error(error)
          }
        }
      })
      .catch((er) => {
        console.log(er.message)
        alert(`failed to send request http://${ipAddress}/\n` + er.message)
      })
  }

  useEffect(() => {
    const loadIp = async () => {
      await loadIpAddress()
      await loadPalette()
    }
    loadIp()
  }, [])

  return (
    <ScrollView style={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
      <View>
        <ColorPicker
          swatches={false}
          ref={(r) => (this.picker = r)}
          color={existColor}
          onColorChangeComplete={(color) => setexistColor(color)}
          thumbSize={30}
          sliderSize={30}
        />

        <HorizontalColorPicker colorList={palette} onSelectColor={(color) => setexistColor(color)} />

        <View style={styles.colorInformation}>
          <Text>color : {existColor}</Text>
          <Text>brightness : {`${Math.round(brightness / 2.5)}%`}</Text>
        </View>

        <Slider
          style={{ width: '100%', height: 20 }}
          value={brightness}
          minimumValue={0}
          maximumValue={250}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          onValueChange={(val) => setbrightness(Math.round(val))}
        />

        <MyButton title="Set color" onPress={handleChangeColor} btnStyle={{ marginTop: 20 }} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    borderWidth: 1,
    padding: 15,
    flex: 1,
    borderRadius: 30,
    margin: 10,
    marginTop: 30,
    backgroundColor: vars.color.four
  },
  colorInformation: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    padding: 10
  }
})

export default Color
