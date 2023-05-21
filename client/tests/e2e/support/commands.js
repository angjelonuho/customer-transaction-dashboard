Cypress.Commands.add('login', (username, password) => {
    // Visit the login page
    cy.visit('/'); 
    cy.get('input#username').type(username);
    cy.get('input#password').type(password);
    cy.contains('button', 'Login').click();
});

