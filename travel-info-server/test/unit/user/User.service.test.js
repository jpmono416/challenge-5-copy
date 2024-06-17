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

    describe("Login user", () => {
        it("should login a user", async () => {
            const user = {
                email: "test",
                password: "test",
                favouriteLocations: [],
            };
            const findOneStub = sinon.stub(User, "findOne").returns(user);
            
            const result = await UserService.loginUser(user.email, user.password);
            expect(result).to.equal(user);
            findOneStub.restore();
        });

        it("should return nothing if no user is found", async () => {
            const findOneStub = sinon.stub(User, "findOne").returns(null);
            const result = await UserService.loginUser("test", "test");
            expect(result).to.be.undefined;
            findOneStub.restore();
        });
    });

    describe("Change password", () => {
        it("should change password", async () => {
            const user = {
                email: "test",
                password: "test",
                favouriteLocations: [],
                save: sinon.stub().returnsThis(),
            };

            const newUser = user;
            newUser.password = "newPassword"

            const findOneStub = sinon.stub(User, "findOne").returns(user);

            const result = await UserService.changePassword(user.email, user.password, newUser.password);
            expect(result).to.equal(newUser);
            findOneStub.restore();
        });

        it("should return nothing if no user is found", async () => {
            const findOneStub = sinon.stub(User, "findOne").returns(null);
            const result = await UserService.changePassword("test", "test", "newPassword");
            expect(result).to.be.undefined;
            findOneStub.restore();
        });
    });
});
