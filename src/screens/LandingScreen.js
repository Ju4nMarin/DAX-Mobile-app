import { Image, StyleSheet, Text, TouchableOpacity, View, ImageBackground } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
const image = { uri: "https://fondosmil.com/fondo/1.jpg" };
import tailwind from "twrnc";

const LandingScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={[styles.mainContainer, {}]}>
    <ImageBackground source={require("../../assets/images/fondo.png")} resizeMode="cover" style={styles.image}>
      
      

      {/* INICIAR/Start Button  */}
      <TouchableOpacity
        style={[styles.startButton]}
        activeOpacity={0.6}
        
        
        onPress={() => navigation.navigate("SelectFloor")}
      >
        <Text style={styles.startButtonText}>COMENZAR</Text>
      </TouchableOpacity>

    

      
    </ImageBackground>
      
    </SafeAreaView>
  );
};

export default LandingScreen;



const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    
    width: "100%",
  },

  
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  startButton: {
    paddingVertical: 10,
    width: "70%",
    marginTop: 630,
    
    borderRadius: 30,
    zIndex: 1,
    backgroundColor: "rgba(39, 123, 219, 0.6)",
    alignItems: "center",
    
  },

  startButtonText: {
    color: "#FFFFFF",
    fontSize: 40,

    fontWeight: "bold",
    letterSpacing: 1,
  },

  squareImage: {
    width: "85%",
    marginHorizontal: 30,
    marginTop: -300,
    height: undefined,
    aspectRatio: 1,
  },

  bottomBanner: {
    position: "absolute",
    bottom: 0,
    height: 240,
    width: "100%",
    resizeMode: "cover",
    aspectRatio: 1,
  },


});
