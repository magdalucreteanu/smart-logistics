import React, {useEffect} from 'react';

import * as SQLite from 'expo-sqlite';

// Open a database named 'users.db', creating it if it doesn't exist, and return a Database object.
const db = SQLite.openDatabase('db.db');

const setupDatabaseAsync = async () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, password TEXT NOT NULL);'
            );
        },
        (_, error) => { console.log('db error creating tables'); console.log(error); reject(error)},
        (_, success) => {resolve(success)}
        )
    })
}

const setupUsersAsync = async () => {
    return new Promise((resolve, _reject) => {
      db.transaction( tx => {
          tx.executeSql( 'INSERT INTO users (name, password) VALUES (?, ?)', ["John", "geheim"] );
        },
        (t, error) => { console.log("db error setupUsers"); console.log(error); resolve() },
        (t, success) => { resolve(success)}
      )
    })
}

const insertUser = (username, password, successFunc) => {
    db.transaction( tx => {
        tx.executeSql('INSERT INTO users (name, password) VALUES (?, ?)', [username, password]); 
        },
        (t, error) => {console.log("db error insertUser"); console.log(error); },
        (t, success) => {successFunc() }
    )
}

const getUsers = (setUserFunc) => {
    db.transaction(
      tx => {
        tx.executeSql(
          'SELECT * FROM users',
          [],
          (_, { rows: { _array } }) => {
            setUserFunc(_array); 
          }
        );
      },
      (t, error) => { console.log("db error load users"); console.log(error) },
      (_t, _success) => { console.log("loaded users")}
    );
}

// TODO:  getPasswordByUserName überarbeiten, bisher wird das Passwort nur in der Konsole ausgegeben
const getPasswordByUserName = (username) => {
    db.transaction(
      tx => {
        tx.executeSql('SELECT password FROM users WHERE name = ?', [username], (_, { rows: { _array } }) =>
        console.log(JSON.stringify(_array)));
        },
      (t, error) => { console.log("db error load password by user name"); console.log(error) },
      (t, success) => { console.log("loaded password by user name") }
    )
}

const dropDatabaseTablesAsync = async () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'DROP TABLE users',
          [],
          (_, result) => { resolve(result) },
          (_, error) => { console.log("error dropping users table"); reject(error)
          }
        )
      })
    })
}

export const database = {
    getUsers,
    insertUser,
    setupDatabaseAsync,
    setupUsersAsync,
    dropDatabaseTablesAsync,
    getPasswordByUserName
}
