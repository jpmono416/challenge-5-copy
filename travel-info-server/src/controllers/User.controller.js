import UserService from "../services/User.service.js";

export default class UserController {
    static createUser = async (req, res) => {
        try {
            if (!req.body.username || !req.body.password)
                return res.status(400).json({ error: "Invalid user" });

            const user = await UserService.createUser(req.body.username, req.body.password);
            if (!user) throw new Error("Unable to create user");

            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    static getUserByUsername = async (req, res) => {
        try {
            if (!req.params.username) return res.status(400).json({ error: "Invalid username" });

            const user = await UserService.getUserByUsername(req.params.username);
            if (!user) return res.status(404).json({ error: "User not found" });

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    static addFavouriteLocation = async (req, res) => {
        try {
            if (!req.body.username || !req.body.location)
                return res.status(400).json({ error: "Invalid user or location" });

            const user = await UserService.addFavouriteLocation(req.body.username, req.body.location);
            if(!user) return res.status(404).json({ error: "User not found" });

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
}
