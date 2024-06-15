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

    static getUserByEmail = async (email) => {
        return await User.findOne({ email: email });
    };

    static addFavouriteLocation = async (email, location) => {
        const user = await User.findOne({ email: email });
        user.favouriteLocations.push(location);
        return await user.save();
    };
}
