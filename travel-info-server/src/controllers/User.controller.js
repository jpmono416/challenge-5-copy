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
            console.log("PARAMS", req.params);
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
}
