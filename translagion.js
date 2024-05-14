
import { addTranslations, setLocale } from 'i18n-js';
translations = {
    en: {
        appName: 'Squismallow Dreams',
        addToCart: 'Add to Cart',
        itemAdded: 'Item added to cart',
        description: 'This ultra-compressible plush is made with high-quality, ultra-soft materials. Add this adorable plush to your Squishmallows collection. This collectible item is perfect for Squishmallows fans of all ages. The soft plush is perfect for cuddling up while relaxing at home, watching a movie, during long car rides, pajama parties, plane rides, and for good old-fashioned fun!',
      },
      fr: {
        appName: 'Rêves de Squismallow',
        addToCart: 'Ajouter au panier',
        itemAdded: 'Article ajouté au panier',
        description: 'Cette peluche ultra-compressible est fabriquée avec des matériaux de haute qualité et ultra-doux. Ajoutez cette adorable peluche à votre collection Squishmallows. Cet objet de collection est parfait pour les fans de Squishmallows de tous âges. La peluche douce est parfaite pour se blottir tout en se relaxant à la maison, en regardant un film, pendant les longs trajets en voiture, les soirées pyjama, les trajets en avion et pour s\'amuser à l\'ancienne !',
      },
    }
    addTranslations('en', en);
    addTranslations('fr', fr);

     setLocale('en');