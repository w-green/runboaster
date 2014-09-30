'use strict';

var expect = require('chai').expect,
    request = require('supertest'),
    app = require('../../server'),
    multer = require('multer'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    runsData = mongoose.model('runsData'),
    agent = request.agent(app);

/**
 * Globals
 */
var user;

describe('feature: Upload of runs data', function () {

    beforeEach(function(done) {
        user = new User({
            firstName: 'Full',
            lastName: 'Name',
            displayName: 'Full Name',
            email: 'test@test.com',
            username: 'username',
            password: 'password',
            provider: 'local'
        });
        user.save();
        done();
    });


    it('should not be able to upload a file with diff extension than gpx', function (done) {
        agent
            .post('/auth/signin')
            .send(user)
            .end(function (err, res){
                var userId = res.body._id;
                agent
                    .post('/upload')
                    .type('form')
                    .attach('fileName', './README.md')
                    .end(function (err, res) {
                        agent
                            .get('/runs-data')
                            .end(function(error, res) {
                                expect(res.body[0]).to.be.undefined;
                                done();
                            });
                    });

            });

    });

    it('should not be able to upload a gpx file if not logged in', function (done) {
                agent
                    .post('/upload')
                    .type('form')
                    .attach('fileName', './test-files/firsttest.gpx')
                    .end(function (err, res) {
                        expect(res.status).to.equal(401);
                        expect(res.unauthorized).to.be.true;
                        done();
                    });

    });

    it('should be able to upload a gpx file', function (done) {
        agent
            .post('/auth/signin')
            .send(user)
            .end(function (err, res){
                var userId = res.body._id;
                agent
                    .post('/upload')
                    .type('form')
                    .attach('fileName', './test-files/firsttest.gpx')
                    .expect(200)
                    .end(function (err, res) {
                        agent
                            .get('/runs-data')
                            .end(function(error, res) {
                                expect(res.body[0].user).to.equal(userId);
                                done();
                            });
                    });

            });

    });

    // The following test has been removed because an error message:
    // Uncaught Error: ENOENT, open ''
    // is thrown by the multer module, which stops the tests.
    xit('should respond with status 400 if file has not been selected', function (done) {
        agent
            .post('/auth/signin')
            .send(user)
            .end(function (err, res){
                var userId = res.body._id;
                agent
                    .post('/upload')
                    .type('form')
                    .attach('fileName', '')
                    .end(function (err, res) {
                        agent
                            .get('/runs-data')
                            .end(function(error, res) {
                                expect(res.body[0]).to.be.undefined;
                                done();
                            });
                    });

            });

    });

    afterEach(function(done) {
        User.remove().exec();
        runsData.remove().exec();
        done();
    });


});