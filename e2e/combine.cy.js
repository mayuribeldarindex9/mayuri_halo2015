describe('Verify the Dynamic Dropdown and Calendar on Redbus', () => {

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('https://www.bus.irctc.co.in');
    cy.reload(true);
  });

  it('should select source city', () => {
    cy.get('#departFrom').type("Pune", { delay: 200 });
    cy.get('.ui-menu-item').should('exist');

    cy.get('.ui-menu-item').each(($el) => {
      const text = $el.text().trim();
      cy.log(`Source Option: ${text}`);
      if (text === 'Pune Darshan') {
        cy.wrap($el).click();
        return false; // break loop
      }
    });
       cy.get('#goingTo').type('Mumbai', { delay: 500 });

    cy.get('div').filter(':contains("Mumbai")').each(($el) => {
      const dest = $el.text().trim();
      cy.log(`Destination Option: ${dest}`);
      if (dest === 'Mumbai International Airport') {
        cy.wrap($el).click();
        return false; // break loop
      }

  // Open the calendar
  cy.get('#departDate').click();
  cy.get('#ui-datepicker-div').should('be.visible');

  // Wait for DOM
  cy.wait(500);

  // Check current title
  cy.get('.ui-datepicker-title').then(($title) => {
    const titleText = $title.text().trim();
    cy.log(`Calendar opened with: ${titleText}`);

    // Only try to navigate if not already at June 2025
    if (!titleText.includes('June 2025')) {
      // If it's before June 2025, click next until it matches
      cy.get('.ui-datepicker-next').should('not.have.class', 'ui-state-disabled');
      cy.get('.ui-datepicker-next').click({ force: true });
      cy.wait(300);

      // You could repeat or loop this if needed for dynamic behavior
    }
  });

  // Finally select 16 (wait briefly before selecting)
  cy.wait(300);
  cy.get('.ui-datepicker-calendar td a').contains('16').click({ force: true });

  // Assert the value contains 30
  //cy.get('#departDate').should('have.value').and('include.value', '16');
 
  cy.get('button[type="submit"]').eq(2).click()

})

})

  })

 

    


 