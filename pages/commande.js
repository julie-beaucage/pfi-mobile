import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import i18n from "../translagion";

const OrderConfirmationScreen = ({ route, navigation }) => {
  const { totalAmount } = route.params;

  return (
    <View style={styles.container}>
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
  },
  message: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
});

export default OrderConfirmationScreen;
