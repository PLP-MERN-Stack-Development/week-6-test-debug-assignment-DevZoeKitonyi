/// <reference types="cypress" />

Cypress.Commands.add('login', (username, password) => {
  cy.request('POST', 'http://localhost:5000/api/auth/login', {
    username,
    password,
  }).then((response) => {
    window.localStorage.setItem('token', response.body.token);
  });
});