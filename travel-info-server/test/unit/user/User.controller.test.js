import { expect } from "chai";
import sinon from "sinon";

import UserController from "../../../src/controllers/User.controller.js";
import UserService from "../../../src/services/User.service.js";

describe("User Controller", () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {},
            params: { id: "1", email: "test"},
        };
        res = {
            json: sinon.spy(),
            status: sinon.stub().returnsThis(),
        };
    });

    describe("createUser", () => {
        it("should create a user", async () => {
            const newUser = {
                _id: "1",
                email: "test",
                password: "test",
            };
            const createStub = sinon.stub(UserService, "createUser").resolves(newUser);

            await UserController.createUser(req, res);

            expect(res.status.calledWith(201)).to.be.true;
            createStub.restore();
        });

        it("should return 400 if req has null body", async () => {
            req.body = null;
            await UserController.createUser(req, res);

            expect(res.status.calledWith(400)).to.be.true;
        });

        it("should return 500 if createUser returns a user without an id", async () => {
            const newUser = { email: "test", password: "test" };
            const createUserStub = sinon.stub(UserService, "createUser").resolves(newUser);

            await UserController.createUser(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            createUserStub.restore();
        });
    });

    describe("getUserByEmail", () => {
        it("should get a user by email", async () => {
            const user = { email: "test", password: "test" };
            const getUserStub = sinon.stub(UserService, "getUserByEmail").resolves(user);
            
            await UserController.getUserByEmail(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            getUserStub.restore();
        });

        it("should return 400 if req has null params", async () => {
            req.params = null;
            await UserController.getUserByEmail(req, res);

            expect(res.status.calledWith(400)).to.be.true;
        });

        it("should return 404 if getUserByEmail returns null", async () => {
            const getUserStub = sinon.stub(UserService, "getUserByEmail").resolves(null);

            await UserController.getUserByEmail(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            getUserStub.restore();
        });
    });

    describe("login", () => {

        beforeEach(() => {
            req.body = { email: "test", password: "test" };
        
        });
        it("should login a user", async () => {
            const user = { email: "test", password: "test" };
            const loginUserStub = sinon.stub(UserService, "loginUser").resolves(user);

            await UserController.loginUser(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            loginUserStub.restore();
        });

        it("should return a 404 if no user is found", async () => {
            const loginUserStub = sinon.stub(UserService, "loginUser").resolves(null);

            await UserController.loginUser(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            loginUserStub.restore();
        });

        it("should return a 400 if req has null body params", async () => {
            const loginUserStub = sinon.stub(UserService, "loginUser").resolves(null);
            req.body = null;
            
            await UserController.loginUser(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            loginUserStub.restore();
        });
    });

    describe("Change password", () => {
        beforeEach(() => {
            req.body = { email: "test", password: "test", newPassword: "new" };
        });
        it("should change password", async () => {
            const user = { email: "test", password: "new" };
            const changePasswordStub = sinon.stub(UserService, "changePassword").resolves(user);

            await UserController.changePassword(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            changePasswordStub.restore();
        });

        it("should return a 404 if no user is found", async () => {
            const changePasswordStub = sinon.stub(UserService, "changePassword").resolves(null);

            await UserController.changePassword(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            changePasswordStub.restore();
        });

        it("should return a 400 if req has null body params", async () => {
            req.body = null;
            await UserController.changePassword(req, res);

            expect(res.status.calledWith(400)).to.be.true;
        });
    });

    describe("Get favourite locations", () => {
        beforeEach(() => {
            req.query = { email: "test" };
        });

        it("should get favourite locations", async () => {
            const locations = ["Paris", "London"];

            const getFavouriteLocationsStub = sinon.stub(UserService, "getFavouriteLocations").resolves(locations);

            await UserController.getFavouriteLocations(req, res);
            expect(res.status.calledWith(200)).to.be.true;
            getFavouriteLocationsStub.restore();
        });

        it("should return 400 if req has null query params", async () => {
            req.query = null;
            await UserController.getFavouriteLocations(req, res);

            expect(res.status.calledWith(400)).to.be.true;
        });

        it("should return 404 if getFavouriteLocations returns nothing", async () => {
            const getFavouriteLocationsStub = sinon.stub(UserService, "getFavouriteLocations").resolves(undefined);

            await UserController.getFavouriteLocations(req, res);
            expect(res.status.calledWith(404)).to.be.true;
            getFavouriteLocationsStub.restore();
        });

        it("should return a 200 when no favourite locations are found", async () => {
            const getFavouriteLocationsStub = sinon.stub(UserService, "getFavouriteLocations").resolves([]);

            await UserController.getFavouriteLocations(req, res);
            expect(res.status.calledWith(200)).to.be.true;
            getFavouriteLocationsStub.restore();
        });
    });

    describe("Remove favourite locations", () =>{
        beforeEach(() => {
            req.body = { email: "test", location: "Paris" };
        });

        it("should remove a favourite location", async () => {
            const user = { email: "test", password: "test", favLocations: ["London"]};
            user.favLocations.push("Paris");
            const removeFavouriteLocationStub = sinon.stub(UserService, "removeFavouriteLocation").resolves(user);

            await UserController.removeFavouriteLocation(req, res);
            expect(res.status.calledWith(200)).to.be.true;
            removeFavouriteLocationStub.restore();
        });

        it("should return 500 if req has null body", async () => {
            req.body = null;
            await UserController.removeFavouriteLocation(req, res);

            expect(res.status.calledWith(500)).to.be.true;
        });

        it("should return 400 if req body is missing email or location", async () => {
            req.body = { email: "test" };
            await UserController.removeFavouriteLocation(req, res);

            expect(res.status.calledWith(400)).to.be.true;
        });

        it("should return 404 if removeFavouriteLocation returns nothing", async () => {
            const removeFavouriteLocationStub = sinon.stub(UserService, "removeFavouriteLocation").resolves(undefined);

            await UserController.removeFavouriteLocation(req, res);
            expect(res.status.calledWith(404)).to.be.true;
            removeFavouriteLocationStub.restore();
        });
    });
});
