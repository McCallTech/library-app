import Component from '@ember/component';

export default Component.extend({
<<<<<<< HEAD
  buttonLabel: 'Save',

  actions: {
    buttonClicked(param) {
      this.sendAction('action', param);
    }
=======

  buttonLabel: 'Save',

  actions: {

    buttonClicked(param) {
      this.sendAction('action', param);
    }

>>>>>>> yoember/master
  }
});
