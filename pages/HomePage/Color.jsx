import ColorPicker from '../../lib/react-native-wheel-color-picker/ColorPicker'
import HorizontalColorPicker from '../components/HorizontalColorPicker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StyleSheet, View, ScrollView } from 'react-native'
import Slider from '@react-native-community/slider'
import ColorInformation from './ColorInformation'
import MyButton from '../components/MyButton'
import { useEffect, useState } from 'react'
import Nav from './Nav'
import Paho from 'paho-mqtt'

const Color = ({ isConnectedMqtt, clientMqtt, selectedDevices }) => {
  const [brightness, setbrightness] = useState(130)
  const [palette, setpalette] = useState(['#f26522'])
  const [existColor, setexistColor] = useState(palette[0])

  const loadPalette = async () => {
    try {
      const getPalette = await AsyncStorage.getItem('palette')
      if (getPalette !== null) {
        const parsePalette = JSON.parse(getPalette)
        setpalette(parsePalette)
        setexistColor(parsePalette[0])
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleChangeColor = async () => {
    let hex = existColor
    hex = hex.replace('#', '')

    const data = {
      red: parseInt(hex.substring(0, 2), 16),
      green: parseInt(hex.substring(2, 4), 16),
      blue: parseInt(hex.substring(4, 6), 16),
      brightness
    }

    const message = new Paho.Message(JSON.stringify(data))
    message.destinationName = selectedDevices + '-color'
    clientMqtt.send(message)

    if (!palette.includes(existColor)) {
      palette.unshift(existColor)
      if (palette.length > 20) setpalette(() => palette.slice(0, 20))

      try {
        await AsyncStorage.setItem('palette', JSON.stringify(palette))
        loadPalette()
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    ;(async () => {
      try {
        await loadPalette()
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
        <Nav isConnected={isConnectedMqtt} />
        <View style={styles.colorPickerContainer}>
          <ColorPicker
            style={{ marginTop: -20 }}
            swatches={false}
            ref={(r) => (this.picker = r)}
            color={existColor}
            onColorChangeComplete={(color) => setexistColor(color)}
            thumbSize={30}
            sliderSize={30}
          />

          <HorizontalColorPicker colorList={palette} onSelectColor={(color) => setexistColor(color)} />

          <ColorInformation
            brightness={brightness}
            existColor={existColor}
            onChangeColor={(color) => (color.length === 5 ? setexistColor(color) : '')}
            onChangeBrightness={(val) => setbrightness(Math.round(Number(val) * 2.5))}
          />

          <Slider
            style={{ width: '100%', height: 20 }}
            value={brightness}
            minimumValue={0}
            maximumValue={250}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            onValueChange={(val) => setbrightness(Math.round(val))}
          />

          <MyButton
            title="Set color"
            onPress={handleChangeColor}
            btnStyle={{ marginTop: 20, borderWidth: 1, borderColor: '#CFCFFC', borderRadius: 20, margin: 20 }}
          />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    height: '100%',
    backgroundColor: '#1A1A1A'
  },
  scrollViewContainer: {
    flex: 1,
    borderRadius: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  colorPickerContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    padding: 25
  }
})

export default Color
