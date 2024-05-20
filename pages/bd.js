import * as SQLite from 'expo-sqlite';

export default dbPfi = SQLite.openDatabase('pfi.db');

export const createProduitsTable = () => {
  dbPfi.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS produits (id INTEGER PRIMARY KEY AUTOINCREMENT, nom TEXT, description TEXT, prix INTEGER, image TEXT);',
      [],
      () => console.log('Table produits créée avec succès'),
      error => console.error('Erreur lors de la création de la table produits:', error)
    );
  });
};
export const createUsersTable = () => {
  dbPfi.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, nom TEXT, mdp TEXT, admin INTEGER);',
      [],
      () => console.log('Table users créée avec succès'),
      error => console.error('Erreur lors de la création de la table users:', error)
    );
  });
};


createProduitsTable();

export const RemplirTableProduits = () => {
  dbPfi.transaction(tx => {
    tx.executeSql('DELETE FROM produits;', [], () => {
      tx.executeSql(
        `INSERT INTO produits (nom, description, prix, image) VALUES (?, ?, ?, ?);`,
        ["Miriam le chat petit gâteau", "Cette peluche ultra-compressible est fabriquée avec des matériaux de haute qualité et ultra-doux. Ajoutez cette adorable peluche à votre collection Squishmallows. Cet objet de collection est parfait pour les fans de Squishmallows de tous âges. La peluche douce est parfaite pour se blottir tout en se relaxant à la maison, en regardant un film, pendant les longs trajets en voiture, les soirées pyjama, les trajets en avion et pour s'amuser à l'ancienne !",  16.99, "https://www.toysrus.ca/dw/image/v2/BDFX_PRD/on/demandware.static/-/Sites-toys-master-catalog/default/dw9a00bdc6/images/4446E8A5_1.jpg"],
        null,
        (_, error) => console.error('Erreur lors de l\'ajout du produit:', error)
      );
      tx.executeSql(
        `INSERT INTO produits (nom, description, prix, image) VALUES (?, ?, ?, ?);`,
        ["Monica l'axolotl violet", "Cette peluche ultra-compressible est fabriquée avec des matériaux de haute qualité et ultra-doux. Ajoutez cette adorable peluche à votre collection Squishmallows. Cet objet de collection est parfait pour les fans de Squishmallows de tous âges. La peluche douce est parfaite pour se blottir tout en se relaxant à la maison, en regardant un film, pendant les longs trajets en voiture, les soirées pyjama, les trajets en avion et pour s'amuser à l'ancienne !", 16.99, "https://www.toysrus.ca/dw/image/v2/BDFX_PRD/on/demandware.static/-/Sites-toys-master-catalog/default/dwaae6cde1/images/F4BFAA1F_1.jpg"],
        null,
        (_, error) => console.error('Erreur lors de l\'ajout du produit:', error)
      );
    });
  });
};
export const AddAdmin = () => {
  dbPfi.transaction(tx => {
    tx.executeSql('DELETE FROM produits;', [], () =>{
      tx.executeSql("INSERT INTO users (nom, mdp, admin) VALUES(?,?,?);", ["Admin", "12345", 1], null, 
      (_, error) => console.error('Erreur lors de l\'ajout de l\'admin:', error));
    });
  });
}