// During the test the env variable is set to test
process.env.NODE_ENV = 'test';


const db = require('../models');

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const should = chai.should();


chai.use(chaiHttp);

test = () => {
  //Our parent block
  describe('User', () => {

    beforeEach((done) => { // Before each test we empty the database
      db.User.deleteMany({}, (err) => {
        done();
      });
    });

    after(done => {
      db.User.deleteMany({}, (err) => {
        done();
        process.exit(0);
      });

    }) ;
    /*
  * Test the /GET route
  */
    describe('/GET /api/users', () => {
      it('it should GET all the users', (done) => {
        chai.request(server)
          .get('/api/users')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
            done();
          });
      });
    });
  });
};

test();
