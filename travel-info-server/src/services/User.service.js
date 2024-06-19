import User from "../models/User.model.js";
import jwt from "jsonwebtoken";

export default class UserService {
    static createUser = async (newUser) => {
        console.log("New user: ", newUser);
        try {
            const user = new User(newUser);
            await user.save(user);

            console.log("USer:", user);
            const token = jwt.sign({ userId: user._id }, "FLAWLESS_NKRYPTION", {
                expiresIn: "24h",
            });
            console.log("Token:", token);

            return { user, token };
        } catch (error) {
            console.log("Error:", error.message);
            throw new Error("Invalid user: " + error.message);
        }
    };

    static getUserByEmail = async (email) => {
        return await User.findOne({ email: email });
    };

    static loginUser = async (email, password) => {
        try {
            const user = await UserService.getUserByEmail(email);
            if (user?.password === password) return user;
        } catch (error) {
            throw new Error("Invalid user details: " + error.message);
        }
    };

    static changePassword = async (email, password, newPassword) => {
        try {
            const user = await UserService.loginUser(email, password);
            if (user) {
                user.password = newPassword;
                return await user.save();
            }
        } catch (error) {
            throw new Error("Invalid user details: " + error.message);
        }
    };

    static addFavouriteLocation = async (email, location) => {
        const user = await UserService.getUserByEmail(email);
        user.favouriteLocations.push(location);
        return await user.save();
    };

    static getFavouriteLocations = async (email) => {
        const user = await UserService.getUserByEmail(email);
        return user?.favouriteLocations;
    };

    static removeFavouriteLocation = async (email, location) => {
        const user = await UserService.getUserByEmail(email);

        if (!user) return;

        user.favouriteLocations = user.favouriteLocations.filter(
            (favLocation) => favLocation !== location
        );
        return await user.save();
    };
}
