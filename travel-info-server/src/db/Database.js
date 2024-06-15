import mongoose from "mongoose";

export default class Database {
    #connectionAttempts = 0;
    #uri;

    constructor(uri) {
        this.#uri = uri;
    }

    connect = async () => {
        const maxAttempts = 3;
        const retryDelay = 1000;

        for (; this.#connectionAttempts < maxAttempts; this.#connectionAttempts++) {
            try {
                await mongoose.connect(this.#uri);
                console.log(
                    `Database connection to ${this.#uri} was successful`
                );
                return;
            } catch (e) {
                console.log(
                    `Database connection attempt ${
                        this.#connectionAttempts
                    } failed`,
                    e
                );
                if (this.#connectionAttempts < maxAttempts) {
                    await new Promise((resolve) =>
                        setTimeout(resolve, retryDelay)
                    );
                }
            }
        }

        console.log("Database unavailable after maximum attempts");
    };

    close = async () => {
        await mongoose.disconnect();
    };
}
