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
});
