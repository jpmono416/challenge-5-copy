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

  static getFavouriteLocations = async(email) => {
    const user = await UserService.getUserByEmail(email);
    return user?.favouriteLocations;
  };
}