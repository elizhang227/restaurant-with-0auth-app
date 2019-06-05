const db = require('./conn.js');

class Restaurants {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    static async getAllRestaurants() {
        try {
            const response = await db.any(`select * from restaurants`);
            return response;
        } catch(err) {
            return err.message
        }
    }
}

module.exports = Restaurants;