import { expect } from "chai";
import sinon from "sinon";

import User from "../../../src/models/User.model.js";
import UserService from "../../../src/services/User.service.js";

describe("User Service", () => {
    describe("createUser", () => {
        it("should create a user", async () => {
            const user = { username: "test", password: "test" };
            const createStub = sinon.stub(User, "create").returns(user);

            const result = await UserService.createUser(user.username, user.password);

            expect(result).to.equal(user);
            createStub.restore();
        });
    });

    describe("getUserByUsername", () => {
        it("should get a user by username", async () => {
            const user = { username: "test", password: "test" };
            const findOneStub = sinon.stub(User, "findOne").returns(user);

            const result = await UserService.getUserByUsername(user.username);

            expect(result).to.equal(user);
            findOneStub.restore();
        });
    });

    describe("addFavouriteLocation", () => {
        it("should add a favourite location to a user", async () => {
            const user = {
                username: "test",
                password: "test",
                favouriteLocations: [],
                // Mocking the save method, used after findOne returns the mock
                save: sinon.stub().returnsThis(),
            };
            const findOneStub = sinon.stub(User, "findOne").returns(user);
            const saveStub = sinon.stub(User.prototype, "save").returns(user);

            const result = await UserService.addFavouriteLocation(user.username, "location");

            expect(result).to.equal(user);
            findOneStub.restore();
            saveStub.restore();
        });
    });
});
