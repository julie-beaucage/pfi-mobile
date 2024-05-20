import React from "react";
import { View, Text, StyleSheet, Button,Image } from "react-native";
import i18n from "../translagion";

const OrderConfirmationScreen = ({ route, navigation }) => {
  const { totalAmount } = route.params;

  return (
    <View style={styles.container}>
        <Image
        source={require("../images/thank.png")}
         style={styles.logo}
        />
      <Text style={styles.message}>
        Votre commande a été effectuée. Le montant de {totalAmount}$ a été prélevé.
      </Text>
      <Button
        title="Retour à la boutique"
        onPress={() => navigation.navigate('CartScreen')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor:'pink'
  },
  message: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  logo: {
    width: 400,
    height: 200,
    resizeMode: "contain",
  },
});

export default OrderConfirmationScreen;
