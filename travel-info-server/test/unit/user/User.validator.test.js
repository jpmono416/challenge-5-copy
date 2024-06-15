import UserValidator from "../../../src/middleware/User.validator.js";
import { expect } from "chai";

describe("UserValidator", () => {
    it("should return an array of middleware functions", () => {
        const middleware = UserValidator.validate();

        expect(Array.isArray(middleware)).to.be.true;
        middleware.forEach((fn) => expect(typeof fn).to.equal("function"));
    });

    it("should include the handleValidationErrors method in the middleware array", () => {
        const middleware = UserValidator.validate();

        expect(middleware).to.include(UserValidator.handleValidationErrors);
    });
});
