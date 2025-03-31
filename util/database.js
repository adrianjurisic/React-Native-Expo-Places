import * as SQLite from  'expo-sqlite';

const database = SQLite.openDatabaseAsync('places.db');

export function init() {
    console.log("DB object:", database);

    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSQL(`CREATE TABLE IF NOT EXISTS places (
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                imageUri TEXT NOT NULL,
                address TEXT NOT NULL,
                lat REAL NOT NULL,
                lng REAL NOT NULL
                )`,
                [],
                () => {
                    resolve();
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });

    return promise;
}