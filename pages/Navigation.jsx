import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import vars from './components/Vars'
import { useNavigation } from '@react-navigation/native'

const Navigation = () => {
  const navigation = useNavigation()
  const [page, setpage] = useState('Timer')

  return (
    <View
      style={{
        backgroundColor: vars.color.tree,
        // opacity: 0.4,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        height: 80,
        borderRadius: 20,
        margin: 10
      }}
    >
      <TouchableOpacity
        style={page === 'Color' ? styles.existPage : ''}
        onPress={() => {
          setpage('Color')
          navigation.navigate('Color')
          // console.log(navigation.isFocused());
          // navigation.addListener("focus")
        }}
      >
        <Text style={styles.navText}>Color</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={page === 'Setting' ? styles.existPage : ''}
        onPress={() => {
          setpage('Setting')
          navigation.navigate('Setting')
        }}
      >
        <Text style={styles.navText}>Setting</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  navText: {
    color: vars.color.four,
    fontSize: 20,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    padding: 20
  },
  existPage: {
    backgroundColor: vars.color.two,
    borderRadius: 20
  }
})

export default Navigation
