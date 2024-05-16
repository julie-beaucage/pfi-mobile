import * as React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";

import i18n, { tabTraduction } from "../translagion";
import * as Localization from "expo-localization";

const HomeScreen = ({ navigation }) => {
  /*
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.locale);

  const changeLanguage = (language) => {
    i18n.locale = language;
    setSelectedLanguage(language);
   // i18n.translations = { ...i18n.translations, [language]: tabTraduction[language] };
    console.log(i18n.locale);
    //setSelectedLanguage(language);
  };

  useEffect(() => {
    i18n.locale = selectedLanguage;
  }, [selectedLanguage]);
*/
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
                marginBottom: 16,
                color: "pink",
              }}
            >
              {i18n.t("appName")}
            </Text>
            <Text>{i18n.t("appName")}</Text>
            <Text style={{ color: "#90ee90", fontSize: 18 }}>
              {i18n.t("about")}
            </Text>
            <Text style={styles.descripHome}>{i18n.t("descriptShop")}</Text>
            <Text style={{ color: "#90ee90", fontSize: 18 }}>
              {i18n.t("suiver")}
            </Text>
            <View style={styles.containerIcon}>
              <Ionicons name="logo-facebook"size={24}color={"#90ee90"}margin={4}/>
              <Ionicons name="logo-twitter" size={24}color={"#90ee90"}margin={4}/>
              <Ionicons name="logo-instagram"size={24}color={"#90ee90"}margin={4} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  languageButton: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
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
