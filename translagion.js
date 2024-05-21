
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
    alerteTitre: "Delete Item",
    alerteMessage: "Are you sure you want to delete this item from the cart?",
    alerteCancer: "Cancel",
    alerteYes: "Yes",
    etatPanier:"Your cart is currently empty",

    alerteTitre2: "Clear Cart",
    alerteMessage2: "Are you sur you want to clear your cart?",
    orderConfirmation: "Your order has been placed. The amount of {{totalAmount}}$ has been charged.",
    snackbar: "SquishMallow {{nom}} has been added to your cart.",



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
    alerteTitre: "Supprimer l'article",
    alerteMessage: "Êtes-vous sûr de vouloir supprimer cet article du panier ?",
    alerteCancer: "Annuler",
    alerteYes: "Oui",
    etatPanier:"Votre panier est actuellement vide.",
    alerteTitre2: "Vider le panier",
    alerteMessage2: "Êtes-vous sûr de vouloir supprimer tous les articles du panier ?",
    orderConfirmation: "Votre commande a été effectuée. Le montant de {{totalAmount}}$ a été prélevé.",

    snackbar: "SquishMallow {{nom}} a été ajouté au panier",


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
