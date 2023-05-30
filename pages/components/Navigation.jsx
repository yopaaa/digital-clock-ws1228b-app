import { StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import vars from './Vars'

const Navigation = (props) => {
  const { pageList = [], defaultPage } = props
  const navigation = useNavigation()
  const [page, setpage] = useState(defaultPage)

  return (
    <View style={styles.container}>
      {pageList.map((val) => {
        const imageSrc = {
          Color: require('../../assets/Color-icon.png'),
          Customize: require('../../assets/Customize-icon.png'),
          Setting: require('../../assets/Setting-icon.png')
        }
        return (
          <TouchableOpacity
            key={val}
            style={page === val ? styles.existPage : ''}
            onPress={() => {
              setpage(val)
              navigation.navigate(val)
            }}
          >
            {/* <Text style={styles.navText}>{val}</Text> */}
            <Image
              // source={{ uri: 'assets:/icon.png' }}
              source={imageSrc[val]}
              style={{ width: 40, height: 40 }}
            />
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#A2A2B5',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    height: 80,
    borderRadius: 20,
    margin: 20,
    marginTop: 0
  },
  navText: {
    color: vars.color.four,
    fontSize: 20,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    padding: 20
  },
  existPage: {
    backgroundColor: vars.color.one,
    borderRadius: 20
  }
})

export default Navigation
