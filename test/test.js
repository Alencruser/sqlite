var expect= require('chai').expect;
var mysql=require('mysql');
var gimme=require('../server.js');

describe('Database connect',function(){
	it('should see authenticated',function(){
		var success = "authenticated";
		var testing = gimme._connection.state ;
		expect(success).to.be.equal(testing);
	})
})
