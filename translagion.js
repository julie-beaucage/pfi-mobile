
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
    total: "Total",
    buttonContinu:"Continu Shopping",
    supprimer: "Delete",
    commander: "Order",


    
    products: {
      1: {
        Nom: 'Miriam the Little Cake Cat',
        description: 'Miriam is a dance instructor who teaches young royals how to waltz! She delights in helping future kings and queens fulfill their duties on the dance floor, and only asks for invitations to royal balls in return!',
      },
      2: {
        Nom: "Monica the Purple Axolotl",
        description: 'This ultra-squishy plush is made with high-quality, ultra-soft materials. Add this adorable plush to your Squishmallows collection. Perfect for Squishmallows fans of all ages, this collectible item is great for cuddling while relaxing at home, watching a movie, on long car rides, pajama parties, plane trips, or just having old-fashioned fun!',
      },
      3:{
        Nom:"Wyatt the Frog",
        description:"Wyatt loves shooting hoops at home with his big sister, Wendy! These two ‘Mallows play pickup basketball all the way until dinner time. This year, Wyatt became a mathlete, so playing a fun game is just what he needs to stay sharp in between competitions.",
      },
      4:{
        Nom:"Marjorie the Naked Mole Rat",
        description:"Marjorie is known as the queen of many things. She's the reigning Miss 'Mallow, was voted prom queen at her high school, and 'most likely to make a difference in the world.' Marjorie remains humble even with all the accolades and knows that being the queen of kindness matters most",
      },
      5:{
        Nom:"Camera the Calico Cat",
        description:"Cam loves going in and out of boxes and building forts with his friends, Hoot and Wendy. He also enjoys going to the beach for naps or spending time with friends, but he's always up for an adventure!",
      },
      6:{
        Nom:"Warren the Boar",
        description:"If you're always in the mood for a laugh, Warren is the Mauve for you! This boar tests all his jokes on his pals before doing his stand-up routine at a comedy club. Warren jokes a lot about himself and his wacky childhood. Did you know he has 10 siblings?",
      },
      7:{
        Nom:"Felipe the Goblin",
        description:"Felipe was recently crowned kickball king at his school. And for good reason: he's always the last one standing! No one knows how this goblin manages to sway and dodge with such speed and grace. But if you ask him, Felipe says his secret is a daily multivitamin!",
      },
      8:{
        Nom:"Armand the Swamp Monster",
        description:"Armand is a versatile actor who can do it all: cry in dramas, fall in comedies, even breathe underwater! Thanks to his special gills, Armand takes on lead roles for both terrestrial and aquatic characters. Now, he hopes this latest movie will earn him the golden statue he's always dreamed of.",
      },
    }
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
    total: "Total",
    supprimer: "Supprimer",
    commander: "Commander",
    bienvenue: "Bienvenue",
    probAuthen: "Problèmes communs reliés à l'authentification",
    products: {
      1: {
        Nom: 'Miriam le chat petit gâteau',
        description: 'Miriam est une professeure de danse qui apprend aux jeunes membres de la famille royale à valser ! Elle se réjouit d’aider les futurs rois et reines à remplir leurs devoirs sur la piste de danse, et ne demande en retour que des invitations aux bals royaux !',
      },
      2: {
        Nom: "Monica l'axolotl violet",
        description: 'Cette peluche ultra-compressible...',
      },
      3:{
        Nom:"Wyatt la grenouille",
        image:"https://shop.jazwares.com/cdn/shop/files/Vig_2000x.jpg",
        description:"Wyatt adore tirer au panier à la maison avec sa grande sœur, Wendy ! Ces deux 'Mallows jouent au basket-ball jusqu’à l’heure du dîner. Cette année, Wyatt est devenu un mathlète, donc jouer un jeu amusant est exactement ce dont il a besoin pour rester affûté entre les compétitions.",
      }
 
    },
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
