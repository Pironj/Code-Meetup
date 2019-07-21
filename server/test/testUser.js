// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const should = chai.should();

const request = require('supertest');
const expect = chai.expect;

const db = require('../models');
const usersSeed = require('../scripts/usersSeed.json');


chai.use(chaiHttp);

const google_id = '123456';
const user = {
  google_id,
  first_name: 'first',
  last_name: 'last',
  picture: 'pictureUrl',
  email: 'user@email.com'
};

//Our parent block
describe('User', () => {

  beforeEach(async () => { // Before each test we empty the database
    await db.User.deleteMany({}); // Seed DB with users
    await db.User.collection.insertMany(usersSeed);
  });

  after(async () => {
    await db.User.deleteMany({});
    // process.exit(0);
  });

  describe('/GET /api/users', () => {
    it('it should GET all the users', async () => {
      const res = await request(server).get('/api/users');
      res.should.have.status(200);
      res.body.should.be.a('array');
      res.body.length.should.be.eql(7);
    });
  });



  /*
  * Test the /GET route
  */
  // describe('/GET /api/users', () => {
  //   it('it should GET all the users', async () => {
  //     chai.request(server)
  //       .get('/api/users')
  //       // .end((err, res) => {
  //       //   res.should.have.status(200);
  //       //   res.body.should.be.a('array');
  //       //   res.body.length.should.be.eql(7);
  //       //   done();
  //       // })
  //       .then(function (res) {
  //         res.should.have.status(201);
  //       })
  //       .catch(function (err) {
  //         throw err;
  //       });
  //     // .catch((error) => {
  //     //   throw (error);

  //     // });
  //   });
  // });

  // describe('/POST /api/users', () => {
  //   it('it should create a user', (done) => {

  //     chai.request(server)
  //       .post('/api/users')
  //       .send(user)
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.body.should.be.a('object');
  //         res.body.should.have.property('google_id').eql(google_id);
  //         done();
  //       });
  //   });

  //   describe('GET /api/users/:id', () => {
  //     it('it should GET a User by the given id', (done) => {
  //       const newUser = new db.User(user);
  //       newUser.save((err, savedUser) => {
  //         chai.request(server)
  //           .get(`/api/users/${savedUser._id}`)
  //           .send(savedUser)
  //           .end((err, res) => {
  //             res.should.have.status(200);
  //             res.body.should.be.a('object');
  //             // res.body.should.have.property('google_id');
  //             res.body.should.have.property('first_name');
  //             res.body.should.have.property('last_name');
  //             res.body.should.have.property('email');
  //             res.body.should.have.property('picture');
  //             res.body.should.have.property('_id').eql(savedUser._id.toString());
  //             done();
  //           });
  //       });
  //     });
  //   });



  // });
});


