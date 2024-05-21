
import * as SQLite from "expo-sqlite"
const db = SQLite.openDatabase("pfi.db");

const createTableProduits = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS produits (id INTEGER PRIMARY KEY AUTOINCREMENT, nom TEXT, description TEXT, prix INTEGER, image TEXT);",
      [],
      () => console.log("Table produits créée avec succès"),
      (error) =>
        console.error("Erreur lors de la création de la table produits:", error)
    );
  });
};

const insererProduits = () => {
  db.transaction((tx) => {
    tx.executeSql("DELETE FROM produits;", [], () => {
      tx.executeSql(
        `INSERT INTO produits (nom, description, prix, image) VALUES (?, ?, ?, ?);`,
        [
          "Miriam le chat petit gâteau",
          "Miriam est une professeure de danse qui apprend aux jeunes membres de la famille royale à valser ! Elle se réjouit d’aider les futurs rois et reines à remplir leurs devoirs sur la piste de danse, et ne demande en retour que des invitations aux bals royaux !",
          16.99,
          "https://www.toysrus.ca/dw/image/v2/BDFX_PRD/on/demandware.static/-/Sites-toys-master-catalog/default/dw9a00bdc6/images/4446E8A5_1.jpg",
        ],
        null,
        (_, error) => console.error("Erreur lors de l'ajout du produit:", error)
      );
      tx.executeSql(
        `INSERT INTO produits (nom, description, prix, image) VALUES (?, ?, ?, ?);`,
        [
          "Monica l'axolotl violet",
          "Cette peluche ultra-compressible est fabriquée avec des matériaux de haute qualité et ultra-doux. Ajoutez cette adorable peluche à votre collection Squishmallows. Cet objet de collection est parfait pour les fans de Squishmallows de tous âges. La peluche douce est parfaite pour se blottir tout en se relaxant à la maison, en regardant un film, pendant les longs trajets en voiture, les soirées pyjama, les trajets en avion et pour s'amuser à l'ancienne !",
          16.99,
          "https://www.toysrus.ca/dw/image/v2/BDFX_PRD/on/demandware.static/-/Sites-toys-master-catalog/default/dwaae6cde1/images/F4BFAA1F_1.jpg",
        ],
        null,
        (_, error) => console.error("Erreur lors de l'ajout du produit:", error)
      );
      tx.executeSql(
        `INSERT INTO produits (nom, description, prix, image) VALUES (?, ?, ?, ?);`,
        [
          "Wyatt la grenouille",
          "Wyatt adore tirer au panier à la maison avec sa grande sœur, Wendy ! Ces deux 'Mallows jouent au basket-ball jusqu’à l’heure du dîner. Cette année, Wyatt est devenu un mathlète, donc jouer un jeu amusant est exactement ce dont il a besoin pour rester affûté entre les compétitions.",
          15.95,
          "https://shop.jazwares.com/cdn/shop/files/Vig_2000x.jpg",
        ],
        null,
        (_, error) => console.error("Erreur lors de l'ajout du produit:", error)
      );
      tx.executeSql(
        `INSERT INTO produits (nom, description, prix, image) VALUES (?, ?, ?, ?);`,
        [
          "Marjorie le rat-taupe nu",
          "Marjorie est connue comme la reine de beaucoup de choses. Elle est la Miss 'Mallow en titre, a été élue reine du bal de promo de son lycée et « la plus susceptible de faire une différence dans le monde ». Marjorie reste humble même avec toutes les accolades et sait qu’être la reine de la gentillesse est ce qui compte le plus.",
          15.95,
          "https://shop.jazwares.com/cdn/shop/files/Squishmallows-MediumPlush_12_Squishmallows_--NakedMoleRat-SQCR03049-Front-lpr_2000x.jpg",
        ],
        null,
        (_, error) => console.error("Erreur lors de l'ajout du produit:", error)
      );
      tx.executeSql(
        `INSERT INTO produits (nom, description, prix, image) VALUES (?, ?, ?, ?);`,
        [
          "Caméra Le chat calicot",
          "Cam adore entrer et sortir des boîtes et construire des forts avec ses amis, Hoot et Wendy. Il aime aussi aller à la plage pour faire la sieste ou passer du temps avec ses amis, mais il est toujours partant pour l’aventure !",
          16.99,
          "https://shop.jazwares.com/cdn/shop/files/SQCR04159NewSSQK-Squishmallows-Cam-BrownandWhiteCalicoCat-12inMediumPlush-OP-Front-lpr_768x.jpg",
        ],
        null,
        (_, error) => console.error("Erreur lors de l'ajout du produit:", error)
      );

      tx.executeSql(
        `INSERT INTO produits (nom, description, prix, image) VALUES (?, ?, ?, ?);`,
        [
          "Warren le sanglier",
          "Si vous êtes toujours d’humeur à rire, Warren est la Mauve qu’il vous faut ! Ce sanglier teste toutes ses blagues sur ses copains avant de faire son numéro de stand-up dans un club de comédie. Warren plaisante beaucoup sur lui-même et son enfance farfelue. Saviez-vous qu’il a 10 frères et sœurs ?",
          12.99,
          "https://shop.jazwares.com/cdn/shop/files/Squishmallows-7.5in-Warren-Brown-Boar-SQCR02666-FRONT-lpr_2000x.jpg?v=1709849594",
        ],
        null,
        (_, error) => console.error("Erreur lors de l'ajout du produit:", error)
      );

      tx.executeSql(
        `INSERT INTO produits (nom, description, prix, image) VALUES (?, ?, ?, ?);`,
        [
          "Felipe le gobelin",
          "Felipe a récemment été couronné roi du kickball dans son école. Et pour cause : il est toujours le dernier debout ! Personne ne sait comment ce gobelin parvient à se balancer et à se faufiler avec une telle vitesse et une telle grâce. Mais si vous lui demandez, Felipe dit que son secret est une multivitamine quotidienne !",
          14.99,
          "https://shop.jazwares.com/cdn/shop/files/Felipe-Front_540x.jpg",
        ],
        null,
        (_, error) => console.error("Erreur lors de l'ajout du produit:", error)
      );

      tx.executeSql(
        `INSERT INTO produits (nom, description, prix, image) VALUES (?, ?, ?, ?);`,
        [
          "Armand le monstre des marais",
          "Armand est un acteur polyvalent qui peut tout faire : pleurer dans les drames, tomber dans les comédies, même respirer sous l’eau ! Grâce à ses branchies spéciales, Armand accepte des rôles principaux pour des personnages terrestres et aquatiques. Maintenant, il espère que ce dernier film lui vaudra une statue en or dont il a toujours rêvé.",
          19.99,
          "https://shop.jazwares.com/cdn/shop/files/SQCR05120SQK-Squishmallows-12InchMediumPlush-AquaticSeaMonster-SELECTSERIES-OP-Front-lpr_2000x.jpg",
        ],
        null,
        (_, error) => console.error("Erreur lors de l'ajout du produit:", error)
      );
    });
  });
};


export const createUserTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS usagers (id INTEGER PRIMARY KEY AUTOINCREMENT, nom TEXT, mdp TEXT, admin INTEGER;',
      [],
      () => console.log('Table usager créée avec succès'),
      error => console.error('Erreur lors de la création de la table usager:', error)
    );
  });
};

export const AddAdmin = () => {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM users;', [], () =>{
      tx.executeSql("INSERT INTO users (nom, mdp, admin) VALUES(?,?,?);", ["Admin", "12345", 1], null, 
      (_, error) => console.error('Erreur lors de l\'ajout de l\'admin:', error));
    });
  });
}
export { createTableProduits, insererProduits, db};
