<<<<<<< HEAD
// app/routes/libraries/edit.js
=======
>>>>>>> yoember/master
import Route from '@ember/routing/route';

export default Route.extend({

  model(params) {
    return this.store.findRecord('library', params.library_id);
  },

<<<<<<< HEAD
=======
  setupController(controller, model) {
    this._super(controller, model);

    controller.set('title', 'Edit library');
    controller.set('buttonLabel', 'Save changes');
  },

  renderTemplate() {
    this.render('libraries/form');
  },

>>>>>>> yoember/master
  actions: {

    saveLibrary(library) {
      library.save().then(() => this.transitionTo('libraries'));
    },

    willTransition(transition) {
<<<<<<< HEAD

=======
>>>>>>> yoember/master
      let model = this.controller.get('model');

      if (model.get('hasDirtyAttributes')) {
        let confirmation = confirm("Your changes haven't saved yet. Would you like to leave this form?");

        if (confirmation) {
          model.rollbackAttributes();
        } else {
          transition.abort();
        }
      }
    }
  }
});
