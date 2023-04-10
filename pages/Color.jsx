import { StyleSheet, Text, View, TextInput, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import vars from "./components/Vars";
import ColorPicker from "react-native-wheel-color-picker";
import MyButton from "./components/MyButton";
import axios from "axios";
import Slider from "@react-native-community/slider";

const Color = () => {
  const [ipAddress, setIpAddress] = useState("");
  const [colorBefore, setcolorBefore] = useState("#000000");
  const [brightness, setbrightness] = useState(40);

  const loadIpAddress = async () => {
    try {
      const ipAddress = await AsyncStorage.getItem("ipAddress");
      if (ipAddress !== null) setIpAddress(ipAddress);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeColor = async () => {
    await loadIpAddress();

    let hex = colorBefore;
    hex = hex.replace("#", "");

    const data = {
      red: `${parseInt(hex.substring(0, 2), 16)}\0\0\0`,
      green: `${parseInt(hex.substring(2, 4), 16)}\0\0\0`,
      blue: `${parseInt(hex.substring(4, 6), 16)}\0\0\0`,
      brightness: `${100}\0\0\0`,
    };
    console.log(data);

    axios
      .post(`http://${ipAddress}:3000/color/change`, data)
      .then((val) => {
        console.log(val.data);
        alert(JSON.stringify(val.data.payload));
      })
      .catch((er) => {
        console.log(er.message);
        alert(`failed to send request http://${ipAddress}/\n` + er.message);
      });
  };

  const handleChangetimeformat = async () => {
    const data = {
      format: 24,
    };

    axios
      .post(`http://${ipAddress}:3000/timeformat`, data)
      .then((val) => {
        console.log(val.data);
        alert(JSON.stringify(val.data.payload));
      })
      .catch((er) => {
        console.log(er);
        alert(`failed to send request http://${ipAddress}/\n` + er.message);
      });
  };

  const handleChangebrightness = async () => {
    const data = {
      brightness: 100,
    };

    axios
      .post(`http://${ipAddress}:3000/brightness`, data)
      .then((val) => {
        console.log(val.data);
        alert(JSON.stringify(val.data.payload));
      })
      .catch((er) => {
        console.log(er);
        alert(`failed to send request http://${ipAddress}/\n` + er.message);
      });
  };

  const handleChangeMode = () => {
    const data = {
      mode: "clock\0\0\0\0\0\0\0\0",
      limit: 100,
    };

    axios
      .post(`http://${ipAddress}:3000/mode`, data)
      .then((val) => {
        console.log(val.data);
        alert(JSON.stringify(val.data.payload));
      })
      .catch((er) => {
        console.log(er);
        alert(`failed to send request http://${ipAddress}/\n` + er.message);
      });
  };

  const handlePing = () => {
    axios
      .get(`http://${ipAddress}:3000/ping`)
      .then((v) => {
        console.log(`success to send request http://${ipAddress}/\n`);
      })
      .catch((er) => {
        console.log(er);
        alert(`failed to send request http://${ipAddress}/\n` + er.message);
      });
  };

  useEffect(() => {
    const loadIp = async () => {
      await loadIpAddress();
      handlePing();
    };
    loadIp();
  }, []);

  return (
    <ScrollView
      style={{
        borderWidth: 1,
        padding: 15,
        flex: 1,
        borderRadius: 30,
        margin: 10,
        marginTop: 30,
        backgroundColor: vars.color.four,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* <Text style={{textAlign: "center", fontSize: 20}}>Color</Text> */}
      {/* <Text>{netinfo}</Text> */}

      <ColorPicker
        ref={(r) => {
          this.picker = r;
        }}
        color={colorBefore}
        // swatchesOnly={true}
        // onColorChange={(color) => console.log(color)}
        onColorChangeComplete={(color) => {
          setcolorBefore(color);
          console.log("final color " + color);
        }}
        thumbSize={30}
        sliderSize={30}
        noSnap={true}
        row={false}
        // swatchesLast={this.state.swatchesLast}
        // swatches={this.state.swatchesEnabled}
        // discrete={this.state.disc}
      />
      <TextInput defaultValue={colorBefore} />
      <TextInput defaultValue={`${brightness}`} />

      <Slider
        style={{ width: "100%", height: 20 }}
        value={brightness}
        minimumValue={0}
        maximumValue={250}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        onValueChange={(val) => setbrightness(Math.round(val))}
      />

      <MyButton
        title="Set"
        onPress={handleChangeColor}
        btnStyle={{ marginTop: 50 }}
      />

      <MyButton
        title="Set"
        onPress={handleChangetimeformat}
        btnStyle={{ marginTop: 50 }}
      />

      <MyButton
        title="brightness"
        onPress={handleChangebrightness}
        btnStyle={{ marginTop: 50 }}
      />

      <MyButton
        title="mode"
        onPress={handleChangeMode}
        btnStyle={{ marginTop: 50 }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default Color;
