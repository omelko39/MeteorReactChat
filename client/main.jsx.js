import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from '../imports/ui/App.jsx';
import { Accounts } from 'meteor/accounts-base'

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
});

Meteor.startup(() => {
    render(<App />, document.getElementById('render-target'));
});