import { StyleSheet, View, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MyButton from '../components/MyButton'
import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

export default function App() {
  const Navigation = useNavigation()

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
        <MyButton
          title="Scan devices"
          btnStyle={{ margin: 10, borderWidth: 1, borderColor: '#CFCFFC' }}
          textStyle={{ fontWeight: 'bold', color: 'white' }}
          // onPress={handlesPing}
        />

        <MyButton
          title="Devices info"
          btnStyle={{ margin: 10, borderWidth: 1, borderColor: '#CFCFFC' }}
          textStyle={{ fontWeight: 'bold', color: 'white' }}
          // onPress={handleInfo}
        />

        <MyButton
          title="Net info"
          btnStyle={{ margin: 10, borderWidth: 1, borderColor: '#CFCFFC' }}
          textStyle={{ fontWeight: 'bold', color: 'white' }}
          // onPress={() => alertJson('Network information', netinfo)}
        />

        <MyButton
          title="Restart"
          // onPress={handleRestart}
          btnStyle={{ margin: 15, backgroundColor: 'red' }}
          textStyle={{ fontWeight: 'bold', color: 'black' }}
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
