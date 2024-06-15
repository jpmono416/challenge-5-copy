import User from "../models/User.model.js";

export default class UserService {
    static createUser = async (username, password) => {
        return await User.create({ username, password });
    }

    static getUserByUsername = async (username) => {
        return await User.findOne({ username: username });
    }

    static addFavouriteLocation = async (username, location) => {
        const user = await User.findOne({ username: username });
        user.favouriteLocations.push(location);
        await user.save();
        return user;
    }
}