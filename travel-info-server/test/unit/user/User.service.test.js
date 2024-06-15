import { expect } from "chai";
import sinon from "sinon";

import User from "../../../src/models/User.model.js";
import UserService from "../../../src/services/User.service.js";

describe("User Service", () => {
    describe("createUser", () => {
        it("should create a user", async () => {
            const newUser = {
                _id: "1",
                email: "test",
                password: "test",
            };
            const saveStub = sinon.stub(User.prototype, "save").returns(newUser);

            const result = await UserService.createUser(newUser);

            expect(result).to.equal(newUser);
            saveStub.restore();
        });
    });

    describe("getUserByEmail", () => {
        it("should get a user by email", async () => {
            const user = { email: "test", password: "test" };
            const findOneStub = sinon.stub(User, "findOne").returns(user);

            const result = await UserService.getUserByEmail(user.email);

            expect(result).to.equal(user);
            findOneStub.restore();
        });
    });

    describe("addFavouriteLocation", () => {
        it("should add a favourite location to a user", async () => {
            const user = {
                email: "test",
                password: "test",
                favouriteLocations: [],
                // Mocking the save method, used after findOne returns the mock
                save: sinon.stub().returnsThis(),
            };
            const findOneStub = sinon.stub(User, "findOne").returns(user);
            const saveStub = sinon.stub(User.prototype, "save").returns(user);

            const result = await UserService.addFavouriteLocation(user.email, "location");

            expect(result).to.equal(user);
            findOneStub.restore();
            saveStub.restore();
        });
    });
});
