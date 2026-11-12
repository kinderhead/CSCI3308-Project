const chai = require('chai');
const chaiHttp = require('chai-http');
const bcrypt = require('bcryptjs');
const app = "http://web:3000";

chai.use(chaiHttp);
const { expect } = chai;

let db;
let pgp;

before(async () => {
    ({ db, pgp } = await import('../src/lib/db.js'));
});

after(() => {
    if (pgp) {
        pgp.end();
    }
});

describe("Welcome route", () => {
    it("returns the welcome message", async () => {
        const res = await chai.request(app).get("/welcome");

        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({
            status: "success",
            message: "Welcome!"
        });
    });
});

describe("POST /register", () => {
    const { randomUUID } = require('node:crypto');

    const testUser = {
        email: `lab10-${randomUUID()}@example.com`,
        name: "Test Student",
        password: "Password123!",
        confirm_password: "Password123!"
    };

    async function removeTestUser() {
        await db.none(
            "DELETE FROM users WHERE email = $1",
            [testUser.email]
        );
    }

    beforeEach(removeTestUser);
    afterEach(removeTestUser);

    it("creates a user with valid information", async () => {
        const res = await chai.request(app)
            .post("/register")
            .set("Origin", app)
            .set("Accept", "text/html")
            .type("form")
            .send(testUser)
            .redirects(0);

        expect(res).to.have.status(303);
        expect(res).to.have.header("location", "/login");

        const rows = await db.any(
            "SELECT * FROM users WHERE email = $1",
            [testUser.email]
        );

        expect(rows).to.have.lengthOf(1);
        expect(rows[0].email).to.equal(testUser.email);
        expect(rows[0].name).to.equal(testUser.name);
        expect(rows[0].password).not.to.equal(testUser.password);

        const matches = await bcrypt.compare(
            testUser.password,
            rows[0].password
        );

        expect(matches).to.equal(true);
    });

    it("rejects registration without a password", async () => {
        const invalidUser = {
            email: testUser.email,
            name: testUser.name,
            confirm_password: testUser.confirm_password
        };

        const res = await chai.request(app)
            .post("/register")
            .set("Origin", app)
            .type("form")
            .send(invalidUser)
            .redirects(0);

        expect(res).to.have.status(400);
        expect(res.text).to.include("Invalid form submission.");

        const rows = await db.any(
            "SELECT * FROM users WHERE email = $1",
            [testUser.email]
        );

        expect(rows).to.have.lengthOf(0);
    });
});
