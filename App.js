import React, { useState, createContext, useContext } from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./pages/home";
import BoutiqueScreen from "./pages/boutique";
import CartScreen from "./pages/panier";
import { PanierContext } from "./pages/global";
import i18n from "./translagion";
import CartStack from "./pages/stackPanier";
//import { I18n } from "i18n-js";
import ProductList from './pages/listeProduit';
import { ConnectionPage, SignUpPage, DBRegister, DBConnect } from './pages/connexion'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AddAdmin, createUsersTable } from './pages/bd';
import { MapScreen } from './pages/map';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  useEffect(()=> {
    AddAdmin();
  },[])
  return (
    <PanierContext.Provider value={{ panier, setPanier }}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Connection' component={ConnectionPage} />
        <Stack.Screen name="Register" component={SignUpPage} />
        <Stack.Screen name='tabNav' component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
    </PanierContext.Provider>
  );
}
const TabNavigator = ({navigation, route}) => {
  const {admin} = route.params;
  if(admin == 1){
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} 
          options={{ tabBarIcon: ({ focused }) => <Ionicons name="home" size={24} color={focused ? "blue" : "lightblue"} /> }} />
        <Tab.Screen name='Map' component={MapScreen}
          options={{ tabBarIcon: ({ focused }) => <Ionicons name="map" size={24} color={focused ? "blue" : "lightblue"} /> }} />
        <Tab.Screen name="ListeProduits" component={ProductList}
          options={{ tabBarIcon: ({ focused }) => <Ionicons name="storefront" size={24} color={focused ? "blue" : "lightblue"} />, headerShown: false  }}/>
      </Tab.Navigator>
    );
  }else{
    return (
      <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarLabel: i18n.t("home"),
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  name="home"
                  size={24}
                  color={focused ? "#ff1493" : "#90ee90"}
                />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Cart"
            component={CartStack}
            options={{
              tabBarLabel: i18n.t("cart"),
              tabBarIcon: ({ focused }) => {
                return (
                  <Ionicons
                    name="cart"
                    size={24}
                    color={focused ? "#ff1493" : "#90ee90"}
                  />
                );
              },
              headerShown: false,
            }}
          />
          <Tab.Screen name="Boutique" component={BoutiqueScreen}
            options={{
              tabBarLabel: i18n.t("shop"),
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  name="storefront"
                  size={24}
                  color={focused ? "#ff1493" : "#90ee90"}
                />
              ),
              headerShown: false,
            }}
          />
        </Tab.Navigator>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  appName: {
    marginTop: 35,
    fontSize: 30,
    color: "white",
    backgroundColor: "#38f",
    width: "100%",
    height: "auto",
  },
  produitContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  produitInfo: {
    marginLeft: 10,
  },
  produitNom: {
    fontSize: 18,
    fontWeight: "bold",
  },
  produitPrix: {
    fontSize: 16,
    color: "green",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  description: {
    fontSize: 16,
    marginTop: 10,
  },
});
