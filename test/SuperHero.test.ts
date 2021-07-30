import "mocha";
import app from "../src/app";

import chai = require("chai");
import chaiHttp = require("chai-http");
chai.use(chaiHttp);

const expect = chai.expect;

describe('Testing SuperHero API', () => {
    describe('/GET superHero', () => {
        it('should GET all the superHero', (done) => {
            chai.request(app)
                .get('/superHero')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });

    describe('/POST superHero', () => {
        describe('With invalid request body parameters', () => {
            it('should return an error response', () => {
                const superHero = {
                    name2: "ciccio"
                };
                chai.request(app)
                    .post('/superHero')
                    .send(superHero)
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('driverError');
                    });
                });
        });
    });
});

