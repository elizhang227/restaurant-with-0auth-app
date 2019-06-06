const db = require('./conn.js'),
    bcrypt = require('bcryptjs');

class Users {
    constructor(id, first_name, last_name, email, password) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
    }

    static async getAllUsers() {
        try {
            const response = await db.any(`select * from users`);
            return response;
        } catch(err) {
            return err.message
        }
    }

    async addUser() {
        try {
            const response = await db.one(`
            insert into users 
                (first_name, last_name, email, password) 
            values 
                ($1, $2, $3, $4)
            returning id`, [this.first_name, this.last_name, this.email, this.password]);
            console.log("user was created with id:", response.id);
            return response;
        } catch(err) {
            return err.message
        }
    }

}

module.exports = Users;