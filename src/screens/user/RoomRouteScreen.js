import {
  ActivityIndicator,
  Alert,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Audio } from "expo-av";

import { MaterialIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";

import { firebase } from "../../../config";

import tailwind from "twrnc";

const RoomRouteScreen = ({ navigation, route }) => {
  const [sound, setSound] = useState(null);
  const [steps, setSteps] = useState(route.params.room.roomRoute);
  const [selected, setSelected] = useState(route.params.room.roomRoute);
  const [schedule, setSchedule] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isPlaying, setPlaying] = useState(false);

  const isFocused = useIsFocused();
  const scheduleRef = firebase
    .firestore()
    .collection("rooms/" + route.params.room.id + "/schedule");

  useEffect(() => {
    if (isFocused) {
      setLoading(true);

      setSelected((step) => {
        return step.map((item, index) => {
          return false;
        });
      });

      loadSound();

      scheduleRef.onSnapshot((querySnapshot) => {
        const schedule = [];
        querySnapshot.forEach((doc) => {
          const { classDay } = doc.data();
          const { className } = doc.data();
          const { classTime } = doc.data();

          schedule.push({
            id: doc.id,
            classDay,
            className,
            classTime,
          });
        });
        setSchedule(schedule);
        setLoading(false);
      });
    }
  }, [isFocused]);

  const playSound = async () => {
    if (sound) {
      console.log("Sonando");
      setPlaying(true);

      await sound.playAsync();
    } else {
      Alert.alert("El audio no se ha cargado", "Espere unos segundos..");
    }
  };

  const pauseSound = async () => {
    console.log("Parado");
    setPlaying(false);
    await sound.pauseAsync();
  };

  const loadSound = async () => {
    console.log("Carganado");

    const { sound } = await Audio.Sound.createAsync({
      uri: route.params.room.routeAudio,
    });
    setSound(sound);
  };

  const handleChecked = (obj) => {
    setSelected((step) => {
      return step.map((item, index) => {
        if (index === obj && item) {
          return false;
        } else if (index === obj && !item) {
          return true;
        } else {
          return item;
        }
      });
    });
  };

  return (
    <SafeAreaView style={[styles.mainContainer, {}]}>
      <StatusBar barStyle={"light-content"} backgroundColor="#004AAD" />
      <View style={styles.container}>
        {/* Room Name Heading */}
        <Text style={[styles.text, {}]}>
          Sala: {route.params.room.roomName}
        </Text>
        <Text style={[styles.text2, {}]}>
          Marque el paso al finalizar una meta.
        </Text>
        {/* Room Route List */}
        <FlatList
          style={[
            {
              marginHorizontal: "5%",
              padding: 5,
              borderWidth: 1,
              borderColor: "#004AAD",
              marginVertical: 5,
            },
            tailwind`rounded-xl`,
          ]}
          data={steps}
          keyExtractor={(item, index) => index}
          numColumns={1}
          renderItem={({ item, index }) => (
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                margin: 5,
              }}
            >
              <TouchableOpacity
                onPress={() => handleChecked(index)}
                style={{ marginRight: 5 }}
                activeOpacity={0.5}
              >
                <MaterialIcons
                  name={
                    selected[index] ? "check-circle" : "check-circle-outline"
                  }
                  size={22}
                  color={selected[index] ? "#0FB81D" : "#F73D52"}
                />
              </TouchableOpacity>
              <Text
                style={[
                  {
                    width: "100%",
                    textAlignVertical: "center",
                    color: selected[index] ? "#C6C6C6" : "#000000",
                  },
                  tailwind`rounded-l-xl`,
                ]}
              >
                <Text
                  style={[
                    {
                      fontWeight: "bold",
                    },
                  ]}
                >
                  PASO {index + 1}:{" "}
                </Text>
                {item}
              </Text>
            </View>
          )}
        />

        {/* Audio Player Button */}
        <TouchableOpacity
          onPress={isPlaying ? pauseSound : playSound}
          style={[
            styles.button,
            tailwind`rounded-xl`,
            { flexDirection: "row" },
          ]}
          activeOpacity={0.5}
        >
          <MaterialIcons
            name={isPlaying ? "pause" : "play-arrow"}
            size={30}
            color={"#FFFFFF"}
            style={{ marginLeft: -8, marginRight: 5 }}
          />
          <Text style={styles.buttonText}>
            {isPlaying ? "Parar " : "Iniciar "}Audio
          </Text>
        </TouchableOpacity>

        {/* Schedule Heading */}
        <Text style={[styles.text, {}]}>Horario</Text>

        {/* Schedule Table Headings */}
        <View
          style={{
            width: "90%",
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 5,
          }}
        >
          <Text
            style={[
              {
                width: "33%",
                padding: 5,
                borderWidth: 1,
                borderColor: "#004AAD",
                backgroundColor: "#004AAD",
                color: "#ffffff",
                textAlign: "center",
                textAlignVertical: "center",
              },
              tailwind`rounded-l-xl`,
            ]}
          >
            Curso
          </Text>

          <Text
            style={[
              {
                width: "25%",
                padding: 5,
                borderWidth: 1,
                borderColor: "#ffffff",
                borderTopColor: "#004AAD",
                borderBottomColor: "#004AAD",
                backgroundColor: "#004AAD",
                color: "#ffffff",
                textAlign: "center",
                textAlignVertical: "center",
              },
              tailwind``,
            ]}
          >
            Dias
          </Text>

          <Text
            style={[
              {
                width: "42%",
                padding: 5,
                borderWidth: 1,
                borderColor: "#004AAD",
                backgroundColor: "#004AAD",
                color: "#ffffff",
                textAlign: "center",
                textAlignVertical: "center",
              },
              tailwind`rounded-r-xl`,
            ]}
          >
            Horas
          </Text>
        </View>

        {/* Schedule Table List */}

        {isLoading ? (
          <ActivityIndicator color={"#004AAD"} size={30} />
        ) : (
          <FlatList
            style={{
              marginHorizontal: "5%",
            }}
            data={schedule}
            keyExtractor={(item) => item.id}
            numColumns={1}
            renderItem={({ item }) => (
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: 5,
                }}
              >
                <Text
                  style={[
                    {
                      width: "33%",
                      padding: 5,
                      borderWidth: 1,
                      borderColor: "#004AAD",
                      textAlign: "center",
                      textAlignVertical: "center",
                    },
                    tailwind`rounded-l-xl`,
                  ]}
                >
                  {item.className}
                </Text>

                <Text
                  style={[
                    {
                      width: "25%",
                      padding: 5,
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                      borderColor: "#004AAD",
                      textAlign: "center",
                      textAlignVertical: "center",
                    },
                    tailwind``,
                  ]}
                >
                  {item.classDay}
                </Text>

                <Text
                  style={[
                    {
                      width: "42%",
                      padding: 5,
                      borderWidth: 1,
                      borderColor: "#004AAD",
                      textAlign: "center",
                      textAlignVertical: "center",
                    },
                    tailwind`rounded-r-xl`,
                  ]}
                >
                  {item.classTime}
                </Text>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default RoomRouteScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff",
    width: "100%",
    paddingVertical: 25,
  },

  container: {
    width: "100%",
    alignItems: "center",
    marginTop: -25,
    paddingTop: 20,
  },

  button: {
    height: 50,
    paddingHorizontal: 25,
    backgroundColor: "#004AAD",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    marginVertical: "3%",
    marginLeft: "5%",
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    letterSpacing: 1,
  },

  text: {
    color: "#004AAD",
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 1,
    alignSelf: "flex-start",
    paddingHorizontal: "5%",
  },

  text2: {
    color: "#aaaeb5",
    fontSize: 13,
    fontWeight: "bold",
    marginLeft: 2,
    letterSpacing: 1,
    alignSelf: "flex-start",
    paddingHorizontal: "5%",
  },

  squareImage: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
  },

  qrHolder: { width: "50%", marginTop: "10%" },
});
