import User from "../models/User.model.js";

export default class UserService {
    static createUser = async (newUser) => {
        let user;
        try {
            user = new User(newUser);
        } catch (error) {
            throw new Error("Invalid user: " + error.message);
        }
        return await user.save(user);
    };

    static getUserByUsername = async (username) => {
        return await User.findOne({ username: username });
    };

    static addFavouriteLocation = async (username, location) => {
        const user = await User.findOne({ username: username });
        user.favouriteLocations.push(location);
        return await user.save();
    };
}
