/* eslint-disable no-undef */

import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import './validation.js';

let component;

const login = () => {
  const email = document.querySelector('[name="emailAddress"]').value;
  const password = document.querySelector('[name="password"]').value;

  Meteor.loginWithPassword(email, password, (error) => {
    if (error) {
      Bert.alert(error.reason, 'warning');
    } else {
      Bert.alert('Connecté!', 'success');

      const { location } = component.props;
      if (location.state && location.state.nextPathname) {
        browserHistory.push(location.state.nextPathname);
      } else {
        browserHistory.push('/');
      }
    }
  });
};

const validate = () => {
  $(component.loginForm).validate({
    rules: {
      emailAddress: {
        required: true,
        email: true,
      },
      password: {
        required: true,
      },
    },
    messages: {
      emailAddress: {
        required: 'Veuillez entrer une adresse courriel.',
        email: 'Cette adresse courriel n\'est pas valide.',
      },
      password: {
        required: 'Veuillez entrer un mot de passe.',
      },
    },
    submitHandler() { login(); },
  });
};

export default function handleLogin(options) {
  component = options.component;
  validate();
}
