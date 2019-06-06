const db = require('./conn.js'),
    bcrypt = require('bcryptjs');

class Restaurants {
    constructor(id, first_name, last_name, email, password) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
    }

    static async getAllRestaurants() {
        try {
            const response = await db.any(`select * from restaurants`);
            return response;
        } catch(err) {
            return err.message
        }
    }

    async checkPassword(hashedPassword) {
        return bcrypt.compareSync(this.password, hashedPassword);
    }

    async createUser() {
        try {
            const response = await db.one(`
            insert into users
                (first_name, last_name, email, password)
            values
                ($1, $2, $3, $4)
            returning id`, [this.first_name, this.last_name. this.email, this.password]);
        } catch(err) {
            return err.message
        }
    }

    async login() {
        try {
            const response = await db.one(`
                select id, first_name, last_name, password
                    from users
                where email = $1`, [this.email]);
            const isValid = await this.checkPassword(response.password);
            if (!!isValid) {
                const { first_name, last_name, id } = response;
                return { isValid, first_name, last_name, user_id: id }
            } else {
                return { isValid } 
            };
        } catch(err) {
            return err.message
        }
    }

}

module.exports = Restaurants;