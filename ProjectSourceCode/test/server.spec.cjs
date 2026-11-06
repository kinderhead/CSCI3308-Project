const chai = require('chai');
const chaiHttp = require('chai-http');
const { db, pgp } = require('../src/lib/db');
const bcrypt = require('bcryptjs');
const app = "http://web:3000";

chai.use(chaiHttp);
const { expect } = chai;

after(() => {
    pgp.end();
});

describe("Example route", () => {
    it("returns 0", async () => {
        const res = await chai.request(app).get("/example");
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({
            count: "0"
        });
    });
});
