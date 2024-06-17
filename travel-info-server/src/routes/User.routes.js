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
        this.#router.get("/:email", UserController.getUserByEmail);
        this.#router.post("/", UserValidator.validate(), UserController.createUser);
        this.#router.post("/login", UserValidator.validate(), UserController.loginUser)
        this.#router.put("/changePassword", UserValidator.validate(), UserController.changePassword);
        
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
