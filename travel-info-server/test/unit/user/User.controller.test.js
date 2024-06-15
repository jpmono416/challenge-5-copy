import { expect } from "chai";
import sinon from "sinon";

import UserController from "../../../src/controllers/User.controller.js";
import UserService from "../../../src/services/User.service.js";

describe("User Controller", () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {},
            params: { id: "1", username: "test"},
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
                username: "test",
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
            const newUser = { username: "test", password: "test" };
            const createUserStub = sinon.stub(UserService, "createUser").resolves(newUser);

            await UserController.createUser(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            createUserStub.restore();
        });
    });

    describe("getUserByUsername", () => {
        it("should get a user by username", async () => {
            const user = { username: "test", password: "test" };
            const getUserStub = sinon.stub(UserService, "getUserByUsername").resolves(user);

            await UserController.getUserByUsername(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            getUserStub.restore();
        });

        it.skip("should return 400 if req has null params", async () => {
            req.params = null;
            await UserController.getUserByUsername(req, res);

            expect(res.status.calledWith(400)).to.be.true;
        });

        it.skip("should return 404 if getUserByUsername returns null", async () => {
            const getUserStub = sinon.stub(UserService, "getUserByUsername").resolves(null);

            await UserController.getUserByUsername(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            getUserStub.restore();
        });
    });
});
