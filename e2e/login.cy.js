describe('Login Test using JSON data', () => {
  beforeEach(() => {
    cy.visit('https://www.bus.irctc.co.in/home');
    cy.get('a[data-target="#modalLoginForm"]').click()
        cy.get('#modalLoginForm').should('be.visible');

  });

   it('should login using data from JSON', () => {
    cy.fixture('login').then((users) => {
      users.forEach((user) => {
        // To Clear the typebox before typing
        cy.get('#loginuserid').clear().type(user.username);
        cy.get('#pwd').clear().type(user.password);


        // Just log data 
        cy.log(`Attempted login with: ${user.username}`);

      });
    });
  });
});