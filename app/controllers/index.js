<<<<<<< HEAD
import { computed, observer } from '@ember/object';
import Controller from '@ember/controller';

const { match, not } = computed;

export default Controller.extend({
  headerMessage: 'Coming Soon',
  emailAddress: '',
  isValid: match('emailAddress', /^.+@.+\..+$/),
  isDisabled: not('isValid'),
  actualEmailAddress: computed('emailAddress', function () {
    console.log('actualEmailAddress function is called: ', this.get('emailAddress'))
  }),
  emailAddressChanged: observer('emailAddress', function () {
    console.log('observer is called', this.get('emailAddress'));
  }),
  actions: {
    saveInvitation() {
      const email = this.get('emailAddress');

      const newInvitation = this.store.createRecord('invitation', { email: email });
      newInvitation.save().then( () =>{
        this.set('responseMessage', `Thank you! We have just saved your email address: ${this.get('emailAddress')}`);
        this.set('emailAddress', '');
      })
    }
  }
=======
import { match, not } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({

  headerMessage: 'Coming Soon',
  responseMessage: '',
  emailAddress: '',

  isValid: match('emailAddress', /^.+@.+\..+$/),
  isDisabled: not('isValid'),

  actions: {

    saveInvitation() {
      const email = this.get('emailAddress');

      const newInvitation = this.store.createRecord('invitation', {
        email: email
      });

      newInvitation.save().then((response) => {
        this.set('responseMessage', `Thank you! We saved your email address with the following id: ${response.get('id')}`);
        this.set('emailAddress', '');
      });

    }
  }

>>>>>>> yoember/master
});
