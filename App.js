import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './pages/home';
import BoutiqueScreen from './pages/boutique';
import CartScreen from './pages/panier';
import ProductList from './pages/listeProduit';
import { ConnectionPage, SignUpPage } from './pages/connexion'
import { Stack } from './App';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Connect" component={ConnectionPage} />
        <Tab.Screen name="Register" component={SignUpPage} />
        <Tab.Screen name="ListeProduits" component={ProductList}
          options={{ tabBarIcon: ({ focused }) => <Ionicons name="productList" size={24} color={focused ? "blue" : "lightblue"} /> }}/>
        <Tab.Screen name="Home" component={HomeScreen} 
          options={{ tabBarIcon: ({ focused }) => <Ionicons name="home" size={24} color={focused ? "blue" : "lightblue"} /> }} />
        <Tab.Screen name="Cart" component={CartScreen}
          options={{ tabBarIcon: ({ focused }) => <Ionicons name="cart" size={24} color={focused ? "blue" : "lightblue"} /> }} />
        <Tab.Screen name="Boutique" component={BoutiqueScreen}
          options={{ tabBarIcon: ({ focused }) => <Ionicons name="storefront" size={24} color={focused ? "blue" : "lightblue"} />, headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const SearchScreen = () => <View><Text>Search screen</Text></View>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    marginTop: 35,
    fontSize: 30,
    color: 'white',
    backgroundColor: '#38f',
    width: '100%',
    height: 'auto'
  },
  produitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  produitInfo: {
    marginLeft: 10,
  },
  produitNom: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  produitPrix: {
    fontSize: 16,
    color: 'green',
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
