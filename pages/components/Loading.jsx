import { StyleSheet, ActivityIndicator, View } from 'react-native'

const Loading = ({ size = 60, display, style }) => {
  return (
    <View style={[styles.container, { display: display === true ? 'flex' : 'none' }, style]}>
      <ActivityIndicator size={size} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    zIndex: 999
  }
})

export default Loading
