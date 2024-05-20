
import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';



const en = {
    appName: 'Squismallow Dreams',
    home:'home',
    about:"About Us",
    descriptShop:
    "Squismallow Dream is the result of a happy accident in a small workshop tucked away in a forgotten corner of the world. Created by a quirky inventor with a penchant for dreaming, each Squismallow Dream is lovingly handmade from recycled materials found in nearby scrapyards",
    suiver:"Follow Us",
    shop:'Shop',

    cart:'Cart',
    addCart:'Add to cart',
    return:'Return to the shop',
    buttonCommand:'Check Out',
    buttonClear:'Clear cart',
    panier: "My Cart",
    sousTotal: "Sub-Total",
    resumerPanier:"Cart Summary",
    tax: "Estimated taxes",
    quantite:"Quantity",
    total: "Total",
    buttonContinu:"Continu Shopping",
    supprimer: "Delete",
    commander: "Order",

};
const fr = {
    appName: 'Rêves de Squismallow',
    home:"Accueil",
    about:"À propos de nous",
    descriptShop:"Squismallow Dream est le fruit d'un heureux accident survenu dans un petit atelier caché dans un coin oublié du monde. Créé par un inventeur excentrique avec un penchant pour le rêve, chaque Squismallow Dream est fabriqué avec amour à partir de matériaux recyclés trouvés dans les ferrailles voisines",
    suiver:"Suivez nous",
    shop:'Boutique',

    cart:'Panier',
    return:'Retour à la boutique',
    addCart:'Ajouter au panier',
    buttonCommand:'Passer la commande',
    buttonClear:'Vider le panier',
    panier: "Mon Panier",
    sousTotal: "Sous-Total",
    resumerPanier:"Résumé du panier",
    tax: "Taxes estimées",
    quantite:"Quantité",
    total: "Total",
    supprimer: "Supprimer",
    commander: "Commander",
    bienvenue: "Bienvenue",


};

export const tabTraduction = {
    "en-US": en,
    "en-CA": en,
    "fr-CA": fr,
    "fr-FR": fr,
  };

  const paramètresLocaux = Localization.getLocales();
  const langue_région = paramètresLocaux[0].languageTag;
  
  export const i18n = new I18n(tabTraduction);
  i18n.locale = langue_région;
  i18n.defaultLocale = "fr-CA"
  i18n.enableFallback = true
  
  
  export const currencyFormatter = new Intl.NumberFormat(langue_région,
      { style: 'currency', currency: 'CAD' });

export default i18n;
