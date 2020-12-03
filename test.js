var assert = require('assert');
let chai  = require('chai');
let chaiHttp = require('chai-http');
let server = require('./app');


let should = chai.should();


chai.use(chaiHttp);


describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -2 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(3), 2);
    });
  });
});


describe('Get Home Page',()=>{
 it('It should get the homepage',(done)=>{
    chai.request(server)
    .get('/')
    .end((err,res)=>{
         res.should.have.status(200);	
          done();
      });

   });

});


describe('Get User Login',()=>{
 it('It should get the user login page',(done)=>{
    chai.request(server)
    .get('/users/login')
    .end((err,res)=>{
         res.should.have.status(200);	
          done();

      });

   });


});



describe('User profile',()=>{
 it('It should get the user login page',(done)=>{
    chai.request(server)
    .get('/users/profile')
    .end((err,res)=>{
         res.should.have.status(200);	
          done();

      });

   });


});



describe('User profile settings',()=>{
 it('It should get the user login page',(done)=>{
    chai.request(server)
    .get('/users/profile/settings')
    .end((err,res)=>{
         res.should.have.status(200);	
          done();

      });

   });


});