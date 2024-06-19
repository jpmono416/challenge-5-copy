import { Router } from "express";
import UserController from "../controllers/User.controller.js";
import UserValidator from "../middleware/User.validator.js";
import AuthValidator from "../middleware/Auth.validator.js";

export default class UserRoutes {
    #router;
    #routeStartPoint = "/user";

    constructor() {
        this.#router = Router();
        this.#initializeRoutes();
    }

    #initializeRoutes = () => {
        // User
        this.#router.get("/:email", UserController.getUserByEmail);
        this.#router.post("/", UserValidator.validate(), UserController.createUser);
        this.#router.post("/login", UserValidator.validate(), UserController.loginUser);
        this.#router.put(
            "/changePassword",
            UserValidator.validate(),
            UserController.changePassword
        );

        // Locations
        this.#router.get(
            "/favLocations/:email",
            AuthValidator.verifyToken,
            UserController.getFavouriteLocations
        );
        this.#router.post(
            "/favLocation",
            AuthValidator.verifyToken,
            UserController.addFavouriteLocation
        );
        this.#router.delete(
            "/favLocation",
            AuthValidator.verifyToken,
            UserController.removeFavouriteLocation
        );
    };

    getRouter = () => {
        return this.#router;
    };

    getRouteStartPoint = () => {
        return this.#routeStartPoint;
    };
}
