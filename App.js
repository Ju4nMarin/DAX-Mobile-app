import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LandingScreen from "./src/screens/LandingScreen";
import SelectFloorScreen from "./src/screens/user/SelectFloorScreen";
import SelectRoomScreen from "./src/screens/user/SelectRoomScreen";
import RoomRouteScreen from "./src/screens/user/RoomRouteScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing" component={LandingScreen} />

        {/* User Screens */}
        <Stack.Screen name="SelectFloor" component={SelectFloorScreen} />
        <Stack.Screen
          name="SelectRoom"
          component={SelectRoomScreen}
          options={{
            headerShown: true,
            title: "Selecionar Sala",
            headerTintColor: "#ffffff",
            headerStyle: {
              backgroundColor: "#004AAD",
            },
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="RoomRoute"
          component={RoomRouteScreen}
          options={{
            headerShown: true,
            title: "Ruta",
            headerTintColor: "#ffffff",
            headerStyle: {
              backgroundColor: "#004AAD",
            },
            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
