import * as React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
//import { useFonts, MyCustomFont } from '@expo-google-fonts/my-custom-font';

import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";

import i18n, { tabTraduction } from "../translagion";

const HomeScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    "my-custom-font": require("../assets/fonts/test.ttf"),
  });
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, padding: 16, backgroundColor: "black" }}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "black",
            }}
          >
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: "https://shop.jazwares.com/cdn/shop/t/72/assets/squish-logo_400x400.png?v=98334855678520654001709664152",
                }}
                style={styles.logo}
                resizeMode="cover"
              />
              <Image
                source={require("../images/intro.webp")}
                style={styles.logo}
              />
            </View>
            <Text
              style={{
                fontSize: 25,
                textAlign: "center",
                marginBottom: 16,
              }}
            ></Text>
            <Text
              style={{
                fontSize: 30,
                textAlign: "center",
                color: "pink",
                fontFamily: "my-custom-font",
              }}
            >
              {i18n.t("shop")}
            </Text>
            <Text
              style={{
                fontSize: 30,
                textAlign: "center",
                marginBottom: 16,
                color: "pink",
                fontFamily: "my-custom-font",
              }}
            >
              {i18n.t("appName")}
            </Text>
            <Text style={{ color: "#90ee90", fontSize: 18 }}>
              {i18n.t("about")}
            </Text>
            <Text style={styles.descripHome}>{i18n.t("descriptShop")}</Text>
            <Text style={{ color: "#90ee90", fontSize: 18 }}>
              {i18n.t("suiver")}
            </Text>
            <Text style={{ color: "#90ee90", fontSize: 18 }}>
              Julie Beaucage
            </Text>
            <View style={styles.containerIcon}>
              <Ionicons
                name="logo-facebook"
                size={24}
                color={"#90ee90"}
                margin={4}
              />
              <Ionicons
                name="logo-twitter"
                size={24}
                color={"#90ee90"}
                margin={4}
              />
              <Ionicons
                name="logo-instagram"
                size={24}
                color={"#90ee90"}
                margin={4}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  descripHome: {
    color: "#b0e0e6",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: "auto",
    margin: 16,
  },
  imageContainer: {
    borderWidth: 2,
    borderColor: "pink",
    borderRadius: 10,
    padding: 10,
  },
  logo: {
    width: 400,
    height: 200,
    resizeMode: "contain",
  },
});
export default HomeScreen;
