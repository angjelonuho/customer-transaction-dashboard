describe('Login', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display an error message for invalid credentials', () => {
    cy.login('invaliduser', 'invalidpassword');
    cy.get('#errorMesage').should(
      'contain.text',
      'username or password is incorrect'
    );
  });

  it('should navigate to the dashboard page after successful login', () => {
    cy.login('user1', 'password1');
    cy.location('pathname').should('eq', '/dashboard');
  });

  it('should log out the user when the logout button is clicked', () => {
    cy.login('user1', 'password1');
    cy.location('pathname').should('eq', '/dashboard');
    cy.get('#logoutButton').should('exist').click();
    cy.location('pathname').should('eq', '/');
  });
});
