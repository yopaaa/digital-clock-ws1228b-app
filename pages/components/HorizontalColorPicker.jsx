import { useEffect, useState } from 'react'
import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'

const ColorPicker = ({ colorList, onSelectColor }) => {
  const [ColorList, setColorList] = useState()
  const handleColorPress = (color) => {
    onSelectColor(color)
  }

  useEffect(() => {
    setColorList(() => {
      return colorList.map((color) => (
        <TouchableOpacity
          key={color}
          style={[styles.colorOption, { backgroundColor: color }]}
          onPress={() => handleColorPress(color)}
        />
      ))
    })
  }, [colorList])

  return (
    <View style={{ backgroundColor: '#ffffff', borderRadius: 50, overflow: 'hidden', marginVertical: 20 }}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
        {ColorList}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 10
  },
  colorOption: {
    height: 30,
    width: 30,
    borderRadius: 15
  }
})

export default ColorPicker
