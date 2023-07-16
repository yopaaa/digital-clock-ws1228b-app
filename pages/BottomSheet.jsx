import { View, StyleSheet, Text } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { useEffect, useRef } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import Color from './Color'
import Customize from './Customize'

const BottomSheet = () => {
  const bottonSheetModalRef = useRef(null)

  const snapPoints = ['10%', '80%']

  function showSheet() {
    bottonSheetModalRef.current?.present()
  }
  useEffect(() => {
    showSheet()
  }, [])
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <View style={styles.container}>
          <Color />
          <StatusBar style="auto" />
          <BottomSheetModal
            onDismiss={(x) => showSheet()}
            ref={bottonSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            backgroundStyle={{ borderRadius: 30, backgroundColor: '#333333' }}
          >
            <BottomSheetScrollView>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 20,
                    fontWeight: '700',
                    letterSpacing: 3
                  }}
                >
                  Customize
                </Text>
              </View>
              <Customize />
            </BottomSheetScrollView>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default BottomSheet
