describe('Login', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display an error message for invalid credentials', () => {
    cy.get('input#username').type('invaliduser');
    cy.get('input#password').type('invalidpassword');
    cy.contains('button', 'Login').click();
    cy.get('#errorMesage').should(
      'contain.text',
      'username or password is incorrect'
    );
  });

  it('should navigate to the dashboard page after successful login', () => {
    cy.get('input#username').type('user1');
    cy.get('input#password').type('password1');
    cy.contains('button', 'Login').click();
    cy.location('pathname').should('eq', '/dashboard');
  });
});
