import UserService from "../services/User.service.js";

export default class UserController {
    static createUser = async (req, res) => {
        try {
            if (!req.body)
                return res.status(400).json({ error: "Invalid user" });

            const user = await UserService.createUser(req.body);
            if (!user._id) throw new Error("Unable to create user");

            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    static getUserByEmail = async (req, res) => {
        try {
            if (!req.params) return res.status(400).json({ error: "Invalid email" });
            const user = await UserService.getUserByEmail(req.params.email);
            if (!user) return res.status(404).json({ error: "User not found" });

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    static addFavouriteLocation = async (req, res) => {
        try {
            if (!req.body.email || !req.body.location)
                return res.status(400).json({ error: "Invalid user or location" });

            const user = await UserService.addFavouriteLocation(
                req.body.email,
                req.body.location
            );
            if (!user) return res.status(404).json({ error: "User not found" });

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    static loginUser = async (req, res) => {
        try {
            if (!req.body.email || !req.body.password) 
                return res.status(400).json({ error: "Invalid email or password" });

            const user = await UserService.loginUser(req.body.email, req.body.password);
            if (!user) return res.status(404).json({ error: "User not found" });

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    static changePassword = async (req, res) => {
        try {
            if (!req.body || !req.body.email || !req.body.password || !req.body.newPassword)
                return res.status(400).json({ error: "Invalid email, old password or new password" });

            const user = await UserService.changePassword(
                req.body.email,
                req.body.password,
                req.body.newPassword
            );
            if (!user) return res.status(404).json({ error: "User not found" });

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    static getFavouriteLocations = async (req, res) => {
        try {
            if (!req.query) return res.status(400).json({ error: "Invalid email" });
            const locations = await UserService.getFavouriteLocations(req.query.email);
            if (!locations) return res.status(404).json({ error: "User not found" });

            res.status(200).json(locations);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
}
