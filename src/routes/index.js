import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Login, Home, Setting, Nilai, Absen, Bayar } from "../screens";

const Stack = createStackNavigator();

export default function Route() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Tabs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused
            ? 'ios-analytics'
            : 'md-analytics';
        } else if (route.name === 'Settings') {
          iconName = focused ? 'ios-list-box' : 'ios-list';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}
  >
      <Tab.Screen name="Home" component={_First} />
      <Tab.Screen name="Settings" component={Setting} />
    </Tab.Navigator>
  );
}

const First = createStackNavigator();

function _First() {
  return (
    <First.Navigator>
      <First.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <First.Screen
        name="Nilai"
        component={Nilai}
      />
      <First.Screen
        name="Absen"
        component={Absen}
      />
      <First.Screen
        name="Bayar"
        component={Bayar}
      />
    </First.Navigator>
  );
}

