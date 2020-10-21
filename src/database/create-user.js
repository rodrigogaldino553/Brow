function createUser(db, user){
    return db.run(`
        INSERT INTO users(
            name,
            user,
            password,
            photo
        ) VALUES(
            "${user.name}",
            "${user.user}",
            "${user.password}",
            "${user.photo}"
        );
    `)
}

module.exports = createUser

