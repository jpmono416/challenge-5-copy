import { Router } from "express";
import UserController from "../controllers/User.controller.js";
import UserValidator from "../middleware/User.validator.js";

export default class UserRoutes {
    #router;
    #routeStartPoint = "/user";

    constructor() {
        this.#router = Router();
        this.#initializeRoutes();
    }

    #initializeRoutes = () => {
        // User
        this.#router.get("/:username", UserController.getUserByUsername);
        this.#router.post("/", UserValidator.validate(), UserController.createUser);
        this.#router.post("/login", UserValidator.validate(), UserController.loginUser)

        // Locations
        this.#router.post(
            "/favourite-location",
            UserValidator.validate(),
            UserController.addFavouriteLocation
        );
    };

    getRouter = () => {
        return this.#router;
    };

    getRouteStartPoint = () => {
        return this.#routeStartPoint;
    };
}
