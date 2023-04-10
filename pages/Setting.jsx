import { StyleSheet, Text, View, TextInput, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import vars from "./components/Vars";
import ConnectWifi from "./ConnectWifi";
import MyButton from "./components/MyButton";
import axios from "axios";

const Setting = () => {
  const [netinfo, setnetinfo] = useState("");

  const [ipAddress, setIpAddress] = useState("");
  vars.ipAddress = ipAddress;

  const loadIpAddress = async () => {
    try {
      const ipAddress = await AsyncStorage.getItem("ipAddress");
      if (ipAddress !== null) {
        setIpAddress(ipAddress);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handlePing = () => {
    axios
      .get(`http://${ipAddress}:3000/ping`)
      .then((val) => {
        alert(`Success to send request \nhttp://${ipAddress}/\n`);
      })
      .catch((er) => {
        console.log(er);
        alert(`failed to send request \nhttp://${ipAddress}/\n` + er.message);
      });
  };

  useEffect(() => {
    loadIpAddress();

    NetInfo.fetch().then((state) => {
      console.log(state);
      setnetinfo(JSON.stringify(state));
    });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: vars.color.four }}>
      <View
        style={{
          // flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <Text>Click to set target IP address:</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "gray",
            padding: 10,
            borderWidth: 0,
            fontSize: 40,
            textAlign: "center",
          }}
          placeholder="IP address"
          value={ipAddress}
          onChangeText={async (val) => {
            setIpAddress(val);
            try {
              await AsyncStorage.setItem("ipAddress", val);
              console.log(`IP address saved successfully : ${val}`);
            } catch (error) {
              console.error(error);
            }
          }}
          keyboardType="number-pad"
        />
        <MyButton
          title={"ping"}
          textStyle={{ fontSize: 10 }}
          btnStyle={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 5,
          }}
          onPress={handlePing}
        />
      </View>

      <ScrollView
        style={{
          borderWidth: 1,
          padding: 15,
          flex: 1,
          borderRadius: 30,
          margin: 10,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text>Setting</Text>
        {/* <Text>{netinfo}</Text> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Setting;
