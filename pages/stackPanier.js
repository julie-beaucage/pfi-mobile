import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CartScreen from './panier';
import OrderConfirmationScreen from './commande';
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, } from "react-native";
import i18n from "../translagion";

const Stack = createNativeStackNavigator();

const CartStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Panier" component={CartScreen}
          options={({ navigation }) => ({
            title: i18n.t("return"),
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Boutique")}>
                <Ionicons  name="arrow-back-outline" size={24}></Ionicons>
              </TouchableOpacity>
            ),
            headerLeftContainerStyle: { paddingLeft: 15 },
          })}
        />
        <Stack.Screen
          name="OrderConfirmation"
          component={OrderConfirmationScreen}
          options={{ title: "Confirmation de commande" }}
        />
      </Stack.Navigator>
    );
  };
  
export default CartStack;
