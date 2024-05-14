
import * as React from 'react';
import{ useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
} from 'react-native';

//import {I18n} from 'i18n-js';
import i18n, { changeLanguage } from '../lang/i18n';
import * as Localization from 'expo-localization';

  const HomeScreen = ({ navigation }) => {
    const languages = [
      { label: 'English', value: 'en' },
      { label: 'French', value: 'fr' },
      // Add more languages as needed
    ];
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

    //const [locale, setLocale] = useState(Localization.locale.split('-')[0]);
    //const i18n = new I18n({ translations, locale });

  /*const changeLanguage = (language) => {
    const newLocale = language === 'en' ? 'fr' : 'en';
    setLocale(newLocale);
    console.log(`Langue changée en ${language}`);
    console.log(`Traduction de 'appName': ${i18n.t('appName')}`);
  };*/
  /*
  const changeLanguage = (language) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
  };*/
  return (
    <SafeAreaView style={{ flex: 1}}>
      <View style={{ flex: 1, padding: 16,backgroundColor: 'black' }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'black'
          }}>
             <View style={styles.imageContainer}>
            <Image
              source={{uri:'https://shop.jazwares.com/cdn/shop/t/72/assets/squish-logo_400x400.png?v=98334855678520654001709664152'}}
              style={styles.logo}
              resizeMode="cover"
            />
              <Image
              source={require('../images/intro.webp')}
              style={styles.logo}
            />
          </View>
          <Text
            style={{
              fontSize: 25,
              textAlign: 'center',
              marginBottom: 16,
            }}>
          </Text>
          <Text
              style={{
                fontSize: 30,
                textAlign: 'center',
                marginBottom: 16,
                color: 'pink',
              }}>
              {i18n.t("home.appName")}
            </Text>
            {console.log(i18n.t('appName'))}
          <View style={{ flexDirection: 'row', marginTop: 16 }}>
          <Text>Sélectionner la langue</Text>
          <View style={styles.languageContainer}>
          <TouchableOpacity
  style={[styles.button, selectedLanguage === 'fr' && { backgroundColor: 'gray' }]}
  onPress={() => changeLanguage('fr')}>
  <Text>Français</Text>
</TouchableOpacity>
<TouchableOpacity
  style={[styles.button, selectedLanguage === 'en' && { backgroundColor: 'gray' }]}
  onPress={() => changeLanguage('en')}>
  <Text>English</Text>
</TouchableOpacity>
      </View>
          </View>
          </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 'auto',
    margin:16
  },
  imageContainer: {
    borderWidth: 2,
    borderColor: 'pink',
    borderRadius: 10,
    padding: 10,
  },
  logo: {
    width: 400,
    height: 200,
    resizeMode: 'contain',
  },
});
export default HomeScreen;
