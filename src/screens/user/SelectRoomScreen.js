import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";

import { firebase } from "../../../config";

import tailwind from "twrnc";

const SelectRoomScreen = ({ navigation, route }) => {
  const [rooms, setRooms] = useState();
  const [isLoading, setLoading] = useState(true);

  const roomsRef = firebase.firestore().collection("rooms");
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      console.log("loading => ", isLoading);
      setLoading(true);
      roomsRef
        .where("floor", "==", route.params.floorName)
        // .orderBy("roomNo", "desc")
        .onSnapshot((querySnapshot) => {
          const rooms = [];
          querySnapshot.forEach((doc) => {
            const { floor } = doc.data();
            const { roomName } = doc.data();
            const { roomNo } = doc.data();
            const { roomRoute } = doc.data();
            const { routeAudio } = doc.data();

            rooms.push({
              id: doc.id,
              floor,
              roomName,
              roomNo,
              roomRoute,
              routeAudio,
            });
          });
          console.log("rooms data => ", rooms);

          setRooms(rooms);
          setLoading(false);
        });
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={[styles.mainContainer, {}]}>
      <StatusBar barStyle={"light-content"} backgroundColor="#004AAD" />

      {/* Floor Name Heading */}

      <ScrollView  style={{ width: "90%",marginTop:60,borderRadius:30,marginBottom:-700}}
        backgroundColor="#f0f4fa"
        contentContainerStyle={{ alignItems: "center", paddingTop:50}}
        horizontal={false}>
      
      {/* Displays Data in List (if loaded) */}
      {isLoading ? (
        <ActivityIndicator color={"#004AAD"} size={30} />
      ) : (
        <FlatList
          style={[
            {
              width: "100%",
            },
          ]}
          contentContainerStyle={{
            alignItems: "center",
          }}
          data={rooms}
          keyExtractor={(item) => item.id}
          numColumns={1}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[styles.button, tailwind`rounded-xl`, {}]}
              activeOpacity={0.5}
              onPress={() => navigation.navigate("RoomRoute", { room: item })}
            >
              <Text style={styles.buttonText}>{item.roomName}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      </ScrollView>

      <Text style={[styles.text3, {}]}>PISO {route.params.floorName}</Text>
    </SafeAreaView>
  );
};

export default SelectRoomScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#2b63fc",
    width: "100%",
  },

  button: {
    width: 300,
    height: 50,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#fff",
    marginBottom: 15,
    elevation: 5,
    borderWidth: 0,
    
  },

  buttonText: {
    color: "#000000",
    fontSize: 16,
    letterSpacing: 1,
  },

  text: {
    color: "#004AAD",
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 1,
    paddingHorizontal: "5%",
    paddingVertical: 10,
  },

  text2: {
    color: "#aaaeb5",
    fontSize: 15,
    fontWeight: "bold",
    letterSpacing: 1,
    paddingHorizontal: "5%",
    paddingVertical: 10,
  },

  text3: {
    marginBottom: 660,
    borderRadius: 30,
    color: "#ffffff",
    backgroundColor: "#004AAD",
    fontSize: 50,
    fontWeight: "bold",
    letterSpacing: 1,
    paddingHorizontal: "5%",
    
  },


});
