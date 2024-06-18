import { Router } from "express";
import WeatherApiController from "../controllers/WeatherApi.controller.js";

export default class WeatherApiRoutes {
    #router;
    #routeStartPoint = "/weather";

    constructor() {
        this.#router = Router();
        this.#initializeRoutes();
    }

    #initializeRoutes = () => {
        this.#router.get("/", WeatherApiController.getWeather);
    };

    getRouter = () => {
        return this.#router;
    };

    getRouteStartPoint = () => {
        return this.#routeStartPoint;
    };
}