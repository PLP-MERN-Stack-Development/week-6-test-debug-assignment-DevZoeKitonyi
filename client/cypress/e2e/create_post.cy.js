/// <reference types="cypress" />

describe('Create Post', () => {
  it('should allow a logged-in user to create a new post', () => {
    // Mock a logged-in user
    cy.login('testuser', 'password123');

    // Visit the create post page
    cy.visit('/create-post');

    // Fill out the form
    cy.get('input[name="title"]').type('My First Post');
    cy.get('textarea[name="content"]').type('This is the content of my first post.');
    cy.get('select[name="category"]').select('Technology');

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Assert that the user is redirected to the new post's page
    cy.url().should('include', '/posts/my-first-post');

    // Assert that the post's content is visible
    cy.contains('h1', 'My First Post');
    cy.contains('p', 'This is the content of my first post.');
  });
});