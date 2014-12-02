'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Article = mongoose.model('Article');

/**
 * Globals
 */
var user, article;

/**
 * Unit tests
 */
describe('Article Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'serverTests',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password',
      provider: 'local'
		});

		user.save(function() {
			article = new Article({
				title: 'Article Title',
				content: 'Article Content',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return article.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without title', function(done) {
			article.title = '';

			return article.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) {
    User.remove({firstName : 'serverTests'}).exec();
		Article.remove().exec();
		// User.remove().exec();
		done();
	});
});