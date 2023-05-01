import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
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
        return (
          <TouchableOpacity
            key={val}
            style={page === val ? styles.existPage : ''}
            onPress={() => {
              setpage(val)
              navigation.navigate(val)
            }}
          >
            <Text style={styles.navText}>{val}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: vars.color.tree,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    height: 80,
    borderRadius: 20,
    margin: 10
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
