function createUser(db, user){
    return db.run(`
        INSERT INTO users(
            name,
            user,
            password,
            photo,
            status
        ) VALUES(
            "${user.name}",
            "${user.user}",
            "${user.password}",
            "${user.photo}",
            "${user.status}"
        );
    `)
}

module.exports = createUser

