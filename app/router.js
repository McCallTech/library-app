import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('about');
<<<<<<< HEAD

  this.route('admin', function() {
    this.route('invitations');
=======
  this.route('contact');

  this.route('admin', function() {
    this.route('invitations');
    this.route('contacts');
    this.route('seeder');
>>>>>>> yoember/master
  });

  this.route('libraries', function() {
    this.route('new');
    this.route('edit', { path: '/:library_id/edit' });
  });
<<<<<<< HEAD
=======

  this.route('authors');
  this.route('books');
>>>>>>> yoember/master
});

export default Router;
