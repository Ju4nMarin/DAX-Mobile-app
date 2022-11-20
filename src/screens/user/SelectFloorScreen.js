import { StyleSheet, Text, TouchableOpacity, View, Image,ScrollView} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";


import tailwind from "twrnc";
import { Picker } from "@react-native-picker/picker";
import { BarCodeScanner } from "expo-barcode-scanner";


const SelectFloorScreen = ({ navigation }) => {

  


  const [selectedFloor, setSelectedFloor] = useState("SELECIONAR PISO");
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const pickerRef = useRef();
  const isFocused = useIsFocused();

  const handleOpenPicker = () => {
    pickerRef.current.focus();
  };

  useEffect(() => {
    if (useIsFocused) {
      setScanned(true);
      getBarCodeScannerPermissions();
    }
  }, [isFocused]);

  const getBarCodeScannerPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  useEffect(() => {
    if (selectedFloor !== "SELECIONAR PISO") {
      console.log(selectedFloor);
      var floorName = selectedFloor;
      setSelectedFloor("SELECIONAR PISO");
      navigation.navigate("SelectRoom", { floorName: floorName });
    }
  }, [selectedFloor]);

  const handleQRCodeScanned = ({ type, data }) => {
    setScanned(true);
    if (type === 256) setSelectedFloor(data);
  };

  return (
    <SafeAreaView style={[styles.mainContainer, {}]}>
      {/* Button: Opens Picker to SELECIONAR PISO */}
      <ScrollView  style={{ width: "90%",marginTop:30,borderRadius:30,marginBottom:50, paddingTop:0,}}
        backgroundColor="#f0f4fa"
        contentContainerStyle={{ alignItems: "center", paddingTop: 0,}}
        horizontal={false}>


      <Image
        source={require("../../screens/user/logo.png")}

        resizeMode="contain"
        style={styles.squareImage}
      />
      <TouchableOpacity
        onPress={handleOpenPicker}
        style={[styles.button,{}]}
      >
        <Text style={styles.buttonText}>{selectedFloor}</Text>

        {/* Floor Options */}
        <Picker
          style={{ display: "none", opacity: 0, height: 0, width: 0 }}
          ref={pickerRef}
          mode="dialog"
          selectedValue={selectedFloor}
          onValueChange={(itemValue, itemIndex) => setSelectedFloor(itemValue)}
        >
          <Picker.Item
            enabled={false}
            label="SELECIONAR PISO"
            value="SELECIONAR PISO"
          />
          <Picker.Item label="Piso 1" value="1" />
          <Picker.Item label="Piso 2" value="2" />
          <Picker.Item label="Piso 3" value="3" />
          <Picker.Item label="Piso 4" value="4" />
          <Picker.Item label="Piso 5" value="5" />
          <Picker.Item label="Piso 6" value="6" />
        </Picker>
      </TouchableOpacity>

      <Text style={styles.text}>O</Text>

      {/* Button: SCAN QR CODE */}
      <TouchableOpacity
        onPress={() => setScanned(false)}
        style={[styles.button, {}]}
        activeOpacity={0.5}
      >
        <Text style={styles.buttonText}>ESCANEAR QR</Text>
      </TouchableOpacity>

      {/* Displays Camera View: For QR Scanning */}
      
      <View style={styles.qrHolder}>
        {scanned ? null : (
          <BarCodeScanner
            onBarCodeScanned={handleQRCodeScanned}
            style={{ width: "100%", height: "100%" }}
            barCodeTypes={256}
          />
        )}
      </View>


      </ScrollView>
    </SafeAreaView>
  );
};

export default SelectFloorScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#2b63fc",
    width: "100%",

    
  },

  button: {
    width: "74%",
    height: 50,
    borderRadius: 30,
    backgroundColor: "#3174e0",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "2%",
    
  },

  buttonText: {
    color: "#ffffff",
    
    fontWeight: "bold",
    fontSize: 25,
    letterSpacing: 1,
  },

  text: {
    color: "#3174e0",
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 1,
  },

  squareImage: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
  },

  qrHolder: {
    width: "70%",
    height: undefined,
    paddingBottom: 0,
    aspectRatio: 1,
    marginTop: "3%",
    
  },

  squareImage: {
    marginTop:0,
    marginBottom:30,
    width: "70%",
    height: undefined,
    aspectRatio: 1,
  },


});
