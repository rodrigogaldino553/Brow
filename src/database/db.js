const database = require('sqlite-async')

function execute(db){
    return db.exec(`
    CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        user TEXT,
        password TEXT,
        photo TEXT,
        status TEXT
    );
    `)
}


module.exports = database.open(__dirname + '/database.sqlite').then(execute)

