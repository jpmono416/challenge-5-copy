import User from "../models/User.model.js";

export default class UserService {
    static async createUser(username, password) {
        return await User.create({ username, password });
    }

    static async getUserByUsername(username) {
        return await User.findOne({ username: username });
    }

    static async addFavouriteLocation(username, location) {
        const user = await User.findOne({ username: username });
        user.favouriteLocations.push(location);
        await user.save();
        return user;
    }
}