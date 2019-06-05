const db = require('./conn.js');

class Users {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    static async getAllUsers() {
        try {
            const response = await db.any(`select * from users`);
            return response;
        } catch(err) {
            return err.message
        }
    }
}

module.exports = Users;