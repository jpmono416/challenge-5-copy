import express from "express";
import UserRoutes from "../routes/User.routes.js";
import WeatherApiRoutes from "../routes/WeatherApi.routes.js";
import cors from "cors";

export default class Server {
    #app;
    #host;
    #port;
    #server;
    #userRouter;
    #weatherApiRouter;

    constructor(port, host) {
        this.#app = express();
        this.#port = port;
        this.#host = host;
        this.#server = null;
        this.#userRouter = new UserRoutes();
        this.#weatherApiRouter = new WeatherApiRoutes();
    }

    getApp = () => {
        return this.#app;
    };

    start = () => {
        const corsOptions = {
            origin: "http://localhost:5173",
        };

        this.#server = this.#app.listen(this.#port, this.#host, () => {
            console.log(`Server is listening on http://${this.#host}:${this.#port}`);
        });

        this.#app.use(express.json());
        this.#app.use(cors(corsOptions));

        // Routers
        this.#app.use(this.#userRouter.getRouteStartPoint(), this.#userRouter.getRouter());
        this.#app.use(
            this.#weatherApiRouter.getRouteStartPoint(),
            this.#weatherApiRouter.getRouter()
        );
    };

    close = () => {
        this.#server?.close();
    };
}
